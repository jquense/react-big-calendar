import React, { Fragment, useState, useEffect, useMemo } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import Layout from 'react-tackle-box/Layout'
import moment from 'moment'
import 'moment-timezone'

import events from '../events'
import ExampleControlSlot from '../ExampleControlSlot'

const allZones = moment.tz.names()
allZones.unshift('clear')
const defaultTZ = moment.tz.guess()
const defaultDateStr = '2015-4-13'

function getDate(str, momentObj) {
  return momentObj(str, 'YYYY-MM-DD').toDate()
}

export default function Timezones() {
  const [timezone, setTimezone] = useState(defaultTZ)

  const { localizer, defaultDate, scrollToTime, myEvents } = useMemo(() => {
    moment.tz.setDefault(timezone)
    return {
      localizer: momentLocalizer(moment),
      defaultDate: getDate(defaultDateStr, moment),
      scrollToTime: moment().toDate(),
      myEvents: [...events],
    }
  }, [timezone])

  useEffect(() => {
    return () => {
      moment.tz.setDefault() // reset to browser TZ on unmount
    }
  }, [])

  const onChange = ({ target: { value } }) => setTimezone(value)

  return (
    <Fragment>
      <ExampleControlSlot.Entry waitForOutlet>
        <Layout direction="column" align="center">
          <label>Select a Timezone</label>{' '}
          <select
            className="form-control"
            style={{ width: 200, display: 'inline-block' }}
            value={timezone}
            onChange={onChange}
          >
            {allZones.map((c, idx) => (
              <option key={idx} value={c !== 'clear' ? c : ''}>
                {c}
              </option>
            ))}
          </select>
        </Layout>
      </ExampleControlSlot.Entry>
      <Calendar
        events={myEvents}
        defaultView={Views.WEEK}
        defaultDate={defaultDate}
        scrollToTime={scrollToTime}
        localizer={localizer}
      />
    </Fragment>
  )
}
