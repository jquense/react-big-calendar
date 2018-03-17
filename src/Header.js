import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ label }) => {
  return <span title={label}>{label}</span>
}

Header.propTypes = {
  label: PropTypes.node,
}

export default Header
