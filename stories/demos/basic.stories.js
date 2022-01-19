import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import Basic from './exampleCode/basic'

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

export function Example1() {
  return <Basic localizer={localizer} />
}
Example1.storyName = 'Basic Demo'
