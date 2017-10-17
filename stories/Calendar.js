import { storiesOf, action } from '@kadira/storybook';
import moment from 'moment';
import React from 'react';

import Calendar from '../src';
import momentLocalizer from '../src/localizers/moment.js'
import '../src/less/styles.less'
import demoEvents from '../examples/events';
import createEvents from './createEvents';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
momentLocalizer(moment); // or globalizeLocalizer

const events = [{
    title: 'test',
    start: moment().add(1, 'days').subtract(5, 'hours').toDate(),
    end: moment().add(1, 'days').subtract(4, 'hours').toDate(),
    allDay: false
  },
  {
    title: 'test larger',
    start: moment().startOf('day').add(5, 'hours').toDate(),
    end: moment().startOf('day').add(10, 'hours').toDate(),
    allDay: false
  },

  {
    title: 'test larger',
    start: moment().startOf('day').add(15, 'hours').toDate(),
    end: moment().startOf('day').add(23, 'hours').toDate(),
    allDay: false
  },
  {
    title: 'test all day',
    start: moment().toDate(),
    end: moment().toDate(),
    allDay: true
  }]

storiesOf('module.Calendar.week', module)
  .add('demo', () => {
    return (
      <div style={{height: 500}}>
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
      <div style={{height: 600}}>
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
      <div style={{height: 600}}>
        <Calendar
          defaultView={Calendar.Views.DAY}
          defaultDate={new Date()}
          timeslots={4}
          events={createEvents(1)}
        />
      </div>
    )
  })

  .add('selectable', () => {
    return (
      <div style={{height: 600}}>
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
      <div style={{height: 600}}>
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
      <div style={{height: 600}}>
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
      <div style={{height: 600}}>
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
      <div style={{height: 600}}>
        <Calendar
          defaultView="week"
          selectable
          timeslots={3}
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

  .add('selectable, 9 timeslots, force now to 9:30am', () => {
    return (
      <div style={{height: 600}}>
        <Calendar
          defaultView="week"
          selectable
          timeslots={9}
          now={moment('9:30am', 'h:mma').toDate()}
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
      <div style={{height: 600}}>
        <Calendar
          defaultDate={new Date(2016, 11, 4)}
          events={[{
              allDay: true,
              title: 'All Day Event',
              start: new Date(2016, 11, 4),
              end: new Date(2016, 11, 4)
          }]}
        />
      </div>
    )
  })
  .add('end of the week all-day event', () => {
    return (
      <div style={{height: 600}}>
        <Calendar
          defaultDate={new Date(2016, 11, 3)}
          events={[{
              allDay: true,
              title: 'All Day Event',
              start: new Date(2016, 11, 3),
              end: new Date(2016, 11, 3)
          }]}
        />
      </div>
    )
  })
  .add('event at end of week', () => {
    return (
      <div style={{height: 600}}>
        <Calendar
          defaultDate={new Date(2016, 11, 3)}
          events={[
            {
              title: 'has time',
              start: moment(new Date(2016, 11, 3)).add(1, 'days').subtract(5, 'hours').toDate(),
              end: moment(new Date(2016, 11, 3)).add(1, 'days').subtract(4, 'hours').toDate(),
            },
          ]}
        />
      </div>
    )
  })
  .add('event at start of week', () => {
    return (
      <div style={{height: 600}}>
        <Calendar
          defaultDate={new Date(2016, 11, 4)}
          events={[{
            title: 'has time',
            start: moment(new Date(2016, 11, 4)).add(1, 'days').subtract(5, 'hours').toDate(),
            end: moment(new Date(2016, 11, 4)).add(1, 'days').subtract(4, 'hours').toDate(),
          }]}
        />
      </div>
    )
  })
  .add('events on a constrained day column', () => {
    return (
      <div style={{height: 600}}>
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
        <div style={{height: 600}}>
          <Calendar
            defaultView={Calendar.Views.MONTH}
            events={events}
            components={{
              month: {
                dateHeader: ({ label }) => <span>{label} - Custom date header</span>
              }
            }}
          />
        </div>
    )
  })
  .add('no duration', () => {
    return (
      <div style={{height: 600}}>
        {/* should display all three events */}
        <Calendar
          defaultDate={new Date(2016, 11, 4)}
          events={[
            {
              title: 'start of the week',
              start: new Date(2016, 11, 4),
              end: new Date(2016, 11, 4)
            },
            {
                title: 'end of the week',
                start: new Date(2016, 11, 3),
                end: new Date(2016, 11, 3)
            },
            {
                title: 'middle',
                start: new Date(2016, 11, 6),
                end: new Date(2016, 11, 6)
            }
          ]}
        />
      </div>
    )
  })
  .add('multi-day', () => {
    return (
      <div style={{height: 600}}>
        {/* should display all three events */}
        <Calendar
          showMultiDayTimes
          defaultDate={new Date(2016, 11, 4)}
          events={[
            {
              title: 'start of the week',
              start: new Date(2016, 11, 4, 15),
              end: new Date(2016, 11, 5, 3)
            },
            {
                title: 'end of the week',
                start: new Date(2016, 11, 3),
                end: new Date(2016, 11, 3)
            },
            {
                title: 'middle',
                start: new Date(2016, 11, 6),
                end: new Date(2016, 11, 6)
            }
          ]}
        />
      </div>
    )
  })
