import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import TimeGrid from '../TimeGrid.jsx';
import moment from 'moment'

storiesOf('components.TimeGrid', module)
  .add('default view', () => {
    return (
      <div height="80%">
        <TimeGrid start={moment('1', 'E').toDate()} end={moment('3', 'E').toDate()}
        gutterProps={{
          min: moment('9:00am', 'h:mma').toDate(),
          max: moment('5:00pm', 'h:mma').toDate(),
          now: moment('3:00pm', 'h:mma').toDate(),
          step: 20,
          slices: 2
        }} />
      </div>
    )
  })
