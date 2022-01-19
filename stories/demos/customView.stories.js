import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import CustomView from './exampleCode/customView'

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

export function Example9() {
  return <CustomView localizer={localizer} />
}
Example9.storyName = 'Custom Calendar Views'
