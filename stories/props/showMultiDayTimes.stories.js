import React from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import mdx from './showMultiDayTimes.mdx'

const mLocalizer = momentLocalizer(moment)

export default {
  title: 'props',
  component: Calendar,
  argTypes: {
    localizer: { control: { type: null } },
    defaultDate: { control: { type: null } },
    defaultView: { control: { type: null } },
    max: { control: { type: null } },
    showMultiDayTimes: 'boolean',
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

export const ShowMultiDayTimes = Template.bind({})
ShowMultiDayTimes.storyName = 'showMultiDayTimes'
ShowMultiDayTimes.args = {
  defaultDate: new Date(2016, 11, 4),
  defaultView: Views.WEEK,
  events: [
    {
      title: 'start of the week',
      start: new Date(2016, 11, 4, 15),
      end: new Date(2016, 11, 5, 3),
    },
    {
      title: 'single day longer than max',
      start: new Date(2016, 11, 4, 15),
      end: new Date(2016, 11, 4, 23, 30),
    },
    {
      title: 'end of the week',
      start: new Date(2016, 11, 3),
      end: new Date(2016, 11, 3),
    },
    {
      title: 'middle',
      start: new Date(2016, 11, 6),
      end: new Date(2016, 11, 6),
    },
  ],
  localizer: mLocalizer,
  max: moment().endOf('day').add(-1, 'hours').toDate(),
  showMultiDayTimes: true,
}
