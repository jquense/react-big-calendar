import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../../examples/events'
import mdx from './toolbar.mdx'

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

const Template = (args) => <Calendar {...args} />

export const Toolbar = Template.bind({})
Toolbar.storyName = 'toolbar'
Toolbar.args = {
  defaultDate: new Date(2015, 3, 13),
  localizer: mLocalizer,
  events: demoEvents,
  toolbar: true,
}
