import React from 'react'
import demoEvents from '../resources/events'
import mdx from './timeGutterPosition.mdx'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'

const mLocalizer = momentLocalizer(moment)

export default {
  title: 'props',
  component: Calendar,
  argTypes: {
    localizer: { control: { type: null } },
    events: { control: { type: null } },
    defaultDate: { control: { type: null } },
    timeGutterPosition: 'string',
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

export const TimeGutterPosition = Template.bind({})
TimeGutterPosition.storyName = 'timeGutterPosition'
TimeGutterPosition.args = {
  defaultDate: new Date(2015, 3, 13),
  defaultView: Views.WEEK,
  timeGutterPosition: 'both',
  events: demoEvents,
  localizer: mLocalizer,
}

TimeGutterPosition.argTypes = {
  timeGutterPosition: {
    control: { type: 'select', options: ['left', 'right', 'both'] },
  },
}
