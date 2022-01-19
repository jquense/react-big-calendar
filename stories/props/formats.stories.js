import React, { useMemo } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './formats.mdx'

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

export function Formats() {
  const { defaultDate, formats } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 1),
      formats: {
        // the 'date' on each day cell of the 'month' view
        dateFormat: 'D',
        // the day of the week header in the 'month' view
        weekdayFormat: (date, culture, localizer) =>
          localizer.format(date, 'dddd', culture),
        // the day header in the 'week' and 'day' (Time Grid) views
        dayFormat: (date, culture, localizer) =>
          localizer.format(date, 'dddd Do', culture),
        // the time in the gutter in the Time Grid views
        timeGutterFormat: (date, culture, localizer) =>
          localizer.format(date, 'hh:mm a', culture),
      },
    }),
    []
  )

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        events={demoEvents}
        formats={formats}
        localizer={mLocalizer}
      />
    </div>
  )
}
Formats.storyName = 'formats'
