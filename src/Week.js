import PropTypes from 'prop-types'
import React from 'react'
import { navigate } from './utils/constants'
import TimeGrid from './TimeGrid'
import { hasStateOrPropsChanged } from './utils/helpers'

class Week extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return hasStateOrPropsChanged(
      this.state,
      nextState,
      this.props,
      nextProps,
      [],
      false
    )
  }
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
    let range = Week.range(date, this.props)

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

Week.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.any,
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
}

Week.defaultProps = TimeGrid.defaultProps

Week.navigate = (date, action, { localizer }) => {
  switch (action) {
    case navigate.PREVIOUS:
      return localizer.add(date, -1, 'week')

    case navigate.NEXT:
      return localizer.add(date, 1, 'week')

    default:
      return date
  }
}

Week.range = (date, { localizer }) => {
  let firstOfWeek = localizer.startOfWeek()
  let start = localizer.startOf(date, 'week', firstOfWeek)
  let end = localizer.endOf(date, 'week', firstOfWeek)

  return localizer.range(start, end)
}

Week.title = (date, { localizer }) => {
  let [start, ...rest] = Week.range(date, { localizer })
  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}

export default Week
