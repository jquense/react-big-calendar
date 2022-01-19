import React, { useCallback, useMemo } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './slotGroupPropGetter.mdx'
import '../resources/propGetter.scss'

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

export function SlotGroupPropGetter() {
  const slotGroupPropGetter = useCallback(
    () => ({
      style: {
        minHeight: 60,
      },
    }),
    []
  )

  const defaultDate = useMemo(() => new Date(2015, 3, 13), [])

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        slotGroupPropGetter={slotGroupPropGetter}
        events={demoEvents}
        localizer={mLocalizer}
      />
    </div>
  )
}
SlotGroupPropGetter.storyName = 'slotGroupPropGetter'
