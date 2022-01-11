import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../../examples/events'
import mdx from './localizer.mdx'

export default {
  title: 'props',
  component: Calendar,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: 800 }}>
        <Story />
      </div>
    ),
  ],
}

export function Localizer() {
  // in many cases this will be outside of your render function, to prevent
  // unnecessary rerender. Best practice, when needed inside the render function,
  // would be to wrap in a `useMemo`
  const localizer = momentLocalizer(moment)
  return (
    <Calendar
      defaultDate={new Date(2015, 3, 13)}
      events={demoEvents}
      localizer={localizer}
    />
  )
}
Localizer.storyName = 'localizer *'
