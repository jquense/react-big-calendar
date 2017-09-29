import PropTypes from 'prop-types'
import React from 'react'

import Week from './Week'
import TimeGrid from './TimeGrid'
import localizer  from './localizer';

function workWeekRange(date, options) {
  return Week.range(date, options).filter(
    d => [6, 0].indexOf(d.getDay()) === -1
  )
}

class WorkWeek extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
  }

  static defaultProps = TimeGrid.defaultProps

  render() {
    let { date, ...props } = this.props
    let range = workWeekRange(date, this.props)

    return <TimeGrid {...props} range={range} eventOffset={15} />
  }
}

WorkWeek.navigate = Week.navigate

WorkWeek.title = (date, { formats, culture }) => {
  let [start, ...rest] = workWeekRange(date, { culture })
  return localizer.format(
    { start, end: rest.pop() },
    formats.dayRangeHeaderFormat,
    culture
  );
}


export default WorkWeek
