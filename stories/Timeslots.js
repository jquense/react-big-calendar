import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import moment from 'moment'
import React from 'react'

import { events, Calendar } from './helpers'
/* eslint-disable react/prop-types */

storiesOf('Timeslots', module)
  .add('selectable, step 15, 4 timeslots', () => {
    return (
      <Calendar
        defaultView={Views.WEEK}
        selectable
        timeslots={4}
        step={15}
        min={moment('12:00am', 'h:mma').toDate()}
        max={moment('11:59pm', 'h:mma').toDate()}
        events={events}
        onSelectEvent={action('event selected')}
        onSelectSlot={action('slot selected')}
        defaultDate={new Date()}
      />
    )
  })
  .add('selectable, step 10, 6 timeslots', () => {
    return (
      <Calendar
        selectable
        defaultView={Views.WEEK}
        timeslots={6}
        step={10}
        min={moment('12:00am', 'h:mma').toDate()}
        max={moment('11:59pm', 'h:mma').toDate()}
        events={events}
        onSelectEvent={action('event selected')}
        onSelectSlot={action('slot selected')}
        defaultDate={new Date()}
      />
    )
  })
  .add('selectable, step 5, 6 timeslots', () => {
    return (
      <Calendar
        selectable
        defaultView={Views.WEEK}
        timeslots={6}
        step={5}
        min={moment('12:00am', 'h:mma').toDate()}
        max={moment('11:59pm', 'h:mma').toDate()}
        events={events}
        onSelectEvent={action('event selected')}
        onSelectSlot={action('slot selected')}
        defaultDate={new Date()}
      />
    )
  })
  .add('selectable, 3 timeslots', () => {
    return (
      <Calendar
        defaultView={Views.WEEK}
        selectable
        timeslots={3}
        getNow={() => moment('9:30am', 'h:mma').toDate()}
        min={moment('12:00am', 'h:mma').toDate()}
        max={moment('11:59pm', 'h:mma').toDate()}
        events={events}
        onSelectEvent={action('event selected')}
        onSelectSlot={action('slot selected')}
        defaultDate={new Date()}
      />
    )
  })
