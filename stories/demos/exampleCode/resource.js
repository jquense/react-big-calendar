import LinkTo from '@storybook/addon-links/react'
import PropTypes from 'prop-types'
import React, { Fragment, useMemo, useState, useCallback } from 'react'
import { Calendar, DateLocalizer, Views } from 'react-big-calendar'
import DemoLink from '../../DemoLink.component'
import withDragAndDrop from '../../../src/addons/dragAndDrop'

const DragAndDropCalendar = withDragAndDrop(Calendar)
const resources = [
  { resourceId: 1, resourceTitle: 'Board room' },
  { resourceId: 2, resourceTitle: 'Training room' },
  { resourceId: 3, resourceTitle: 'Meeting room 1' },
  { resourceId: 4, resourceTitle: 'Meeting room 2' },
]

let eventId = 0
const events = Array.from({ length: 20 }, (_, k) => k).flatMap((i) => {
  const currentResource = resources[i % resources.length]
  const dayDiff = i % 7

  return Array.from({ length: 5 }, (_, j) => ({
    id: eventId++,
    title: `Event ${i + j} _ ${currentResource.resourceTitle}`,
    start: new Date(2018, 0, 29 + dayDiff, 9 + (j % 4), 0, 0),
    end: new Date(2018, 0, 29 + dayDiff, 11 + (j % 4), 0, 0),
    resourceId: currentResource.resourceId,
  }))
})

export default function Resource({ localizer }) {
  const [groupResourcesOnWeek, setGroupResourcesOnWeek] = useState(false)

  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(2018, 0, 29),
      views: ['day', 'work_week'],
    }),
    []
  )

  const [myEvents, setEvents] = useState(events)

  const handleSelectSlot = useCallback(
    ({ start, end, resourceId }) => {
      const title = window.prompt('New Event Name')
      if (title) {
        setEvents((prev) => [...prev, { start, end, title, resourceId }])
      }
    },
    [setEvents]
  )

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  )
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

      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end, resourceId, allDay }]
      })
    },
    [setEvents]
  )

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end }]
      })
    },
    [setEvents]
  )

  return (
    <Fragment>
      <DemoLink fileName="resource" />
      <strong>
        The calendar below uses the{' '}
        <LinkTo kind="props" story="resource-id-accessor">
          resourceIdAccessor
        </LinkTo>
        ,{' '}
        <LinkTo kind="props" story="resource-title-accessor">
          resourceTitleAccessor
        </LinkTo>{' '}
        and{' '}
        <LinkTo kind="props" story="resources">
          resources
        </LinkTo>{' '}
        props to show events scheduled for different resources.
        <br />
        Events can be mapped to a single resource, or multiple resources.
      </strong>
      <div style={{ margin: '10px 0 20px 0' }}>
        <label>
          <input
            type="checkbox"
            checked={groupResourcesOnWeek}
            onChange={() => setGroupResourcesOnWeek(!groupResourcesOnWeek)}
          />
          Group resources on week view.
        </label>
      </div>
      <div className="height600">
        <DragAndDropCalendar
          selectable
          defaultDate={defaultDate}
          defaultView={Views.DAY}
          events={myEvents}
          localizer={localizer}
          resources={resources}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          step={60}
          views={views}
          resourceGroupingLayout={groupResourcesOnWeek}
        />
      </div>
    </Fragment>
  )
}
Resource.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}
