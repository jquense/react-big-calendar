import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events';

function Event({ event }) {
  return (
    <span>
      <strong>
      {event.title}
      </strong>
      { event.desc && (':  ' + event.desc)}
    </span>
  )
}

function EventAgenda({ event }) {
  return <span>
    <em style={{ color: 'magenta'}}>{event.title}</em>
    <p>{ event.desc }</p>
  </span>
}


const customDayPropGetter = (date) => {
  if (date.getDate() === 7 || date.getDate() === 15)
    return {
      className: 'special-day',
      style: {
        border: 'solid 3px '+((date.getDate() === 7) ? '#faa' : '#afa'),
      }
    }
  else return {}
}

const customSlotPropGetter = (date) => {
  if (date.getDate() === 7 || date.getDate() === 15)
    return {
      className: 'special-day'
    }
  else return {}
}

let Rendering = React.createClass({
  render(){
    return (
      <div {...this.props}>
        <BigCalendar
          events={events}
          defaultDate={new Date(2015, 3, 1)}
          defaultView='agenda'
          dayPropGetter={customDayPropGetter}
          slotPropGetter={customSlotPropGetter}
          components={{
            event: Event,
            agenda: {
              event: EventAgenda
            }
          }}
        />
      </div>
    )
  }
})

export default Rendering;
