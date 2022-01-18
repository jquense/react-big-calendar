import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import Resource from './exampleCode/resource'

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

const localizer = momentLocalizer(moment)

export function Example11() {
  return <Resource localizer={localizer} />
}
Example11.storyName = 'Resource Scheduling'
