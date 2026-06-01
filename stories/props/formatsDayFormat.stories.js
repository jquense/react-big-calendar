import React, { useMemo } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'

const mLocalizer = momentLocalizer(moment)

export default {
  title: 'props',
  component: Calendar
}

export function FormatsDayFormat() {
  const { defaultDate, formats, views } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 13),
      formats: {
        dayFormat: (date, culture, localizer) =>
          localizer.format(date, 'ddd MM/DD', culture),
      },
      views: [Views.WEEK, Views.DAY],
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
        views={views}
      />
    </div>
  )
}
FormatsDayFormat.storyName = 'formats.dayFormat'
