import React, { PropTypes } from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events';
let Popup = React.createClass({
  render(){
    return (
      <div>
        <h3 className='text-info text-center demo-info'>
          Click the "+x more" link on any calendar day that cannot fit all the days events to
          see an inline popup of all the events.
        </h3>
        <BigCalendar
          popup
          events={events}
          defaultDate={new Date(2015, 3, 1)}
        />
      </div>
    )
  }
})

export default Popup;
