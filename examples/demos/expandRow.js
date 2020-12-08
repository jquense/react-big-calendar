import React from 'react'
import { Calendar } from 'react-big-calendar'
import events from '../events'
import ExampleControlSlot from '../ExampleControlSlot'

let ExpandRow = ({ localizer }) => (
  <React.Fragment>
    <ExampleControlSlot.Entry waitForOutlet>
      <strong>
        Click on the "Show More" link to expand the row and show all events.
      </strong>
    </ExampleControlSlot.Entry>
    <Calendar
      events={events}
      localizer={localizer}
      defaultDate={new Date(2015, 3, 1)}
      expandRow={true}
    />
  </React.Fragment>
)

export default ExpandRow
