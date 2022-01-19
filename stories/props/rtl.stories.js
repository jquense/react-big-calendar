import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './rtl.mdx'

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
    rtl: 'boolean',
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

// TODO: localize example for Arabic
const Template = (args) => (
  <div className="height600">
    <Calendar {...args} />
  </div>
)

export const RightToLeft = Template.bind({})
RightToLeft.storyName = 'rtl'
RightToLeft.args = {
  defaultDate: new Date(2015, 3, 13),
  events: demoEvents,
  localizer: mLocalizer,
  rtl: true,
}
