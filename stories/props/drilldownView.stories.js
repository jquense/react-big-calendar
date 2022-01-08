import React from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../../examples/events'
import mdx from './drilldownView.mdx'

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

export function DrilldownView() {
  return (
    <Calendar
      localizer={mLocalizer}
      defaultDate={new Date(2015, 3, 1)}
      events={demoEvents}
      drilldownView={Views.AGENDA}
    />
  )
}
DrilldownView.storyName = 'drilldownView'
