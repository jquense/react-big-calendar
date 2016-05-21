import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import DaySlot from '../DaySlot.jsx';
import '../../less/reset.less'
import '../../less/styles.less'
import moment from 'moment'

import { debug } from '../../containers/Selection.jsx'

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
      />
    )
  })
