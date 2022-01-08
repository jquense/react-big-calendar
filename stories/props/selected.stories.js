import React, { useState, useCallback, useRef, useEffect } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../../examples/events'
import mdx from './selected.mdx'

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

export function Selected() {
  const [selected, setSelected] = useState(() => {
    // let's make an initial selection
    return demoEvents.find(
      (event) => event.title === 'Itaewon Halloween Meeting'
    )
  })
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
        setSelected(calEvent)
      }, 250)
    },
    [setSelected]
  )

  return (
    <Calendar
      localizer={mLocalizer}
      defaultDate={new Date(2015, 3, 1)}
      events={demoEvents}
      onSelectEvent={onSelectEvent}
      events={demoEvents}
      selected={selected}
    />
  )
}
Selected.storyName = 'selected'
