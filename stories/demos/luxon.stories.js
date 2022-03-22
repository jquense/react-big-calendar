import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import Luxon from './exampleCode/luxon'

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

export function LuxonLocalizer() {
  return <Luxon localizer={localizer} />
}
