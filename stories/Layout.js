import React from 'react'
import { storiesOf } from '@storybook/react'
import moment from 'moment'

import { events, Calendar, Views, DragAndDropCalendar } from './helpers'
import createEvents from './helpers/createEvents'

storiesOf('Layout Issues', module)
  .add('event layout', () => {
    return (
      <Calendar
        defaultView={Views.DAY}
        defaultDate={new Date()}
        timeslots={4}
        events={createEvents(1)}
      />
    )
  })
  .add('first of the week all-day event', () => {
    return (
      <Calendar
        defaultDate={new Date(2016, 11, 4)}
        events={[
          {
            allDay: true,
            title: 'All Day Event',
            start: new Date(2016, 11, 4),
            end: new Date(2016, 11, 4),
          },
        ]}
      />
    )
  })
  .add('end of the week all-day event', () => {
    return (
      <Calendar
        defaultDate={new Date(2016, 11, 3)}
        events={[
          {
            allDay: true,
            title: 'All Day Event',
            start: new Date(2016, 11, 3),
            end: new Date(2016, 11, 3),
          },
        ]}
      />
    )
  })
  .add('event at end of week', () => {
    return (
      <Calendar
        defaultDate={new Date(2016, 11, 3)}
        events={[
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
        ]}
      />
    )
  })
  .add('event at start of week', () => {
    return (
      <Calendar
        defaultDate={new Date(2016, 11, 4)}
        events={[
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
        ]}
      />
    )
  })
  .add('events on a constrained day column', () => {
    return (
      <Calendar
        defaultView={Views.DAY}
        min={moment('8 am', 'h a').toDate()}
        max={moment('5 pm', 'h a').toDate()}
        events={events}
      />
    )
  })
  .add('no duration', () => {
    return (
      /* should display all three events */
      <Calendar
        defaultDate={new Date(2016, 11, 4)}
        events={[
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
        ]}
      />
    )
  })
  .add('Single days should only span one slot, multi-days multiple', () => {
    return (
      <Calendar
        defaultDate={new Date(2015, 3, 1)}
        events={[
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
        ]}
      />
    )
  })
  .add('zero duration oddities', () => {
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
  })
