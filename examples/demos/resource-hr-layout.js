import React from 'react'
import * as dates from 'date-arithmetic'
import { Calendar, Views } from 'react-big-calendar'
import TimeGrid from 'react-big-calendar/lib/TimeGridHr'
import ExampleControlSlot from '../ExampleControlSlot'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop/withDragAndDropHr'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'

const DragAndDropCalendar = withDragAndDrop(Calendar)

const events = [
  {
    id: 0,
    title: 'Board meeting',
    start: new Date(2018, 0, 29, 9, 0, 0),
    end: new Date(2018, 0, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 5,
    title: 'Board meeting 2',
    start: new Date(2018, 0, 29, 8, 0, 0),
    end: new Date(2018, 0, 29, 10, 0, 0),
    resourceId: 1,
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
    end: new Date(2018, 0, 29, 9, 30, 0),
    resourceId: 3,
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 4,
  },
]

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Board room' },
  { resourceId: 2, resourceTitle: 'Training room' },
  { resourceId: 3, resourceTitle: 'Meeting room 1' },
  { resourceId: 4, resourceTitle: 'Meeting room 2' },
]

class MyLayout extends React.Component {
  render() {
    let { date } = this.props
    let range = MyLayout.range(date)

    return <TimeGrid {...this.props} range={range} eventOffset={15} />
  }
}

MyLayout.range = date => {
  const start = dates.startOf(date, 'day')
  return [start]
}

MyLayout.navigate = (date, action) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return dates.add(date, -3, 'day')

    case Navigate.NEXT:
      return dates.add(date, 3, 'day')

    default:
      return date
  }
}

MyLayout.title = date => {
  return `My awesome layout: ${date.toLocaleDateString()}`
}
class ResourceHrLayout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events: events,
    }

    this.moveEvent = this.moveEvent.bind(this)
  }
  moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  }

  resizeEvent = ({ event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })

    alert(`${event.title} was resized to ${start}-${end}`)
  }

  render() {
    const { localizer } = this.props
    const { events } = this.state
    return (
      <DragAndDropCalendar
        events={events}
        localizer={localizer}
        defaultView={Views.DAY}
        views={{ day: MyLayout }}
        min={new Date(0, 0, 0, 6, 0)}
        max={new Date(0, 0, 0, 22, 0)}
        step={60}
        defaultDate={new Date(2018, 0, 29)}
        resources={resourceMap}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
        onEventDrop={this.moveEvent}
        onEventResize={this.resizeEvent}
      />
    )
  }
}

export default ResourceHrLayout
