import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Calendar from '../Calendar';
import moment from 'moment';
import momentLocalizer from '../localizers/moment.js'
import '../less/styles.less'

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
    title: 'test all day',
    start: moment().toDate(),
    end: moment().toDate(),
    allDay: true
  }]

storiesOf('module.Calendar.week', module)
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
