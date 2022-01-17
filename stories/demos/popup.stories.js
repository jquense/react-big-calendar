import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import PopupDemo from './exampleCode/popup'

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

export function Example6() {
  return <LuxonDemo localizer={localizer} />
}
Example6.storyName = 'Show more via a popup'
