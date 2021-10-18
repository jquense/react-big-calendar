import PropTypes from 'prop-types'
import React from 'react'

import { navigate } from './utils/constants'
import TimeGrid from './TimeGrid'

class Day extends React.Component {
  render() {
    /**
     * This allows us to default min, max, and scrollToTime
     * using our localizer. This is necessary until such time
     * as TimeGrid is converted to a functional component.
     */
    let {
      date,
      localizer,
      min = localizer.startOf(new Date(), 'day'),
      max = localizer.endOf(new Date(), 'day'),
      scrollToTime = localizer.startOf(new Date(), 'day'),
      ...props
    } = this.props
    let range = Day.range(date, { localizer: localizer })

    return (
      <TimeGrid
        {...props}
        range={range}
        eventOffset={10}
        localizer={localizer}
        min={min}
        max={max}
        scrollToTime={scrollToTime}
      />
    )
  }
}

Day.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.any,
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
}

Day.range = (date, { localizer }) => {
  return [localizer.startOf(date, 'day')]
}

Day.navigate = (date, action, { localizer }) => {
  switch (action) {
    case navigate.PREVIOUS:
      return localizer.add(date, -1, 'day')

    case navigate.NEXT:
      return localizer.add(date, 1, 'day')

    default:
      return date
  }
}

Day.title = (date, { localizer }) => localizer.format(date, 'dayHeaderFormat')

export default Day
