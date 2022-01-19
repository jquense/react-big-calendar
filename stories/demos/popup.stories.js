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
}

const localizer = momentLocalizer(moment)

export function Example6() {
  return <PopupDemo localizer={localizer} />
}
Example6.storyName = 'Show more via a popup'
