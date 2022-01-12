import React from 'react'
import { action } from '@storybook/addon-actions'

import moment from 'moment'
import demoEvents from './resources/events'
import { Calendar } from '../src'

import {
  events,
  backgroundEvents,
  Calendar as BaseCalendar,
  Views,
} from './helpers'
import createEvents from './helpers/createEvents'
import customComponents from './helpers/customComponents'

export default {
  title: 'Big Calendar',
  component: Calendar,
}

const Template = (args) => <BaseCalendar {...args} />

export const Demo = Template.bind({})
Demo.storyName = 'demo'
Demo.args = {
  popup: true,
  popupOffset: { x: -10, y: -20 },
  events: demoEvents,
  onSelectEvent: action('event selected'),
  defaultDate: new Date(2015, 3, 1),
}

export const DefaultView = Template.bind({})
DefaultView.storyName = 'default view'
DefaultView.args = {
  defaultView: Views.WEEK,
  min: moment('12:00am', 'h:mma').toDate(),
  max: moment('11:59pm', 'h:mma').toDate(),
  events,
  onSelectEvent: action('event selected'),
  defaultDate: new Date(),
}

export const Selectable = Template.bind({})
Selectable.storyName = 'selectable'
Selectable.args = {
  selectable: true,
  min: moment('12:00am', 'h:mma').toDate(),
  max: moment('11:59pm', 'h:mma').toDate(),
  events,
  onSelectEvent: action('event selected'),
  onSelectSlot: action('slot selected'),
  defaultDate: new Date(),
}

export const CustomDateHeader = Template.bind({})
CustomDateHeader.storyName = 'add custom date header'
CustomDateHeader.args = {
  defaultView: Views.MONTH,
  events,
  components: {
    month: {
      dateHeader: ({ label }) => <span>{label} - Custom date header</span>,
    },
  },
}

export const ComplexDayViewLayout = Template.bind({})
ComplexDayViewLayout.storyName = 'complex day view layout'
ComplexDayViewLayout.args = {
  defaultView: Views.DAY,
  defaultDate: new Date(),
  events: createEvents(1),
  step: 30,
}

export const MultiDay = Template.bind({})
MultiDay.storyName = 'multi-day'
MultiDay.args = {
  showMultiDayTimes: true,
  defaultDate: new Date(2016, 11, 4),
  max: moment().endOf('day').add(-1, 'hours').toDate(),
  events: [
    {
      title: 'start of the week',
      start: new Date(2016, 11, 4, 15),
      end: new Date(2016, 11, 5, 3),
    },
    {
      title: 'single day longer than max',
      start: new Date(2016, 11, 4, 15),
      end: new Date(2016, 11, 4, 23, 30),
    },
    {
      title: 'end of the week',
      start: new Date(2016, 11, 3),
      end: new Date(2016, 11, 3),
    },
    {
      title: 'middle',
      start: new Date(2016, 11, 6),
      end: new Date(2016, 11, 6),
    },
  ],
}

export const AgendaWithLength = Template.bind({})
AgendaWithLength.storyName = 'agenda view - with length prop'
AgendaWithLength.args = {
  defaultView: Views.AGENDA,
  events,
  length: 14,
}

const customNow = () => {
  let now = moment().date(1).toDate()
  return now
}

export const CustomNow = Template.bind({})
CustomNow.storyName = 'custom now is the first of the month'
CustomNow.args = {
  defaultView: Views.WEEK,
  getNow: customNow,
  min: moment('12:00am', 'h:mma').toDate(),
  max: moment('11:59pm', 'h:mma').toDate(),
  events,
  onSelectEvent: action('event selected'),
  defaultDate: new Date(),
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

export const CustomBackgroundEvents = Template.bind({})
CustomBackgroundEvents.storyName = 'add background event'
CustomBackgroundEvents.args = {
  defaultView: Views.WEEK,
  events,
  backgroundEvents,
}
