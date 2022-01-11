import React, { useCallback, useRef, useEffect } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../../examples/events'
import mdx from './onDoubleClickEvent.mdx'

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

function buildMessage(calEvent, eventName) {
  return `[${eventName}] an 'event' selection was made with:
  ${JSON.stringify(calEvent, null, 2)}`
}

export function CalDoubleClickEvent() {
  const clickRef = useRef(null)

  useEffect(() => {
    /**
     * What Is This?
     * This is to prevent a memory leak, in the off chance that you
     * teardown your interface prior to the timed method being called.
     */
    return () => {
      window.clearTimeout(clickRef?.current)
    }
  }, [])

  const onSelectEvent = useCallback(
    (calEvent) => {
      /**
       * Here we are waiting 250 milliseconds (use what you want) prior to firing
       * our method. Why? Because both 'click' and 'doubleClick'
       * would fire, in the event of a 'doubleClick'. By doing
       * this, the 'click' handler is overridden by the 'doubleClick'
       * action.
       */
      window.clearTimeout(clickRef?.current)
      clickRef.current = window.setTimeout(() => {
        window.alert(buildMessage(calEvent, 'onSelectEvent'))
      }, 250)
    },
    [buildMessage]
  )

  const onDoubleClickEvent = useCallback(
    (calEvent) => {
      /**
       * Notice our use of the same ref as above.
       */
      window.clearTimeout(clickRef?.current)
      clickRef.current = window.setTimeout(() => {
        window.alert(buildMessage(calEvent, 'onDoubleClickEvent'))
      }, 250)
    },
    [buildMessage]
  )

  return (
    <Calendar
      defaultDate={new Date(2015, 3, 1)}
      events={demoEvents}
      localizer={mLocalizer}
      onDoubleClickEvent={onDoubleClickEvent}
      onSelectEvent={onSelectEvent}
    />
  )
}
CalDoubleClickEvent.storyName = 'onDoubleClickEvent'
