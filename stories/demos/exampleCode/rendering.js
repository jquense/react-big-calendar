import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import DemoLink from '../../DemoLink.component'
import events from '../../resources/events'
import styles from './rendering.module.scss'

function Event({ event }) {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.desc && ':  ' + event.desc}
    </span>
  )
}
Event.propTypes = {
  event: PropTypes.object,
}

function EventAgenda({ event }) {
  return (
    <span>
      <em style={{ color: 'magenta' }}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
  )
}
EventAgenda.propTypes = {
  event: PropTypes.object,
}

const customDayPropGetter = (date) => {
  if (date.getDate() === 7 || date.getDate() === 15)
    return {
      className: styles.specialDay,
      style: {
        border: 'solid 3px ' + (date.getDate() === 7 ? '#faa' : '#afa'),
      },
    }
  else return {}
}

const customSlotPropGetter = (date) => {
  if (date.getDate() === 7 || date.getDate() === 15)
    return {
      className: styles.specialDay,
    }
  else return {}
}

export default function Rendering({ localizer }) {
  const { components, defaultDate } = useMemo(
    () => ({
      components: {
        agenda: {
          event: EventAgenda,
        },
        event: Event,
      },
      defaultDate: new Date(2015, 3, 7),
    }),
    []
  )

  return (
    <Fragment>
      <DemoLink fileName="rendering" />
      <div className="height600">
        <Calendar
          components={components}
          dayPropGetter={customDayPropGetter}
          defaultDate={defaultDate}
          defaultView={Views.AGENDA}
          events={events}
          localizer={localizer}
          slotPropGetter={customSlotPropGetter}
        />
      </div>
    </Fragment>
  )
}
Rendering.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}
