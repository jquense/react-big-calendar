import React from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './dayLayoutAlgorithm.mdx'

const mLocalizer = momentLocalizer(moment)

export default {
  title: 'props',
  component: Calendar,
  argTypes: {
    localizer: { control: { type: null } },
    defaultDate: { control: { type: null } },
    defaultView: { control: { type: null } },
    events: { control: { type: null } },
    dayLayoutAlgorithm: {
      options: ['overlap', 'no-overlap'],
      control: {
        type: 'select',
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

export const DayLayoutAlgorithm = Template.bind({})
DayLayoutAlgorithm.storyName = 'dayLayoutAlgorithm'
DayLayoutAlgorithm.args = {
  defaultDate: new Date(2015, 3, 13),
  defaultView: Views.WEEK,
  events: demoEvents,
  localizer: mLocalizer,
  dayLayoutAlgorithm: 'no-overlap',
}
