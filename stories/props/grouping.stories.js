import React from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import resourceData from '../resources/groupingEvents'
import mdx from './grouping.mdx'

const { events: resourceEvents, grouping } = resourceData

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
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

const Template = (args) => (
  <div
    className="height600"
    style={{
      height: 3000,
    }}
  >
    <Calendar {...args} />
  </div>
)

export const Grouping = Template.bind({})
Grouping.storyName = 'grouping'
Grouping.args = {
  defaultDate: new Date(2015, 3, 4),
  defaultView: Views.WEEK,
  events: resourceEvents,
  localizer: mLocalizer,
  grouping,
}
