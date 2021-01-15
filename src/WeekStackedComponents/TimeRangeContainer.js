import React from 'react'
import PropTypes from 'prop-types'

import * as dates from '../utils/dates'
import TimeCell from './TimeCell'

const TimeRangeContainer = ({
  eventsInRow,
  range,
  group,
  now,
  accessors,
  components,
  getters,
}) => {
  return (
    <div className="rbc-week-range-container">
      {range.map((date, index) => {
        const events = eventsInRow.filter(event =>
          dates.eq(accessors.end(event), date, 'day')
        )

        return (
          <TimeCell
            key={index}
            timeSlot={dates.merge(date, group[0])}
            isToday={dates.eq(date, now, 'day')}
            events={events}
            accessors={accessors}
            components={components}
            getters={getters}
          />
        )
      })}
    </div>
  )
}

TimeRangeContainer.propTypes = {
  eventsInRow: PropTypes.array.isRequired,

  range: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  group: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  now: PropTypes.instanceOf(Date),

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
}

export default TimeRangeContainer
