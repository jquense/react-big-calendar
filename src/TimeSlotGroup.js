import cn from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { elementType } from './utils/propTypes'
import BackgroundWrapper from './BackgroundWrapper'

export default class TimeSlotGroup extends Component {
  static propTypes = {
    renderSlot: PropTypes.func,
    timeSlotWrapperComponent: elementType,
    group: PropTypes.array.isRequired,
    slotPropGetter: PropTypes.func,
    resource: PropTypes.string,
  }
  static defaultProps = {
    timeSlotWrapperComponent: BackgroundWrapper,
  }

  render() {
    const {
      renderSlot,
      resource,
      group,
      slotPropGetter,
      timeSlotWrapperComponent: Wrapper,
    } = this.props

    return (
      <div className="rbc-timeslot-group">
        {group.map((value, idx) => {
          const slotProps = (slotPropGetter && slotPropGetter(value)) || {}

          return (
            <Wrapper key={idx} value={value} resource={resource}>
              <div
                {...slotProps}
                className={cn('rbc-time-slot', slotProps.className)}
              >
                {renderSlot && renderSlot(value, idx)}
              </div>
            </Wrapper>
          )
        })}
      </div>
    )
  }
}
