import React from 'react'
import { Calendar } from 'react-big-calendar'
import events from '../events'
import ExampleControlSlot from '../ExampleControlSlot'

let Popup = ({ localizer }) => (
  <React.Fragment>
    <ExampleControlSlot.Entry waitForOutlet>
      <strong>
        Click the "+x more" link on any calendar day that cannot fit all the
        days events to see an inline popup of all the events.
      </strong>
    </ExampleControlSlot.Entry>
    <Calendar
      popup
      events={events}
      localizer={localizer}
      defaultDate={new Date(2015, 3, 1)}
    />
  </React.Fragment>
)

export default Popup
