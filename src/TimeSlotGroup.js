import PropTypes from 'prop-types'
import React, { Component } from 'react'
import TimeSlot from './TimeSlot'
import dates from './utils/dates.js'
import localizer from './localizer'
import { elementType, dateFormat } from './utils/propTypes'

export default class TimeSlotGroup extends Component {
  static propTypes = {
    dayWrapperComponent: elementType,
    timeslots: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    value: PropTypes.object.isRequired,
    showLabels: PropTypes.bool,
    isNow: PropTypes.bool,
    slotPropGetter: PropTypes.func,
    timeGutterFormat: dateFormat,
    culture: PropTypes.string,
    timezone: PropTypes.string.isRequired,
    resource: PropTypes.string,
  }
  static defaultProps = {
    timeslots: 2,
    step: 30,
    isNow: false,
    showLabels: false,
  }

  renderSlice(slotNumber, content, value) {
    const {
      dayWrapperComponent,
      showLabels,
      isNow,
      culture,
      resource,
      slotPropGetter,
    } = this.props
    return (
      <TimeSlot
        key={slotNumber}
        slotPropGetter={slotPropGetter}
        dayWrapperComponent={dayWrapperComponent}
        showLabel={showLabels && !slotNumber}
        content={content}
        culture={culture}
        isNow={isNow}
        resource={resource}
        value={value}
      />
    )
  }

  renderSlices() {
    const ret = []
    const sliceLength = this.props.step
    let sliceValue = dates.minutes(this.props.value, 0)
    for (let i = 0; i < this.props.timeslots; i++) {
      const content = localizer.format(
        sliceValue,
        this.props.timeGutterFormat,
        this.props.culture
      )
      ret.push(this.renderSlice(i, content, sliceValue))
      sliceValue = dates.add(sliceValue, sliceLength, 'minutes')
    }
    return ret
  }
  render() {
    return <div className="rbc-timeslot-group">{this.renderSlices()}</div>
  }
}
