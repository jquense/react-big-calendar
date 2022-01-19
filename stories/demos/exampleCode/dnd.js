import React, { Fragment, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import events from '../../resources/events'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import DemoLink from '../../DemoLink.component'
// Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop'
import withDragAndDrop from '../../../src/addons/dragAndDrop'
// Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import '../../../src/addons/dragAndDrop/styles.scss'

const DragAndDropCalendar = withDragAndDrop(Calendar)

export default function DragAndDrop({ localizer }) {
  const [myEvents, setMyEvents] = useState(events)
  const [draggedEvent, setDraggedEvent] = useState()

  const handleDragStart = useCallback(
    (event) => setDraggedEvent(event),
    [setDraggedEvent]
  )

  const dragFromOutsideItem = useCallback(() => draggedEvent, [draggedEvent])

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }

      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end, allDay }]
      })
    },
    [setMyEvents]
  )

  const onDropFromOutside = useCallback(
    ({ start, end, allDay }) => {
      const { id, title } = draggedEvent
      const event = {
        id,
        title,
        start,
        end,
        allDay,
      }
      setDraggedEvent(null)
      moveEvent({ event, start, end })
    },
    [draggedEvent, setDraggedEvent, moveEvent]
  )

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
      <DemoLink fileName="dnd">
        <strong>
          Drag and Drop an "event" from one slot to another to "move" the event,
          or drag an event's drag handles to "resize" the event.
        </strong>
      </DemoLink>
      <div className="height600">
        <DragAndDropCalendar
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
          dragFromOutsideItem={dragFromOutsideItem}
          events={myEvents}
          handleDragStart={handleDragStart}
          localizer={localizer}
          onDropFromOutside={onDropFromOutside}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          popup
          resizable
          selectable
        />
      </div>
    </Fragment>
  )
}
DragAndDrop.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}