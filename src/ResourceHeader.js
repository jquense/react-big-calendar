import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ResourceHeader = ({ label }) => <Fragment>{label}</Fragment>

ResourceHeader.propTypes = {
  label: PropTypes.node,
  index: PropTypes.number,
  resource: PropTypes.object,
}

export default ResourceHeader
