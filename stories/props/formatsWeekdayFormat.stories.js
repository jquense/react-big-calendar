import React, { useMemo } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'

const mLocalizer = momentLocalizer(moment)

export default {
  title: 'props',
  component: Calendar
}

export function FormatsWeekdayFormat() {
  const { defaultDate, formats } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 1),
      formats: {
        weekdayFormat: (date, culture, localizer) =>
          localizer.format(date, 'dddd', culture),
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
FormatsWeekdayFormat.storyName = 'formats.weekdayFormat'
