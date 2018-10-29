import React from 'react'
import { storiesOf } from '@storybook/react'
import moment from 'moment'

import { Calendar, DragableCalendar } from './helpers'

storiesOf('Event Durations').add('Daylight savings', () => {
  return (
    <DragableCalendar
      defaultView={Calendar.Views.DAY}
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
      ]}
      defaultDate={new Date(2017, 2, 12)}
    />
  )
})
