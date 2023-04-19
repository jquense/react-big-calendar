import React from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import allDayEvents from '../resources/allDayEvents'
import mdx from './allDayMaxRows.mdx'

const mLocalizer = momentLocalizer(moment)

export default {
  title: 'props',
  component: Calendar,
  argTypes: {
    localizer: { control: { type: null } },
    events: { control: { type: null } },
    defaultDate: { control: { type: null } },
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

export const AllDayMaxRows = Template.bind({})
AllDayMaxRows.storyName = 'allDayMaxRows'
AllDayMaxRows.args = {
  defaultDate: new Date(2015, 3, 1),
  defaultView: Views.WEEK,
  events: allDayEvents,
  localizer: mLocalizer,
  allDayMaxRows: 2,
  popup: true,
}
