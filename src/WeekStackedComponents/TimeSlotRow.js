import React from 'react'
import PropTypes from 'prop-types'

import TimeRowGutter from './TimeRowGutter'
import TimeRangeContainer from './TimeRangeContainer'

const TimeSlotRow = ({
  eventsInRow,
  range,
  group,
  now,
  accessors,
  components,
  localizer,
}) => {
  return (
    <div className="rbc-time-slot-row">
      <TimeRowGutter group={group} localizer={localizer} />
      <TimeRangeContainer
        eventsInRow={eventsInRow}
        range={range}
        group={group}
        now={now}
        accessors={accessors}
        components={components}
      />
    </div>
  )
}

TimeSlotRow.propTypes = {
  eventsInRow: PropTypes.array.isRequired,

  range: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  group: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  now: PropTypes.instanceOf(Date),

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,
}

export default TimeSlotRow
