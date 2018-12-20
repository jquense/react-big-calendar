import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ label }) => {
  return <span className="rbc-header-label">{label}</span>
}

Header.propTypes = {
  label: PropTypes.node,
}

export default Header
