import React, { Component, PropTypes } from 'react'

export default class TimeSlice extends Component {
  render() {
    return (
      <div className={`rbc-time-slot${this.props.isNow ? ' rbc-now' : ''}`}>
        {this.props.showlabel ? this.props.time() : ''}
      </div>
    )
  }
}

TimeSlice.defaultProps = {
  isNow: false,
  time: () => '',
  showlabel: true
}

TimeSlice.propTypes = {
  time: PropTypes.func.isRequired,
  isNow: PropTypes.bool,
  showloabel: PropTypes.bool
}
