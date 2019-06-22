import PropTypes from 'prop-types'
import React from 'react'

const NavigationButton = ({message, onClick, ...props}) =>{
  return (
    <button
      {...props}
      type="button"
      onClick={onClick}
    >
      {message}
    </button>
  )
}

export default NavigationButton

NavigationButton.propTypes = {
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}