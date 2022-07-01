import React from 'react'

const DayColumnWrapper = ({ children, className, style, innerRef }) => {
  return (
    <div className={className} style={style} ref={innerRef}>
      {children}
    </div>
  )
}

export default React.forwardRef((props, ref) => (
  <DayColumnWrapper {...props} innerRef={ref} />
))
