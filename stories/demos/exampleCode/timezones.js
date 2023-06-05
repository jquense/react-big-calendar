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

  const { defaultDate, getNow, localizer, myEvents, scrollToTime } =
    useMemo(() => {
      moment.tz.setDefault(timezone)
      return {
        defaultDate: getDate(defaultDateStr, moment),
        getNow: () => moment().toDate(),
        localizer: momentLocalizer(moment),
        myEvents: [...events],
        scrollToTime: moment().toDate(),
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
