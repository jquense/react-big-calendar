import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './getNow.mdx'

const mLocalizer = momentLocalizer(moment)

export default {
  title: 'props',
  component: Calendar,
  argTypes: {
    localizer: { control: { type: null } },
    events: { control: { type: null } },
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

const getNow = () => new Date(2015, 3, 13)

export const GetNow = Template.bind({})
GetNow.storyName = 'getNow'
GetNow.args = {
  events: demoEvents,
  getNow,
  localizer: mLocalizer,
}
