import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import Rendering from './exampleCode/rendering'

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

export function Example8() {
  return <Rendering localizer={localizer} />
}
Example8.storyName = 'Customized Component Rendering'
