import PropTypes from 'prop-types'
import React from 'react'

const DateHeader = ({ label, drilldownView, onDrillDown }) => {
  if (!drilldownView) {
    return <span>{label}</span>
  }

  /**
   * TODO: replace href="#", as this will bork in many browsers now
   * convert to button with styling as a link
   */
  return (
    <a href="#" onClick={onDrillDown}>
      {label}
    </a>
  )
}

DateHeader.propTypes = {
  label: PropTypes.node,
  date: PropTypes.instanceOf(Date),
  drilldownView: PropTypes.string,
  onDrillDown: PropTypes.func,
  isOffRange: PropTypes.bool,
}

export default DateHeader
