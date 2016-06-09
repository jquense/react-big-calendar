import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events';
let Popup = React.createClass({
  render(){
    return (
      <div {...this.props}>
        <h3 className='callout'>
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
