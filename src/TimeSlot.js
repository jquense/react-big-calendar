import React, {PropTypes, Component} from 'react'
import cn from 'classnames'
import {elementType} from './utils/propTypes'
import {extractHoursMinutesFromTime} from './utils/dates'


export default class TimeSlot extends Component {
  static propTypes = {
    dayWrapperComponent: elementType,
    value: PropTypes.instanceOf(Date).isRequired,
    isNow: PropTypes.bool,
    showLabel: PropTypes.bool,
    content: PropTypes.string,
    culture: PropTypes.string,
    isGutter: PropTypes.bool
  }

  static defaultProps = {
    isNow: false,
    showLabel: false,
    content: ''
  }

  isNotInBusinessHours() {
    const businessHours = this.props.businessHours;
    const hours = this.props.value.getHours();
    const weekDay = this.props.value.getDay();

    return !businessHours.some((businessHour) => {
      const start = extractHoursMinutesFromTime(businessHour.start);
      const end = extractHoursMinutesFromTime(businessHour.end);

      return businessHour.dow.includes(weekDay) && hours >= start.hours && hours < end.hours;
    });
  }

  render() {
    const {value} = this.props;
    const Wrapper = this.props.dayWrapperComponent;
    const isDisabled = this.props.businessHours.length > 0 ? this.isNotInBusinessHours() : false;

    return (
      <Wrapper value={value}>
        <div
          className={cn(
            'rbc-time-slot',
            this.props.showLabel && 'rbc-label',
            this.props.isNow && 'rbc-now',
            !this.props.isGutter && isDisabled && 'rbc-disabled'
          )}
        >
          {this.props.showLabel &&
          <span>{this.props.content}</span>
          }
        </div>
      </Wrapper>
    )
  }
}
