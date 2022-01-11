import React from 'react'
import { Calendar } from '../../src'
import { accessorStoryArgs } from './storyDefaults'
import mdx from './tooltipAccessor.mdx'

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
  decorators: [
    (Story) => (
      <div style={{ height: 600 }}>
        <Story />
      </div>
    ),
  ],
}

const Template = (args) => <Calendar {...args} />

export const TooltipAccessor = Template.bind({})
TooltipAccessor.storyName = 'tooltipAccessor'
TooltipAccessor.args = accessorStoryArgs
