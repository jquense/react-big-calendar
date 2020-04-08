import PropTypes from 'prop-types'
import React from 'react'
import * as dates from './utils/dates'
import { navigate } from './utils/constants'
import TimeGridRow from './TimeGridRow'

class Scheduler extends React.Component {
  render() {
    let { date, scrollToDay, ...props } = this.props
    let range = Scheduler.range(date, this.props)

    return <TimeGridRow scrollToDay={scrollToDay} {...props} range={range} eventOffset={15}/>
  }
}

Scheduler.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
}

Scheduler.defaultProps = TimeGridRow.defaultProps

Scheduler.navigate = (date, action) => {
  switch (action) {
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'week')

    case navigate.NEXT:
      return dates.add(date, 1, 'week')

    default:
      return date
  }
}

Scheduler.range = (date, { localizer }) => {
  let firstOfWeek = localizer.startOfWeek()
  let start = dates.startOf(date, 'week', firstOfWeek)
  let end = dates.endOf(date, 'week', firstOfWeek)

  return dates.range(start, end)
}

Scheduler.title = (date, { localizer }) => {
  let [start, ...rest] = Scheduler.range(date, { localizer })
  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}

export default Scheduler
