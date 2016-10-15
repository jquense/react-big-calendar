import React, { Component, PropTypes } from 'react'
import cn from 'classnames';

import dates from './utils/dates';

import TimeSlotGroup from './TimeSlotGroup'

export default class TimeColumn extends Component {
  static propTypes = {
    step: PropTypes.number.isRequired,
    timeslots: PropTypes.number.isRequired,
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
    timeslots: 2,
    showLabels: false,
    type: 'day',
    className: ''
  }

  renderTimeSliceGroup(key, isNow, date) {
    return (
      <TimeSlotGroup
        key={key}
        isNow={isNow}
        timeslots={this.props.timeslots}
        step={this.props.step}
        showLabels={this.props.showLabels}
        timeGutterFormat={this.props.timeGutterFormat}
        value={date}
      />
    )
  }

  render() {
    const totalMin = dates.diff(this.props.min, this.props.max, 'minutes')
    const numGroups = Math.ceil(totalMin / (this.props.step * this.props.timeslots))
    const timeslots = []
    const groupLengthInMinutes = this.props.step * this.props.timeslots

    let date = this.props.min
    let next = date
    let isNow = false

    for (var i = 0; i < numGroups; i++) {
      isNow = dates.inRange(
          this.props.now
        , date
        , dates.add(next, groupLengthInMinutes - 1, 'minutes')
        , 'minutes'
      )

      next = dates.add(date, groupLengthInMinutes, 'minutes');
      timeslots.push(this.renderTimeSliceGroup(i, isNow, date))

      date = next
    }

    return (
      <div
        className={cn(this.props.className, 'rbc-time-column', {'rbc-today': dates.isToday(this.props.max)})}
        style={this.props.style}
      >
        {timeslots}
        {this.props.children}
      </div>
    )
  }
}
