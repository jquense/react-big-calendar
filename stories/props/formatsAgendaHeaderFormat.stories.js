import React, { useMemo } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './formatsAgendaHeaderFormat.mdx'

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

export function FormatsAgendHeaderFormat() {
  const formats = useMemo(
    () => ({
      agendaHeaderFormat: ({ start, end }, culture, localizer) =>
        localizer.format(start, 'dddd MMMM Do, YYYY', culture) +
        ' - ' +
        localizer.format(end, 'dddd MMMM Do, YYYY', culture),
    }),
    []
  )

  return (
    <Calendar
      defaultDate={new Date(2015, 3, 13)}
      defaultView={Views.AGENDA}
      events={demoEvents}
      formats={formats}
      localizer={mLocalizer}
      views={[Views.WEEK, Views.DAY, Views.AGENDA]}
    />
  )
}
FormatsAgendHeaderFormat.storyName = 'formats.agendaHeaderFormat'
