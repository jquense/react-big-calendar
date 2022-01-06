import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../../examples/events'
import mdx from './getNow.mdx'

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

const getNow = () => new Date(2015, 3, 13)

export const GetNow = Template.bind({})
GetNow.storyName = 'getNow'
GetNow.args = {
  localizer: mLocalizer,
  getNow,
  events: demoEvents,
}
