import React, { useCallback, useRef, useEffect } from 'react'
import moment from 'moment'
import { Calendar, Views, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './onSelecting.mdx'

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

function buildMessage(range, eventName) {
  return `[${eventName}] a date range selection was made, passing:
  ${JSON.stringify(range, null, 2)}`
}

export function CalSelecting() {
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

  const onSelectSlot = useCallback(
    (slotInfo) => {
      /**
       * Here we are waiting 250 milliseconds (use what you want) prior to firing
       * our method. Why? Because both 'click' and 'doubleClick'
       * would fire, in the event of a 'doubleClick'. By doing
       * this, the 'click' handler is overridden by the 'doubleClick'
       * action.
       */
      window.clearTimeout(clickRef?.current)
      clickRef.current = window.setTimeout(() => {
        window.alert(buildMessage(slotInfo, 'onSelectSlot'))
      }, 250)
    },
    [buildMessage]
  )

  const onSelecting = useCallback(
    (range) => {
      /**
       * Here we are waiting 250 milliseconds (use what you want) prior to firing
       * our method. Why? Because both 'click' and 'doubleClick'
       * would fire, in the event of a 'doubleClick'. By doing
       * this, the 'click' handler is overridden by the 'doubleClick'
       * action.
       */
      window.clearTimeout(clickRef?.current)
      clickRef.current = window.setTimeout(() => {
        window.alert(buildMessage(range, 'onSelecting'))
      }, 250)
    },
    [buildMessage]
  )

  return (
    <Calendar
      defaultDate={new Date(2015, 3, 1)}
      defaultView={Views.WEEK}
      events={demoEvents}
      localizer={mLocalizer}
      onSelecting={onSelecting}
      onSelectSlot={onSelectSlot}
      selectable
    />
  )
}
CalSelecting.storyName = 'onSelecting'
