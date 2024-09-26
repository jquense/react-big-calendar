import React from 'react'

const DayColumnWrapper = ({ children, className, style, innerRef }) => {
  return (
    <div className={className} style={style} ref={innerRef}>
      {children}
    </div>
  )
}

export default React.forwardRef((dayColumnWrapperProps, ref) => {
  const redBorder = dayColumnWrapperProps.resource % 2 === 0
  const style = {
    borderColor: redBorder ? 'red' : '#fff',
    borderStyle: 'solid',
    borderWidth: '1px',
  }

  return (
    <DayColumnWrapper {...dayColumnWrapperProps} style={style} innerRef={ref} />
  )
})
