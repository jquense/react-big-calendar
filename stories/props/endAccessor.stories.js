import React from 'react'
import { Calendar } from '../../src'
import { accessorStoryArgs } from './storyDefaults'
import mdx from './endAccessor.mdx'

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

export const EndAccessor = Template.bind({})
EndAccessor.storyName = 'endAccessor'
EndAccessor.args = accessorStoryArgs
