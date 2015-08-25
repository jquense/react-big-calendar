import React from 'react';
import cn from 'classnames';
import dates from './utils/dates';
import { accessor as get } from './utils/accessors';

let EventCell = React.createClass({
  render() {
    let {
        className, event, selected
      , startAccessor, endAccessor, titleAccessor
      , slotStart, slotEnd, onSelect, component, ...props } = this.props;

    let Component = component;

    let title = get(event, titleAccessor)
      , end = get(event, endAccessor)
      , start = get(event, startAccessor)

    return (
      <div
        {...props}
        className={cn('rbc-event', className, {
          'rbc-selected': selected,
          'rbc-event-continues-prior': dates.lt(start, slotStart),
          'rbc-event-continues-after': dates.gt(end, slotEnd)
        })}
        onClick={()=> onSelect(event)}
      >
        <div className='rbc-event-content'>
          { Component
            ? <Component event={event} title={title}/>
            : title
          }
        </div>
      </div>
    );
  }
});

export default EventCell
