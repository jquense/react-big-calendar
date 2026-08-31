import { useCallback, useState } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'

const mLocalizer = momentLocalizer(moment)

export default {
  title: 'props',
  component: Calendar,
}

export function OnScroll() {
  const [scrollTime, setScrollTime] = useState(null)

  const onScroll = useCallback((time) => setScrollTime(time), [])

  return (
    <div className="height600">
      <strong>
        {scrollTime
          ? `[onScroll] the top of the scroll pane is at ${scrollTime.toLocaleTimeString()}`
          : 'Scroll the time grid to see [onScroll] fire.'}
      </strong>
      <Calendar
        defaultDate={new Date(2015, 3, 13)}
        defaultView={Views.WEEK}
        events={demoEvents}
        localizer={mLocalizer}
        onScroll={onScroll}
      />
    </div>
  )
}
OnScroll.storyName = 'onScroll'
