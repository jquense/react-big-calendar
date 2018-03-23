import PropTypes from 'prop-types'
import React from 'react'

import dates from './utils/dates'
import { navigate } from './utils/constants'
import TimeGrid from './TimeGrid'
import localizer from './localizer'

class Day extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
  }

  render() {
    let { date, ...props } = this.props
    let range = Day.range(date)

    return <TimeGrid {...props} range={range} eventOffset={10} />
  }
}

Day.range = date => {
  return [dates.startOf(date, 'day')]
}

Day.navigate = (date, action) => {
  switch (action) {
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'day')

    case navigate.NEXT:
      return dates.add(date, 1, 'day')

    default:
      return date
  }
}

Day.title = (date, { formats, culture }) =>
  localizer.format(date, formats.dayHeaderFormat, culture)

export default Day
