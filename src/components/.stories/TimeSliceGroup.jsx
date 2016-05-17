import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import TimeSliceGroup from '../TimeSliceGroup.jsx';
import '../../less/styles.less'

storiesOf('components.TimeSliceGroup', module)
  .add('default view', () => {
    return (
      <div className='rbc-time-gutter'>
        <TimeSliceGroup time={() => '1:00pm'} />
        <TimeSliceGroup time={() => '1:20pm'} />
        <TimeSliceGroup time={() => '1:40pm'} />
      </div>
    )
  })

  .add('3 slices', () => {
    return (
      <div className='rbc-time-gutter'>
        <TimeSliceGroup slices={3} time={() => '1:00pm'} />
        <TimeSliceGroup slices={3} time={() => '1:20pm'} />
        <TimeSliceGroup slices={3} time={() => '1:40pm'} />
      </div>
    )
  })

  .add('4 slices', () => {
    return (
      <div className='rbc-time-gutter'>
        <TimeSliceGroup slices={4} time={() => '1:00pm'} />
        <TimeSliceGroup slices={4} time={() => '1:20pm'} />
        <TimeSliceGroup slices={4} time={() => '1:40pm'} />
      </div>
    )
  })

  .add('5 slices', () => {
    return (
      <div className='rbc-time-gutter'>
        <TimeSliceGroup slices={5} time={() => '1:00pm'} />
        <TimeSliceGroup slices={5} time={() => '1:20pm'} />
        <TimeSliceGroup slices={5} time={() => '1:40pm'} />
      </div>
    )
  })
