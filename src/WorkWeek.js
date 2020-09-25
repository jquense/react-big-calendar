import PropTypes from 'prop-types'
import React from 'react'

import Week from './Week'
import TimeGrid from './TimeGrid'

function workWeekRange(date, options) {
  return Week.range(date, options).filter(
    d => [6, 0].indexOf(d.getDay()) === -1
  )
}

const WorkWeek = ({ date, ...props }) => (
  <TimeGrid
    {...props}
    date={date}
    range={workWeekRange(date, props)}
    eventOffset={15}
  />
)

WorkWeek.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
}

WorkWeek.defaultProps = TimeGrid.defaultProps

WorkWeek.range = workWeekRange

WorkWeek.navigate = Week.navigate

WorkWeek.title = (date, { localizer }) => {
  let [start, ...rest] = workWeekRange(date, { localizer })

  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}

export default WorkWeek
