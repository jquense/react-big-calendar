import PropTypes from 'prop-types'
import React from 'react'

const ResourceHeader = ({ label, index }) => {
  return (
    <div className="rbc-row rbc-row-resource">
      <div key={`resource_${index}`} className="rbc-header">
        {label}
      </div>
    </div>
  )
}

ResourceHeader.propTypes = {
  label: PropTypes.node,
  index: PropTypes.number,
  resouce: PropTypes.object,
}

export default ResourceHeader
