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

const resources = [
  { resourceId: 1, resourceTitle: 'Board room' },
  { resourceId: 2, resourceTitle: 'Training room' },
  { resourceId: 3, resourceTitle: 'Meeting room 1' },
  { resourceId: 4, resourceTitle: 'Meeting room 2' },
]

let eventId = 0
const events = Array.from({ length: 20 }, (_, k) => k).flatMap((i) => {
  const currentResource = resources[i % resources.length]
  const dayDiff = i % 7

  return Array.from({ length: 5 }, (_, j) => ({
    id: eventId++,
    title: `Event ${i + j} _ ${currentResource.resourceTitle}`,
    start: new Date(2018, 0, 29 + dayDiff, 9 + (j % 4), 0, 0),
    end: new Date(2018, 0, 29 + dayDiff, 11 + (j % 4), 0, 0),
    resourceId: currentResource.resourceId,
  }))
})
export const ResourceGroupingLayout = Template.bind({})
ResourceGroupingLayout.storyName = 'resourceGroupingLayout'
ResourceGroupingLayout.args = {
  ...resourceAccessorStoryArgs,
  defaultDate: new Date(2018, 0, 29),
  resourceGroupingLayout: true,
  resourceIdAccessor: 'resourceId',
  resourceTitleAccessor: 'resourceTitle',
  resources,
  events,
}
