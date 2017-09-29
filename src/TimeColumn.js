import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cn from 'classnames';

import dates from './utils/dates';
import { elementType, dateFormat } from './utils/propTypes';
import BackgroundWrapper from './BackgroundWrapper';
import TimeSlotGroup from './TimeSlotGroup'

export default class TimeColumn extends Component {
  static propTypes = {
    step: PropTypes.number.isRequired,
    culture: PropTypes.string,
    timeslots: PropTypes.number.isRequired,
    now: PropTypes.instanceOf(Date).isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    showLabels: PropTypes.bool,
    timeGutterFormat: dateFormat,
    type: PropTypes.string.isRequired,
    className: PropTypes.string,

    slotPropGetter: PropTypes.func,
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

  renderTimeSliceGroup(key, isNow, date) {
    const { dayWrapperComponent, timeslots, showLabels, step, slotPropGetter, timeGutterFormat, culture } = this.props;

    return (
      <TimeSlotGroup
        key={key}
        isNow={isNow}
        value={date}
        step={step}
        slotPropGetter={slotPropGetter}
        culture={culture}
        timeslots={timeslots}
        showLabels={showLabels}
        timeGutterFormat={timeGutterFormat}
        dayWrapperComponent={dayWrapperComponent}
      />
    )
  }

  render() {
    const { className, children, style, now, min, max, step, timeslots } = this.props;
    const totalMin = dates.diff(min, max, 'minutes')
    const numGroups = Math.ceil(totalMin / (step * timeslots))
    const renderedSlots = []
    const groupLengthInMinutes = step * timeslots

    let date = min
    let next = date
    let isNow = false

    for (var i = 0; i < numGroups; i++) {
      isNow = dates.inRange(
          now
        , date
        , dates.add(next, groupLengthInMinutes - 1, 'minutes')
        , 'minutes'
      )

      next = dates.add(date, groupLengthInMinutes, 'minutes');
      renderedSlots.push(this.renderTimeSliceGroup(i, isNow, date))

      date = next
    }

    return (
      <div
        className={cn(className, 'rbc-time-column')}
        style={style}
      >
        {renderedSlots}
        {children}
      </div>
    )
  }
}
