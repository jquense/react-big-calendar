import React, { useState, useCallback } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../../examples/events'
import mdx from './view.mdx'

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

export function CalView() {
  const [date, setDate] = useState(new Date(2015, 3, 1))
  const [view, setView] = useState(Views.WEEK)

  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate])
  const onView = useCallback((newView) => setView(newView), [setView])

  return (
    <Calendar
      localizer={mLocalizer}
      date={date}
      onNavigate={onNavigate}
      view={view}
      onView={onView}
      events={demoEvents}
    />
  )
}
CalView.storyName = 'view'
