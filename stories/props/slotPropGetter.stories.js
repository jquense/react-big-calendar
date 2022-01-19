import React, { useCallback, useMemo } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './slotPropGetter.mdx'
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

export function SlotPropGetter() {
  const slotPropGetter = useCallback(
    (date) => ({
      className: 'slotDefault',
      ...(moment(date).hour() < 8 && {
        style: {
          backgroundColor: 'powderblue',
          color: 'black',
        },
      }),
      ...(moment(date).hour() > 12 && {
        style: {
          backgroundColor: 'darkgreen',
          color: 'white',
        },
      }),
    }),
    []
  )

  const defaultDate = useMemo(() => new Date(2015, 3, 13), [])

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        defaultView={Views.WEEK}
        slotPropGetter={slotPropGetter}
        events={demoEvents}
        localizer={mLocalizer}
      />
    </div>
  )
}
SlotPropGetter.storyName = 'slotPropGetter'
