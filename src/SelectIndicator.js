import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'react-tippy'
import 'react-tippy/dist/tippy.css'

const renderTime = (time, localizer) => {
  if (localizer.format(time, 'minutesOnly') === '00') {
    // '00'
    return localizer.format(time, 'hoursOnly') // '5 PM'
  }
  return localizer.format(time, 'hourAndMinutes') // '5:00 PM'
}

const tooltipContent = (time, localizer) => {
  if (!time) {
    return 'Drag to create an event'
  }
  return renderTime(time, localizer)
}

const SelectIndicator = ({ top, startDate, tooltipProps, localizer }) => (
  <div className="pre-selection-time-indicator-parent" style={{ top }}>
    <Tooltip
      position="top"
      delay={0}
      arrow
      trigger="manual"
      open
      duration={150}
      distance={5}
      touchHold
      html={
        tooltipProps && tooltipProps.tooltipContent ? (
          tooltipProps.tooltipContent
        ) : (
          <div>{tooltipContent(startDate, localizer)}</div>
        )
      }
      unmountHTMLWhenHide
      {...tooltipProps}
    >
      <div className="pre-selection-time-indicator" />
    </Tooltip>
  </div>
)

SelectIndicator.propTypes = {
  top: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  tooltipProps: PropTypes.object,
}

SelectIndicator.displayName = 'SelectIndicator'

export default SelectIndicator
