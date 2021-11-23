import React from 'react'
import PropTypes from 'prop-types'

const DayColumnWrapper = ({ children, className, style, innerRef }) => {
  return (
    <div className={className} style={style} ref={innerRef}>
      {children}
    </div>
  )
}

DayColumnWrapper.propTypes = {
  innerRef: PropTypes.object.isRequired,
}

export default DayColumnWrapper
