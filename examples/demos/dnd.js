import React from 'react'
import events from '../events'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Dnd extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      events: events
    }

    this.moveEvent = this.moveEvent.bind(this)
    this.resizeEvent = this.resizeEvent.bind(this)
  }
  resizeEvent({originalEvent, startDate, endDate}){
    const { events } = this.state;

    const idx = events.indexOf(originalEvent);

    originalEvent.start = startDate;
    originalEvent.end = endDate;

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, originalEvent)

    this.setState({
      events: nextEvents
    })
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents
    })

    alert(`${event.title} was dropped onto ${event.start}`);
  }

  render(){
    return (
      <DragAndDropCalendar
        selectable
        resizable
        onResizing={this.resizeEvent}
        onResizeInit={() => true}
        events={this.state.events}
        onEventDrop={this.moveEvent}
        defaultView='week'
        defaultDate={new Date(2015, 3, 12)}
      />
    )
  }
}

export default DragDropContext(HTML5Backend)(Dnd)
