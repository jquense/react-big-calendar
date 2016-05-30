import React from 'react';
import moment from 'moment'
import { storiesOf, action, linkTo } from '@kadira/storybook';

import TimeGridHeader from '../TimeGridHeader.jsx';
import momentLocalizer, { formats } from '../../localizers/moment.js'

momentLocalizer(moment); // or globalizeLocalizer

storiesOf('components.TimeGridHeader', module)
  .add('default view', () => {
    return (
      <div className='rbc-time-view'>
        <TimeGridHeader range={[
                          moment().toDate(),
                          moment().add(1, 'days').toDate()
                        ]}
                        culture="en"
                        format={formats.dayFormat}
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
        format={formats.dayFormat}
        culture="en"
        gutterWidth={90}/>
      </div>
    )
  })

