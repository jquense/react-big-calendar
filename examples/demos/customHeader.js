import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from '../events'
import { views } from '../../src/utils/constants'

const getLabel = view => {
  switch (view) {
    case views.AGENDA:
      return 'Custom Agenda Toolbar Title'
    case views.DAY:
      return 'Custom Day Toolbar Title'
    case views.MONTH:
      return 'Custom Month Toolbar Title'
    case views.WEEK:
      return 'Custom Week Toolbar Title'
    case views.WORK_WEEK:
      return 'Custom Work Week Toolbar Title'
  }
}

let MyOtherNestedComponent = () => <div>NESTED COMPONENT</div>

let MyCustomHeader = ({ label }) => (
  <div>
    CUSTOM HEADER:
    <div>{label}</div>
    <MyOtherNestedComponent />
  </div>
)

let CustomHeader = ({ localizer }) => (
  <BigCalendar
    events={events}
    localizer={localizer}
    defaultDate={new Date(2015, 3, 1)}
    components={{
      day: { header: MyCustomHeader },
      week: { header: MyCustomHeader },
      month: { header: MyCustomHeader },
    }}
    getLabel={getLabel}
  />
)

export default CustomHeader
