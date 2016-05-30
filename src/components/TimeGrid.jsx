import React, { PropTypes, Component } from 'react'
import cn from 'classnames'
import localizer from '../localizer.js'
import formats from '../formats.js'
import { findDOMNode } from 'react-dom';
import classes from 'dom-helpers/class';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import getWidth from 'dom-helpers/query/width';

import TimeGridHeader from './TimeGridHeader.jsx'
import TimeGutter from './TimeGutter.jsx'
import DaySlot from './DaySlot.jsx'
import TimeGridAllDay from './TimeGridAllDay.jsx'

import EventRow from '../EventRow.jsx'
import EventCell from '../EventCell.jsx'

import { accessor as get } from '../utils/accessors';
import dates from '../utils/dates';
import {
  inRange, eventSegments, endOfRange
  , eventLevels, sortEvents, segStyle } from '../utils/eventLevels';
import { elementType, accessor } from '../utils/propTypes';

const MIN_ROWS = 2;

export default class TimeGrid extends Component {
  static propTypes = {
    ...DaySlot.propTypes,
    ...TimeGutter.propTypes,

    end: PropTypes.instanceOf(Date),
    start: PropTypes.instanceOf(Date),
    selectRangeFormat: PropTypes.func.isRequired,
    eventTimeRangeFormat: PropTypes.func.isRequired,
    timeGutterFormat: PropTypes.string,
    dayFormat: PropTypes.string.isRequired,
    culture: PropTypes.string.isRequired,
    components: PropTypes.shape({
      event: elementType,

      toolbar: PropTypes.element,

      agenda: PropTypes.shape({
        date: elementType,
        time: elementType,
        event: elementType
      }),

      day: PropTypes.shape({ event: elementType }),
      week: PropTypes.shape({ event: elementType }),
      month: PropTypes.shape({ event: elementType })
    }),

    allDayAccessor: accessor,
    titleAccessor: accessor,
    startAccessor: accessor,
    endAccessor: accessor
  }

  static defaultProps = {
    ...DaySlot.defaultProps,
    ...TimeGutter.defaultProps,
    culture: 'en',
    selectRangeFormat: formats().selectRangeFormat,
    eventTimeRangeFormat: formats().eventTimeRangeFormat,
    components: {
      event: null
    },
    allDayAccessor: 'allDay',
    startAccessor: 'start',
    endAccessor: 'end',
    titleAccessor: 'title'
  }

  _adjustGutter() {
    const isRtl = this.props.rtl;
    const header = this._headerCell;
    const gutterCells = [findDOMNode(this.refs.gutter), ...this._gutters]
    const isOverflowing = this.refs.content.scrollHeight > this.refs.content.clientHeight;

    let width = this._gutterWidth

    if (!width) {
      this._gutterWidth = Math.max(...gutterCells.map(getWidth));

      if (this._gutterWidth) {
        width = this._gutterWidth + 'px';
        gutterCells.forEach(node => node.style.width = width)
      }
    }

    if (isOverflowing) {
      classes.addClass(header, 'rbc-header-overflowing')
      header.style[!isRtl ? 'marginLeft' : 'marginRight'] = '';
      header.style[isRtl ? 'marginLeft' : 'marginRight'] = scrollbarSize() + 'px';
    }
    else {
      classes.removeClass(header, 'rbc-header-overflowing')
    }
  }

  componentWillMount() {
    this._gutters = [];
  }

  componentDidMount() {
    this._adjustGutter()
  }

  componentDidUpdate() {
    this._adjustGutter()
  }

  separateEvents() {
    const allDayEvents = []
    const rangeEvents = []

    this.props.events.forEach(event => {
      if (inRange(event, this.props.start, this.props.end, this.props)) {
        let eStart = get(event, this.props.startAccessor)
          , eEnd = get(event, this.props.endAccessor);

        if (
          get(event, this.props.allDayAccessor)
          || !dates.eq(eStart, eEnd, 'day')
          || (dates.isJustDate(eStart) && dates.isJustDate(eEnd)))
        {
          allDayEvents.push(event)
        }
        else
          rangeEvents.push(event)
      }
    })
    return {
      allDayEvents,
      rangeEvents
    }
  }

  renderEvents(range, events){
    let { min, max, endAccessor, startAccessor, components } = this.props;
    let today = new Date(), daysEvents=[]

    return range.map((date, idx) => {
       let daysEvents = events.filter(
         event => dates.inRange(date,
           get(event, startAccessor),
           get(event, endAccessor), 'day')
       )

      return (
        <DaySlot
          {...this.props }
          min={dates.merge(date, min)}
          max={dates.merge(date, max)}
          now={new Date()}
          eventTimeRangeFormat={this.props.eventTimeRangeFormat}
          formatter={({start, end}) => {
            if (start+'' === end+'') {
              return localizer.format(
                {start, end: dates.add(end, this.props.step, 'minutes')},
                this.props.selectRangeFormat,
                this.props.culture)
            }
            return localizer.format(
              {start, end},
              this.props.selectRangeFormat,
              this.props.culture)
          }}
          className={cn({ 'rbc-now': dates.eq(date, today, 'day') })}
          style={segStyle(1, range.length)}
          key={idx}
          date={date}
          events={daysEvents}
        />
      )
    })
  }

  renderAllDayEvents(allDayEvents, range){
    const events = allDayEvents.slice(0)

    events.sort((a, b) => sortEvents(a, b, this.props))

    const { first, last } = endOfRange(range);
    const segments = events.map(evt => eventSegments(evt, first, last, this.props))
    const { levels } = eventLevels(segments)

    while (levels.length < MIN_ROWS )
      levels.push([])

    return levels.map((segs, idx) =>
      <EventRow
        eventComponent={this.props.components.event}
        titleAccessor={this.props.titleAccessor}
        startAccessor={this.props.startAccessor}
        endAccessor={this.props.endAccessor}
        allDayAccessor={this.props.allDayAccessor}
        eventPropGetter={this.props.eventPropGetter}
        onSelect={() => null}
        slots={range.length}
        key={idx}
        segments={segs}
        start={first}
        end={last}
      />
    )
  }

  render() {
    const addGutterRef = i => ref => this._gutters[i] = ref

    const range = dates.range(this.props.start, this.props.end, 'day')
    const { allDayEvents, rangeEvents } = this.separateEvents()

    return (
      <div className='rbc-time-view'>
        <TimeGridHeader range={range}
                        gutterRef={addGutterRef(0)}
                        headerRef={(ref) => { this._headerCell = ref }}
                        format={this.props.dayFormat}
                        culture={this.props.culture}
        />
        <TimeGridAllDay range={range}
                        selectable={this.props.selectable}
                        gutterRef={addGutterRef(1)}
        >
          { this.renderAllDayEvents(allDayEvents, range) }
        </TimeGridAllDay>
        <div className="rbc-time-content" ref="content">
          <TimeGutter {...this.props} ref="gutter"/>
          {this.renderEvents(range, rangeEvents)}
        </div>
      </div>
    )
  }
}
