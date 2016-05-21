import React, { PropTypes, Component } from 'react'
import TimeSliceGroup from './TimeSliceGroup.jsx'
import SelectableTimeSlice from '../containers/SelectableTimeSlice.jsx'

export default class DaySliceGroup extends TimeSliceGroup {
  renderSlice(i, className, value) {
    return <SelectableTimeSlice key={i} showlabel={false} time={this.props.time} value={value} isNow={this.props.isNow}
                  classNames={`${className} day-slot`} />
  }
}
