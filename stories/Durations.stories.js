import React from 'react'
import { action } from '@storybook/addon-actions'

import moment from 'moment'

import { Calendar, Views, DragableCalendar } from './helpers'

export default {
  title: 'Big Calendar/Event Durations',
  component: Calendar,
}

const Template = (args) => <DragableCalendar {...args} />

export const DaylightSavingsStarts = Template.bind({})
DaylightSavingsStarts.args = {
  defaultView: Views.DAY,
  min: moment('12:00am', 'h:mma').toDate(),
  max: moment('11:59pm', 'h:mma').toDate(),
  events: [
    {
      title: 'on DST',
      start: new Date(2017, 2, 12, 1),
      end: new Date(2017, 2, 12, 2, 30),
      allDay: false,
    },
    {
      title: 'crosses DST',
      start: new Date(2017, 2, 12, 1),
      end: new Date(2017, 2, 12, 6, 30),
      allDay: false,
    },
    {
      title: 'After DST',
      start: new Date(2017, 2, 12, 7),
      end: new Date(2017, 2, 12, 9, 30),
      allDay: false,
    },
  ],
  defaultDate: new Date(2017, 2, 12),
}

export const DaylightSavingsStartsAfter2Am = Template.bind({})
DaylightSavingsStartsAfter2Am.args = {
  defaultView: Views.DAY,
  min: moment('3:00am', 'h:mma').toDate(),
  max: moment('11:59pm', 'h:mma').toDate(),
  events: [
    {
      title: 'After DST',
      start: new Date(2017, 2, 12, 7),
      end: new Date(2017, 2, 12, 9, 30),
      allDay: false,
    },
  ],
  defaultDate: new Date(2017, 2, 12),
}

export const DaylightSavingsEnds = Template.bind({})
DaylightSavingsEnds.args = {
  defaultView: Views.DAY,
  min: moment('12:00am', 'h:mma').toDate(),
  max: moment('11:59pm', 'h:mma').toDate(),
  events: [
    {
      title: 'on DST',
      start: new Date(2017, 10, 5, 1),
      end: new Date(2017, 10, 5, 3, 30),
      allDay: false,
    },
    {
      title: 'crosses DST',
      start: new Date(2017, 10, 5, 1),
      end: new Date(2017, 10, 5, 6, 30),
      allDay: false,
    },
    {
      title: 'After DST',
      start: new Date(2017, 10, 5, 7),
      end: new Date(2017, 10, 5, 7, 45),
      allDay: false,
    },
  ],
  defaultDate: new Date(2017, 10, 5),
}

export const DaylightSavingsEndsAfter2Am = Template.bind({})
DaylightSavingsEndsAfter2Am.args = {
  defaultView: Views.DAY,
  min: moment('3:00am', 'h:mma').toDate(),
  max: moment('11:59pm', 'h:mma').toDate(),
  events: [
    {
      title: 'After DST',
      start: new Date(2017, 10, 5, 7),
      end: new Date(2017, 10, 5, 9, 30),
      allDay: false,
    },
  ],
  defaultDate: new Date(2017, 10, 5),
}
