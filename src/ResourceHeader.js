import PropTypes from 'prop-types'
import React from 'react'

const containerStyles = { display: 'flex', flexDirection: 'column' }
const textStyles = { margin: 0 }

const ResourceHeader = ({ title, mins }) => {
  return (
    <div style={containerStyles}>
      <p style={textStyles}>{title}</p>
      <p style={textStyles}>{mins}</p>
    </div>
  )
}

ResourceHeader.propTypes = {
  title: PropTypes.node,
  mins: PropTypes.number,
  index: PropTypes.number,
  resource: PropTypes.object,
}

export default ResourceHeader
