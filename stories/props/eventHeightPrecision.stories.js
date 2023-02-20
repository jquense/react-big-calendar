import React from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './eventHeightPrecision.mdx'

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

export const EventHeightPrecision = Template.bind({})
EventHeightPrecision.storyName = 'eventHeightPrecision'
EventHeightPrecision.args = {
  defaultDate: new Date(2015, 3, 15),
  defaultView: Views.DAY,
  events: demoEvents,
  localizer: mLocalizer,
  step: 1,
  timeslots: 5,
  slotGroupPropGetter: () => ({ style: { minHeight: 240 } }),
  scrollToTime: new Date(2015, 3, 15, 4, 55),
}
