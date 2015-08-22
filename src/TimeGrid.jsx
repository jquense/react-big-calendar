import React from 'react';
import { findDOMNode } from 'react-dom';
import dates from './utils/dates';
import localizer from './utils/localizer'

import DaySlot from './DaySlot';
import EventRow from './EventRow';
import TimeGutter from './TimeGutter';
import BackgroundCells from './BackgroundCells';

import getWidth from 'dom-helpers/query/width';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import message from './utils/messages';

import { inRange, eventSegments, eventLevels, sortEvents, segStyle } from './utils/eventLevels';

let Day = React.createClass({

  propTypes: {
    ...DaySlot.propTypes,
    ...TimeGutter.propTypes
  },

  componentDidMount() {
    this._adjustGutter()
  },

  componentDidUpdate() {
    this._adjustGutter()
  },

  render() {
    let { events, start, end, messages } = this.props;
    let range = dates.range(start, end, 'day')

    this._slots = range.length;

    let allDayEvents = []
      , rangeEvents = [];

    events.forEach(event => {
      if (inRange(event, start, end)) {
        if (event.allDay || !dates.eq(event.start, event.end, 'day') )
          allDayEvents.push(event)
        else
          rangeEvents.push(event)
      }
    })

    allDayEvents.sort(sortEvents, this.props.allDayField)

    let segments = allDayEvents.map(evt => eventSegments(evt, start, end))
    let levels = eventLevels(segments)

    return (
      <div className='rbc-time-view'>
        <div className='rbc-time-header'>
          <div ref='gutterCell' className='rbc-gutter-cell'>
            { message(messages).allDay }
          </div>
          <div ref='headerCell' >
            <div className='rbc-row'>
              { this.renderHeader(range) }
            </div>
            <div className='rbc-allday-cell'>
              <BackgroundCells slots={range.length}/>
              <div style={{ zIndex: 1, position: 'relative' }}>
                { this.renderAllDayEvents(range, levels) }
              </div>
            </div>
          </div>
        </div>
        <div ref='content' className='rbc-time-content'>
          <TimeGutter ref='gutter' {...this.props}/>
          {
            this.renderEvents(range, rangeEvents)
          }
        </div>
      </div>
    );
  },

  renderEvents(range, events){
    return range.map((date, idx) => {
      let { onEventClick } = this.props;
      let daysEvents = events.filter(event => dates.inRange(date, event.start, event.end, 'day'))

      return (
        <DaySlot
          {...this.props}
          key={idx}
          date={date}
          events={daysEvents}
          onEventClick={onEventClick}
        />
      )
    })
  },

  renderAllDayEvents(range, levels){
    let first = range[0]
      , last = range[range.length - 1];

    if (levels.length === 1)
      levels.push([])

    return levels.map((segs, idx) =>
      <EventRow
        onEventClick={this.props.onEventClick}
        slots={this._slots}
        key={idx}
        segments={segs}
        start={first}
        end={last}
      />
    )
  },

  renderHeader(range){
    let { dayFormat, culture, onHeaderClick } = this.props;

    return range.map((date, i) =>
      <div key={i}
        className='rbc-cell-header'
        style={segStyle(1, this._slots)}
        onClick={onHeaderClick.bind(null, date)}
      >
        { localizer.format(date, dayFormat, culture) }
      </div>
    )
  },

  _adjustGutter() {
    let width = this._gutterWidth

    this._gutterWidth = getWidth(findDOMNode(this.refs.gutter));

    if (width !== this._gutterWidth) {
      this.refs.gutterCell.style.width = this._gutterWidth + 1 + 'px';
    }

    if (this.refs.content.scrollHeight > this.refs.content.clientHeight) {
      this.refs.headerCell.style.marginRight = scrollbarSize() + 'px'
    }
  }

});

export default Day
