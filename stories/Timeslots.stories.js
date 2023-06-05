import React from 'react'
import { action } from '@storybook/addon-actions'
import { Calendar } from '../src'

import { Calendar as BaseCalendar, Views, events } from './helpers'

export default {
  title: 'Additional Examples/Timeslots',
  component: Calendar,
  decorators: [
    (Story) => (
      <div className="height600">
        <Story />
      </div>
    ),
  ],
}

const Template = (args) => <BaseCalendar {...args} />

export const SelectableStep15x4Slot = Template.bind({})
SelectableStep15x4Slot.storyName = 'selectable, step 15, 4 timeslots'
SelectableStep15x4Slot.args = {
  defaultView: Views.WEEK,
  defaultDate: new Date(),
  selectable: true,
  timeslots: 4,
  step: 15,
  events,
  onSelectEvent: action('event selected'),
  onSelectSlot: action('slot selected'),
}

export const SelectableStep10x6Slot = Template.bind({})
SelectableStep10x6Slot.storyName = 'selectable, step 10, 6 timeslots'
SelectableStep10x6Slot.args = {
  defaultView: Views.WEEK,
  defaultDate: new Date(),
  selectable: true,
  timeslots: 6,
  step: 10,
  events,
  onSelectEvent: action('event selected'),
  onSelectSlot: action('slot selected'),
}

export const SelectableStep5x6Slot = Template.bind({})
SelectableStep5x6Slot.storyName = 'selectable, step 5, 6 timeslots'
SelectableStep5x6Slot.args = {
  defaultView: Views.WEEK,
  defaultDate: new Date(),
  selectable: true,
  timeslots: 6,
  step: 5,
  events,
  onSelectEvent: action('event selected'),
  onSelectSlot: action('slot selected'),
}

export const Selectable3Slot = Template.bind({})
Selectable3Slot.storyName = 'selectable, 3 timeslots'
Selectable3Slot.args = {
  defaultView: Views.WEEK,
  defaultDate: new Date(),
  selectable: true,
  timeslots: 3,
  events,
  onSelectEvent: action('event selected'),
  onSelectSlot: action('slot selected'),
}
