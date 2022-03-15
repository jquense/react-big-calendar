import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../../src'
import Basic from '../../demos/exampleCode/dnd'

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

export function Example1() {
  return <Basic localizer={localizer} />
}
Example1.storyName = 'Basic Drag n Drop'
