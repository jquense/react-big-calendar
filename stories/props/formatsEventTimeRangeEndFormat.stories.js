import React, { useMemo } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './formatsEventTimeRangeEndFormat.mdx'

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

export function FormatsEventTimeRangeEndFormat() {
  const { defaultDate, formats } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 13),
      formats: {
        eventTimeRangeEndFormat: (date, culture, localizer) =>
          ' << ' + localizer.format(date, 'hh:mm A', culture),
      },
    }),
    []
  )

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        events={demoEvents}
        formats={formats}
        localizer={mLocalizer}
        showMultiDayTimes
      />
    </div>
  )
}
FormatsEventTimeRangeEndFormat.storyName = 'formats.eventTimeRangeEndFormat'
