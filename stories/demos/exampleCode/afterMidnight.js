import React, { Fragment, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from 'react-big-calendar'
import DemoLink from '../../DemoLink.component'
import events from '../../resources/events'
import * as dates from '../../../src/utils/dates'

const mLocalizer = momentLocalizer(moment)

const defaultDate = dates.startOf(new Date(2015, 3, 14))

const calendarProps = {
  defaultDate,
  min: dates.add(defaultDate, 12, 'hours'),
  max: dates.add(defaultDate, 4, 'hours'),
  views: Object.keys(Views).map((k) => Views[k]),
  defaultView: 'day',
}

export default function AfterMidnight({ localizer = mLocalizer, ...props }) {
  const [myEvents, setEvents] = useState(() =>
    events.map((event) => ({
      ...event,
      start: dates.add(event.start, 6, 'hours'),
      end: dates.add(event.end, 6, 'hours'),
    }))
  )

  const handleSelectSlot = useCallback(
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
      <DemoLink fileName="afterMidnight">
        <strong>
          If your events often span past midnight, you can set max time to show
          night hours in the previous day's column.
        </strong>
      </DemoLink>
      <div className="height600" {...props}>
        <Calendar
          {...calendarProps}
          events={myEvents}
          onSelectSlot={handleSelectSlot}
          localizer={localizer}
          step={60}
          selectable
        />
      </div>
    </Fragment>
  )
}
AfterMidnight.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}
