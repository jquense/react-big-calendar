import React from 'react';
import cn from 'classnames';
import dates from './utils/dates';
import localizer from './utils/localizer'

import { instanceId } from './utils/helpers';
import getHeight from 'dom-helpers/query/height';

function snapDate(date, step){
  var roundTo = 1000 * 60 * step;
  return new Date(Math.floor(date.getTime() / roundTo) * roundTo)
}

function slotFromDate(date, min, step){
  return Math.ceil(dates.diff(min, snapDate(dates.merge(min, date), step), 'minutes') / step)
}

function positionFromDate(date, min, step){
  return dates.diff(min, dates.merge(min, date), 'minutes')
}

function overlaps(event, events){
  function overlap(eventA, eventB){
    return (dates.lte(eventA.start, eventA.start) && dates.lte(eventA.end, eventB.end))
      || (dates.lte(eventB.start, eventA.start) && dates.lte(eventB.end, eventA.end))
  }

  return events.reduce((sum, otherEvent) => {
    return sum  + (overlap(event, otherEvent) ? 1 : 0)
  }, 0)
}

let DaySlot = React.createClass({

  propTypes: {
    events: React.PropTypes.array,
    step: React.PropTypes.number,
    min: React.PropTypes.instanceOf(Date),
    max: React.PropTypes.instanceOf(Date),

    onEventClick: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      step: 30,
      min: dates.startOf(new Date(), 'day'),
      max: dates.endOf(new Date(), 'day'),
      events: []
    };
  },

  render() {
    let { min, max, step } = this.props;
    let totalMin = dates.diff(min, max, 'minutes')
    let numSlots = Math.ceil(totalMin / step)
    let children = [];

    for (var i = 0; i < numSlots; i++) {
      children.push(
        <div key={i} className='rbc-time-slot'/>
      )
    }

    return (
      <div className='rbc-day-slot'>
        { children }
        { this.renderEvents(numSlots, totalMin) }
      </div>
    );
  },

  renderEvents(numSlots, totalMin) {
    let { events, step, min, onEventClick } = this.props;

    events.sort((a, b) => +a - +b)

    return events.map((event, idx) => {
      let startSlot = positionFromDate(event.start, min, step);
      let endSlot = positionFromDate(event.end, min, step);

      let top = ((startSlot / totalMin) * 100);
      let bottom = ((endSlot / totalMin) * 100);

      let leftOffset = overlaps(event, events.slice(0, idx))

      let style = {
        top: top + '%',
        height: bottom - top + '%',
        left: leftOffset * 10 + '%',
        right: 0
      }

      return (
        <div
          key={'evt_' + idx}
          style={style}
          className={cn('rbc-event')}
          onClick={onEventClick.bind(null, event)}
        >
          { event.start.toLocaleString() }
        </div>
      )
    })
  }
});


export default DaySlot;
