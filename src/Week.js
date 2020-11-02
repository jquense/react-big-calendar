import PropTypes from 'prop-types'
import React from 'react'
import * as dates from './utils/dates'
import { navigate } from './utils/constants'
import TimeGrid from './TimeGrid'

const Week = ({ date, ...props }) => (
  <TimeGrid
    {...props}
    date={date}
    range={Week.range(date, props)}
    eventOffset={15}
  />
)

Week.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
}

Week.defaultProps = TimeGrid.defaultProps

Week.navigate = (date, action) => {
  switch (action) {
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'week')

    case navigate.NEXT:
      return dates.add(date, 1, 'week')

    default:
      return date
  }
}

Week.range = (date, { localizer }) => {
  const firstOfWeek = localizer.startOfWeek()
  const start = dates.startOf(date, 'week', firstOfWeek)
  const end = dates.endOf(date, 'week', firstOfWeek)

  return dates.range(start, end)
}

Week.title = (date, { localizer }) => {
  const [start, ...rest] = Week.range(date, { localizer })
  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}

export default Week
