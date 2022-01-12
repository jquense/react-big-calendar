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
  decorators: [
    (Story) => (
      <div style={{ height: 600 }}>
        <Story />
      </div>
    ),
  ],
}

export function Messages() {
  const messages = useMemo(
    () => ({
      week: 'Semana',
      work_week: 'Semana de trabajo',
      day: 'Día',
      month: 'Mes',
      previous: 'Atrás',
      next: 'Después',
      today: 'Hoy',
      agenda: 'El Diario',

      showMore: (total) => `+${total} más`,
    }),
    []
  )

  return (
    <Calendar
      defaultDate={new Date(2015, 3, 13)}
      events={demoEvents}
      localizer={mLocalizer}
      messages={messages}
    />
  )
}
Messages.storyName = 'messages'
