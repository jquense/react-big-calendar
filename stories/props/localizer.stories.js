import React, { useMemo } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './localizer.mdx'

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
      <div style={{ height: 800 }}>
        <Story />
      </div>
    ),
  ],
}

export function Localizer() {
  const localizer = useMemo(() => momentLocalizer(moment), [])

  return (
    <div className="height600">
      <Calendar
        defaultDate={new Date(2015, 3, 13)}
        events={demoEvents}
        localizer={localizer}
      />
    </div>
  )
}
Localizer.storyName = 'localizer *'
