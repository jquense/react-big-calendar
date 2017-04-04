import React, { Component, PropTypes } from 'react'
import cn from 'classnames';

import dates from './utils/dates';
import { elementType } from './utils/propTypes';
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
    timeGutterFormat: PropTypes.string,
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
    groupHeight: PropTypes.number,
    dayWrapperComponent: elementType,

    dragThroughEvents: PropTypes.bool,

    // internal prop used to make slight changes in rendering
    isMultiGrid: PropTypes.bool,
  }
  static defaultProps = {
    step: 30,
    timeslots: 2,
    showLabels: false,
    type: 'day',
    className: '',
    dayWrapperComponent: BackgroundWrapper,

    isMultiGrid: false,
  }

  componentDidMount() {
    this.positionTimeIndicator();
    this.indicatorRefresh = window.setInterval(this.positionTimeIndicator, 60000);
  }

  componentDidUpdate() {
    // Don't position indicator on update for multi grid, because it can de-sync
    // the lines across the different columns if only some columns update but others don't.
    if (!this.props.isMultiGrid) {
      this.positionTimeIndicator();
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.indicatorRefresh);
  }

  rootRef = (div) => {
    this.root = div;
  }

  indicatorRef = (div) => {
    this.timeIndicator = div;
  }

  renderTimeSliceGroup(key, isNow, date) {
    const { dayWrapperComponent, timeslots, showLabels, step, timeGutterFormat, culture, groupHeight } = this.props;

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
        height={groupHeight}
      />
    )
  }

  render() {
    const { className, children, style, now, min, max, step, timeslots, isMultiGrid } = this.props;
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
        ref={this.rootRef}
      >
        <div ref={this.indicatorRef} className='rbc-current-time-indicator' />
        {isMultiGrid ? children : renderedSlots}
        {isMultiGrid ? renderedSlots : children}
      </div>
    )
  }

  positionTimeIndicator = () => {
    const { min, max, dragThroughEvents } = this.props;

    // this prop is only passed into this component from DayColumn, so here we're
    // excluding the time gutter TimeColumn from having a time indicator.
    if (!dragThroughEvents) return;

    const now = new Date();

    const secondsGrid = dates.diff(max, min, 'seconds');
    const secondsPassed = dates.diff(now, min, 'seconds');

    const timeIndicator = this.timeIndicator;
    const factor = secondsPassed / secondsGrid;

    if (this.root && now >= min && now <= max) {
      const pixelHeight = this.root.offsetHeight;
      const offset = Math.floor(factor * pixelHeight);

      timeIndicator.style.display = 'block';
      timeIndicator.style.left = 0;
      timeIndicator.style.right = 0;
      timeIndicator.style.top = offset + 'px';
    } else {
      timeIndicator.style.display = 'none';
    }
  }
}
