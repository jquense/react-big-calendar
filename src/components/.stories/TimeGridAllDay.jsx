import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import TimeGridAllDay from '../TimeGridAllDay.jsx';
import TimeGridHeader from '../TimeGridHeader.jsx'
import moment from 'moment'

storiesOf('components.TimeGridAllDay', module)
  .add('default view', () => {
    const range = [
      moment().toDate(),
      moment().add(1, 'days').toDate(),
      moment().add(2, 'days').toDate(),
      moment().add(3, 'days').toDate(),
      moment().add(4, 'days').toDate(),
      moment().add(5, 'days').toDate(),
    ]
    return (
      <div className='rbc-time-view'>
        <div className='rbc-time-header'>
          <TimeGridHeader range={range} gutterWidth={90}/>
          <TimeGridAllDay range={range} gutterWidth={90}>
          </TimeGridAllDay>
        </div>
      </div>
    )
  })
