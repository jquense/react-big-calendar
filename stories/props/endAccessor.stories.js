import React from 'react'
import { Calendar } from '../../src'
import { accessorStoryArgs } from './storyDefaults'
import mdx from './endAccessor.mdx'

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

export const EndAccessor = Template.bind({})
EndAccessor.storyName = 'endAccessor'
EndAccessor.args = accessorStoryArgs
