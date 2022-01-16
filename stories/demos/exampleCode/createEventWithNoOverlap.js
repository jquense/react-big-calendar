import React, { useCallback, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from '../../../src'
import events from '../../resources/events'

export default function CreateEventWithNoOverlap({
  localizer,
  dayLayoutAlgorithm = 'no-overlap',
}) {
  const [myEvents, setEvents] = useState(events)

  const handleSelect = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event Name')
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }])
      }
    },
    [setEvents]
  )

  return (
    <Fragment>
      <div>
        <strong>
          Click an event to see more info, or drag the mouse over the calendar
          to select a date/time range.
          <br />
          The events are being arranged by `no-overlap` algorithm.
        </strong>
      </div>
      <Calendar
        selectable
        localizer={localizer}
        events={myEvents}
        defaultView={Views.WEEK}
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date(2015, 3, 12)}
        onSelectEvent={(event) => window.alert(event.title)}
        onSelectSlot={handleSelect}
        dayLayoutAlgorithm={dayLayoutAlgorithm}
      />
    </Fragment>
  )
}

CreateEventWithNoOverlap.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
  dayLayoutAlgorithm: PropTypes.string,
}
