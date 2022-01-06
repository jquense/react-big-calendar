import React from 'react'
import { Calendar } from '../../src'
import { accessorStoryArgs } from './storyDefaults'
import mdx from './allDayAccessor.mdx'

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

export const AllDayAccessor = Template.bind({})
AllDayAccessor.storyName = 'allDayAccessor'
AllDayAccessor.args = accessorStoryArgs
