import PropTypes from 'prop-types'
import React from 'react'

import Week from './Week'
import TimeGrid from './TimeGrid'

function workWeekRange(date, options) {
  return Week.range(date, options).filter(
    d => [6, 0].indexOf(d.getDay()) === -1
  )
}

class WorkWeek extends React.Component {
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
    let range = workWeekRange(date, this.props)
    return (
      <TimeGrid
        {...props}
        range={range}
        eventOffset={15}
        localizer={localizer}
        min={min}
        max={max}
        scrollToTime={scrollToTime}
      />
    )
  }
}

WorkWeek.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.any,
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
}

WorkWeek.defaultProps = TimeGrid.defaultProps

WorkWeek.range = workWeekRange

WorkWeek.navigate = Week.navigate

WorkWeek.title = (date, { localizer }) => {
  let [start, ...rest] = workWeekRange(date, { localizer })

  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}

export default WorkWeek
