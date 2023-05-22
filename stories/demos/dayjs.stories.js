import React from 'react'
import dayjs from 'dayjs'
import { Calendar, dayjsLocalizer } from '../../src'
import Dayjs from './exampleCode/dayjs'

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

export function DayjsLocalizer() {
  return <Dayjs localizer={localizer} />
}
