import React from 'react'
import { Calendar } from '../../src'
import { resourceAccessorStoryArgs } from './storyDefaults'
import mdx from './resourceTitleAccessor.mdx'

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

export const ResourceTitleAccessor = Template.bind({})
ResourceTitleAccessor.storyName = 'resourceTitleAccessor'
ResourceTitleAccessor.args = resourceAccessorStoryArgs
