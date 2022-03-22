import React, { useMemo } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './views.mdx'

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

export function CalViews() {
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 1),
      views: [Views.MONTH, Views.DAY, Views.AGENDA],
    }),
    []
  )

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        events={demoEvents}
        localizer={mLocalizer}
        views={views}
      />
    </div>
  )
}
CalViews.storyName = 'views'
