import React from 'react'
import { action } from '@storybook/addon-actions'

import demoEvents from './resources/events'
import { Calendar } from '../src'

import {
  events,
  Calendar as BaseCalendar,
  Views,
  resourceEvents,
  resources,
} from './helpers'

import createEvents from './helpers/createEvents'
import customComponents from './resources/customComponents'

export default {
  title: 'Additional Examples',
  component: Calendar,
  decorators: [
    (Story) => (
      <div className="height600">
        <Story />
      </div>
    ),
  ],
}

const Template = (args) => <BaseCalendar {...args} />

export const ComplexDayViewLayout = Template.bind({})
ComplexDayViewLayout.storyName = 'complex day view layout'
ComplexDayViewLayout.args = {
  defaultView: Views.DAY,
  defaultDate: new Date(),
  events: createEvents(1),
  step: 30,
}

const TimeGutter = () => <p>Custom gutter text</p>

export const CustomTimeGutterHeader = Template.bind({})
CustomTimeGutterHeader.storyName = 'custom TimeGutter header'
CustomTimeGutterHeader.args = {
  popup: true,
  events: demoEvents,
  onSelectEvent: action('event selected'),
  defaultDate: new Date(2015, 3, 1),
  defaultView: Views.WEEK,
  views: [Views.WEEK, Views.DAY],
  components: {
    timeGutterHeader: TimeGutter,
  },
}

export const CustomTimeGutterWrapper = Template.bind({})
CustomTimeGutterWrapper.storyName = 'custom TimeGutter wrapper'
CustomTimeGutterWrapper.args = {
  popup: true,
  events: demoEvents,
  onSelectEvent: action('event selected'),
  defaultDate: new Date(2015, 3, 1),
  defaultView: Views.WEEK,
  views: [Views.WEEK, Views.DAY],
  components: {
    timeGutterWrapper: customComponents.timeGutterWrapper,
  },
}

export const CustomDateCellWrapper = Template.bind({})
CustomDateCellWrapper.storyName = 'add custom dateCellWrapper'
CustomDateCellWrapper.args = {
  defaultView: Views.MONTH,
  events,
  components: {
    dateCellWrapper: customComponents.dateCellWrapper,
  },
}

export const CustomTimeSlotWrapper = Template.bind({})
CustomTimeSlotWrapper.storyName = 'add custom timeSlotWrapper'
CustomTimeSlotWrapper.args = {
  defaultView: Views.DAY,
  events,
  components: {
    timeSlotWrapper: customComponents.timeSlotWrapper,
  },
}

export const CustomEventWrapper = Template.bind({})
CustomEventWrapper.storyName = 'add custom eventWrapper'
CustomEventWrapper.args = {
  defaultView: Views.DAY,
  events,
  components: {
    eventWrapper: customComponents.eventWrapper,
  },
}

export const CustomNoAgendaEventsLabel = Template.bind({})
CustomNoAgendaEventsLabel.storyName = 'add custom no agenda events label'
CustomNoAgendaEventsLabel.args = {
  defaultView: Views.AGENDA,
  events,
  messages: {
    noEventsInRange: 'There are no special events in this range [test message]',
  },
}

export const CustomDayColumnWrapper = Template.bind({})
CustomDayColumnWrapper.storyName = 'add custom dayColumnWrapper'
CustomDayColumnWrapper.args = {
  defaultView: Views.DAY,
  events: resourceEvents,
  resources: resources,
  resourceAccessor: 'resourceId',
  resourceIdAccessor: 'id',
  resourceTitleAccessor: 'name',
  components: {
    dayColumnWrapper: customComponents.dayColumnWrapper,
  },
}
CustomDayColumnWrapper.parameters = {
  docs: {
    description: {
      story:
        'The custom DayColumnWrapper allows you to add your own custom logic when rendering a Day Column.',
    },
  },
}
