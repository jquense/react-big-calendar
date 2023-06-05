import React, { useMemo } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './messages.mdx'

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

export function Messages() {
  const { defaultDate, messages } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 13),
      messages: {
        week: 'Semana',
        work_week: 'Semana de trabajo',
        day: 'Día',
        month: 'Mes',
        previous: 'Atrás',
        next: 'Después',
        today: 'Hoy',
        agenda: 'El Diario',

        showMore: (total) => `+${total} más`,
      },
    }),
    []
  )

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        events={demoEvents}
        localizer={mLocalizer}
        messages={messages}
      />
    </div>
  )
}
Messages.storyName = 'messages'
