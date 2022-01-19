import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './popupOffset.mdx'

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
    popup: 'boolean',
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

export const PopupOffset = Template.bind({})
PopupOffset.storyName = 'popupOffset'
PopupOffset.args = {
  defaultDate: new Date(2015, 3, 13),
  events: demoEvents,
  localizer: mLocalizer,
  popup: true,
  popupOffset: { x: 30, y: 20 },
}
