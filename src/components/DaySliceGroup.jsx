import React, { PropTypes, Component } from 'react'
import TimeSliceGroup from './TimeSliceGroup.jsx'
import SelectableTimeSlice from '../containers/SelectableTimeSlice.jsx'

export default class DaySliceGroup extends TimeSliceGroup {
  renderSlice(i, className) {
    console.log(className)
    return <SelectableTimeSlice key={i} showlabel={false} time={this.props.time} isNow={this.props.isNow}
                  classNames={`${className} day-slot`} />
  }
}
