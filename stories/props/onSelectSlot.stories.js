import React, { useCallback, useRef, useEffect } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './onSelectSlot.mdx'

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

function buildMessage(slotInfo) {
  return `[onSelectSlot] a date selection was made, passing 'slotInfo'
  ${JSON.stringify(slotInfo, null, 2)}`
}

export function OnSelectSlot() {
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
        window.alert(buildMessage(slotInfo))
      }, 250)
    },
    [buildMessage]
  )

  return (
    <Calendar
      defaultDate={new Date(2015, 3, 1)}
      events={demoEvents}
      localizer={mLocalizer}
      onSelectSlot={onSelectSlot}
      selectable
    />
  )
}
OnSelectSlot.storyName = 'onSelectSlot'
