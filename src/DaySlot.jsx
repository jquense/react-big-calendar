import React from 'react';
import { findDOMNode } from 'react-dom';
import Selection, { getBoundsForNode } from './Selection';
import cn from 'classnames';
import dates from './utils/dates';
import { isSelected } from './utils/selection';
import localizer from './utils/localizer'

import { notify } from './utils/helpers';
import { accessor } from './utils/propTypes';
import { accessor as get } from './utils/accessors';

function snapToSlot(date, step){
  var roundTo = 1000 * 60 * step;
  return new Date(Math.floor(date.getTime() / roundTo) * roundTo)
}



function positionFromDate(date, min, step){
  return dates.diff(min, dates.merge(min, date), 'minutes')
}

function overlaps(event, events, { startAccessor, endAccessor }){
  let eStart = get(event, startAccessor)
    , eEnd = get(event, endAccessor);

  function overlap(eventB){
    return dates.lt(eStart, get(eventB, endAccessor))
  }

  return events.reduce((sum, otherEvent) => {
    return sum  + (overlap(otherEvent) ? 1 : 0)
  }, 0)
}

let DaySlot = React.createClass({

  propTypes: {
    events: React.PropTypes.array.isRequired,
    step: React.PropTypes.number.isRequired,
    min: React.PropTypes.instanceOf(Date).isRequired,
    max: React.PropTypes.instanceOf(Date).isRequired,

    allDayAccessor: accessor.isRequired,
    startAccessor: accessor.isRequired,
    endAccessor: accessor.isRequired,

    selectable: React.PropTypes.bool,
    eventOffset: React.PropTypes.number,

    onSelectSlot: React.PropTypes.func.isRequired,
    onSelectEvent: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return { selecting: false };
  },

  componentDidMount() {
    this.props.selectable
      && this._selectable()
  },

  componentWillUnmount() {
    this._selector && this._selector.teardown()
  },

  render() {
    let {
        min, max, step, start, end
      , selectRangeFormat, culture, ...props } = this.props;

    let totalMin = dates.diff(min, max, 'minutes')
    let numSlots = Math.ceil(totalMin / step)
    let children = [];

    for (var i = 0; i < numSlots; i++) {
      children.push(
        <div key={i} className='rbc-time-slot'/>
      )
    }

    this._totalMin = totalMin;

    let { selecting, startSlot, endSlot } = this.state
       , style = this._slotStyle(startSlot, endSlot, 0)

    let selectDates = {
      start: this.state.startDate,
      end: this.state.endDate
    };

    return (
      <div {...props} className={cn('rbc-day-slot', props.className)}>
        { children }
        { this.renderEvents(numSlots, totalMin) }
        {
          selecting &&
            <div className='rbc-slot-selection' style={style}>
              <span>
              { localizer.format(selectDates, selectRangeFormat, culture) }
              </span>
            </div>
        }
      </div>
    );
  },

  renderEvents(numSlots, totalMin) {
    let {
        events, step, min, culture
      , selected, eventTimeRangeFormat, eventComponent
      , startAccessor, endAccessor, titleAccessor } = this.props;

    let EventComponent = eventComponent;

    events.sort((a, b) => +get(a, startAccessor) - +get(b, startAccessor))

    return events.map((event, idx) => {
      let start = get(event, startAccessor)
      let end = get(event, endAccessor)
      let startSlot = positionFromDate(start, min, step);
      let endSlot = positionFromDate(end, min, step);

      let leftOffset = overlaps(event, events.slice(0, idx), this.props)

      let style = this._slotStyle(startSlot, endSlot, leftOffset)

      let title = get(event, titleAccessor)
      let label = localizer.format({ start, end }, eventTimeRangeFormat, culture);

      return (
        <div
          key={'evt_' + idx}
          style={style}
          onClick={this._select.bind(null, event)}
          className={cn('rbc-event', {
            'rbc-selected': isSelected(event, selected)
          })}
        >
          <div className='rbc-event-label' title={label}>{label}</div>
          <div className='rbc-event-content'>
            { EventComponent
              ? <EventComponent event={event} title={title}/>
              : title
            }
          </div>
        </div>
      )
    })
  },

  _slotStyle(startSlot, endSlot, leftOffset){
    let eventOffset = this.props.eventOffset || 10;

    let top = ((startSlot / this._totalMin) * 100);
    let bottom = ((endSlot / this._totalMin) * 100);

    return {
      top: top + '%',
      height: bottom - top + '%',
      left: leftOffset === 0 ? 0 : leftOffset * eventOffset + '%',
      right: 0
    }
  },

  _selectable(){
    let node = findDOMNode(this);
    let selector = this._selector = new Selection(node)

    selector.on('selecting', ({ x, y }) => {
      let { date, step, min } = this.props;
      let { top, bottom } = getBoundsForNode(node)

      let mins = this._totalMin;

      let range = Math.abs(top - bottom)

      let current = (y - top) / range;

      current = snapToSlot(minToDate(mins * current, date), step)

      if (!this.state.selecting)
        this._initialDateSlot = current

      let initial = this._initialDateSlot;

      if (dates.eq(initial, current, 'minutes'))
        current = dates.add(current, step, 'minutes')

      //end = snapToSlot(minToDate(mins * end, date), step)
      let start = dates.min(initial, current)
      let end = dates.max(initial, current)

      this.setState({
        selecting: true,
        startDate: start,
        endDate: end,
        startSlot: positionFromDate(start, min, step),
        endSlot: positionFromDate(end, min, step)
      })
    })

    selector
      .on('click', () => {
        this._selectSlot(this.state)
        this.setState({ selecting: false })
      })

    selector
      .on('select', () => {
        this._selectSlot(this.state)
        this.setState({ selecting: false })
      })
  },

  _selectSlot({ startDate, endDate, endSlot, startSlot }){
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

  _select(event){
    notify(this.props.onSelectEvent, event)
  }
});


function minToDate(min, date){
  var dt = new Date(date);
  dt = dates.hours(dt, 0);
  dt = dates.minutes(dt, min);
  dt = dates.seconds(dt, 0)
  return dates.milliseconds(dt, 0)
}

export default DaySlot;
