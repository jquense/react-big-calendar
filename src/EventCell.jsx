import React from 'react';
import cn from 'classnames';
import dates from './utils/dates';
import { accessor as get } from './utils/accessors';

let EventCell = React.createClass({
  render() {
    let {
        className, event, selected, eventPropGetter
      , startAccessor, endAccessor, titleAccessor
      , slotStart, slotEnd, onSelect, component, ...props } = this.props;

    let Component = component;

    let title = get(event, titleAccessor)
      , end = get(event, endAccessor)
      , start = get(event, startAccessor)

    if (eventPropGetter)
      var { style, className: xClassName } = eventPropGetter(event, start, end, selected);

    return (
      <div
        {...props}
        style={{...props.style, ...style}}
        className={cn('rbc-event', className, xClassName, {
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
