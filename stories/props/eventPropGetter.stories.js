import React, { useCallback } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './eventPropGetter.mdx'
import '../resources/propGetter.scss'

const mLocalizer = momentLocalizer(moment)

export default {
  title: 'props',
  component: Calendar,
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

export function EventPropGetter() {
  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      ...(isSelected && {
        style: {
          backgroundColor: '#000',
        },
      }),
      ...(moment(start).hour() < 12 && {
        className: 'powderBlue',
      }),
      ...(event.title.includes('Meeting') && {
        className: 'darkGreen',
      }),
    }),
    []
  )

  return (
    <div className="height600">
      <Calendar
        defaultDate={new Date(2015, 3, 13)}
        defaultView={Views.WEEK}
        eventPropGetter={eventPropGetter}
        events={demoEvents}
        localizer={mLocalizer}
      />
    </div>
  )
}
EventPropGetter.storyName = 'eventPropGetter'
