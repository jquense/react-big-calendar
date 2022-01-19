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

  const { defaultDate, getNow, localizer, myEvents, scrollToTime } =
    useMemo(() => {
      Settings.defaultZone = timezone
      return {
        defaultDate: getDate(defaultDateStr, DateTime),
        getNow: () => DateTime.local().toJSDate(),
        localizer: luxonLocalizer(DateTime),
        myEvents: [...events],
        scrollToTime: DateTime.local().toJSDate(),
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
      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.WEEK}
          events={myEvents}
          getNow={getNow}
          localizer={localizer}
          scrollToTime={scrollToTime}
        />
      </div>
    </Fragment>
  )
}
