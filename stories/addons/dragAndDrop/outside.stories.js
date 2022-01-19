import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../../src'
import Basic from '../../demos/exampleCode/dndOutsideSource'

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

export function Example3() {
  return <Basic localizer={localizer} />
}
Example3.storyName = 'Drag and Drop (from outside calendar)'
