import React, { PropTypes, Component } from 'react'
import TimeGutter from './TimeGutter.jsx'
import TimeSliceGroup from './TimeSliceGroup.jsx'

export default class DayCells extends TimeGutter {
  static propTypes = {
    value: PropTypes.instanceOf(Date).isRequired,
    index: PropTypes.number.isRequired,
    ...TimeGutter.propTypes
  }

  renderTimeSliceGroup(key, isNow, date) {
    return <TimeSliceGroup key={key} isNow={isNow} slices={this.props.slices}
                           time={this.props.formatter.bind(null, date)} />
  }

  render() {
    return (
      <div className="rbc-time-slot" />
    )
  }
}
