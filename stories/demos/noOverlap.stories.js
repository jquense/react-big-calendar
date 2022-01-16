import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import CreateEventWithNoOverlap from './exampleCode/createEventWithNoOverlap'

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

const localizer = momentLocalizer(moment)

export function NoOverlapDemo() {
  return <CreateEventWithNoOverlap localizer={localizer} />
}
NoOverlapDemo.storyName = 'Create events with no-overlap algorithm'
