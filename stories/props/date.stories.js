import React, { useState, useCallback } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './date.mdx'

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

export function CalDate() {
  const [date, setDate] = useState(new Date(2015, 3, 1))

  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate])

  return (
    <div className="height600">
      <Calendar
        date={date}
        events={demoEvents}
        localizer={mLocalizer}
        onNavigate={onNavigate}
      />
    </div>
  )
}
CalDate.storyName = 'date'
