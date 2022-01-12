import React, { useMemo } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './formatsWeekdayFormat.mdx'

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

export function FormatsWeekdayFormat() {
  const formats = useMemo(
    () => ({
      weekdayFormat: (date, culture, localizer) =>
        localizer.format(date, 'dddd', culture),
    }),
    []
  )

  return (
    <Calendar
      defaultDate={new Date(2015, 3, 1)}
      events={demoEvents}
      formats={formats}
      localizer={mLocalizer}
    />
  )
}
FormatsWeekdayFormat.storyName = 'formats.weekdayFormat'
