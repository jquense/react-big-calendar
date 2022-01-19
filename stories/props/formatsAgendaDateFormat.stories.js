import React, { useMemo } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './formatsAgendaDateFormat.mdx'

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

export function FormatsAgendDateFormat() {
  const { defaultDate, formats, views } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 13),
      formats: {
        agendaDateFormat: (date, culture, localizer) =>
          localizer.format(date, 'dddd MMMM Do', culture),
      },
      views: [Views.WEEK, Views.DAY, Views.AGENDA],
    }),
    []
  )

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        defaultView={Views.AGENDA}
        events={demoEvents}
        formats={formats}
        localizer={mLocalizer}
        views={views}
      />
    </div>
  )
}
FormatsAgendDateFormat.storyName = 'formats.agendaDateFormat'
