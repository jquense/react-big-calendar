import React from 'react'
import { Calendar } from '../../src'
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

export function LuxonLocalizer() {
  return <Luxon />
}
