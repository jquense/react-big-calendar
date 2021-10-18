import React from 'react'
import events from '../events'
import { Calendar, Views } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import Layout from 'react-tackle-box/Layout'
import Card from '../Card'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'

const DragAndDropCalendar = withDragAndDrop(Calendar)

const formatName = (name, count) => `${name} ID ${count}`

class Dnd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: events,
      draggedEvent: null,
      counters: {
        item1: 0,
        item2: 0,
      },
      displayDragItemInCell: true,
    }
  }

  handleDragStart = event => {
    this.setState({ draggedEvent: event })
  }

  handleDisplayDragItemInCell = () => {
    this.setState({
      displayDragItemInCell: !this.state.displayDragItemInCell,
    })
  }

  dragFromOutsideItem = () => {
    return this.state.draggedEvent
  }

  customOnDragOver = event => {
    // check for undroppable is specific to this example
    // and not part of API. This just demonstrates that
    // onDragOver can optionally be passed to conditionally
    // allow draggable items to be dropped on cal, based on
    // whether event.preventDefault is called
    if (this.state.draggedEvent !== 'undroppable') {
      console.log('preventDefault')
      event.preventDefault()
    }
  }

  onDropFromOutside = ({ start, end, allDay }) => {
    const { draggedEvent, counters } = this.state
    const event = {
      title: formatName(draggedEvent.name, counters[draggedEvent.name]),
      start,
      end,
      isAllDay: allDay,
    }
    const updatedCounters = {
      ...counters,
      [draggedEvent.name]: counters[draggedEvent.name] + 1,
    }
    this.setState({ draggedEvent: null, counters: updatedCounters })
    this.newEvent(event)
  }

  moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const { events } = this.state

    const idx = events.indexOf(event)
    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    const updatedEvent = { ...event, start, end, allDay }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

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

    //alert(`${event.title} was resized to ${start}-${end}`)
  }

  newEvent = event => {
    let idList = this.state.events.map(a => a.id)
    let newId = Math.max(...idList) + 1
    let hour = {
      id: newId,
      title: event.title,
      allDay: event.isAllDay,
      start: event.start,
      end: event.end,
    }
    this.setState({
      events: this.state.events.concat([hour]),
    })
  }

  render() {
    return (
      <div>
        <Card className="examples--header" style={{ display: 'flex' }}>
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <h4 style={{ color: 'gray', width: '100%' }}>
              Outside Drag Sources
            </h4>
            {Object.entries(this.state.counters).map(([name, count]) => (
              <div
                style={{
                  border: '2px solid gray',
                  borderRadius: '4px',
                  width: '100px',
                  margin: '10px',
                }}
                draggable="true"
                key={name}
                onDragStart={() =>
                  this.handleDragStart({ title: formatName(name, count), name })
                }
              >
                {formatName(name, count)}
              </div>
            ))}
            <div
              style={{
                border: '2px solid gray',
                borderRadius: '4px',
                width: '100px',
                margin: '10px',
              }}
              draggable="true"
              key={name}
              onDragStart={() => this.handleDragStart('undroppable')}
            >
              Draggable but not for calendar.
            </div>
          </div>

          <div>
            <label>
              <input
                style={{ marginRight: 5 }}
                type="checkbox"
                checked={this.state.displayDragItemInCell}
                onChange={this.handleDisplayDragItemInCell}
              />
              Display dragged item in cell while dragging over
            </label>
          </div>
        </Card>
        <DragAndDropCalendar
          selectable
          localizer={this.props.localizer}
          events={this.state.events}
          onEventDrop={this.moveEvent}
          dragFromOutsideItem={
            this.state.displayDragItemInCell ? this.dragFromOutsideItem : null
          }
          onDropFromOutside={this.onDropFromOutside}
          onDragOver={this.customOnDragOver}
          resizable
          onEventResize={this.resizeEvent}
          onSelectSlot={this.newEvent}
          onD
          defaultView={Views.MONTH}
          defaultDate={new Date(2015, 3, 12)}
        />
      </div>
    )
  }
}

export default Dnd
