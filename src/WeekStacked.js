import React from 'react'
import PropTypes from 'prop-types'

import * as dates from './utils/dates'
import { navigate } from './utils/constants'

import TimeRowGrid from './WeekStackedComponents/TimeRowGrid'

const WeekStacked = props => {
  const { date, ...restOfProps } = props
  const range = WeekStacked.range(date, props)

  return (
    <div className="rbc-week-stacked-view">
      <TimeRowGrid {...restOfProps} range={range} step={60} timeslots={1} />
    </div>
  )
}

WeekStacked.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
}

WeekStacked.range = (date, { localizer }) => {
  let firstOfWeek = localizer.startOfWeek()
  let start = dates.startOf(date, 'week', firstOfWeek)
  let end = dates.endOf(date, 'week', firstOfWeek)

  return dates.range(start, end)
}

WeekStacked.title = (date, { localizer }) => {
  let [start, ...rest] = WeekStacked.range(date, { localizer })
  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}

WeekStacked.navigate = (date, action) => {
  switch (action) {
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'week')

    case navigate.NEXT:
      return dates.add(date, 1, 'week')

    default:
      return date
  }
}

WeekStacked.range = (date, { localizer }) => {
  let firstOfWeek = localizer.startOfWeek()
  let start = dates.startOf(date, 'week', firstOfWeek)
  let end = dates.endOf(date, 'week', firstOfWeek)

  return dates.range(start, end)
}

export default WeekStacked
