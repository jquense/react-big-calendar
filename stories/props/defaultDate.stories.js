import React from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './defaultDate.mdx'

const mLocalizer = momentLocalizer(moment)

export default {
  title: 'props',
  component: Calendar,
  argTypes: {
    localizer: { control: { type: null } },
    events: { control: { type: null } },
    defaultView: {
      control: {
        type: null,
      },
    },
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

export const DefaultDate = Template.bind({})
DefaultDate.storyName = 'defaultDate'
DefaultDate.args = {
  defaultDate: new Date(2015, 3, 13),
  defaultView: Views.DAY,
  events: demoEvents,
  localizer: mLocalizer,
}
