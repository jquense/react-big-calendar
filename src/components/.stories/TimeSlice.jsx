import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import TimeSlice from '../TimeSlice.jsx';
import moment from 'moment'
import '../../less/styles.less'

const format='h:mma'

storiesOf('components.TimeSlice', module)
  .add('default view', () => {
    return (
      <div className='rbc-time-gutter'>
        <TimeSlice format={format} value={moment('1:00pm', 'h:mma').toDate()} />
        <TimeSlice format={format} value={moment('1:05pm', 'h:mma').toDate()} />
        <TimeSlice format={format} value={moment('1:10pm', 'h:mma').toDate()} />
        <TimeSlice format={format} value={moment('1:15pm', 'h:mma').toDate()} />
      </div>
    )
  })

  .add('alternating text', () => {
    return (
      <div className='rbc-time-gutter'>
        <TimeSlice format={format} value={moment('1:00pm', 'h:mma').toDate()} />
        <TimeSlice format={format} showlabel={false} value={moment('1:05pm', 'h:mma').toDate()} />
        <TimeSlice format={format} value={moment('1:10pm', 'h:mma').toDate()} />
        <TimeSlice format={format} value={moment('1:15pm', 'h:mma').toDate()} showlabel={false} />
      </div>
    )
  })

  .add('time is now', () => {
    return (
      <div className='rbc-time-gutter'>
        <TimeSlice format={format} value={moment('1:00pm', 'h:mma').toDate()} isNow />
        <TimeSlice format={format} value={moment('1:05pm', 'h:mma').toDate()} showlabel={false} />
        <TimeSlice format={format} value={moment('1:10pm', 'h:mma').toDate()} />
        <TimeSlice format={format} value={moment('1:15pm', 'h:mma').toDate()} showlabel={false} />
      </div>
    )
  })