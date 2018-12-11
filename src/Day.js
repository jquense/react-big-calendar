import PropTypes from 'prop-types'
import React from 'react'

import dates from './utils/dates'
import { navigate } from './utils/constants'
import TimeGrid from './TimeGrid'

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

Day.navigate = (date, action, { enabledDays }) => {
  // enabledDays being non-empty but containing invalid values would lead to
  // an infinite loop, throw instead if the loop goes on for too long
  let circuitBreaker = 0

  switch (action) {
    case navigate.PREVIOUS: {
      let previousDay = dates.add(date, -1, 'day')
      if (enabledDays && enabledDays.length) {
        while (!enabledDays.includes(previousDay.getDay())) {
          if (circuitBreaker++ > 10) {
            throw new Error(
              'cannot find a suitable days to navigate to, most likely because enabledDays value is incorrect'
            )
          }

          previousDay = dates.add(previousDay, -1, 'day')
        }
      }

      return previousDay
    }

    case navigate.NEXT: {
      let nextDay = dates.add(date, 1, 'day')
      if (enabledDays && enabledDays.length) {
        while (!enabledDays.includes(nextDay.getDay())) {
          if (circuitBreaker++ > 10) {
            throw new Error(
              'cannot find a suitable days to navigate to, most likely because enabledDays value is incorrect'
            )
          }

          nextDay = dates.add(nextDay, 1, 'day')
        }
      }

      return nextDay
    }

    default:
      return date
  }
}

Day.title = (date, { localizer }) => localizer.format(date, 'dayHeaderFormat')

export default Day
