import React from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import resourceData from '../helpers/resourceEvents'
import mdx from './resources.mdx'

const { events: resourceEvents, list: resources } = resourceData

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
  decorators: [
    (Story) => (
      <div style={{ height: 600 }}>
        <Story />
      </div>
    ),
  ],
}

const Template = (args) => <Calendar {...args} />

export const Resources = Template.bind({})
Resources.storyName = 'resources'
Resources.args = {
  defaultDate: new Date(2015, 3, 4),
  defaultView: Views.DAY,
  events: resourceEvents,
  localizer: mLocalizer,
  resources,
}
