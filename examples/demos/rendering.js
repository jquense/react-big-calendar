import React, { Children, useEffect, useState } from 'react'
import { Calendar, Views } from 'react-big-calendar'
import events from '../events'

function Event({ event }) {
  return (
    <span style={{ color: 'black' }}>
      <strong>
        {event.allDay ? 'ALL' : 'NOT ALL'}
        {event.title}
      </strong>
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

const ColoredEventWrapper = ({ children, event }) => {
  console.log()
  return React.cloneElement(Children.only(children), {
    style: {
      ...children.style,
      backgroundColor: event.allDay ? 'lightBlue' : 'transparent',
      padding: 0,
    },
  })
}
const TesterHeader = ({ label }) => {
  return <div>{label}</div>
}
const TesterFooter = ({ label }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <button>Add Event</button>
    </div>
  )
}

let Rendering = ({ localizer }) => {
  const [localEvents, setEvents] = useState([])

  useEffect(() => {
    const allDayEvents = events.filter(event => event.allDay)
    const notAllDayEvents = events.filter(event => !event.allDay)
    setEvents([...allDayEvents, ...notAllDayEvents])
  }, [])
  return (
    <Calendar
      events={localEvents}
      localizer={localizer}
      defaultDate={new Date(2015, 3, 1)}
      defaultView={Views.MONTH}
      // dayPropGetter={customDayPropGetter}
      // slotPropGetter={customSlotPropGetter}
      popup
      components={{
        event: Event,
        eventWrapper: ColoredEventWrapper,
        month: {
          dateHeader: TesterHeader,
          dateFooter: TesterFooter,
        },
        // agenda: {
        //   event: EventAgenda,
        // },
      }}
    />
  )
}
export default Rendering
