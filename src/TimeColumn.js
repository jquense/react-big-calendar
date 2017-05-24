import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cn from 'classnames';

import dates from './utils/dates';
import { elementType } from './utils/propTypes';
import BackgroundWrapper from './BackgroundWrapper';
import TimeSlotGroup from './TimeSlotGroup'
import moment from 'moment'

export default class TimeColumn extends Component {
  static propTypes = {
    step: PropTypes.number.isRequired,
    culture: PropTypes.string,
    timeslots: PropTypes.number.isRequired,
    now: PropTypes.instanceOf(Date).isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    showLabels: PropTypes.bool,
    timeGutterFormat: PropTypes.string,
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    areSlotsDynamic: PropTypes.bool,
    dynamicSlots: PropTypes.array,

    dayWrapperComponent: elementType,
  }
  static defaultProps = {
    step: 30,
    timeslots: 2,
    showLabels: false,
    type: 'day',
    className: '',
    areSlotsDynamic: false,
    dynamicSlots: [],
    dayWrapperComponent: BackgroundWrapper,
  }

  renderTimeSliceGroup(key, isNow, date, durationInMinutes) {
    const { dayWrapperComponent, timeslots, showLabels, step, timeGutterFormat, culture } = this.props;

    return (
      <TimeSlotGroup
        key={key}
        isNow={isNow}
        value={date}
        step={step}
        culture={culture}
        timeslots={timeslots}
        showLabels={showLabels}
        timeGutterFormat={timeGutterFormat}
        dayWrapperComponent={dayWrapperComponent}
        durationInMinutes={durationInMinutes}
      />
    )
  }

  render() {
    const { className, children, style, now, min, max, step, timeslots, areSlotsDynamic, dynamicSlots } = this.props;
    const totalMin = dates.diff(min, max, 'minutes')
    const numGroups = Math.ceil(totalMin / (step * timeslots))
    const renderedSlots = []
    const groupLengthInMinutes = step * timeslots

    let date = min
    let next = date
    let isNow = false


    if (areSlotsDynamic) {
      for (let j = 0; j < dynamicSlots.length - 1; j++){
        const slotStart = moment(dynamicSlots[j], 'HH:mm');
        const slotEnd = moment(dynamicSlots[j+1], 'HH:mm');
        const start = moment(date).hour(slotStart.hour()).minute(slotStart.minute());
        const end = moment(date).hour(slotEnd.hour()).minute(slotEnd.minute());
        const durationInMinutes = end.diff(start, 'minutes');
        renderedSlots.push(this.renderTimeSliceGroup(j, false, date, durationInMinutes));
        date = dates.add(date, durationInMinutes, 'minutes');
      }
    } else {
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
