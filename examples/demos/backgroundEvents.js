import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../backgroundEvents';

function BackgroundEvent({ event }) {
  return (
    <span>
      <strong>
        {event.title}
      </strong>
    </span>
  )
}

function backgroundEventPropGetter() {
  return {
    className: 'background-event',
    style: {
      'background': 'green'
    }
  }
}
let BackgroundEvents = React.createClass({
  render(){
    return (
      <BigCalendar
        {...this.props}
        events={events}
        components={{
          backgroundEvent: BackgroundEvent
        }}
        backgroundEventPropGetter={backgroundEventPropGetter}
        defaultDate={new Date(2015, 3, 1)}
      />
    )
  }
})

export default BackgroundEvents;

