import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ label }) => {
  return <span>{label}</span>
}

Header.propTypes = {
  label: PropTypes.node,
}

export default Header
