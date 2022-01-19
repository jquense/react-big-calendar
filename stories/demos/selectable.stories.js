import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import Selectable from './exampleCode/selectable'

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

export function Example2() {
  return <Selectable localizer={localizer} />
}
Example2.storyName = 'Create Events'
