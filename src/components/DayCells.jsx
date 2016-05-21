import React from 'react'
import TimeGutter from './TimeGutter.jsx'
import DaySliceGroup from './DaySliceGroup.jsx'

export default class DayCells extends TimeGutter {
  renderTimeSliceGroup(key, isNow, date) {
    return <DaySliceGroup key={key} isNow={isNow} slices={this.props.slices}
                           time={this.props.formatter} size={this.props.step} value={date}/>
  }
}
