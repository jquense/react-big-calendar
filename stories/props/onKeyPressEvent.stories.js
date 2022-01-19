import React, { useCallback, useRef, useEffect, useMemo } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from '../../src'
import demoEvents from '../resources/events'
import mdx from './onKeyPressEvent.mdx'

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

function buildMessage(event, { altKey, ctrlKey, shiftKey, metaKey, key }) {
  let prefix = ''
  if (altKey) {
    prefix = 'ALT + '
  } else if (ctrlKey) {
    prefix = 'CTRL + '
  } else if (shiftKey) {
    prefix = 'SHIFT + '
  } else if (metaKey) {
    prefix = 'CMD + '
  }
  return `You pressed on the "${prefix}${key}" on "event":
JSON.stringify(event, null, 2)`
}

export function OnKeyPressEvent() {
  const pressRef = useRef(null)

  useEffect(() => {
    return () => {
      // To prevent possible memory leak on unmount
      window.clearTimeout(pressRef?.current)
    }
  }, [])

  const onKeyPressEvent = useCallback((event, keypressEvent) => {
    /**
     * We delay our response to capture ctrl/shift/alt + key
     * *Storybook will swallow some presses from it's own built-ins
     */
    pressRef.current = window.setTimeout(() => {
      window.alert(buildMessage(event, keypressEvent))
    }, 250)
  }, [])

  const defaultDate = useMemo(() => new Date(2015, 3, 13), [])

  return (
    <div className="height600">
      <Calendar
        defaultDate={defaultDate}
        events={demoEvents}
        localizer={mLocalizer}
        onKeyPressEvent={onKeyPressEvent}
      />
    </div>
  )
}
OnKeyPressEvent.storyName = 'onKeypressEvent'
