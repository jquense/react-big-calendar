import PropTypes from 'prop-types'
import React, { Component } from 'react'

import * as TimeSlotUtils from './utils/TimeSlots'
import dates from './utils/dates'

export default class TimeIndicatorLine extends Component {
  static propTypes = {
    timeslots: PropTypes.number.isRequired,
    totalHeight: PropTypes.number,
    step: PropTypes.number.isRequired,
    getNow: PropTypes.func.isRequired,
    components: PropTypes.object.isRequired,

    localizer: PropTypes.object.isRequired,
    resource: PropTypes.string,
  }

  static defaultProps = {
    totalHeight: 1320,
  }

  constructor(...args) {
    super(...args)

    const { timeslots, step } = this.props
    const { min, max, now } = this.calculateMinMaxNow(this.props)
    this.slotMetrics = TimeSlotUtils.getSlotMetrics({
      min,
      max,
      timeslots,
      step,
    })

    this.state = {
      min,
      max,
      now,
    }
  }

  componentDidMount() {
    // set an interval (per minute)
    this.minuteTracker = window.setInterval(
      this.onMinuteChange.bind(this),
      60000
    )
  }

  componentWillReceiveProps(nextProps) {
    this.updateSlotMetrics(nextProps, this.state)
  }

  componentWillUnmount() {
    if (this.minuteTracker) {
      window.clearInterval(this.minuteTracker)
      this.minuteTracker = null
    }
  }

  onMinuteChange() {
    const newState = this.calculateMinMaxNow(this.props)
    this.updateSlotMetrics(this.props, newState)
    // every minute
    this.setState(newState) // update the min max values
  }

  getTimeIndicatorPosition() {
    const { min, max, now } = this.state
    const { totalHeight } = this.props
    if (now >= min && now <= max) {
      const { top: topPercentage } = this.slotMetrics.getRange(now, now)
      return (parseFloat(topPercentage) / 100) * totalHeight
    }
    return null
  }

  updateSlotMetrics(propsToUse, { min, max }) {
    const { timeslots, step } = propsToUse
    this.slotMetrics = this.slotMetrics.update({ min, max, timeslots, step })
  }

  calculateMinMaxNow(propsToUse = this.props) {
    const now = propsToUse.getNow ? propsToUse.getNow() : new Date()
    return {
      now,
      min: dates.startOf(now, 'day'),
      max: dates.endOf(now, 'day'),
    }
  }

  render() {
    // const {  components } = this.props
    const { now } = this.state
    if (now) {
      const top = this.getTimeIndicatorPosition()
      if (top) {
        return (
          <div
            className="rbc-current-time-indicator"
            style={{
              top,
            }}
          />
        )
      }
    }
    return null
  }
}
