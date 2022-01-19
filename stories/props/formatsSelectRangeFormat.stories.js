import React, { useMemo } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './formatsSelectRangeFormat.mdx'

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

export function FormatsSelectRangeFormat() {
  const { defaultDate, formats, views } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 13),
      formats: {
        selectRangeFormat: ({ start, end }, culture, localizer) =>
          localizer.format(start, 'hh:mm a', culture) +
          ' - ' +
          localizer.format(end, 'hh:mm a', culture),
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
        selectable
        views={views}
      />
    </div>
  )
}
FormatsSelectRangeFormat.storyName = 'formats.selectRangeFormat'
