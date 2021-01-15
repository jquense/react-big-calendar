import React from 'react'
import events from '../events'
import { Calendar, Views } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'

const DragAndDropCalendar = withDragAndDrop(Calendar)

class StackedWeek extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      events: events,
    }

    this.moveEvent = this.moveEvent.bind(this)
  }

  moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const { events } = this.state

    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })
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
  }

  render() {
    return (
      <DragAndDropCalendar
        events={this.state.events}
        localizer={this.props.localizer}
        onEventDrop={this.moveEvent}
        resizable
        onEventResize={this.resizeEvent}
        defaultView={Views.WEEK_STACKED}
        defaultDate={new Date(2021, 3, 12)}
        enableArrowNav
        expandRow
        views={[Views.MONTH, Views.WEEK, Views.WEEK_STACKED]}
      />
    )
  }
}

export default StackedWeek
