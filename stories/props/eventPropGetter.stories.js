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
  decorators: [
    (Story) => (
      <div style={{ height: 600 }}>
        <Story />
      </div>
    ),
  ],
}

export function CalEventPropGetter() {
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
    <Calendar
      defaultDate={new Date(2015, 3, 13)}
      defaultView={Views.WEEK}
      eventPropGetter={eventPropGetter}
      events={demoEvents}
      localizer={mLocalizer}
    />
  )
}
CalEventPropGetter.storyName = 'eventPropGetter'
