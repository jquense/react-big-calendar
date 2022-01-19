import React, { useState, useCallback } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer, Views } from '../../src'
import demoEvents from '../resources/events'
import mdx from './onRangeChange.mdx'

const mLocalizer = momentLocalizer(moment)

export default {
  title: 'props',
  component: Calendar,
  parameters: {
    docs: {
      page: mdx,
    },
  },
}

function buildMessage(range) {
  if (!range) {
    return 'no range'
  }
  if (!Array.isArray(range)) {
    return `[onRangeChange] was given an object with
    a start of ${range.start.toLocaleString()}
    and an end of ${range.end.toLocaleString()}.
    An object with 'start' and 'end' is passed
    when in the 'month' or 'agenda' views.`
  }
  if (range.length === 1) {
    return `[onRangeChange] was given an array with
    a single item of ${range[0].toLocaleString()},
    which only occurs within the 'day' view.`
  }
  return `[onRangeChange] was given an array of seven dates,
  starting with ${range[0].toLocaleString()}
  and ending with ${range[6].toLocaleString()}.
  This occurs when within the 'week' or 'work week' views.`
}

export function OnRangeChange() {
  const [date, setDate] = useState(new Date(2015, 3, 1))

  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate])

  const onRangeChange = useCallback((range) => {
    window.alert(buildMessage(range))
  }, [])

  return (
    <div className="height600">
      <Calendar
        date={date}
        events={demoEvents}
        localizer={mLocalizer}
        onNavigate={onNavigate}
        onRangeChange={onRangeChange}
      />
    </div>
  )
}
OnRangeChange.storyName = 'onRangeChange'
