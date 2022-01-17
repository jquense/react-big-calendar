import React, { Fragment, useState, useEffect, useMemo } from 'react'
import { Calendar, luxonLocalizer, Views } from 'react-big-calendar'
import { DateTime, Settings } from 'luxon'
import DemoLink from '../../DemoLink.component'

import events from '../../resources/events'
import TimezoneSelect from '../TimezoneSelect'

const defaultTZ = DateTime.local().zoneName
const defaultDateStr = '2015-04-13'

function getDate(str, DateTimeObj) {
  return DateTimeObj.fromISO(str).toJSDate()
}

export default function Luxon() {
  const [timezone, setTimezone] = useState(defaultTZ)

  const { localizer, defaultDate, scrollToTime, myEvents, getNow } =
    useMemo(() => {
      Settings.defaultZone = timezone
      return {
        localizer: luxonLocalizer(DateTime),
        defaultDate: getDate(defaultDateStr, DateTime),
        scrollToTime: DateTime.local().toJSDate(),
        getNow: () => DateTime.local().toJSDate(),
        myEvents: [...events],
      }
    }, [timezone])

  useEffect(() => {
    return () => {
      Settings.defaultZone = defaultTZ // reset to browser TZ on unmount
    }
  }, [])

  return (
    <Fragment>
      <DemoLink fileName="luxon">
        <TimezoneSelect
          defaultTZ={defaultTZ}
          setTimezone={setTimezone}
          timezone={timezone}
          title={`This calendar uses the 'luxonLocalizer'`}
        />
      </DemoLink>
      <Calendar
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        events={myEvents}
        getNow={getNow}
        localizer={localizer}
        scrollToTime={scrollToTime}
      />
    </Fragment>
  )
}
