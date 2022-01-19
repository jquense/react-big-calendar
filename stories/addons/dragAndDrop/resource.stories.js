import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../../src'
import DnDResource from '../../demos/exampleCode/dndresource'

export default {
  title: 'Addons/Drag and Drop',
  component: Calendar,
  parameters: {
    docs: {
      page: null,
    },
  },
}

const localizer = momentLocalizer(moment)

export function Example2() {
  return <DnDResource localizer={localizer} />
}
Example2.storyName = 'Resource Drag and Drop'
