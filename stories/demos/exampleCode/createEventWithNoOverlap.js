import React, { useCallback, useState, useMemo, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import DemoLink from '../../DemoLink.component'
import events from '../../resources/events'

export default function CreateEventWithNoOverlap({
  localizer,
  dayLayoutAlgorithm = 'no-overlap',
}) {
  const [myEvents, setEvents] = useState(events)

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event Name')
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }])
      }
    },
    [setEvents]
  )

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  )

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  )

  return (
    <Fragment>
      <DemoLink fileName="createEventWithNoOverlap">
        <strong>
          Click an event to see more info, or drag the mouse over the calendar
          to select a date/time range.
          <br />
          The events are being arranged by `no-overlap` algorithm.
        </strong>
      </DemoLink>
      <div className="height600">
        <Calendar
          dayLayoutAlgorithm={dayLayoutAlgorithm}
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={myEvents}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
        />
      </div>
    </Fragment>
  )
}

CreateEventWithNoOverlap.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
  dayLayoutAlgorithm: PropTypes.string,
}
