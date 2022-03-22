import React, { useMemo, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import DemoLink from '../../DemoLink.component'
import events from '../../resources/events'

export default function Timeslots({ localizer }) {
  const defaultDate = useMemo(() => new Date(2015, 3, 12), [])
  return (
    <Fragment>
      <DemoLink fileName="timeslots" />
      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={events}
          localizer={localizer}
          step={15}
          timeslots={8}
        />
      </div>
    </Fragment>
  )
}
Timeslots.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}
