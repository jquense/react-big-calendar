import React, {PropTypes} from 'react'

const TimeSlice = ({isNow = false, time = () => '', showlabel = true}) => {
  return (
    <div className={`rbc-time-slot${isNow ? ' rbc-now' : ''}`}>
      {showlabel ? time() : ''}
    </div>
  )
}

TimeSlice.propTypes = {
  time: PropTypes.func.isRequired,
  isNow: PropTypes.bool,
  showloabel: PropTypes.bool
}

export default TimeSlice
