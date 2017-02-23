import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events';

let BusinessHours = React.createClass({
  render(){
    return (
      <BigCalendar
        {...this.props}
        events={events}
        defaultView='week'
        selectable={true}
        businessHours={[{
          dow: [0, 1, 2, 3, 4, 5, 6], // Sunday, Monday, Tuesday, Wednesday...
          start: "08:30", // 8am
          end: "12:30" // 12pm
        }, {
          dow: [0, 1, 2], // Sunday, Monday, Tuesday, Wednesday...
          start: "14:30", // 2pm
          end: "20:00" // 8pm
        }]}
        onSelectSlot={(slotInfo) => alert(
          `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
          `\nend: ${slotInfo.end.toLocaleString()}`
        )}
        defaultDate={new Date(2015, 3, 1)}
      />
    )
  }
});

export default BusinessHours;
