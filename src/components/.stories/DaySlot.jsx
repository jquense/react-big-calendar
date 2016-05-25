import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import DaySlot from '../DaySlot.jsx';
import moment from 'moment'
import momentLocalizer, { formats } from '../../localizers/moment.js'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
momentLocalizer(moment); // or globalizeLocalizer

const events = [
  {
    start: moment('10:00am', 'h:mma').toDate(),
    end: moment('10:43am', 'h:mma').toDate()
  }
]

storiesOf('components.DaySlot', module)
  .add('default view', () => {
    return (
      <DaySlot style={{width: 100}} min={moment('9:00am', 'h:mma').toDate()}
                  max={moment('5:00pm', 'h:mma').toDate()}
                  now={moment('9:20am', 'h:mma').toDate()}
               formatter={({start, end}) => {
                return `${moment(start).format('h:mm')}-${
                moment(end).format('h:mm')}`
               }}
               events={events}
               eventTimeRangeFormat={formats.eventTimeRangeFormat}
      />
    )
  })

  .add('3 slices', () => {
    return (
      <DaySlot style={{width: 100}} min={moment('9:00am', 'h:mma').toDate()}
               max={moment('5:00pm', 'h:mma').toDate()}
               now={moment('9:23am', 'h:mma').toDate()}
               slices={3}
               formatter={({start, end}) => {
                  return `${moment(start).format('h:mm')}-${
                  moment(end).format('h:mm')}`
                 }}
               events={events}
               eventTimeRangeFormat={formats.eventTimeRangeFormat}
      />
    )
  })


  .add('4 slices', () => {
    return (
      <DaySlot style={{width: 100}} min={moment('9:00am', 'h:mma').toDate()}
               max={moment('5:00pm', 'h:mma').toDate()}
               now={moment('9:23am', 'h:mma').toDate()}
               slices={4}
               formatter={({start, end}) => {
                  return `${moment(start).format('h:mm')}-${
                  moment(end).format('h:mm')}`
                 }}
               events={events}
               eventTimeRangeFormat={formats.eventTimeRangeFormat}
      />
    )
  })


  .add('5 slices', () => {
    return (
      <DaySlot style={{width: 100}} min={moment('9:00am', 'h:mma').toDate()}
                  max={moment('5:00pm', 'h:mma').toDate()}
                  slices={5}
                  now={moment('9:20:01am', 'h:mm:ssa').toDate()}
               formatter={({start, end}) => {
                return `${moment(start).format('h:mm')}-${
                moment(end).format('h:mm')}`
               }}
               events={events}
               eventTimeRangeFormat={formats.eventTimeRangeFormat}
      />
    )
  })
