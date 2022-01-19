import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Calendar, DateLocalizer } from 'react-big-calendar'
import DemoLink from '../../DemoLink.component'
import events from '../../resources/events'

export default function Popup({ localizer }) {
  const defaultDate = useMemo(() => new Date(2015, 3, 1), [])
  return (
    <Fragment>
      <DemoLink fileName="popup">
        <strong>
          Click the "+&#123;x&#125; more" link on any calendar day that cannot
          fit all the days events to see an inline popup of all the events.
        </strong>
      </DemoLink>
      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          events={events}
          localizer={localizer}
          popup
        />
      </div>
    </Fragment>
  )
}
Popup.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}
