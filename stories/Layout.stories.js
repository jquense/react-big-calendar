import React from 'react'
import { action } from '@storybook/addon-actions'

import moment from 'moment'

import { events, Calendar, Views, DragAndDropCalendar } from './helpers'
import createEvents from './helpers/createEvents'

export default {
  title: 'Additional Examples/Layout',
  component: Calendar,
}

const Template = (args) => <Calendar {...args} />

export const EventLayout = Template.bind({})
EventLayout.args = {
  defaultView: Views.DAY,
  defaultDate: new Date(),
  timeslots: 4,
  events: createEvents(1),
}

export const FirstOfWeekAllDay = Template.bind({})
FirstOfWeekAllDay.storyName = 'first of the week all-day event'
FirstOfWeekAllDay.args = {
  defaultDate: new Date(2016, 11, 4),
  events: [
    {
      allDay: true,
      title: 'All Day Event',
      start: new Date(2016, 11, 4),
      end: new Date(2016, 11, 4),
    },
  ],
}

export const EndOfWeekAllDay = Template.bind({})
EndOfWeekAllDay.storyName = 'end of the week all-day event'
EndOfWeekAllDay.args = {
  defaultDate: new Date(2016, 11, 3),
  events: [
    {
      allDay: true,
      title: 'All Day Event',
      start: new Date(2016, 11, 3),
      end: new Date(2016, 11, 3),
    },
  ],
}

export const EventAtStartOfWeek = Template.bind({})
EventAtStartOfWeek.args = {
  defaultDate: new Date(2016, 11, 4),
  events: [
    {
      title: 'has time',
      start: moment(new Date(2016, 11, 4))
        .add(1, 'days')
        .subtract(5, 'hours')
        .toDate(),
      end: moment(new Date(2016, 11, 4))
        .add(1, 'days')
        .subtract(4, 'hours')
        .toDate(),
    },
  ],
}

export const EventAtEndOfWeek = Template.bind({})
EventAtEndOfWeek.args = {
  defaultDate: new Date(2016, 11, 3),
  events: [
    {
      title: 'has time',
      start: moment(new Date(2016, 11, 3))
        .add(1, 'days')
        .subtract(5, 'hours')
        .toDate(),
      end: moment(new Date(2016, 11, 3))
        .add(1, 'days')
        .subtract(4, 'hours')
        .toDate(),
    },
  ],
}

export const EventsOnAConstrainedDayColumn = Template.bind({})
EventsOnAConstrainedDayColumn.args = {
  defaultView: Views.DAY,
  min: moment('8 am', 'h a').toDate(),
  max: moment('5 pm', 'h a').toDate(),
  events,
}

export const NoDuration = Template.bind({})
NoDuration.args = {
  defaultDate: new Date(2016, 11, 4),
  events: [
    {
      title: 'start of the week',
      start: new Date(2016, 11, 4),
      end: new Date(2016, 11, 4),
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

export const DaySpan = Template.bind({})
DaySpan.storyName = 'Single days should only span one slot, multi-days multiple'
DaySpan.args = {
  defaultDate: new Date(2015, 3, 1),
  events: [
    {
      title: 'SingleDay 1',
      start: new Date(2015, 3, 10),
      end: new Date(2015, 3, 11),
    },
    {
      title: 'SingleDay 2',
      start: new Date(2015, 3, 11),
      end: new Date(2015, 3, 12),
    },
    {
      title: 'SingleDay 3',
      start: new Date(2015, 3, 12),
      end: new Date(2015, 3, 13),
    },
    {
      title: 'SingleDay 4',
      start: new Date(2015, 3, 13),
      end: new Date(2015, 3, 14),
    },
    {
      title: 'MultiDay 1',
      start: new Date(2015, 3, 24),
      end: new Date(2015, 3, 25, 1, 0, 0, 0),
    },
    {
      title: 'MultiDay 2',
      start: new Date(2015, 3, 25),
      end: new Date(2015, 3, 26, 1, 0, 0, 0),
    },
  ],
}

export const ZeroDurationOddities = () => {
  return (
    <DragAndDropCalendar
      defaultDate={new Date(2015, 3, 1)}
      events={[
        {
          id: 4,
          title: '0 day duration',
          start: new Date(2015, 3, 8, 0, 0, 0),
          end: new Date(2015, 3, 8, 0, 0, 0),
        },
        {
          id: 4,
          title: '1 day duration',
          start: new Date(2015, 3, 9, 0, 0, 0),
          end: new Date(2015, 3, 10, 0, 0, 0),
        },
      ]}
    />
  )
}
