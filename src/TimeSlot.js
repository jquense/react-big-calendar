import React, { PropTypes, Component } from 'react'
import cn from 'classnames'
import { elementType } from './utils/propTypes'
import { dateIsInBusinessHours } from './utils/helpers'


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

  render() {
    const { value, businessHours } = this.props;
    const Wrapper = this.props.dayWrapperComponent;
    const isDisabled = businessHours.length > 0 ? !dateIsInBusinessHours(value, businessHours) : false;

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
