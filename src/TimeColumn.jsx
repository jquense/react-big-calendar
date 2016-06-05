import React, { Component, PropTypes } from 'react'
import cn from 'classnames';

import dates from './utils/dates';

import TimeSliceGroup from './TimeSliceGroup.jsx'

export default class TimeColumn extends Component {
  static propTypes = {
    step: PropTypes.number.isRequired,
    slices: PropTypes.number.isRequired,
    now: PropTypes.instanceOf(Date).isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    showLabels: PropTypes.bool,
    timeGutterFormat: PropTypes.string,
    type: PropTypes.string.isRequired,
    className: PropTypes.string
  }
  static defaultProps = {
    step: 30,
    slices: 2,
    showLabels: true,
    type: 'day',
    className: ''
  }

  renderTimeSliceGroup(key, isNow, date) {
    return <TimeSliceGroup key={key}
                           isNow={isNow}
                           slices={this.props.slices}
                           step={this.props.step}
                           showLabels={this.props.showLabels}
                           timeGutterFormat={this.props.timeGutterFormat}
                           value={date}
    />
  }

  render() {
    const totalMin = dates.diff(this.props.min, this.props.max, 'minutes')
    const numGroups = Math.ceil(totalMin / (this.props.step * this.props.slices))
    const timeslots = []
    const groupLengthInMinutes = this.props.step * this.props.slices
    let baseCss
    
    switch (this.props.type) {
      case 'gutter' :
        baseCss = 'rbc-time-gutter'
        break;
      case 'day' :
      default:
        baseCss = 'rbc-day-slot'
        break
    }

    let date = this.props.min
    let next = date
    let isNow = false

    for (var i = 0; i < numGroups; i++) {
      isNow = dates.inRange(this.props.now, date, dates.add(next, groupLengthInMinutes - 1, 'minutes'), 'minutes')
      next = dates.add(date, groupLengthInMinutes, 'minutes');
      timeslots.push(this.renderTimeSliceGroup(i, isNow, date))

      date = next
    }

    return (
      <div className={cn(baseCss, this.props.className)}>
        {timeslots}
        {this.props.children}
      </div>
    )
  }
}
