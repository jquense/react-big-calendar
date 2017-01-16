import React from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import Selection, { getBoundsForNode, isEvent } from './Selection';
import dates from './utils/dates';
import { isSelected } from './utils/selection';
import localizer from './localizer'

import { notify } from './utils/helpers';
import { accessor, elementType, dateFormat } from './utils/propTypes';
import { accessor as get } from './utils/accessors';

import TimeColumn from './TimeColumn'

function snapToSlot(date, step){
  var roundTo = 1000 * 60 * step;
  return new Date(Math.floor(date.getTime() / roundTo) * roundTo)
}

function startsBefore(date, min) {
  return dates.lt(dates.merge(min, date), min, 'minutes')
}

function startsAfter(date, max) {
  return dates.gt(dates.merge(max, date), max, 'minutes')
}

function positionFromDate(date, min, total) {
  if (startsBefore(date, min))
    return 0

  let diff = dates.diff(min, dates.merge(min, date), 'minutes')
  return Math.min(diff, total)
}

function overlaps(event, events, { startAccessor, endAccessor }, last) {
  let eStart = get(event, startAccessor);
  let offset = last;

  function overlap(eventB){
    return dates.lt(eStart, get(eventB, endAccessor))
  }

  if (!events.length) return last - 1
  events.reverse().some(prevEvent => {
    if (overlap(prevEvent)) return true
    offset = offset - 1
  })

  return offset
}

let DaySlot = React.createClass({

  propTypes: {
    events: React.PropTypes.array.isRequired,
    step: React.PropTypes.number.isRequired,
    min: React.PropTypes.instanceOf(Date).isRequired,
    max: React.PropTypes.instanceOf(Date).isRequired,
    now: React.PropTypes.instanceOf(Date),

    rtl: React.PropTypes.bool,
    titleAccessor: accessor,
    allDayAccessor: accessor.isRequired,
    startAccessor: accessor.isRequired,
    endAccessor: accessor.isRequired,

    selectRangeFormat: dateFormat,
    eventTimeRangeFormat: dateFormat,
    culture: React.PropTypes.string,

    selected: React.PropTypes.object,
    selectable: React.PropTypes.oneOf([true, false, 'ignoreEvents']),
    eventOffset: React.PropTypes.number,

    onSelecting: React.PropTypes.func,
    onSelectSlot: React.PropTypes.func.isRequired,
    onSelectEvent: React.PropTypes.func.isRequired,

    className: React.PropTypes.string,
    dragThroughEvents: React.PropTypes.bool,
    eventPropGetter: React.PropTypes.func,
    dayWrapperComponent: elementType,
    eventComponent: elementType,
    eventWrapperComponent: elementType.isRequired,
  },

  getDefaultProps() {
    return { dragThroughEvents: true }
  },

  getInitialState() {
    return { selecting: false };
  },

  componentDidMount() {
    this.props.selectable
    && this._selectable()
  },

  componentWillUnmount() {
    this._teardownSelectable();
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectable && !this.props.selectable)
      this._selectable();
    if (!nextProps.selectable && this.props.selectable)
      this._teardownSelectable();
  },

  render() {
    const {
      min,
      max,
      step,
      now,
      selectRangeFormat,
      culture,
      ...props
    } = this.props

    this._totalMin = dates.diff(min, max, 'minutes')

    let { selecting, startSlot, endSlot } = this.state
    let style = this._slotStyle(startSlot, endSlot)

    let selectDates = {
      start: this.state.startDate,
      end: this.state.endDate
    };

    return (
      <TimeColumn
        {...props}
        className={cn(
          'rbc-day-slot',
          dates.isToday(max) && 'rbc-today'
        )}
        now={now}
        min={min}
        max={max}
        step={step}
      >
        {this.renderEvents()}

        {selecting &&
          <div className='rbc-slot-selection' style={style}>
              <span>
              { localizer.format(selectDates, selectRangeFormat, culture) }
              </span>
          </div>
        }
      </TimeColumn>
    );
  },

  renderEvents() {
    let {
        min
      , max
      , culture
      , eventPropGetter
      , selected, eventTimeRangeFormat, eventComponent
      , eventWrapperComponent: EventWrapper
      , rtl: isRtl
      , startAccessor, endAccessor, titleAccessor } = this.props;

    let EventComponent = eventComponent

    return this._getStyledEvents().map((event, idx) => {
      let start = get(event, startAccessor)
      let end = get(event, endAccessor)

      let continuesPrior = startsBefore(start, min)
      let continuesAfter = startsAfter(end, max)

      let title = get(event, titleAccessor)
      let label = localizer.format({ start, end }, eventTimeRangeFormat, culture)
      let _isSelected = isSelected(event, selected)

      if (eventPropGetter)
        var { style: xStyle, className } = eventPropGetter(event, start, end, _isSelected)

      let { height, top, width, xOffset } = event.styles
      let style = {
        ...xStyle,
        top: `${top}%`,
        height: `${height}%`,
        [isRtl ? 'right' : 'left']: `${Math.max(0, xOffset)}%`,
        width: `${width}%`
      }

      return (
        <EventWrapper event={event} key={'evt_' + idx}>
          <div
            style={style}
            title={label + ': ' + title }
            onClick={(e) => this._select(event, e)}
            className={cn('rbc-event', className, {
              'rbc-selected': _isSelected,
              'rbc-event-continues-earlier': continuesPrior,
              'rbc-event-continues-later': continuesAfter
            })}
          >
            <div className='rbc-event-label'>{label}</div>
            <div className='rbc-event-content'>
              { EventComponent
                ? <EventComponent event={event} title={title}/>
                : title
              }
            </div>
          </div>
        </EventWrapper>
      )
    })
  },

  _getStyledEvents() {
    let { min, startAccessor, endAccessor, step } = this.props

    let events = this.props.events.sort((a, b) => {
      let startA = +get(a, startAccessor)
      let startB = +get(b, startAccessor)

      if (startA === startB) {
        return +get(b, endAccessor) - +get(a, endAccessor)
      }

      return startA - startB
    })

    let getSlot = (event, accessor) => event && positionFromDate(
      get(event, accessor), min, this._totalMin
    )

    let isSibling = (idx1, idx2) => {
      let event1 = events[idx1]
      let event2 = events[idx2]

      if (!event1 || !event2) return false

      let start1 = getSlot(event1, startAccessor)
      let start2 = getSlot(event2, startAccessor)

      return (Math.abs(start1 - start2) < 60)
    }

    let isChild = (parentIdx, childIdx) => {
      if (isSibling(parentIdx, childIdx)) return false

      let parentEnd = getSlot(events[parentIdx], endAccessor)
      let childStart = getSlot(events[childIdx], startAccessor)

      return parentEnd > childStart
    }

    let getSiblings = (idx) => {
      let nextIdx = idx
      let siblings = []

      while (isSibling(idx, ++nextIdx)) siblings.push(nextIdx)

      return siblings
    }

    let getChildGroups = (idx, nextIdx) => {
      let groups = []
      let nbrOfColumns = 0

      while (isChild(idx, nextIdx)) {
        let childGroup = [nextIdx]
        let siblingIdx = nextIdx

        while (isSibling(nextIdx, ++siblingIdx)) childGroup.push(siblingIdx)

        nbrOfColumns = Math.max(nbrOfColumns, childGroup.length)
        groups.push(childGroup)
        nextIdx = siblingIdx
      }

      return { childGroups: groups, nbrOfChildColumns: nbrOfColumns }
    }

    let getYStyles = (idx) => {
      let event = events[idx]
      let start = getSlot(event, startAccessor)
      let end = Math.max(getSlot(event, endAccessor), start + step)
      let top = start / this._totalMin * 100
      let bottom = end / this._totalMin * 100

      return {
        top,
        height: bottom - top
      }
    }

    let OVERLAP_MULTIPLIER = 0.3
    let idx = 0

    // Each iteration goes over all related/overlapping events
    while (idx < events.length) {
      let siblings = getSiblings(idx)
      let { childGroups, nbrOfChildColumns } = getChildGroups(
        idx, idx + siblings.length + 1
      )
      let nbrOfColumns = Math.max(nbrOfChildColumns, siblings.length) + 1

      // Set styles to top level events
      Array.of(idx).concat(siblings).forEach((eventIdx, siblingIdx) => {
        let width = 100 / nbrOfColumns
        let xAdjustment = width * (nbrOfColumns > 1 ? OVERLAP_MULTIPLIER : 0)
        let { top, height } = getYStyles(eventIdx)

        events[eventIdx].styles = {
          top,
          height,
          width: width + xAdjustment,
          xOffset: (width * siblingIdx) - xAdjustment
        }
      })

      childGroups.forEach(group => {
        let parentIdx = idx
        let siblingIdx = 0

        // Move child group to sibling if possible, since this will makes
        // room for more events
        while (isChild(siblings[siblingIdx], group[0])) {
          parentIdx = siblings[siblingIdx]
          siblingIdx++
        }

        // Set styles to child events
        group.forEach((eventIdx, i) => {
          let parentStyles = events[parentIdx].styles
          let spaceOccupiedByParent = parentStyles.width + parentStyles.xOffset
          let columns = Math.min(group.length, nbrOfColumns)
          let width = (100 - spaceOccupiedByParent) / columns
          let xAdjustment = spaceOccupiedByParent * OVERLAP_MULTIPLIER
          let { top, height } = getYStyles(eventIdx)

          events[eventIdx].styles = {
            top,
            height,
            width: width + xAdjustment,
            xOffset: spaceOccupiedByParent + (width * i) - xAdjustment
          }
        })
      })

      // Move past all events we just went through
      idx += 1 + siblings.length + childGroups.reduce(
        (total, group) => total + group.length, 0
      )
    }

    return events
  },

  _slotStyle(startSlot, endSlot) {
    let top = ((startSlot / this._totalMin) * 100);
    let bottom = ((endSlot / this._totalMin) * 100);

    return {
      top: top + '%',
      height: bottom - top + '%'
    }
  },

  _selectable(){
    let node = findDOMNode(this);
    let selector = this._selector = new Selection(()=> findDOMNode(this))

    let maybeSelect = (box) => {
      let onSelecting = this.props.onSelecting
      let current = this.state || {};
      let state = selectionState(box);
      let { startDate: start, endDate: end } = state;

      if (onSelecting) {
        if (
          (dates.eq(current.startDate, start, 'minutes') &&
          dates.eq(current.endDate, end, 'minutes')) ||
          onSelecting({ start, end }) === false
        )
          return
      }

      this.setState(state)
    }

    let selectionState = ({ y }) => {
      let { step, min, max } = this.props;
      let { top, bottom } = getBoundsForNode(node)

      let mins = this._totalMin;

      let range = Math.abs(top - bottom)

      let current = (y - top) / range;

      current = snapToSlot(minToDate(mins * current, min), step)

      if (!this.state.selecting)
        this._initialDateSlot = current

      let initial = this._initialDateSlot;

      if (dates.eq(initial, current, 'minutes'))
        current = dates.add(current, step, 'minutes')

      let start = dates.max(min, dates.min(initial, current))
      let end = dates.min(max, dates.max(initial, current))

      return {
        selecting: true,
        startDate: start,
        endDate: end,
        startSlot: positionFromDate(start, min, this._totalMin),
        endSlot: positionFromDate(end, min, this._totalMin)
      }
    }

    selector.on('selecting', maybeSelect)
    selector.on('selectStart', maybeSelect)

    selector.on('mousedown', (box) => {
      if (this.props.selectable !== 'ignoreEvents') return

      return !isEvent(findDOMNode(this), box)
    })

    selector
      .on('click', (box) => {
        if (!isEvent(findDOMNode(this), box))
          this._selectSlot(selectionState(box))

        this.setState({ selecting: false })
      })

    selector
      .on('select', () => {
        if (this.state.selecting) {
          this._selectSlot(this.state)
          this.setState({ selecting: false })
        }
      })
  },

  _teardownSelectable() {
    if (!this._selector) return
    this._selector.teardown();
    this._selector = null;
  },

  _selectSlot({ startDate, endDate }) {
    let current = startDate
      , slots = [];

    while (dates.lte(current, endDate)) {
      slots.push(current)
      current = dates.add(current, this.props.step, 'minutes')
    }

    notify(this.props.onSelectSlot, {
      slots,
      start: startDate,
      end: endDate
    })
  },

  _select(...args) {
    notify(this.props.onSelectEvent, args)
  }
});


function minToDate(min, date){
  var dt = new Date(date)
    , totalMins = dates.diff(dates.startOf(date, 'day'), date, 'minutes');

  dt = dates.hours(dt, 0);
  dt = dates.minutes(dt, totalMins + min);
  dt = dates.seconds(dt, 0)
  return dates.milliseconds(dt, 0)
}

export default DaySlot;
