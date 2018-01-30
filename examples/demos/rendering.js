import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from '../events'

function Event({ event }) {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.desc && ':  ' + event.desc}
    </span>
  )
}

function EventAgenda({ event }) {
  return (
    <span>
      <em style={{ color: 'magenta' }}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
  )
}

const customNow = () => {
  let now = new Date()
  now.setFullYear(2015)
  now.setMonth(3)
  now.setDate(1)
  return now
}

const customDayPropGetter = date => {
  if (date.getDate() === 7 || date.getDate() === 15)
    return {
      className: 'special-day',
      style: {
        border: 'solid 3px ' + (date.getDate() === 7 ? '#faa' : '#afa'),
      },
    }
  else return {}
}

const customSlotPropGetter = date => {
  if (date.getDate() === 7 || date.getDate() === 15)
    return {
      className: 'special-day',
    }
  else return {}
}

let Rendering = props => (
  <div {...props}>
    <p>
      <small>Custom now is {customNow().toString()}</small>
    </p>
    <BigCalendar
      events={events}
      defaultDate={new Date(2015, 3, 1)}
      nowAccessor={customNow}
      defaultView="agenda"
      dayPropGetter={customDayPropGetter}
      slotPropGetter={customSlotPropGetter}
      components={{
        event: Event,
        agenda: {
          event: EventAgenda,
        },
      }}
    />
  </div>
)

export default Rendering
