import React from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './drilldownView.mdx'

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
    drilldownView: {
      control: {
        type: 'select',
        options: ['day', 'agenda'],
        defaultValue: Views.DAY,
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

export const DrilldownView = Template.bind({})
DrilldownView.storyName = 'drilldownView'
DrilldownView.args = {
  defaultDate: new Date(2015, 3, 1),
  drilldownView: Views.AGENDA,
  events: demoEvents,
  localizer: mLocalizer,
}
