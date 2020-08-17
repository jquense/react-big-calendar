import React from 'react'
import { Calendar, Views } from 'react-big-calendar'
import events from '../events'
import backgroundEvents from '../backgroundEvents'
import * as dates from '../../src/utils/dates'

let allViews = Object.keys(Views).map(k => Views[k])

let Basic = ({ localizer }) => (
  <Calendar
    events={events}
    defaultView={Views.DAY}
    views={allViews}
    step={60}
    showMultiDayTimes
    max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
    defaultDate={new Date(2015, 3, 13)}
    localizer={localizer}
    backgroundEvents={backgroundEvents}
    dayLayoutAlgorithm={'no-overlap'}
  />
)

export default Basic
