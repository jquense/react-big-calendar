import PropTypes from 'prop-types'
import React, { Component } from 'react'
import cn from 'classnames'
import { elementType } from './utils/propTypes'

export default class TimeSlot extends Component {
  static propTypes = {
    timeSlotWrapperComponent: elementType,
    value: PropTypes.instanceOf(Date).isRequired,
    showLabel: PropTypes.bool,
    slotPropGetter: PropTypes.func,
    resource: PropTypes.string,
  }

  static defaultProps = {
    showLabel: false,
    content: '',
  }

  render() {
    const { value, slotPropGetter, resource, children } = this.props
    const Wrapper = this.props.timeSlotWrapperComponent
    const { className, style } = (slotPropGetter && slotPropGetter(value)) || {}

    return (
      <Wrapper value={value} resource={resource}>
        <div
          style={style}
          className={cn('rbc-time-slot', className, children && 'rbc-label')}
        >
          {children}
        </div>
      </Wrapper>
    )
  }
}
