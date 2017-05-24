import PropTypes from 'prop-types';
import React from 'react'

const DateHeader = ({ label, drillDownView, onDrillDown }) => {
    if (!drillDownView) {
      return (<span>{label}</span>)
    }

    return (
      <a href="#" onClick={onDrillDown}>
        {label}
      </a>
    )
}

DateHeader.propTypes = {
  label: PropTypes.node,
  date: PropTypes.instanceOf(Date),
  drillDownView: PropTypes.string,
  onDrillDown: PropTypes.func,
  isOffRange: PropTypes.bool
}

export default DateHeader
