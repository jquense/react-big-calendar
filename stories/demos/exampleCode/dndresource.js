import React, { Fragment, useMemo, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import DemoLink from '../../DemoLink.component'
// Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop'
import withDragAndDrop from '../../../src/addons/dragAndDrop'
// Storybook cannot alias this, so you would use 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import '../../../src/addons/dragAndDrop/styles.scss'

const DragAndDropCalendar = withDragAndDrop(Calendar)

const events = [
  {
    id: 0,
    title: 'Board meeting',
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: [1, 2],
  },
  {
    id: 1,
    title: 'MS training',
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 0, 29, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: 'Team lead meeting',
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: 3,
  },
  {
    id: 10,
    title: 'Board meeting',
    start: new Date(2018, 0, 30, 23, 0, 0),
    end: new Date(2018, 0, 30, 23, 59, 0),
    resourceId: 1,
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 4,
  },
  {
    id: 12,
    title: 'Board meeting',
    start: new Date(2018, 0, 29, 23, 59, 0),
    end: new Date(2018, 0, 30, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 13,
    title: 'Board meeting',
    start: new Date(2018, 0, 29, 23, 50, 0),
    end: new Date(2018, 0, 30, 13, 0, 0),
    resourceId: 2,
  },
  {
    id: 14,
    title: 'Board meeting',
    start: new Date(2018, 0, 29, 23, 40, 0),
    end: new Date(2018, 0, 30, 13, 0, 0),
    resourceId: 4,
  },
]

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Board room' },
  { resourceId: 2, resourceTitle: 'Training room' },
  { resourceId: 3, resourceTitle: 'Meeting room 1' },
  { resourceId: 4, resourceTitle: 'Meeting room 2' },
]

export default function DnDResource({ localizer }) {
  const [myEvents, setMyEvents] = useState(events)
  const [copyEvent, setCopyEvent] = useState(true)

  const toggleCopyEvent = useCallback(() => setCopyEvent((val) => !val), [])

  const moveEvent = useCallback(
    ({
      event,
      start,
      end,
      resourceId,
      isAllDay: droppedOnAllDaySlot = false,
    }) => {
      const { allDay } = event
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }
      if (Array.isArray(event.resourceId)) {
        if (copyEvent) {
          resourceId = [...new Set([...event.resourceId, resourceId])]
        } else {
          const filtered = event.resourceId.filter(
            (ev) => ev !== event.sourceResource
          )
          resourceId = [...new Set([...filtered, resourceId])]
        }
      } else if (copyEvent) {
        resourceId = [...new Set([event.resourceId, resourceId])]
      }

      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end, resourceId, allDay }]
      })
    },
    [setMyEvents, copyEvent]
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

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2018, 0, 29),
      scrollToTime: new Date(1972, 0, 1, 8),
    }),
    []
  )

  return (
    <Fragment>
      <DemoLink fileName="dndresource">
        <strong>
          Drag and Drop an "event" from one resource slot to another.
        </strong>
        <div style={{ margin: '10px 0 20px 0' }}>
          <label>
            <input
              type="checkbox"
              checked={copyEvent}
              onChange={toggleCopyEvent}
            />
            Keep copy of dragged "source" event in its original resource slot.
          </label>
        </div>
      </DemoLink>
      <div className="height600">
        <DragAndDropCalendar
          defaultDate={defaultDate}
          defaultView={Views.DAY}
          events={myEvents}
          localizer={localizer}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          resizable
          resourceIdAccessor="resourceId"
          resources={resourceMap}
          resourceTitleAccessor="resourceTitle"
          scrollToTime={scrollToTime}
          selectable
          showMultiDayTimes={true}
          step={15}
        />
      </div>
    </Fragment>
  )
}
DnDResource.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}
