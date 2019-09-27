import React from 'react'

// import * as dates from 'date-arithmetic'
import events from '../events'
import { Calendar, Views, Navigate } from 'react-big-calendar'
// import TimeGrid from 'react-big-calendar/lib/TimeGrid'
import ExampleControlSlot from '../ExampleControlSlot'

// class MyWeek extends React.Component {
//   render() {
//     let { date } = this.props
//     let range = MyWeek.range(date)

//     return <TimeGrid {...this.props} range={range} eventOffset={15} />
//   }
// }

// MyWeek.range = date => {
//   let start = date
//   let end = dates.add(start, 2, 'day')

//   let current = start
//   let range = []

//   while (dates.lte(current, end, 'day')) {
//     range.push(current)
//     current = dates.add(current, 1, 'day')
//   }

//   return range
// }

// MyWeek.navigate = (date, action) => {
//   switch (action) {
//     case Navigate.PREVIOUS:
//       return dates.add(date, -3, 'day')

//     case Navigate.NEXT:
//       return dates.add(date, 3, 'day')

//     default:
//       return date
//   }
// }

// MyWeek.title = date => {
//   return `My awesome week: ${date.toLocaleDateString()}`
// }

let CustomBooking = ({ localizer }) => (
  <React.Fragment>
    <ExampleControlSlot.Entry waitForOutlet>
      <strong>The Calendar below implments a booking view</strong>
    </ExampleControlSlot.Entry>
    <Calendar
      isBooking={true}
      events={events}
      disabledDates={[
        new Date(2015, 3, 0),
        new Date(2015, 3, 1),
        new Date(2015, 3, 2),
        new Date(2015, 3, 4),
        new Date(2015, 3, 3),
      ]}
      localizer={localizer}
      nextButtonContent={'>'}
      prevButtonContent={'<'}
      defaultView={Views.MONTH}
      defaultDate={new Date(2015, 3, 1)}
      views={{ month: true }}
    />
  </React.Fragment>
)

export default CustomBooking
