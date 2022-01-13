import React, { useCallback } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './dayPropGetter.mdx'
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

export function DayPropGetter() {
  const dayPropGetter = useCallback(
    (date) => ({
      ...(moment(date).day() === 2 && {
        className: 'tuesday',
      }),
      ...(moment(date).day() === 4 && {
        style: {
          backgroundColor: 'darkgreen',
          color: 'white',
        },
      }),
    }),
    []
  )

  return (
    <Calendar
      defaultDate={new Date(2015, 3, 13)}
      defaultView={Views.WEEK}
      dayPropGetter={dayPropGetter}
      events={demoEvents}
      localizer={mLocalizer}
    />
  )
}
DayPropGetter.storyName = 'dayPropGetter'
