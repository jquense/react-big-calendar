import React, { PropTypes } from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events';

let Selectable = React.createClass({
  render(){
    return (
      <div>
        <h3 className='text-info text-center demo-info'>
          Click an event to see more info, or
          drag the mouse over the calendar to select a date/time range.
        </h3>
        <BigCalendar
          selectable
          events={events}
          defaultView='week'
          defaultDate={new Date(2015, 3, 1)}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={(slotInfo) => alert(
            `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
            `\nend: ${slotInfo.end.toLocaleString()}`
          )}
        />
      </div>
    )
  }
})

export default Selectable;
