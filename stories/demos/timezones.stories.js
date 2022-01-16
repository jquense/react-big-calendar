import React from 'react'
import { Calendar } from '../../src'
import TimezoneCalendar from './exampleCode/timezones'

export default {
  title: 'Demos',
  component: Calendar,
  parameters: {
    docs: {
      page: null,
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

export function Timezones() {
  return <TimezoneCalendar />
}
