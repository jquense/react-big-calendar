import React, { useMemo } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './formatsDayHeaderFormat.mdx'

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

export function FormatsDayHeaderFormat() {
  const formats = useMemo(
    () => ({
      dayHeaderFormat: (date, culture, localizer) =>
        localizer.format(date, 'dddd MMMM Do', culture),
    }),
    []
  )

  return (
    <Calendar
      defaultDate={new Date(2015, 3, 13)}
      defaultView={Views.DAY}
      events={demoEvents}
      formats={formats}
      localizer={mLocalizer}
      views={[Views.WEEK, Views.DAY]}
    />
  )
}
FormatsDayHeaderFormat.storyName = 'formats.dayHeaderFormat'
