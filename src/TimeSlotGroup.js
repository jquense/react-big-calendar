import cn from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import BackgroundWrapper from './BackgroundWrapper'

export default class TimeSlotGroup extends Component {
  /*
    Source prop is not provided by RBC, we added this to identify which parent component is rendering 
    TimeSlotGroups. i.e either TimeGutter or DayColumn.
  */
  static propTypes = {
    renderSlot: PropTypes.func,
    group: PropTypes.array.isRequired,
    resource: PropTypes.any,
    components: PropTypes.object,
    getters: PropTypes.object,
    source: PropTypes.string,
  }

  render() {
    const {
      renderSlot,
      resource,
      group,
      getters,
      source,
      components: { timeSlotWrapper: Wrapper = BackgroundWrapper } = {},
    } = this.props

    return (
      <div className="rbc-timeslot-group">
        {group.map((value, idx) => {
          const slotProps = getters ? getters.slotProp(value) : {}
          return (
            <Wrapper
              key={idx}
              index={idx}
              value={value}
              resource={resource}
              source={source}
            >
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
