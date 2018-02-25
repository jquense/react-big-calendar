import { storiesOf, action } from '@storybook/react'
import moment from 'moment'
import React from 'react'

import Calendar from '../src'
import momentLocalizer from '../src/localizers/moment.js'
import '../src/less/styles.less'
import '../src/addons/dragAndDrop/styles.less'
import demoEvents from '../examples/events'
import createEvents from './createEvents'
import resources from './resourceEvents'
import withDragAndDrop from '../src/addons/dragAndDrop'

/* eslint-disable react/prop-types */

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
momentLocalizer(moment) // or globalizeLocalizer

const events = [
  {
    title: 'test',
    start: moment()
      .add(1, 'days')
      .subtract(5, 'hours')
      .toDate(),
    end: moment()
      .add(1, 'days')
      .subtract(4, 'hours')
      .toDate(),
    allDay: false,
  },
  {
    title: 'test larger',
    start: moment()
      .startOf('day')
      .add(5, 'hours')
      .toDate(),
    end: moment()
      .startOf('day')
      .add(10, 'hours')
      .toDate(),
    allDay: false,
  },

  {
    title: 'test larger',
    start: moment()
      .startOf('day')
      .add(15, 'hours')
      .toDate(),
    end: moment()
      .startOf('day')
      .add(23, 'hours')
      .toDate(),
    allDay: false,
  },
  {
    title: 'test all day',
    start: moment()
      .startOf('day')
      .toDate(),
    end: moment()
      .startOf('day')
      .add(1, 'day')
      .toDate(),
    allDay: true,
  },
  {
    title: 'test 2 days',
    start: moment()
      .startOf('day')
      .toDate(),
    end: moment()
      .startOf('day')
      .add(2, 'days')
      .toDate(),
    allDay: true,
  },
  {
    title: 'test multi-day',
    start: moment().toDate(),
    end: moment()
      .add(3, 'days')
      .toDate(),
    allDay: false,
  },
]

const DragAndDropCalendar = withDragAndDrop(Calendar)

storiesOf('module.Calendar.week', module)
  .add('demo', () => {
    return (
      <div style={{ height: 500 }}>
        <Calendar
          popup
          events={demoEvents}
          onSelectEvent={action('event selected')}
          defaultDate={new Date(2015, 3, 1)}
        />
      </div>
    )
  })
  .add('default view', () => {
    return (
      <div style={{ height: 600 }}>
        <Calendar
          defaultView="week"
          min={moment('12:00am', 'h:mma').toDate()}
          max={moment('11:59pm', 'h:mma').toDate()}
          events={events}
          onSelectEvent={action('event selected')}
          defaultDate={new Date()}
        />
      </div>
    )
  })
  .add('event layout', () => {
    return (
      <div style={{ height: 600 }}>
        <Calendar
          defaultView={Calendar.Views.DAY}
          defaultDate={new Date()}
          timeslots={4}
          events={createEvents(1)}
        />
      </div>
    )
  })
  .add('resource', () => {
    return (
      <div style={{ height: 500 }}>
        <Calendar
          popup
          selectable
          events={resources.events}
          resources={resources.list}
          onSelectEvent={action('event selected')}
          onSelectSlot={action('slot selected')}
          defaultDate={new Date(2015, 3, 1)}
        />
      </div>
    )
  })
  .add('selectable', () => {
    return (
      <div style={{ height: 600 }}>
        <Calendar
          defaultView="week"
          selectable
          min={moment('12:00am', 'h:mma').toDate()}
          max={moment('11:59pm', 'h:mma').toDate()}
          events={events}
          onSelectEvent={action('event selected')}
          onSelectSlot={action('slot selected')}
          defaultDate={new Date()}
        />
      </div>
    )
  })
  .add('selectable, step 15, 4 timeslots', () => {
    return (
      <div style={{ height: 600 }}>
        <Calendar
          defaultView="week"
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
      </div>
    )
  })
  .add('selectable, step 10, 6 timeslots', () => {
    return (
      <div style={{ height: 600 }}>
        <Calendar
          defaultView="week"
          selectable
          timeslots={6}
          step={10}
          min={moment('12:00am', 'h:mma').toDate()}
          max={moment('11:59pm', 'h:mma').toDate()}
          events={events}
          onSelectEvent={action('event selected')}
          onSelectSlot={action('slot selected')}
          defaultDate={new Date()}
        />
      </div>
    )
  })
  .add('selectable, step 5, 6 timeslots', () => {
    return (
      <div style={{ height: 600 }}>
        <Calendar
          defaultView="week"
          selectable
          timeslots={6}
          step={5}
          min={moment('12:00am', 'h:mma').toDate()}
          max={moment('11:59pm', 'h:mma').toDate()}
          events={events}
          onSelectEvent={action('event selected')}
          onSelectSlot={action('slot selected')}
          defaultDate={new Date()}
        />
      </div>
    )
  })
  .add('selectable, 3 timeslots', () => {
    return (
      <div style={{ height: 600 }}>
        <Calendar
          defaultView="week"
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
      </div>
    )
  })
  .add('first of the week all-day event', () => {
    return (
      <div style={{ height: 600 }}>
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
      </div>
    )
  })
  .add('end of the week all-day event', () => {
    return (
      <div style={{ height: 600 }}>
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
      </div>
    )
  })
  .add('event at end of week', () => {
    return (
      <div style={{ height: 600 }}>
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
      </div>
    )
  })
  .add('event at start of week', () => {
    return (
      <div style={{ height: 600 }}>
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
      </div>
    )
  })
  .add('events on a constrained day column', () => {
    return (
      <div style={{ height: 600 }}>
        <Calendar
          defaultView={Calendar.Views.DAY}
          min={moment('8 am', 'h a').toDate()}
          max={moment('5 pm', 'h a').toDate()}
          events={events}
        />
      </div>
    )
  })
  .add('add custom date header', () => {
    return (
      <div style={{ height: 600 }}>
        <Calendar
          defaultView={Calendar.Views.MONTH}
          events={events}
          components={{
            month: {
              dateHeader: ({ label }) => (
                <span>{label} - Custom date header</span>
              ),
            },
          }}
        />
      </div>
    )
  })
  .add('no duration', () => {
    return (
      <div style={{ height: 600 }}>
        {/* should display all three events */}
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
      </div>
    )
  })
  .add('complex day view layout', () => {
    return (
      <div style={{ height: 600 }}>
        <Calendar
          defaultDate={new Date()}
          defaultView={Calendar.Views.DAY}
          events={createEvents(1)}
          step={30}
        />
      </div>
    )
  })
  .add('multi-day', () => {
    return (
      <div style={{ height: 600 }}>
        {/* should display all three events */}
        <Calendar
          showMultiDayTimes
          defaultDate={new Date(2016, 11, 4)}
          events={[
            {
              title: 'start of the week',
              start: new Date(2016, 11, 4, 15),
              end: new Date(2016, 11, 5, 3),
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
      </div>
    )
  })
  .add('agenda view - with length prop', () => {
    return (
      <div style={{ height: 600 }}>
        {/* should display as title toolbar (from now to now + 14 days) */}
        <Calendar
          defaultView={Calendar.Views.AGENDA}
          events={events}
          length={14}
        />
      </div>
    )
  })
  .add(
    'event should end after week start to be eligible to be displayed in that week',
    () => {
      return (
        <div style={{ height: 600 }}>
          {/* should display all three events */}
          <Calendar
            defaultDate={new Date(2015, 3, 1)}
            events={[
              // {
              //   'title': 'SingleDay 1',
              //   'start':new Date(2015, 3, 10),
              //   'end': new Date(2015, 3, 11)
              // },
              {
                title: 'SingleDay 2',
                start: new Date(2015, 3, 11),
                end: new Date(2015, 3, 12),
              },
              // {
              //   'title': 'SingleDay 3',
              //   'start':new Date(2015, 3, 12),
              //   'end': new Date(2015, 3, 13)
              // },
              // {
              //   'title': 'SingleDay 4',
              //   'start':new Date(2015, 3, 13),
              //   'end': new Date(2015, 3, 14)
              // },
              // {
              //   'title': 'MultiDay 1',
              //   'start':new Date(2015, 3, 24),
              //   'end': new Date(2015, 3, 25, 1, 0, 0, 0)
              // },
              // {
              //   'title': 'MultiDay 2',
              //   'start':new Date(2015, 3, 25),
              //   'end': new Date(2015, 3, 26, 1, 0, 0, 0)
              // }
            ]}
          />
        </div>
      )
    }
  )
  .add('custom now is the first of the month', () => {
    const customNow = () => {
      let now = new Date()
      now.setDate(1)
      return now
    }
    return (
      <div style={{ height: 600 }}>
        <Calendar
          defaultView="week"
          getNow={customNow}
          min={moment('12:00am', 'h:mma').toDate()}
          max={moment('11:59pm', 'h:mma').toDate()}
          events={events}
          onSelectEvent={action('event selected')}
          defaultDate={new Date()}
        />
      </div>
    )
  })
  .add('draggable and resizable', () => {
    return (
      <div style={{ height: 600 }}>
        <DragAndDropCalendar
          defaultDate={new Date()}
          defaultView="week"
          events={events}
          resizable
          onEventDrop={action('event dropped')}
          onEventResize={action('event resized')}
        />
      </div>
    )
  })
  .add('draggable and resizable with non-default steps and timeslots', () => {
    return (
      <div style={{ height: 600 }}>
        <DragAndDropCalendar
          defaultDate={new Date()}
          defaultView="week"
          events={events}
          resizable
          step={15}
          timeslots={4}
          onEventDrop={action('event dropped')}
          onEventResize={action('event resized')}
        />
      </div>
    )
  })
  .add('draggable and resizable with showMultiDayTimes', () => {
    return (
      <div style={{ height: 600 }}>
        <DragAndDropCalendar
          defaultDate={new Date()}
          defaultView="week"
          events={events}
          resizable
          showMultiDayTimes
          onEventDrop={action('event dropped')}
          onEventResize={action('event resized')}
        />
      </div>
    )
  })
