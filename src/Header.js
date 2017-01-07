import React from 'react'

const Header = ({ label }) => {
  return <span>{label}</span>
}

Header.propTypes = {
  label: React.PropTypes.node,
}

export default Header
