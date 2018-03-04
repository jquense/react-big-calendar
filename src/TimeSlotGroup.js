import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withPropsOnChange } from 'recompose'
import TimeSlot from './TimeSlot'
import date from './utils/dates.js'
import localizer from './localizer'
import { elementType, dateFormat } from './utils/propTypes'

class TimeSlotGroup extends Component {
  static propTypes = {
    dayWrapperComponent: elementType,
    timeslots: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    value: PropTypes.instanceOf(Date).isRequired,
    showLabels: PropTypes.bool,
    isNow: PropTypes.bool,
    slotPropGetter: PropTypes.func,
    timeGutterFormat: dateFormat,
    culture: PropTypes.string,
    resource: PropTypes.string,
    slices: PropTypes.arrayOf(PropTypes.object),
  }
  static defaultProps = {
    timeslots: 2,
    step: 30,
    isNow: false,
    showLabels: false,
  }

  renderSlice = ({ slotNumber, content, value }) => {
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

  render() {
    return (
      <div className="rbc-timeslot-group">
        {this.props.slices.map(this.renderSlice)}
      </div>
    )
  }
}

export default withPropsOnChange(
  ['step', 'value', 'timeslots'],
  ({ step, value, timeslots, timeGutterFormat, culture }) => {
    const ret = []
    const sliceLength = step
    let sliceValue = value
    for (let i = 0; i < timeslots; i++) {
      const content = localizer.format(sliceValue, timeGutterFormat, culture)
      ret.push({ slotNumber: i, content, value: sliceValue })
      sliceValue = date.add(sliceValue, sliceLength, 'minutes')
    }
    return { slices: ret }
  }
)(TimeSlotGroup)
