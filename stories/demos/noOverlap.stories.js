import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import CreateEventWithNoOverlap from './exampleCode/createEventWithNoOverlap'

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

export function Example3() {
  return <CreateEventWithNoOverlap localizer={localizer} />
}
Example3.storyName = 'Create events with no-overlap algorithm'
