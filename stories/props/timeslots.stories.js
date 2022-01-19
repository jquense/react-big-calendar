import React from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './timeslots.mdx'

const mLocalizer = momentLocalizer(moment)

export default {
  title: 'props',
  component: Calendar,
  argTypes: {
    localizer: { control: { type: null } },
    events: { control: { type: null } },
    defaultDate: {
      control: {
        type: null,
      },
    },
    defaultView: {
      control: {
        type: null,
      },
    },
    step: 'number',
    timeslots: 'number',
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

const Template = (args) => (
  <div className="height600">
    <Calendar {...args} />
  </div>
)

export const Timeslots = Template.bind({})
Timeslots.storyName = 'timeslots'
Timeslots.args = {
  defaultDate: new Date(2015, 3, 13),
  defaultView: Views.WEEK,
  events: demoEvents,
  localizer: mLocalizer,
  step: 15,
  timeslots: 4,
}
