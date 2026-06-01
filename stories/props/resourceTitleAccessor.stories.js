import React from 'react'
import { Calendar } from '../../src'
import { resourceAccessorStoryArgs } from './storyDefaults'

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
  }
}

const Template = (args) => (
  <div className="height600">
    <Calendar {...args} />
  </div>
)

export const ResourceTitleAccessor = Template.bind({})
ResourceTitleAccessor.storyName = 'resourceTitleAccessor'
ResourceTitleAccessor.args = resourceAccessorStoryArgs
