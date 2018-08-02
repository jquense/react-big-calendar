import PropTypes from 'prop-types'
import React from 'react'

import dates from './utils/dates'
import { navigate } from './utils/constants'
import TimeGrid from './TimeGrid'
import localizer from './localizer'

class Day extends React.Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
  }

  render() {
    const { date, ...props } = this.props
    const start = dates.startOf(date, 'day')
    const end = dates.endOf(date, 'day')

    return (
      <TimeGrid
        {...props}
        range={[start]}
        min={start}
        max={end}
        eventOffset={10}
      />
    )
  }
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
