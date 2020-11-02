import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'

import BackgroundWrapper from './BackgroundWrapper'

const TimeSlotGroup = ({
  renderSlot,
  resource,
  group,
  getters,
  components: { timeSlotWrapper: Wrapper = BackgroundWrapper } = {},
}) => {
  const groupProps = getters ? getters.slotGroupProp() : {}

  return (
    <div className="rbc-timeslot-group" {...groupProps}>
      {group.map((value, idx) => {
        const slotProps = getters ? getters.slotProp(value, resource) : {}
        return (
          <Wrapper key={idx} value={value} resource={resource}>
            <div
              {...slotProps}
              className={clsx('rbc-time-slot', slotProps.className)}
            >
              {renderSlot && renderSlot(value, idx)}
            </div>
          </Wrapper>
        )
      })}
    </div>
  )
}

TimeSlotGroup.propTypes = {
  renderSlot: PropTypes.func,
  group: PropTypes.array.isRequired,
  resource: PropTypes.any,
  components: PropTypes.object,
  getters: PropTypes.object,
}

export default TimeSlotGroup
