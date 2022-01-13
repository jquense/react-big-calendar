import React, { useCallback } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './slotGroupPropGetter.mdx'
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

export function SlotGroupPropGetter() {
  const slotGroupPropGetter = useCallback(
    () => ({
      style: {
        minHeight: 60,
      },
    }),
    []
  )

  return (
    <Calendar
      defaultDate={new Date(2015, 3, 13)}
      defaultView={Views.WEEK}
      slotGroupPropGetter={slotGroupPropGetter}
      events={demoEvents}
      localizer={mLocalizer}
    />
  )
}
SlotGroupPropGetter.storyName = 'slotGroupPropGetter'
