import React, { Fragment, useMemo } from 'react'
import PropTypes from 'prop-types'

import * as dates from 'date-arithmetic'
import { Calendar, Views, Navigate, DateLocalizer } from 'react-big-calendar'
import TimeGrid from '../../../src/TimeGrid' // use 'react-big-calendar/lib/TimeGrid'. Can't 'alias' in Storybook
import events from '../../resources/events'
import DemoLink from '../../DemoLink.component'

function MyWeek({
  date,
  localizer,
  min = localizer.startOf(new Date(), 'day'),
  max = localizer.endOf(new Date(), 'day'),
  scrollToTime = localizer.startOf(new Date(), 'day'),
  ...props
}) {
  const currRange = useMemo(
    () => MyWeek.range(date, { localizer }),
    [date, localizer]
  )

  return (
    <TimeGrid
      date={date}
      eventOffset={15}
      range={currRange}
      localizer={localizer}
      max={max}
      min={min}
      scrollToTime={scrollToTime}
      {...props}
    />
  )
}

MyWeek.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.object,
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
}

MyWeek.range = (date, { localizer }) => {
  let start = date
  let end = dates.add(start, 2, 'day')

  let current = start
  let range = []

  while (localizer.lte(current, end, 'day')) {
    range.push(current)
    current = localizer.add(current, 1, 'day')
  }

  return range
}

MyWeek.navigate = (date, action, { localizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -3, 'day')

    case Navigate.NEXT:
      return localizer.add(date, 3, 'day')

    default:
      return date
  }
}

MyWeek.title = (date) => {
  return `My awesome week: ${date.toLocaleDateString()}`
}

export default function CustomView({ localizer }) {
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 1),
      views: {
        month: true,
        week: MyWeek,
      },
    }),
    []
  )

  return (
    <Fragment>
      <DemoLink fileName="customView">
        <strong>The Calendar below implements a custom 3-day week view</strong>
      </DemoLink>
      <Calendar
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        events={events}
        localizer={localizer}
        views={views}
      />
    </Fragment>
  )
}
CustomView.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}
