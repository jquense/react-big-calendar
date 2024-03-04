import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import AfterMidnight from './exampleCode/afterMidnight'

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

export function AfterMidnightStory() {
  return <AfterMidnight localizer={localizer} />
}
AfterMidnightStory.storyName = 'End day after midnight'
