import cn from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import BackgroundWrapper from './BackgroundWrapper'

export default class TimeSlotGroup extends Component {
  render() {
    const {
      renderSlot,
      resource,
      group,
      getters,
      groupId,
      components: { timeSlotWrapper: Wrapper = BackgroundWrapper } = {},
    } = this.props

    return (
      <div className="rbc-timeslot-group">
        {group.map((value, idx) => {
          const slotProps = getters ? getters.slotProp(value, resource) : {}

          if (groupId != null) {
            slotProps['data-time'] = value
            slotProps['data-resource-id'] = resource
            slotProps['data-timeslot-id'] = groupId * group.length + idx
            slotProps['aria-label'] = slotProps['aria-label']
              ? slotProps['aria-label']
              : value && value.toLocaleTimeString()
          }

          return (
            <Wrapper key={idx} value={value} resource={resource}>
              <div
                {...slotProps}
                tabIndex={-1}
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

TimeSlotGroup.propTypes = {
  renderSlot: PropTypes.func,
  group: PropTypes.array.isRequired,
  resource: PropTypes.any,
  components: PropTypes.object,
  getters: PropTypes.object,
  groupId: PropTypes.number,
}
