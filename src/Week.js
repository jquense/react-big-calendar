import PropTypes from 'prop-types'
import React from 'react'
import * as dates from './utils/dates'
import { navigate } from './utils/constants'
import TimeGrid from './TimeGrid'

class Week extends React.Component {
  render() {
    let { date, ...props } = this.props
    let range = Week.range(date, this.props)

    return <TimeGrid {...props} range={range} eventOffset={15} />
  }
}

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
  let firstOfWeek = localizer.startOfWeek()
  let start = dates.startOf(date, 'week', firstOfWeek)
  let end = dates.endOf(date, 'week', firstOfWeek)

  return dates.range(start, end)
}

Week.title = (date, { localizer }) => {
  let [start, ...rest] = Week.range(date, { localizer })
  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}

export default Week
