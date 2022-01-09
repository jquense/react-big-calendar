import React from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../../examples/events'
import mdx from './timeslots.mdx'

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

export const Timeslots = Template.bind({})
Timeslots.storyName = 'timeslots'
Timeslots.args = {
  defaultDate: new Date(2015, 3, 13),
  localizer: mLocalizer,
  events: demoEvents,
  step: 15,
  timeslots: 4,
  defaultView: Views.WEEK,
}
