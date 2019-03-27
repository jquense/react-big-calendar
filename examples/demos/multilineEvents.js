import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from '../events'
import dates from '../../src/utils/dates'

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

function Event({ event }) {
  return (
    <span>
      <p>
        {event.title}
        {event.desc && ':  ' + event.desc}
      </p>
      {/* {Math.random() > 0.5 && <p>Second Line</p>} */}
      <p>Second Line</p>
    </span>
  )
}

let MultilineEvents = ({ localizer }) => (
  <BigCalendar
    events={events}
    views={allViews}
    step={60}
    showMultiDayTimes
    max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
    defaultDate={new Date(2015, 3, 1)}
    localizer={localizer}
    components={{
      month: {
        event: Event,
      },
    }}
  />
)

export default MultilineEvents
