import React from 'react'
import PropTypes from 'prop-types'

class BackgroundWrapper extends React.Component {
  render() {
    return this.props.children
  }
}

BackgroundWrapper.propTypes = {
  children: PropTypes.element,
  value: PropTypes.object,
  range: PropTypes.arrayOf(PropTypes.object),
}

export default BackgroundWrapper
