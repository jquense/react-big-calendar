import React, { PropTypes, Component } from 'react'
import TimeSlot from './TimeSlot'
import date from './utils/dates.js'
import localizer from './localizer'
import { elementType } from './utils/propTypes'

export default class TimeSlotGroup extends Component {
  static propTypes = {
    dayWrapperComponent: elementType,
    timeslots: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    value: PropTypes.instanceOf(Date).isRequired,
    showLabels: PropTypes.bool,
    isNow: PropTypes.bool,
    timeGutterFormat: PropTypes.string,
    culture: PropTypes.string,
    height: PropTypes.number
  }
  static defaultProps = {
    timeslots: 2,
    step: 30,
    isNow: false,
    showLabels: false
  }

  renderSlice(slotNumber, content, value) {
    const { dayWrapperComponent, showLabels, isNow, culture } = this.props;
    return (
      <TimeSlot
        key={slotNumber}
        dayWrapperComponent={dayWrapperComponent}
        showLabel={showLabels}
        content={content}
        culture={culture}
        isNow={isNow}
        value={value}
      />
    )
  }

  renderSlices() {
    const ret = []
    const sliceLength = this.props.step
    let sliceValue = this.props.value
    let stepInterval = 0;
    for (let i = 0; i < this.props.timeslots; i++) {
      let content;
      if (i === 0) {
        content = localizer.format(sliceValue, this.props.timeGutterFormat, this.props.culture)
      } else {
        content = `:${stepInterval}`;
      }
      ret.push(this.renderSlice(i, content, sliceValue))
      sliceValue = date.add(sliceValue, sliceLength, 'minutes')
      stepInterval += this.props.step;
    }
    return ret
  }
  render() {
    const { style, height } = this.props;

    const groupStyle = { ...style };
    if (height) {
      groupStyle.minHeight = height;
    }

    return (
      <div className="rbc-timeslot-group" style={groupStyle}>
        {this.renderSlices()}
      </div>
    )
  }
}
