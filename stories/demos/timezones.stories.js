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
}

export function Example4() {
  return <TimezoneCalendar />
}
Example4.storyName = 'Timezones'
