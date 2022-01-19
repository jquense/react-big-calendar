import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './showAllEvents.mdx'

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
    showAllEvents: 'boolean',
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

export const ShowAllEvents = Template.bind({})
ShowAllEvents.storyName = 'showAllEvents'
ShowAllEvents.args = {
  defaultDate: new Date(2015, 3, 13),
  events: demoEvents,
  localizer: mLocalizer,
  showAllEvents: true,
}
