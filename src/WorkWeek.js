import PropTypes from 'prop-types'
import React from 'react'
// import { DateTime } from 'luxon';
import Week from './Week'
import TimeGrid from './TimeGrid'

// Original code
function workWeekRange(date, options) {
  return Week.range(date, options).filter(
    (d) => [6, 0].indexOf(d.getDay()) === -1
  )
}

// Using Luxon
// function workWeekRange(date, options) {
//   // Destructuring the options object to extract the localizer
//   const { localizer } = options;
//   // Obtain an array of dates representing the full week (including weekends)
//   return Week.range(date, options).filter((d) => {
//     // Filtering Weekdays using a property of the Luxon DateTime object
//     const weekday = DateTime.fromJSDate(d, { locale: localizer.locale }).weekday;
//     // Excluding Saturday and Sunday
//     return weekday !== 6 && weekday !== 7;
//   });
// }

// @rodrigolungui code using luxon :
// function workWeekRange(date: Date, options) {
//   const weekRange = Week.range(date, options);

//   const SUNDAY = 7;
//   const SATURDAY = 6;

//   return weekRange.filter((day: Date) => {
//       return DateTime.fromJSDate(day).weekday !== SUNDAY && DateTime.fromJSDate(day).weekday !== SATURDAY;
//   });
// }

// Luxon agnostic code:
// function workWeekRange(date, options) {
//   return Week.range(date, options).filter((d) => {
//     const day = d.getDay(); // 0 for Sunday, 1 for Monday, etc.
//     return day !== 0 && day !== 6; // Exclude Sunday (0) and Saturday (6)
//   });
// }

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
      enableAutoScroll = true,
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
        enableAutoScroll={enableAutoScroll}
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
  enableAutoScroll: PropTypes.bool,
}

WorkWeek.defaultProps = TimeGrid.defaultProps

WorkWeek.range = workWeekRange

WorkWeek.navigate = Week.navigate

WorkWeek.title = (date, { localizer }) => {
  let [start, ...rest] = workWeekRange(date, { localizer })

  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}

export default WorkWeek
