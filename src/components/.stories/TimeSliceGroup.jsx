import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import TimeSliceGroup from '../TimeSliceGroup.jsx';
import '../../less/styles.less'
import moment from 'moment'

const format='h:mma'

storiesOf('components.TimeSliceGroup', module)
  .add('default view', () => {
    return (
      <div className='rbc-time-gutter'>
        <TimeSliceGroup timeGutterFormat={format} size={20} value={moment('1:00pm', 'h:mma').toDate()} />
        <TimeSliceGroup timeGutterFormat={format} size={20} value={moment('1:20pm', 'h:mma').toDate()} />
        <TimeSliceGroup timeGutterFormat={format} size={20} value={moment('1:40pm', 'h:mma').toDate()} />
      </div>
    )
  })

  .add('3 slices', () => {
    return (
      <div className='rbc-time-gutter'>
        <TimeSliceGroup slices={3} size={20} timeGutterFormat={format} value={moment('1:00pm', 'h:mma').toDate()} />
        <TimeSliceGroup slices={3} size={20} timeGutterFormat={format} value={moment('1:20pm', 'h:mma').toDate()} />
        <TimeSliceGroup slices={3} size={20} timeGutterFormat={format} value={moment('1:40pm', 'h:mma').toDate()} />
      </div>
    )
  })

  .add('4 slices', () => {
    return (
      <div className='rbc-time-gutter'>
        <TimeSliceGroup slices={4} size={20} timeGutterFormat={format} value={moment('1:00pm', 'h:mma').toDate()} />
        <TimeSliceGroup slices={4} size={20} timeGutterFormat={format} value={moment('1:20pm', 'h:mma').toDate()} />
        <TimeSliceGroup slices={4} size={20} timeGutterFormat={format} value={moment('1:40pm', 'h:mma').toDate()} />
      </div>
    )
  })

  .add('5 slices', () => {
    return (
      <div className='rbc-time-gutter'>
        <TimeSliceGroup slices={5} size={20} timeGutterFormat={format} value={moment('1:00pm', 'h:mma').toDate()} />
        <TimeSliceGroup slices={5} size={20} timeGutterFormat={format} value={moment('1:20pm', 'h:mma').toDate()} />
        <TimeSliceGroup slices={5} size={20} timeGutterFormat={format} value={moment('1:40pm', 'h:mma').toDate()} />
      </div>
    )
  })
