import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'

import * as TimeSlotUtils from './utils/TimeSlots'
import TimeSlotGroup from './TimeSlotGroup'

const TimeGutter = ({
  min,
  max,
  timeslots,
  step,
  localizer,
  getNow,
  resource,
  components,
  getters,
  gutterRef,
}) => {
  const [slotMetrics, setSlotMetrics] = useState(
    TimeSlotUtils.getSlotMetrics({
      min,
      max,
      timeslots,
      step,
      localizer,
    })
  )

  useEffect(() => {
    if (slotMetrics) {
      setSlotMetrics(
        slotMetrics.update({
          min,
          max,
          timeslots,
          step,
          localizer,
        })
      )
    }
    /**
     * We don't want this to fire when slotMetrics is updated as it would recursively bomb
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max, timeslots, step])

  const renderSlot = (value, idx) => {
    if (idx) return null // don't return the first (0) idx

    const isNow = slotMetrics.dateIsInGroup(getNow(), idx)
    return (
      <span className={clsx('rbc-label', isNow && 'rbc-now')}>
        {localizer.format(value, 'timeGutterFormat')}
      </span>
    )
  }

  return (
    <div className="rbc-time-gutter rbc-time-column" ref={gutterRef}>
      {slotMetrics.groups.map((grp, idx) => {
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
  gutterRef: PropTypes.any,
}

export default React.forwardRef((props, ref) => (
  <TimeGutter gutterRef={ref} {...props} />
))
