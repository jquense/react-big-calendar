import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../../examples/events'
import mdx from './rtl.mdx'

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

// TODO: localize example for Arabic
const Template = (args) => <Calendar {...args} />

export const RightToLeft = Template.bind({})
RightToLeft.storyName = 'rtl'
RightToLeft.args = {
  defaultDate: new Date(2015, 3, 13),
  localizer: mLocalizer,
  events: demoEvents,
  rtl: true,
}
