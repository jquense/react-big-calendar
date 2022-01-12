import React, { useMemo } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './formatsDateFormat.mdx'

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

export function FormatsDateFormat() {
  const formats = useMemo(
    () => ({
      dateFormat: (date, culture, localizer) =>
        localizer.format(date, 'D', culture),
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
FormatsDateFormat.storyName = 'formats.dateFormat'
