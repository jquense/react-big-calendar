import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import TimeSlice from '../TimeSlice.jsx';
import '../../less/styles.less'

storiesOf('components.TimeSlice', module)
  .add('default view', () => {
    return (
      <div className='rbc-time-gutter'>
        <TimeSlice time={() => '1:00pm'} />
        <TimeSlice time={() => '1:05pm'} />
        <TimeSlice time={() => '1:10pm'} />
        <TimeSlice time={() => '1:15pm'} />
      </div>
    )
  })

  .add('alternating text', () => {
    return (
      <div className='rbc-time-gutter'>
        <TimeSlice time={() => '1:00pm'} />
        <TimeSlice time={() => '1:05pm'} showlabel={false} />
        <TimeSlice time={() => '1:10pm'} />
        <TimeSlice time={() => '1:15pm'} showlabel={false} />
      </div>
    )
  })

  .add('time is now', () => {
    return (
      <div className='rbc-time-gutter'>
        <TimeSlice time={() => '1:00pm'} isNow />
        <TimeSlice time={() => '1:05pm'} showlabel={false} />
        <TimeSlice time={() => '1:10pm'} />
        <TimeSlice time={() => '1:15pm'} showlabel={false} />
      </div>
    )
  })