import React from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './max.mdx'

const mLocalizer = momentLocalizer(moment)

export default {
  title: 'props',
  component: Calendar,
  argTypes: {
    localizer: { control: { type: null } },
    defaultDate: { control: { type: null } },
    defaultView: { control: { type: null } },
    events: { control: { type: null } },
    max: { control: { type: 'date' } },
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

export const Max = Template.bind({})
Max.storyName = 'max'
Max.args = {
  defaultDate: new Date(2015, 3, 13),
  defaultView: Views.WEEK,
  events: demoEvents,
  localizer: mLocalizer,
  max: new Date(1972, 0, 1, 20, 59, 59),
}
