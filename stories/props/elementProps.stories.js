import React from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './elementProps.mdx'
import '../resources/propGetter.scss'

const mLocalizer = momentLocalizer(moment)

export default {
  title: 'props',
  component: Calendar,
  argTypes: {
    localizer: { control: { type: null } },
    events: { control: { type: null } },
  },
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

const Template = (args) => <Calendar {...args} />

export const ElementProps = Template.bind({})
ElementProps.storyName = 'elementProps'
ElementProps.args = {
  defaultDate: new Date(2015, 3, 13),
  elementProps: { id: 'my_scheduler' },
  events: demoEvents,
  localizer: mLocalizer,
}
