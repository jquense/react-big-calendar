import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import TimeGrid from '../TimeGrid.jsx';
import moment from 'moment'
import momentLocalizer, { formats } from '../../localizers/moment.js'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
momentLocalizer(moment); // or globalizeLocalizer

const events = [
  {
    start: moment('10:00am', 'h:mma').toDate(),
    end: moment('10:43am', 'h:mma').toDate()
  },
  {
    title: 'blahbla',
    start: moment('1:00pm', 'h:mma').add(1, 'days').toDate(),
    end: moment('3:00pm', 'h:mma').add(1, 'days').toDate()
  },
  {
    title: 'hmmmm',
    start: moment('9:00am', 'h:mma').add(2, 'days').toDate(),
    end: moment('3:00pm', 'h:mma').add(2, 'days').toDate()
  }
]

storiesOf('components.TimeGrid', module)
  .add('default view', () => {
    return (
      <div height="80%">
        <TimeGrid start={moment().startOf('day').toDate()} end={moment().add(2, 'days').startOf('day').toDate()}
                  min={moment('9:00am', 'h:mma').toDate()}
                  max={moment('5:00pm', 'h:mma').toDate()}
                  now={moment('3:00pm', 'h:mma').toDate()}
                  step={20}
                  slices={2}
                  events={events}
                  selectRangeFormat={formats.selectRangeFormat}
                  timegutterFormat={formats.timeGutterFormat}
                  eventTimeRangeFormat={formats.eventTimeRangeFormat}
        />
      </div>
    )
  })
