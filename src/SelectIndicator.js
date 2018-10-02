import React from 'react'
import PropTypes from 'prop-types'

const renderTime = (time, localizer) => {
  if (localizer.format(time, 'minutesOnly') === '00') {
    // '00'
    return localizer.format(time, 'hoursOnly') // '5 PM'
  }
  return localizer.format(time, 'hourAndMinutes') // '5:00 PM'
}

const getTooltipText = (time, localizer) =>
  !time ? 'Drag to create an event' : renderTime(time, localizer)

const SelectIndicator = props => {
  const { top, height, startDate, localizer } = props
  const newTopPerc = parseFloat(top) - parseFloat(height)
  return (
    <div
      className="pre-selection-time-indicator-parent"
      style={{ top: `${newTopPerc}%` }}
    >
      <div className="pre-selection-time-indicator-container">
        <div className="pre-selection-time-indicator-text">
          {getTooltipText(startDate, localizer)}
        </div>
        <div className="pre-selection-time-indicator-arrow" />
        <div className="pre-selection-time-indicator-line" />
      </div>
    </div>
  )
}

SelectIndicator.propTypes = {
  top: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.object.isRequired,
}

SelectIndicator.displayName = 'SelectIndicator'

export default SelectIndicator
