import React, { useMemo } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './formatsTimeGutterFormat.mdx'

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

export function FormatsTimeGutterFormat() {
  const formats = useMemo(
    () => ({
      timeGutterFormat: (date, culture, localizer) =>
        localizer.format(date, 'hh:mm a', culture),
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
FormatsTimeGutterFormat.storyName = 'formats.timeGutterFormat'
