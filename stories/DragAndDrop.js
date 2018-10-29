import React from 'react'
import { storiesOf, action } from '@storybook/react'

import { events, Calendar, DragAndDropCalendar } from './helpers'
import customComponents from './helpers/customComponents'

storiesOf('Drag and Drop')
  .add('draggable and resizable', () => {
    return (
      <DragAndDropCalendar
        defaultDate={new Date()}
        defaultView={Calendar.Views.WEEK}
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
        defaultView={Calendar.Views.WEEK}
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
        defaultView={Calendar.Views.WEEK}
        events={events}
        resizable
        showMultiDayTimes
        onEventDrop={action('event dropped')}
        onEventResize={action('event resized')}
      />
    )
  })
  .add('draggable and resizable with custom dateCellWrapper', () => {
    return (
      <DragAndDropCalendar
        components={{
          dateCellWrapper: customComponents.dateCellWrapper,
        }}
        defaultDate={new Date()}
        defaultView={Calendar.Views.MONTH}
        events={events}
        resizable
        showMultiDayTimes
        onEventDrop={action('event dropped')}
        onEventResize={action('event resized')}
      />
    )
  })
  .add('draggable and resizable with custom dayWrapper', () => {
    return (
      <DragAndDropCalendar
        components={{
          dayWrapper: customComponents.dayWrapper,
        }}
        defaultDate={new Date()}
        defaultView={Calendar.Views.WEEK}
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
        defaultView={Calendar.Views.WEEK}
        events={events}
        resizable
        showMultiDayTimes
        onEventDrop={action('event dropped')}
        onEventResize={action('event resized')}
      />
    )
  })
