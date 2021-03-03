import PropTypes from 'prop-types'
import React from 'react'

const DateFooter = ({ label }) => {
  return <span role="cell">{label}</span>
}

DateFooter.propTypes = {
  label: PropTypes.node,
  date: PropTypes.instanceOf(Date),
  isOffRange: PropTypes.bool,
}

export default DateFooter
