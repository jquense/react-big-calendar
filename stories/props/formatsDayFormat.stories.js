import React, { useMemo } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './formatsDayFormat.mdx'

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

export function FormatsDayFormat() {
  const formats = useMemo(
    () => ({
      dayFormat: (date, culture, localizer) =>
        localizer.format(date, 'ddd MM/DD', culture),
    }),
    []
  )

  return (
    <Calendar
      defaultDate={new Date(2015, 3, 13)}
      defaultView={Views.WEEK}
      events={demoEvents}
      formats={formats}
      localizer={mLocalizer}
      views={[Views.WEEK, Views.DAY]}
    />
  )
}
FormatsDayFormat.storyName = 'formats.dayFormat'
