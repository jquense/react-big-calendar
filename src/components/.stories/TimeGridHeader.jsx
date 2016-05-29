import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import TimeGridHeader from '../TimeGridHeader.jsx';
import moment from 'moment'

storiesOf('components.TimeGridHeader', module)
  .add('default view', () => {
    return (
      <div className='rbc-time-view'>
        <TimeGridHeader range={[
                          moment().toDate(),
                          moment().add(1, 'days').toDate()
                        ]}
                        gutterWidth={90}/>
      </div>
    )
  })

  .add('7 days', () => {
    return (
      <div className='rbc-time-view'>
        <TimeGridHeader range={[
          moment().toDate(),
          moment().add(1, 'days').toDate(),
          moment().add(2, 'days').toDate(),
          moment().add(3, 'days').toDate(),
          moment().add(4, 'days').toDate(),
          moment().add(5, 'days').toDate(),
          moment().add(6, 'days').toDate(),
          moment().add(7, 'days').toDate()
        ]}
        gutterWidth={90}/>
      </div>
    )
  })

