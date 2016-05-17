import React from 'react';
import cn from 'classnames';
import moment from 'moment'
import '../less/gutter.less'

function* timeSlice(min, max, step) {
  let minutes = min
  const m = moment().startOf('day').add(min, 'minutes')
  while (minutes < max) {
    yield m
    minutes += max
    m.add(step, 'minutes')
  }
}

const TimeGutter = ({min = 0, max = 60*24, step = 10, timeGutterFormat = 'h:mm A', culture, ...props}) => {
  let today = new Date()
  const totalMin = max - min
  const numSlots = Math.ceil(totalMin / step)
  const date = moment().startOf('day').add(min, 'minutes')
  const children = []; //<div key={-1} className='rbc-time-slot rbc-day-header'>&nbsp;</div>

  const slicer = timeSlice(min, max, step)
  let val
  do {
    
    val = slicer.next()
  } while (!slicer.done)
  for (var i = 0; i < numSlots; i++) {
    let isEven = (i % 2) === 0;
    let next = dates.add(date, step, 'minutes');
    children.push(
      <div key={i}
        className={cn('rbc-time-slot', {
          'rbc-now': dates.inRange(today, date, next, 'minutes')
        })}
      >
      { isEven && (
          <span>{localizer.format(date, timeGutterFormat, culture)}</span>
        )
      }
      </div>
    )

  }

  return (
    <div className='rbc-time-gutter'>
      {children}
    </div>
  );
}

TimeGutter.propTypes = {
  step: React.PropTypes.number.isRequired,
  min: React.PropTypes.instanceOf(Date).isRequired,
  max: React.PropTypes.instanceOf(Date).isRequired
}

export default TimeGutter
