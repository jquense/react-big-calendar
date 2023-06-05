import React from 'react'
import { DateTime } from 'luxon'
import { Calendar, luxonLocalizer } from '../../src'
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

const localizer = luxonLocalizer(DateTime)

export function LuxonLocalizer() {
  return <Luxon localizer={localizer} />
}
