import React, { Component, PropTypes } from 'react'
import dates from '../utils/dates';
import moment from 'moment'
import TimeSlice from './TimeSlice.jsx'

export default class TimeGutter extends Component {
  render() {
    const totalMin = dates.diff(this.props.min, this.props.max, 'minutes')
    const numSlots = Math.ceil(totalMin / this.props.step)
    const children = []

    let date = this.props.min
    let next = date
    let isNow = false
    let isEven = true

    for (var i = 0; i < numSlots; i++) {
      next = dates.add(date, this.props.step, 'minutes');
      isEven = (i % 2) === 0
      if (isEven) {
        isNow = dates.inRange(this.props.now, date, dates.add(next, this.props.step - 1, 'minutes'), 'minutes')
      }
      children.push(
        <TimeSlice key={i} isNow={isNow} showlabel={isEven}
                   time={this.props.formatter.bind(null, date)}
        />
      )
      date = next
    }

    return (
      <div className='rbc-time-gutter'>
        {children}
      </div>
    )
  }
}

TimeGutter.defaultProps = {
  step: 10,
  formatter: (time) => moment(time).format('h:mm A')
}

TimeGutter.propTypes = {
  step: React.PropTypes.number.isRequired,
  now: React.PropTypes.instanceOf(Date).isRequired,
  min: React.PropTypes.instanceOf(Date).isRequired,
  max: React.PropTypes.instanceOf(Date).isRequired
}
