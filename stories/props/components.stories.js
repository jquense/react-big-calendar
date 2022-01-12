import React, { useMemo } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './components.mdx'
import CustomToolbar from './customComponents/CustomToolbar.component'
import '../resources/customToolbar.scss'

const mLocalizer = momentLocalizer(moment)

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
      <div style={{ height: 600 }}>
        <Story />
      </div>
    ),
  ],
}

export function Components() {
  const components = useMemo(
    () => ({
      toolbar: CustomToolbar,
    }),
    []
  )

  return (
    <Calendar
      defaultDate={new Date(2015, 3, 13)}
      events={demoEvents}
      localizer={mLocalizer}
      components={components}
    />
  )
}
Components.storyName = 'components'
