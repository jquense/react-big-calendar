import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from '../events'

let Timeslots = () => (
  <BigCalendar
    events={events}
    step={15}
    timeslots={8}
    defaultView="week"
    defaultDate={new Date(2015, 3, 12)}
  />
)

export default Timeslots
