import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events';

class Resizable extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      events: events
    }

    this.moveEvent = this.moveEvent.bind(this)
  }
  moveEvent({originalEvent, startDate, endDate}){
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
  render(){
    return (
      <div {...this.props}>
        <h3 className="callout">
          Click an event to see more info, or
          drag the mouse over the calendar to select a date/time range.
        </h3>
        <BigCalendar
          selectable
          resizable
          onResizing={this.moveEvent}
          onResizeInit={() => true}
          events={events}
          defaultView='week'
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2015, 3, 12)}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={(slotInfo) => alert(
            `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
            `\nend: ${slotInfo.end.toLocaleString()}`
          )}
        />
      </div>
    )
  }
}

export default Resizable;
