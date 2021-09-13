import moment from 'moment'
import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { events, Views, DragAndDropCalendar } from './helpers'
import customComponents from './helpers/customComponents'

storiesOf('Drag and Drop', module)
  .add('draggable and resizable', () => {
    return (
      <DragAndDropCalendar
        defaultDate={new Date()}
        defaultView={Views.WEEK}
        events={events}
        resizable
        onEventDrop={action('event dropped')}
        onEventResize={action('event resized')}
      />
    )
  })
  .add('draggable and resizable with non-default steps and timeslots', () => {
    return (
      <DragAndDropCalendar
        defaultDate={new Date()}
        defaultView={Views.WEEK}
        events={events}
        resizable
        step={15}
        timeslots={4}
        onEventDrop={action('event dropped')}
        onEventResize={action('event resized')}
      />
    )
  })
  .add('draggable and resizable with showMultiDayTimes', () => {
    return (
      <DragAndDropCalendar
        defaultDate={new Date()}
        defaultView={Views.WEEK}
        events={events}
        resizable
        showMultiDayTimes
        onEventDrop={action('event dropped')}
        onEventResize={action('event resized')}
      />
    )
  })
  .add(
    'draggable and resizable with event overflows the custom time period',
    () => {
      return (
        <DragAndDropCalendar
          defaultDate={new Date()}
          defaultView={Views.WEEK}
          events={[
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
          ]}
          resizable
          showMultiDayTimes
          onEventDrop={action('event dropped')}
          onEventResize={action('event resized')}
          min={moment('04:00am', 'h:mma').toDate()}
          max={moment('08:00am', 'h:mma').toDate()}
        />
      )
    }
  )
  .add('draggable and resizable with custom dateCellWrapper', () => {
    return (
      <DragAndDropCalendar
        components={{
          dateCellWrapper: customComponents.dateCellWrapper,
        }}
        defaultDate={new Date()}
        defaultView={Views.MONTH}
        events={events}
        resizable
        showMultiDayTimes
        onEventDrop={action('event dropped')}
        onEventResize={action('event resized')}
      />
    )
  })
  .add('draggable and resizable with custom timeSlotWrapper', () => {
    return (
      <DragAndDropCalendar
        components={{
          timeSlotWrapper: customComponents.timeSlotWrapper,
        }}
        defaultDate={new Date()}
        defaultView={Views.WEEK}
        events={events}
        resizable
        showMultiDayTimes
        onEventDrop={action('event dropped')}
        onEventResize={action('event resized')}
      />
    )
  })
  .add('draggable and resizable with custom eventWrapper', () => {
    return (
      <DragAndDropCalendar
        components={{
          eventWrapper: customComponents.eventWrapper,
        }}
        defaultDate={new Date()}
        defaultView={Views.WEEK}
        events={events}
        resizable
        showMultiDayTimes
        onEventDrop={action('event dropped')}
        onEventResize={action('event resized')}
      />
    )
  })
