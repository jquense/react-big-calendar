import React from 'react';
import PropTypes from 'prop-types';

class BackgroundWrapper extends React.Component {
  render() {
    return this.props.children;
  }
}

BackgroundWrapper.propTypes = {
  children: PropTypes.element,
  isFirstInRange: PropTypes.bool,
  isLastInRange: PropTypes.bool,
}

export default BackgroundWrapper;
