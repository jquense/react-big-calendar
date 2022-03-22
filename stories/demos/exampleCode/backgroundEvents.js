import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import DemoLink from '../../DemoLink.component'
import events from '../../resources/events'
import backgroundEvents from '../../resources/backgroundEvents'
import * as dates from '../../../src/utils/dates'

let allViews = Object.keys(Views).map((k) => Views[k])

export default function BackgroundEventsCalendar({ localizer }) {
  const { defaultDate, max } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 13),
      max: dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours'),
    }),
    []
  )

  return (
    <Fragment>
      <DemoLink fileName="backgroundEvents" />
      <div className="height600">
        <Calendar
          backgroundEvents={backgroundEvents}
          dayLayoutAlgorithm="no-overlap"
          defaultDate={defaultDate}
          defaultView={Views.DAY}
          events={events}
          localizer={localizer}
          max={max}
          showMultiDayTimes
          step={60}
          views={allViews}
        />
      </div>
    </Fragment>
  )
}
BackgroundEventsCalendar.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}
