import React from 'react'
import { Calendar } from '../../src'
import { accessorStoryArgs } from './storyDefaults'

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
  }
}

const Template = (args) => (
  <div className="height600">
    <Calendar {...args} />
  </div>
)

export const TitleAccessor = Template.bind({})
TitleAccessor.storyName = 'titleAccessor'
TitleAccessor.args = accessorStoryArgs
