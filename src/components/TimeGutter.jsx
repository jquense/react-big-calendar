import React from 'react'
import dates from '../utils/dates';
import moment from 'moment'
import TimeSlice from './TimeSlice.jsx'

const TimeGutter = ({ now, min, max, step = 10, formatter = (time) => moment(time).format('h:mm A') }) => {
  const totalMin = dates.diff(min, max, 'minutes')
  const numSlots = Math.ceil(totalMin / step)
  const children = []

  let date = min
  let next = date
  let isNow = false
  let isEven = true

  for (var i = 0; i < numSlots; i++) {
    next = dates.add(date, step, 'minutes');
    isEven = (i % 2) === 0
    if (isEven) {
      isNow = dates.inRange(now, date, dates.add(next, step - 1, 'minutes'), 'minutes')
    }
    children.push(
      <TimeSlice key={i} isNow={isNow} showlabel={isEven}
                 time={formatter.bind(null, date)}
      />
    )
    date = next
  }

  return (
    <div className='rbc-time-gutter'>
      {children}
    </div>
  )
}

TimeGutter.propTypes = {
  step: React.PropTypes.number.isRequired,
  now: React.PropTypes.instanceOf(Date).isRequired,
  min: React.PropTypes.instanceOf(Date).isRequired,
  max: React.PropTypes.instanceOf(Date).isRequired
}

export default TimeGutter
