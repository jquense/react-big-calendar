import React from 'react'
import { Calendar } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'

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

class Dnd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: events,
      isCopyingMode: true,
    }

    this.moveEvent = this.moveEvent.bind(this)
    this.handleChangeMode = this.handleChangeMode.bind(this)
  }

  handleChangeMode(e) {
    this.setState({
      isCopyingMode: e.target.checked,
    })
  }

  modifyResource(oldResourceId, sourceResource, newResourceId, isCopyingMode) {
    //new array with all present Ids
    let tempArr = [...oldResourceId]

    if (isCopyingMode) {
      //add the new Id to the array
      tempArr.push(newResourceId)
    } else {
      if (sourceResource) {
        //replace old with new
        const index = tempArr.indexOf(sourceResource)

        if (index !== -1) {
          tempArr[index] = newResourceId
        }
      }
    }

    // delete duplicates in the array
    let unique = Array.from(new Set(tempArr))
    return unique
  }

  moveEvent({ event, start, end, resourceId, isAllDay: droppedOnAllDaySlot }) {
    const { events } = this.state

    const idx = events.indexOf(event)
    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    const relatedEvent = events[idx]

    //new event obj with updated resource
    const tempResId = this.modifyResource(
      relatedEvent.resourceId,
      relatedEvent.sourceResource,
      resourceId,
      this.state.isCopyingMode
    )
    const updatedEvent = {
      ...event,
      start,
      end,
      resourceId: tempResId,
      allDay,
    }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })
  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })
  }

  render() {
    return (
      <>
        <div style={{ padding: '40px', background: '#dbdbdb' }}>
          <label>Copy Event?</label>
          <input
            type="checkbox"
            id="copyMode"
            defaultChecked={this.state.isCopyingMode}
            onChange={this.handleChangeMode}
          />
          <p>active: {this.state.isCopyingMode ? 'CopyMode' : 'MoveMode'}</p>
        </div>
        <DragAndDropCalendar
          selectable
          localizer={this.props.localizer}
          events={this.state.events}
          onEventDrop={this.moveEvent}
          onDragStart={args => console.log('dragStart', args)}
          onSelectEvent={args => console.log('select', args)}
          resizable
          resources={resourceMap}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
          onEventResize={this.resizeEvent}
          defaultView="day"
          step={15}
          showMultiDayTimes={true}
          defaultDate={new Date(2018, 0, 29)}
        />
      </>
    )
  }
}

export default Dnd
