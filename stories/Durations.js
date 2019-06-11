import React from 'react'
import { storiesOf } from '@storybook/react'
import moment from 'moment'

import { Calendar, Views, DragableCalendar } from './helpers'

storiesOf('Event Durations', module)
  .add('Daylight savings starts', () => {
    return (
      <DragableCalendar
        defaultView={Views.DAY}
        min={moment('12:00am', 'h:mma').toDate()}
        max={moment('11:59pm', 'h:mma').toDate()}
        events={[
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
        ]}
        defaultDate={new Date(2017, 2, 12)}
      />
    )
  })
  .add('Daylight savings ends', () => {
    return (
      <DragableCalendar
        defaultView={Views.DAY}
        min={moment('12:00am', 'h:mma').toDate()}
        max={moment('11:59pm', 'h:mma').toDate()}
        events={[
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
        ]}
        defaultDate={new Date(2017, 10, 5)}
      />
    )
  })
  .add('Daylight savings starts, after 2am', () => {
    return (
      <DragableCalendar
        defaultView={Views.DAY}
        min={moment('3:00am', 'h:mma').toDate()}
        max={moment('11:59pm', 'h:mma').toDate()}
        events={[
          {
            title: 'After DST',
            start: new Date(2017, 2, 12, 7),
            end: new Date(2017, 2, 12, 9, 30),
            allDay: false,
          },
        ]}
        defaultDate={new Date(2017, 2, 12)}
      />
    )
  })
  .add('Daylight savings ends, after 2am', () => {
    return (
      <DragableCalendar
        defaultView={Views.DAY}
        min={moment('3:00am', 'h:mma').toDate()}
        max={moment('11:59pm', 'h:mma').toDate()}
        events={[
          {
            title: 'After DST',
            start: new Date(2017, 10, 5, 7),
            end: new Date(2017, 10, 5, 9, 30),
            allDay: false,
          },
        ]}
        defaultDate={new Date(2017, 10, 5)}
      />
    )
  })
