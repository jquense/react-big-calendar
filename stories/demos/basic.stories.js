import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import Basic from './exampleCode/basic'

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

export function BasicDemo() {
  return <Basic localizer={localizer} />
}
