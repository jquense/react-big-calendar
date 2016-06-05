import React, { Component, PropTypes } from 'react'
import dates from './utils/dates';
import TimeSliceGroup from './TimeSliceGroup.jsx'

export default class TimeColumn extends Component {
  static propTypes = {
    step: PropTypes.number.isRequired,
    slices: PropTypes.number.isRequired,
    now: PropTypes.instanceOf(Date).isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    hidelabels: PropTypes.bool,
    timeGutterFormat: PropTypes.string
  }
  static defaultProps = {
    step: 10,
    slices: 2,
    hidelabels: false
  }

  renderTimeSliceGroup(key, isNow, date) {
    return <TimeSliceGroup key={key}
                           isNow={isNow}
                           slices={this.props.slices}
                           step={this.props.step}
                           showlabels={!this.props.hidelabels}
                           timeGutterFormat={this.props.timeGutterFormat}
                           value={date}
    />
  }

  render() {
    const totalMin = dates.diff(this.props.min, this.props.max, 'minutes')
    const numGroups = Math.ceil(totalMin / (this.props.step * this.props.slices))
    const children = []
    const groupLengthInMinutes = this.props.step * this.props.slices

    let date = this.props.min
    let next = date
    let isNow = false

    for (var i = 0; i < numGroups; i++) {
      isNow = dates.inRange(this.props.now, date, dates.add(next, groupLengthInMinutes - 1, 'minutes'), 'minutes')
      next = dates.add(date, groupLengthInMinutes, 'minutes');
      children.push(this.renderTimeSliceGroup(i, isNow, date))

      date = next
    }

    return (
      <div className='rbc-time-gutter'>
        {children}
      </div>
    )
  }
}
