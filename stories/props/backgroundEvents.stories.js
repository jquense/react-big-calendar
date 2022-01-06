import React from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import { backgroundEvents, events } from '../helpers'
import mdx from './backgroundEvents.mdx'

const mLocalizer = momentLocalizer(moment)

export default {
  title: 'props',
  component: Calendar,
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

export const BackGroundEvents = Template.bind({})
BackGroundEvents.storyName = 'backgroundEvents'
BackGroundEvents.args = {
  defaultView: Views.WEEK,
  localizer: mLocalizer,
  events,
  backgroundEvents,
}
