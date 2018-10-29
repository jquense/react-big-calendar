import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
import { elementType } from './utils/propTypes'

const TimeSlot = props => {
  const { value, slotPropGetter } = props
  const Wrapper = this.props.dayWrapperComponent
  const { className, style } = (slotPropGetter && slotPropGetter(value)) || {}

  return (
    <Wrapper value={value}>
      <div
        style={style}
        className={cn(
          'rbc-time-slot',
          className,
          this.props.showLabel && 'rbc-label',
          this.props.isNow && 'rbc-now'
        )}
      >
        {this.props.showLabel && <span>{this.props.content}</span>}
      </div>
    </Wrapper>
  )
}

TimeSlot.propTypes = {
  dayWrapperComponent: elementType,
  value: PropTypes.instanceOf(Date).isRequired,
  isNow: PropTypes.bool,
  showLabel: PropTypes.bool,
  content: PropTypes.string,
  culture: PropTypes.string,
  slotPropGetter: PropTypes.func,
}

TimeSlot.defaultProps = {
  isNow: false,
  showLabel: false,
  content: '',
}

export default TimeSlot
