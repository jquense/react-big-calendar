import React from 'react'
import { Calendar } from '../../src'
import TimezoneCalendar from './exampleCode/timezones'

export default {
  title: 'Examples',
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

export function Example4() {
  return <TimezoneCalendar />
}
Example4.storyName = 'Timezones'
