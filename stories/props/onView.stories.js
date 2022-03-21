import React, { useState, useCallback } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './onView.mdx'

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

export function OnView() {
  const [date, setDate] = useState(new Date(2015, 3, 1))
  const [view, setView] = useState(Views.WEEK)

  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate])
  const onView = useCallback((newView) => setView(newView), [setView])

  return (
    <div className="height600">
      <Calendar
        date={date}
        events={demoEvents}
        localizer={mLocalizer}
        onNavigate={onNavigate}
        onView={onView}
        view={view}
      />
    </div>
  )
}
OnView.storyName = 'onView'
