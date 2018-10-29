import PropTypes from 'prop-types'
import React from 'react'

import Week from './Week'
import TimeGrid from './TimeGrid'

const workWeekRange = (date, options) => {
  return Week.range(date, options).filter(
    d => [6, 0].indexOf(d.getDay()) === -1
  )
}

const WorkWeek = props => {
  let { date, ...other } = props
  let range = workWeekRange(date, props)

  return <TimeGrid {...other} range={range} eventOffset={15} />
}

WorkWeek.range = workWeekRange

WorkWeek.navigate = Week.navigate

WorkWeek.title = (date, { localizer }) => {
  let [start, ...rest] = workWeekRange(date, { localizer })

  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}

WorkWeek.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
}

WorkWeek.defaultProps = TimeGrid.defaultProps

export default WorkWeek
