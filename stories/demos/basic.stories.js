import React from 'react'
import moment from 'moment'
import { Calendar, dayjsLocalizer, momentLocalizer } from '../../src'
import Basic from './exampleCode/basic'
import dayjs from 'dayjs'

export default {
  title: 'Examples',
  component: Calendar,
  parameters: {
    docs: {
      page: null,
    },
  },
}

const localizer = dayjsLocalizer(dayjs)

export function Example1() {
  return <Basic localizer={localizer} />
}
Example1.storyName = 'Basic Demo'
