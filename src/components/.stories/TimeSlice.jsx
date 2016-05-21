import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import TimeSlice from '../TimeSlice.jsx';
import moment from 'moment'
import '../../less/styles.less'

function format(v) {
  return moment(v).format('h:mma')
}


storiesOf('components.TimeSlice', module)
  .add('default view', () => {
    return (
      <div className='rbc-time-gutter'>
        <TimeSlice time={format} value={moment('1:00pm', 'h:mma').toDate()} />
        <TimeSlice time={format} value={moment('1:05pm', 'h:mma').toDate()} />
        <TimeSlice time={format} value={moment('1:10pm', 'h:mma').toDate()} />
        <TimeSlice time={format} value={moment('1:15pm', 'h:mma').toDate()} />
      </div>
    )
  })

  .add('alternating text', () => {
    return (
      <div className='rbc-time-gutter'>
        <TimeSlice time={format} value={moment('1:00pm', 'h:mma').toDate()} />
        <TimeSlice time={format} showlabel={false} value={moment('1:05pm', 'h:mma').toDate()} />
        <TimeSlice time={format} value={moment('1:10pm', 'h:mma').toDate()} />
        <TimeSlice time={format} value={moment('1:15pm', 'h:mma').toDate()} showlabel={false} />
      </div>
    )
  })

  .add('time is now', () => {
    return (
      <div className='rbc-time-gutter'>
        <TimeSlice time={format} value={moment('1:00pm', 'h:mma').toDate()} isNow />
        <TimeSlice time={format} value={moment('1:05pm', 'h:mma').toDate()} showlabel={false} />
        <TimeSlice time={format} value={moment('1:10pm', 'h:mma').toDate()} />
        <TimeSlice time={format} value={moment('1:15pm', 'h:mma').toDate()} showlabel={false} />
      </div>
    )
  })