import React from 'react'
import { action } from '@storybook/addon-actions'

import {
  events,
  resourceEvents,
  resources,
  Calendar,
  Views,
  DragAndDropCalendar,
} from './helpers'
import customComponents from './resources/customComponents'

export default {
  title: 'Additional Examples/Drag and Drop',
  component: Calendar,
  decorators: [
    (Story) => (
      <div className="height600">
        <Story />
      </div>
    ),
  ],
}

const Template = (args) => (
  <div className="height600">
    <DragAndDropCalendar {...args} />
  </div>
)

export const DraggableAndResizable = Template.bind({})
DraggableAndResizable.storyName = 'draggable and resizable'
DraggableAndResizable.args = {
  defaultDate: new Date(),
  defaultView: Views.WEEK,
  events,
  resizable: true,
  onEventDrop: action('event dropped'),
  onEventResize: action('event resized'),
}

export const CustomStepsAndTimeslots = Template.bind({})
CustomStepsAndTimeslots.storyName =
  'draggable and resizable with non-default steps and timeslots'
CustomStepsAndTimeslots.args = {
  defaultDate: new Date(),
  defaultView: Views.WEEK,
  events,
  resizable: true,
  onEventDrop: action('event dropped'),
  onEventResize: action('event resized'),
  steps: 15,
  timeslots: 4,
}

export const WithMultiDayTimes = Template.bind({})
WithMultiDayTimes.storyName = 'draggable and resizable with showMultiDayTimes'
WithMultiDayTimes.args = {
  defaultDate: new Date(),
  defaultView: Views.WEEK,
  events,
  resizable: true,
  showMultiDayTimes: true,
  onEventDrop: action('event dropped'),
  onEventResize: action('event resized'),
}

export const WithCustomDateCellWrapper = Template.bind({})
WithCustomDateCellWrapper.storyName =
  'draggable and resizable with custom dateCellWrapper'
WithCustomDateCellWrapper.args = {
  defaultDate: new Date(),
  defaultView: Views.WEEK,
  events,
  resizable: true,
  showMultiDayTimes: true,
  onEventDrop: action('event dropped'),
  onEventResize: action('event resized'),
  components: {
    dateCellWrapper: customComponents.dateCellWrapper,
  },
}

export const WithCustomTimeslotWrapper = Template.bind({})
WithCustomTimeslotWrapper.storyName =
  'draggable and resizable with custom timeSlotWrapper'
WithCustomTimeslotWrapper.args = {
  defaultDate: new Date(),
  defaultView: Views.WEEK,
  events,
  resizable: true,
  showMultiDayTimes: true,
  onEventDrop: action('event dropped'),
  onEventResize: action('event resized'),
  components: {
    timeSlotWrapper: customComponents.timeSlotWrapper,
  },
}

export const WithCustomEventWrapper = Template.bind({})
WithCustomEventWrapper.storyName =
  'draggable and resizable with custom eventWrapper'
WithCustomEventWrapper.args = {
  defaultDate: new Date(),
  defaultView: Views.WEEK,
  events,
  resizable: true,
  showMultiDayTimes: true,
  onEventDrop: action('event dropped'),
  onEventResize: action('event resized'),
  components: {
    eventWrapper: customComponents.eventWrapper,
  },
}

export const DraggableMultipleResources = Template.bind({})
DraggableMultipleResources.storyName =
  'draggable and resizable with multiple resource lanes'
DraggableMultipleResources.args = {
  defaultDate: new Date(),
  defaultView: Views.DAY,
  views: [Views.DAY, Views.WEEK, Views.AGENDA],
  events: resourceEvents,
  resources: resources,
  resourceAccessor: 'resourceId',
  resourceIdAccessor: 'id',
  resourceTitleAccessor: 'name',
  resizable: true,
  onEventDrop: action('event dropped'),
  onEventResize: action('event resized'),
}
