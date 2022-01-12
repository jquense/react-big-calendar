import React, { useCallback } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './getDrilldownView.mdx'

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

export function CalDrilldownView() {
  const getDrilldownView = useCallback(
    (targetDate, currentViewName, configuredViewNames) => {
      if (currentViewName === 'month' && configuredViewNames.includes('week'))
        return 'week'

      return null
    },
    []
  )

  return (
    <Calendar
      defaultDate={new Date(2015, 3, 1)}
      events={demoEvents}
      getDrilldownView={getDrilldownView}
      localizer={mLocalizer}
    />
  )
}
CalDrilldownView.storyName = 'getDrilldownView'
