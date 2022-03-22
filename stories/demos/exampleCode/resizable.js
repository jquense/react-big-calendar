import React, { Fragment, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import events from '../../resources/events'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import Card from '../../resources/Card'
import DemoLink from '../../DemoLink.component'
// Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop'
import withDragAndDrop from '../../../src/addons/dragAndDrop'
// Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import '../../../src/addons/dragAndDrop/styles.scss'

const DragAndDropCalendar = withDragAndDrop(Calendar)

const adjEvents = events.map((it, ind) => ({
  ...it,
  isResizable: ind % 2 === 0,
  isDraggable: ind % 2 === 0,
}))

export default function Resizable({ localizer }) {
  const [myEvents, setMyEvents] = useState(adjEvents)
  const [resizable, setResizable] = useState(true)

  const eventPropGetter = useCallback(
    (event) => ({
      // add class if not allowing resizing at all, or if
      // allowing resizing, but not on a specific event
      ...((!resizable || !event.isResizable) && { className: 'nonResizable' }),
    }),
    [resizable]
  )

  const toggleResizing = useCallback(() => setResizable((prev) => !prev), [])

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end }]
      })
    },
    [setMyEvents]
  )

  const defaultDate = useMemo(() => new Date(2015, 3, 12), [])

  return (
    <Fragment>
      <DemoLink fileName="dndOutsideSource">
        <Card className="dndOutsideSourceExample">
          <div className="inner">
            <h4>Resizing</h4>
            <p>
              Events allowing resizing will show drag handles when you mouse
              over them.
              <br />
              In this example, lighter colored events are not resizable.
              <br />
              Toggling the checkbox to the right will turn off/on resizing all
              together.
            </p>
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                checked={resizable}
                onChange={toggleResizing}
              />
              Allow Event Resizing
            </label>
          </div>
        </Card>
      </DemoLink>
      <div className="height600">
        <DragAndDropCalendar
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
          draggableAccessor="isDraggable"
          eventPropGetter={eventPropGetter}
          events={myEvents}
          localizer={localizer}
          onEventResize={resizeEvent}
          resizable={resizable}
          resizableAccessor={resizable ? 'isResizable' : 'fakeKey'}
        />
      </div>
    </Fragment>
  )
}
Resizable.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}
