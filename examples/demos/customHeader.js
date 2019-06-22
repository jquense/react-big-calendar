import React from 'react'
import { Calendar } from 'react-big-calendar'
import events from '../events'

let MyOtherNestedComponent = () => <div>NESTED COMPONENT</div>

let MyCustomHeader = ({ label }) => (
  <div>
    CUSTOM HEADER:
    <div>{label}</div>
    <MyOtherNestedComponent />
  </div>
)

let CustomHeader = ({ localizer }) => (
  <Calendar
    events={events}
    localizer={localizer}
    defaultDate={new Date(2015, 3, 1)}
    components={{
      day: { header: MyCustomHeader },
      week: { header: MyCustomHeader },
      month: { header: MyCustomHeader },
    }}
  />
)

export default CustomHeader
