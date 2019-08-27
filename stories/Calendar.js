import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import moment from 'moment'
import React from 'react'

import '../src/sass/styles.scss'
import '../src/addons/dragAndDrop/styles.scss'
import demoEvents from '../examples/events'
import createEvents from './helpers/createEvents'
import customComponents from './helpers/customComponents'

import { events, Views, Calendar } from './helpers'

storiesOf('Big Calendar', module)
  .add('demo', () => (
    <Calendar
      popup
      popupOffset={{ x: -10, y: -20 }}
      events={demoEvents}
      onSelectEvent={action('event selected')}
      defaultDate={new Date(2015, 3, 1)}
    />
  ))
  .add('default view', () => {
    return (
      <Calendar
        defaultView={Views.WEEK}
        min={moment('12:00am', 'h:mma').toDate()}
        max={moment('11:59pm', 'h:mma').toDate()}
        events={events}
        onSelectEvent={action('event selected')}
        defaultDate={new Date()}
      />
    )
  })

  .add('selectable', () => {
    return (
      <Calendar
        selectable
        defaultView={Views.WEEK}
        min={moment('12:00am', 'h:mma').toDate()}
        max={moment('11:59pm', 'h:mma').toDate()}
        events={events}
        onSelectEvent={action('event selected')}
        onSelectSlot={action('slot selected')}
        defaultDate={new Date()}
      />
    )
  })
  .add('add custom date header', () => {
    return (
      <Calendar
        defaultView={Views.MONTH}
        events={events}
        components={{
          month: {
            dateHeader: ({ label }) => (
              <span>{label} - Custom date header</span>
            ),
          },
        }}
      />
    )
  })
  .add('complex day view layout', () => {
    return (
      <Calendar
        defaultDate={new Date()}
        defaultView={Views.DAY}
        events={createEvents(1)}
        step={30}
      />
    )
  })
  .add('multi-day', () => {
    return (
      /* should display all three events */
      <Calendar
        showMultiDayTimes
        defaultDate={new Date(2016, 11, 4)}
        max={moment()
          .endOf('day')
          .add(-1, 'hours')
          .toDate()}
        events={[
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
        ]}
      />
    )
  })
  .add('agenda view - with length prop', () => {
    return (
      /* should display as title toolbar (from now to now + 14 days) */
      <Calendar defaultView={Views.AGENDA} events={events} length={14} />
    )
  })
  .add('custom now is the first of the month', () => {
    const customNow = () => {
      let now = new Date()
      now.setDate(1)
      return now
    }
    return (
      <Calendar
        defaultView={Views.WEEK}
        getNow={customNow}
        min={moment('12:00am', 'h:mma').toDate()}
        max={moment('11:59pm', 'h:mma').toDate()}
        events={events}
        onSelectEvent={action('event selected')}
        defaultDate={new Date()}
      />
    )
  })

  .add('custom time gutter header', () => {
    const TimeGutter = () => <p>Custom gutter text</p>

    return (
      <Calendar
        popup
        events={demoEvents}
        onSelectEvent={action('event selected')}
        defaultDate={new Date(2015, 3, 1)}
        defaultView="week"
        views={['week', 'day']}
        components={{
          timeGutterHeader: TimeGutter,
        }}
      />
    )
  })
  .add('add custom dateCellWrapper', () => {
    return (
      <Calendar
        defaultView={Views.MONTH}
        events={events}
        components={{
          dateCellWrapper: customComponents.dateCellWrapper,
        }}
      />
    )
  })
  .add('add custom timeSlotWrapper', () => {
    return (
      <Calendar
        defaultView={Views.DAY}
        events={events}
        components={{
          timeSlotWrapper: customComponents.timeSlotWrapper,
        }}
      />
    )
  })
  .add('add custom eventWrapper', () => {
    return (
      <Calendar
        defaultView={Views.DAY}
        events={events}
        components={{
          eventWrapper: customComponents.eventWrapper,
        }}
      />
    )
  })
  .add('add custom no agenda events label', () => {
    return (
      <Calendar
        defaultView={Views.AGENDA}
        events={events}
        messages={{
          noEventsInRange:
            'There are no special events in this range [test message]',
        }}
      />
    )
  })
  .add('add custom timeSlotWrapper', () => {
    return (
      <Calendar
        defaultView={Views.WEEK}
        events={events}
        components={{
          timeSlotWrapper: customComponents.timeSlotWrapper,
        }}
      />
    )
  })
