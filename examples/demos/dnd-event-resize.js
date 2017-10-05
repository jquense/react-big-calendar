import React from 'react'
import events from '../events'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';
const DragAndDropCalendar = withDragAndDrop(BigCalendar);
import dates from '../../src/utils/dates';
import CalendarResizerDraggableBox from './CalendarResizerDraggableBox'; // resizer
import './CalendarResizerDraggableBox.css'; // resizer style


// TODO > couldn't get the orginal moveEvent() function to work fine, so I add an 'id' property to the event, so I'm sure I can update them properly
events.forEach((event, i) => {
  events[i].id = i;
});


class CalendarEvent extends React.Component {

  render() {
    const { calendar, event } = this.props;

    return (
      <div className="rbc-event-contentsub">

        <div>{event.title}</div>

        {/*(!['month', 'list_week'].includes(calendar.view)) &&*/ // TODO > test view so we disable resizer on 'month' and 'agenda' view
          <CalendarResizerDraggableBox event={event}>
            <div className="rbc-resizer icon-event hidden-print"></div>
          </CalendarResizerDraggableBox>}

      </div>
    );

  }

}



class Dnd extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      events: events
    }

    this.moveEvent = this.moveEvent.bind(this)
    this.onEventResize = this.onEventResize.bind(this)
  }

  moveEvent({ event, start, end }) {
    // console.log('onEventDrop', event, start, end);
    const { events } = this.state;

    let idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    // TODO > couldn't get the orginal moveEvent() function to work fine, so I add an 'id' property to the event, so I'm sure I can update them properly
    if (idx === -1) {
      events.forEach((eventObj, i) => {
        if (eventObj.id === event.id) {
          idx = i;
        }
      });
    }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents
    })

    // moveEvent() is now call each time you move/resize an event, then we have to disable the alert
    // alert(`${event.title} was dropped onto ${event.start}`);
  }

  onEventResize(itemType, { event, value, start, end}) { // called each time you move/resize an event
    // console.log('onEventResize', itemType, event, value, start, end);

    /*if (['month'].includes(this.props.calendar.view)) { // TODO > disable on month view
      return;
    }*/

    if (itemType === 'event') {
      var diff = dates.diff(event.end, event.start, 'seconds');
      start = value;
      end = dates.add(start, diff, 'seconds');

    }
    else if (itemType === 'event-resize') { // start/end is calculated into backgroundWrapper.js

    }


    // update event
    this.moveEvent(
      {
        event: event,
        start: start,
        end: end
      }
    );

  }

  render(){
    return (
      <DragAndDropCalendar
        selectable
        components={{event : CalendarEvent}}
        events={this.state.events}
        onEventDrop={this.moveEvent}
        onEventResize={this.onEventResize}
        defaultView='week'
        defaultDate={new Date(2015, 3, 12)}
        />
    )
  }
}

export default DragDropContext(HTML5Backend)(Dnd)
