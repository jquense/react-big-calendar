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

  resizeEvent = (resizeType, { event, end }) => {
    const { events } = this.state;

    // if we want to update the event while dragging we need to find the event
    // by an identifier. here we use the title and the start time, but depending
    // on use case you may want have a truly unique id attribute in the event
    const nextEvents = events
      .map(existingEvent =>
        (existingEvent.start == event.start &&
         existingEvent.title == event.title) ?
         { ...existingEvent, end } : existingEvent);

   // if we only care about updating the event onDrop, we could rely on finding
   // the event through Array.prototype.indexOf like in the moveEvent callback ie:
   // if (resizeType !== 'drop') return;
   // const idx = events.indexOf(event);
   // const updatedEvent = { ...event, end };

   // const nextEvents = [...events]
   // nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents
    });
  }

  render(){
    return (
      <DragAndDropCalendar
        selectable
        events={this.state.events}
        onEventDrop={this.moveEvent}
        resizable
        onEventResize={this.resizeEvent}
        defaultView='week'
        defaultDate={new Date(2015, 3, 12)}
      />
    )
  }
}

export default DragDropContext(HTML5Backend)(Dnd)
