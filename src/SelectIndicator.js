import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'react-tippy'
import 'react-tippy/dist/tippy.css'
import renderTime from './utils/renderTime'

const tooltipContent = time => {
  if (!time) {
    return 'Drag to create an event'
  }
  return renderTime(time)
}

const SelectIndicator = ({ top, startDate, tooltipProps }) => (
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
          <div>{tooltipContent(startDate)}</div>
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
