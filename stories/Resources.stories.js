import React from 'react'
import { Calendar } from '../src'

import { DragableCalendar } from './helpers'
import resources from './helpers/resourceEvents'

export default {
  title: 'Big Calendar/Resources',
  component: Calendar,
}

const Template = (args) => <DragableCalendar {...args} />

export const Demo = Template.bind({})
Demo.storyName = 'demo'
Demo.args = {
  defaultDate: new Date(2015, 3, 1),
  events: resources.events,
  resources: resources.list,
}
