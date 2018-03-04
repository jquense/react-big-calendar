import PropTypes from 'prop-types'
import React, { Component } from 'react'
import cn from 'classnames'

import dates from './utils/dates'
import { elementType, dateFormat } from './utils/propTypes'
import BackgroundWrapper from './BackgroundWrapper'
import TimeSlotGroup from './TimeSlotGroup'
import { withPropsOnChange } from 'recompose'

class TimeColumn extends Component {
  static propTypes = {
    step: PropTypes.number.isRequired,
    culture: PropTypes.string,
    timeslots: PropTypes.number.isRequired,
    getNow: PropTypes.func.isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    showLabels: PropTypes.bool,
    timeGutterFormat: dateFormat,
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    resource: PropTypes.string,
    slices: PropTypes.arrayOf(PropTypes.object),

    slotPropGetter: PropTypes.func,
    dayPropGetter: PropTypes.func,
    dayWrapperComponent: elementType,
  }
  static defaultProps = {
    step: 30,
    timeslots: 2,
    showLabels: false,
    type: 'day',
    className: '',
    dayWrapperComponent: BackgroundWrapper,
  }

  renderTimeSliceGroup = ({ key, isNow, date, resource }) => {
    const {
      dayWrapperComponent,
      timeslots,
      showLabels,
      step,
      slotPropGetter,
      dayPropGetter,
      timeGutterFormat,
      culture,
    } = this.props

    return (
      <TimeSlotGroup
        key={key}
        isNow={isNow}
        value={date}
        step={step}
        slotPropGetter={slotPropGetter}
        dayPropGetter={dayPropGetter}
        culture={culture}
        timeslots={timeslots}
        resource={resource}
        showLabels={showLabels}
        timeGutterFormat={timeGutterFormat}
        dayWrapperComponent={dayWrapperComponent}
      />
    )
  }

  render() {
    const { className, children, style, slices } = this.props

    return (
      <div className={cn(className, 'rbc-time-column')} style={style}>
        {slices.map(this.renderTimeSliceGroup)}
        {children}
      </div>
    )
  }
}

export default withPropsOnChange(
  ['min', 'max', 'step', 'timeslots', 'resource'],
  ({ min, max, step, timeslots, getNow, resource }) => {
    const totalMin = dates.diff(min, max, 'minutes')
    const numGroups = Math.ceil(totalMin / (step * timeslots))
    const renderedSlots = []
    const groupLengthInMinutes = step * timeslots

    let date = min
    let next = date
    let now = getNow()
    let isNow = false

    for (var i = 0; i < numGroups; i++) {
      isNow = dates.inRange(
        now,
        date,
        dates.add(next, groupLengthInMinutes - 1, 'minutes'),
        'minutes'
      )

      next = dates.add(date, groupLengthInMinutes, 'minutes')
      renderedSlots.push({ key: i, isNow, date, resource })

      date = next
    }
    return { slices: renderedSlots }
  }
)(TimeColumn)
