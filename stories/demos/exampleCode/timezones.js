import React, { Fragment, useState, useEffect, useMemo } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'moment-timezone'
import DemoLink from '../../DemoLink.component'
import events from '../../resources/events'
import TimezoneSelect from '../TimezoneSelect'

const defaultTZ = moment.tz.guess()
const defaultDateStr = '2015-4-13'

function getDate(str, momentObj) {
  return momentObj(str, 'YYYY-MM-DD').toDate()
}

export default function Timezones() {
  const [timezone, setTimezone] = useState(defaultTZ)

  const { localizer, defaultDate, scrollToTime, myEvents, getNow } =
    useMemo(() => {
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
      <DemoLink fileName="timezones">
        <TimezoneSelect
          defaultTZ={defaultTZ}
          setTimezone={setTimezone}
          timezone={timezone}
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
