import React, { useState, useCallback } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './onNavigate.mdx'

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

export function CalNavigate() {
  const [date, setDate] = useState(new Date(2015, 3, 1))

  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate])

  return (
    <Calendar
      date={date}
      events={demoEvents}
      localizer={mLocalizer}
      onNavigate={onNavigate}
    />
  )
}
CalNavigate.storyName = 'onNavigate'
