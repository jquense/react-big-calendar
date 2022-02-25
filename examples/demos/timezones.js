import React, { Fragment, useState, useEffect, useMemo } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'moment-timezone'

import events from '../events'
import TimezoneSelect from '../TimezoneSelect'

const defaultTZ = moment.tz.guess()
const defaultDateStr = '2015-4-13'

function getDate(str, momentObj) {
  return momentObj(str, 'YYYY-MM-DD').toDate()
}

export default function Timezones() {
  const [timezone, setTimezone] = useState(defaultTZ)

  const {
    localizer,
    defaultDate,
    scrollToTime,
    myEvents,
    getNow,
  } = useMemo(() => {
    moment.tz.setDefault(timezone)
    return {
      localizer: momentLocalizer(moment),
      defaultDate: getDate(defaultDateStr, moment),
      scrollToTime: moment().toDate(),
      getNow: () => moment().toDate(),
      myEvents: [...events],
    }
  }, [timezone])

  useEffect(() => {
    return () => {
      moment.tz.setDefault() // reset to browser TZ on unmount
    }
  }, [])

  return (
    <Fragment>
      <TimezoneSelect
        defaultTZ={defaultTZ}
        timezone={timezone}
        setTimezone={setTimezone}
      />
      <Calendar
        events={myEvents}
        defaultView={Views.WEEK}
        defaultDate={defaultDate}
        scrollToTime={scrollToTime}
        localizer={localizer}
        getNow={getNow}
      />
    </Fragment>
  )
}
