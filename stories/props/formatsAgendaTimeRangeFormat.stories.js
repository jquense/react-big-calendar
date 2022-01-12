import React, { useMemo } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './formatsAgendaTimeRangeFormat.mdx'

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

export function FormatsAgendaTimeRangeFormat() {
  const formats = useMemo(
    () => ({
      agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
        localizer.format(start, 'hh:mm A', culture) +
        ' - ' +
        localizer.format(end, 'hh:mm A', culture),
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
FormatsAgendaTimeRangeFormat.storyName = 'formats.agendaTimeRangeFormat'
