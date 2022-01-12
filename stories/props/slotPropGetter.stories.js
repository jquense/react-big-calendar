import React, { useCallback } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './slotPropGetter.mdx'
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

export function CalSlotPropGetter() {
  const slotPropGetter = useCallback(
    (date) => ({
      className: 'slotDefault',
      ...(moment(date).hour() < 8 && {
        style: {
          backgroundColor: 'powderblue',
          color: 'black',
        },
      }),
      ...(moment(date).hour() > 12 && {
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
      slotPropGetter={slotPropGetter}
      events={demoEvents}
      localizer={mLocalizer}
    />
  )
}
CalSlotPropGetter.storyName = 'slotPropGetter'
