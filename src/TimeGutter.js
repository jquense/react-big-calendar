import clsx from 'clsx'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'

import * as TimeSlotUtils from './utils/TimeSlots'
import TimeSlotGroup from './TimeSlotGroup'

const TimeGutter = ({
  components,
  getNow,
  getters,
  localizer,
  min,
  max,
  resource,
  step,
  timeslots,
}) => {
  const slotMetrics = useRef(
    TimeSlotUtils.getSlotMetrics({
      min,
      max,
      timeslots,
      step,
    })
  )

  const skipFirstRun = useRef(true)
  useEffect(() => {
    // like componentWillReceiveProps
    if (skipFirstRun.current) {
      skipFirstRun.current = false
      return
    }

    slotMetrics.current.update({ min, max, timeslots, step })
  }, [min, max, timeslots, step])

  const renderSlot = (value, idx) => {
    if (idx !== 0) return null
    const isNow = slotMetrics.current.dateIsInGroup(getNow(), idx)
    return (
      <span className={clsx('rbc-label', isNow && 'rbc-now')}>
        {localizer.format(value, 'timeGutterFormat')}
      </span>
    )
  }

  return (
    <div className="rbc-time-gutter rbc-time-column">
      {slotMetrics.current.groups.map((grp, idx) => {
        return (
          <TimeSlotGroup
            key={idx}
            group={grp}
            resource={resource}
            components={components}
            renderSlot={renderSlot}
            getters={getters}
          />
        )
      })}
    </div>
  )
}

TimeGutter.propTypes = {
  min: PropTypes.instanceOf(Date).isRequired,
  max: PropTypes.instanceOf(Date).isRequired,
  timeslots: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  getNow: PropTypes.func.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object,

  localizer: PropTypes.object.isRequired,
  resource: PropTypes.string,
}

export default TimeGutter
