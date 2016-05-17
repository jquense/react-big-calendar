import React, {PropTypes} from 'react'
import cn from 'classnames'

const TimeSlice = ({isNow = false, time = () => '', showlabel = true, classNames = ''}) => {
  return (
    <div className={cn('rbc-time-slot', isNow ? ' rbc-now' : '', classNames)}>
      <span>{showlabel ? time() : ''}</span>
    </div>
  )
}

TimeSlice.propTypes = {
  time: PropTypes.func.isRequired,
  isNow: PropTypes.bool,
  classNames: PropTypes.string,
  showlabel: PropTypes.bool
}

export default TimeSlice