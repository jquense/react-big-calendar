import React, { useMemo } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './formatsDayRangeHeaderFormat.mdx'

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

export function FormatsDayRangeHeaderFormat() {
  const { defaultDate, formats, views } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 13),
      formats: {
        dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
          localizer.format(start, 'ddd D', culture) +
          ' - ' +
          localizer.format(end, 'ddd D', culture),
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
FormatsDayRangeHeaderFormat.storyName = 'formats.dayRangeHeaderFormat'
