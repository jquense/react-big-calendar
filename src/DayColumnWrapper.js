import React from 'react'

const DayColumnWrapper = ({ children, className, style }) => {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

export default DayColumnWrapper
