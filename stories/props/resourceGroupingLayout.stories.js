import React from 'react'
import { Calendar } from '../../src'
import { resourceAccessorStoryArgs } from './storyDefaults'
import mdx from './resourceGroupingLayout.mdx'

export default {
  title: 'props',
  component: Calendar,
  argTypes: {
    localizer: { control: { type: null } },
    events: { control: { type: null } },
    defaultDate: { control: { type: null } },
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

export const ResourceGroupingLayout = Template.bind({})
ResourceGroupingLayout.storyName = 'resourceGroupingLayout'
ResourceGroupingLayout.args = {
  ...resourceAccessorStoryArgs,
  resourceGroupingLayout: true,
}
