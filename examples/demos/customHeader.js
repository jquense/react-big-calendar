import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from '../events'

let MyOtherNestedComponent = () => <div>NESTED COMPONENT</div>

let MyCustomHeader = ({ label }) => (
  <div>
    CUSTOM HEADER:
    <div>{label}</div>
    <MyOtherNestedComponent />
  </div>
)

let CustomHeader = () => (
  <BigCalendar
    events={events}
    defaultDate={new Date(2015, 3, 1)}
    components={{
      day: { header: MyCustomHeader },
      week: { header: MyCustomHeader },
      month: { header: MyCustomHeader },
    }}
  />
)

export default CustomHeader
