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
  decorators: [
    (Story) => (
      <div style={{ height: 600 }}>
        <Story />
      </div>
    ),
  ],
}

export function FormatsSelectRangeFormat() {
  const formats = useMemo(
    () => ({
      selectRangeFormat: ({ start, end }, culture, localizer) =>
        localizer.format(start, 'hh:mm a', culture) +
        ' - ' +
        localizer.format(end, 'hh:mm a', culture),
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
      selectable
      views={[Views.WEEK, Views.DAY]}
    />
  )
}
FormatsSelectRangeFormat.storyName = 'formats.selectRangeFormat'
