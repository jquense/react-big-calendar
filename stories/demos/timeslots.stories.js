import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import Timeslots from './exampleCode/timeslots'

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

export function Example7() {
  return <Timeslots localizer={localizer} />
}
Example7.storyName = 'Timeslots'
