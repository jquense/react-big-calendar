import React from 'react'

import dates from 'date-arithmetic'
import events from '../events'
import BigCalendar from 'react-big-calendar'
import localizer from 'react-big-calendar/lib/localizer'
import TimeGrid from 'react-big-calendar/lib/TimeGrid'

const getRange = (date, culture) => {
  let firstOfWeek = localizer.startOfWeek(culture)
  let start = dates.startOf(date, 'week', firstOfWeek)
  let end = dates.endOf(date, 'week', firstOfWeek)

  if (firstOfWeek === 1) {
    end = dates.subtract(end, 2, 'day')
  } else {
    start = dates.add(start, 1, 'day');
  }

  let dateInRange = start;
  let range = [];

  while (dates.inRange(dateInRange, start, end, 'day')) {
    range.push(dateInRange);
    dateInRange = dates.add(dateInRange, 1, 'day');
  }

  return range;
}

class MyWeek extends React.Component {
  render() {
    let { date, culture } = this.props
    let range = getRange(date, culture)

    return <TimeGrid {...this.props} range={range} eventOffset={15} />
  }
}

MyWeek.navigate = (date, action) => {
  switch (action) {
    case BigCalendar.Navigate.PREVIOUS:
      return dates.add(date, -1, 'week')

    case BigCalendar.Navigate.NEXT:
      return dates.add(date, 1, 'week')

    default:
      return date
  }
}

MyWeek.title = (date, { formats, culture }) => {
  return `My awesome week: ${date.toLocaleString()}`
}


let CustomView = () => (
  <BigCalendar
    events={events}
    defaultDate={new Date(2015, 3, 1)}
    views={{ month: true, week: MyWeek, work_week: true }}
    test="io"
  />
)

export default CustomView
