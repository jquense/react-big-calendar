import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

import BackgroundWrapper from './BackgroundWrapper'

const TimeSlotGroup = props => {
  const {
    renderSlot,
    resource,
    group,
    getters,
    components: { timeSlotWrapper: Wrapper = BackgroundWrapper } = {},
  } = props

  return (
    <div className="rbc-timeslot-group">
      {group.map((value, idx) => {
        const slotProps = getters ? getters.slotProp(value) : {}
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

TimeSlotGroup.propTypes = {
  renderSlot: PropTypes.func,
  group: PropTypes.array.isRequired,
  resource: PropTypes.any,
  components: PropTypes.object,
  getters: PropTypes.object,
}

export default TimeSlotGroup
