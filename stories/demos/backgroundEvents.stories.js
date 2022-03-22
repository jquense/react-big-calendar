import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import BackgroundCalendar from './exampleCode/backgroundEvents'

export default {
  title: 'Examples',
  component: Calendar,
  parameters: {
    docs: {
      page: null,
    },
  },
}

const localizer = momentLocalizer(moment)

export function Example10() {
  return <BackgroundCalendar localizer={localizer} />
}
Example10.storyName = 'Background Events'
