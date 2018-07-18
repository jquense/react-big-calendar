import React from 'react'
import events from '../events'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'

const DragAndDropCalendar = withDragAndDrop(BigCalendar)

class Dnd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: events,
    }

    this.moveEvent = this.moveEvent.bind(this);
    this.newEvent = this.newEvent.bind(this);
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state

    const idx = events.indexOf(event)
    const updatedEvent = { ...event, start, end }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })

    alert(`${event.title} was dropped onto ${event.start}`)
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

    alert(`${event.title} was resized to ${start}-${end}`)
  }

  newEvent(event) {
    let idList = this.state.events.map((a) => a.id);
    let newId = Math.max(...idList) + 1;
    let hour = {
      id: newId,
      title: 'New Event',
      allDay: event.slots.length == 1,
      start: event.start,
      end: event.end,
    }
    this.setState({
      events: this.state.events.concat([hour])
    });
  }

  render() {
    return (
      <DragAndDropCalendar
        selectable
        events={this.state.events}
        onEventDrop={this.moveEvent}
        resizable
        onEventResize={this.resizeEvent}
        onSelectSlot={this.newEvent}
        defaultView={BigCalendar.Views.WEEK}
        defaultDate={new Date(2015, 3, 12)}
      />
    )
  }
}

export default DragDropContext(HTML5Backend)(Dnd)
