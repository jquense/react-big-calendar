import React from 'react'

const propTypes = {}

function Card({ children, className, style }) {
  return (
    <div className={`${className || ''} card`} style={style}>
      {children}
    </div>
  )
}

Card.propTypes = propTypes

export default Card
