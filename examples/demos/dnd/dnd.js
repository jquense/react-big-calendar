import React from 'react'
import events from '../../events'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import DndBigCalendar from './DndBigCalendar'
import { cloneDeep, remove } from 'lodash'

class Dnd extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      events: events
    }

    this.moveEvent = this.moveEvent.bind(this)
  }

  moveEvent (event) {
    const newEvent = event
    const newEvents = cloneDeep(this.state.events)
    remove(newEvents, function (e) {
      return newEvent.title === e.title
    })
    newEvents.push(newEvent)

    this.setState({
      events: newEvents
    })
    alert(`${event.title} was dropped onto ${event.start}`);
  }

  render(){
    return (
      <DndBigCalendar
        events={this.state.events}
        moveEvent={this.moveEvent}
        defaultDate={new Date(2015, 3, 1)}
      />
    )
  }
}

export default DragDropContext(HTML5Backend)(Dnd)
