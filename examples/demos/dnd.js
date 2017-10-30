import React from 'react';
import events from '../events';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { ContextMenu, MenuItem } from 'react-contextmenu';

import ResizableMonthEvent from '../../src/addons/dragAndDrop/ResizableMonthEvent';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.less';

const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class Dnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: events,
    };

    this.moveEvent = this.moveEvent.bind(this);
  }

  handleInlineEditEventTitle = ({ event, title }) => {
    alert(title);
  };

  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents,
    });

    alert(`${event.title} was dropped onto ${event.start}`);
  }

  handleEventResize = (resizeType, { event, start, end }) => {
    const { events } = this.state;

    // if we want to update the event while dragging we need to find the event
    // by an identifier. here we use the title and the start time, but depending
    // on use case you may want have a truly unique id attribute in the event

    const nextEvents = events.map(existingEvent => {
      return existingEvent.start == event.start && existingEvent.title == event.title
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    // if we only care about updating the event onDrop, we could rely on finding
    // the event through Array.prototype.indexOf like in the moveEvent callback ie:
    // if (resizeType !== 'drop') return;
    // const idx = events.indexOf(event);
    // const updatedEvent = { ...event, end };

    // const nextEvents = [...events]
    // nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    });
  };

  handleRightClickSlot = slot => {
    console.log('right clicked slot', slot);
  };

  logMenuItemClick = ({ item, date }) => console.log(`clicked menu item ${item} w/ date ${date}`);

  contextMenuItems = () => [
    {
      label: 'Menu Item 1',
      data: { item: 1 },
      onClick: (e, props) => this.logMenuItemClick(props),
    },
    {
      label: 'Menu Item 2',
      data: { item: 2 },
      onClick: (e, props) => this.logMenuItemClick(props),
    },
    {
      label: 'Menu Item 3',
      data: { item: 3 },
      onClick: (e, props) => this.logMenuItemClick(props),
    },
  ];

  logMenuItemClickForEvent({ item, event }) {
    console.log(`clicked menu item ${item} w/ event title: ${event.title}`);
  }

  eventsSorter = ({ weight: a }, { weight: b }) => (a < b ? -1 : 1);

  handleEventReorder = (a, b, _idxa, _idxb, list) => {
    let { events } = this.state;

    const idxa = events.indexOf(a);
    const idxb = events.indexOf(b);

    (a = events[idxa]), (b = events[idxb]);

    const skew = a.weight > b.weight ? -1 : 1;
    let remainder = Math.ceil(b.weight / 100) * 100 - b.weight;
    remainder = remainder <= 0 ? 100 : remainder;
    a.weight = b.weight + remainder / 2 * skew;

    events[idxa] = a;
    this.setState({ events });
  };

  rightClickEventMenu = props => {
    const { id, trigger, handleClick } = props;
    const handleItemClick = trigger ? trigger.onItemClick : null;
    return (
      <ContextMenu id={id}>
        {trigger && (
          <MenuItem onClick={(_, props) => console.log(props)} data={{ action: 'EDIT' }}>
            Edit
          </MenuItem>
        )}
        {trigger && (
          <MenuItem onClick={(_, props) => console.log(props)} data={{ action: 'LOCK' }}>
            {trigger.event.locked ? 'Unlock' : 'Lock'}
          </MenuItem>
        )}
      </ContextMenu>
    );
  };

  render() {
    return (
      <div>
        <DragAndDropCalendar
          contextMenuComponents={{
            event: this.rightClickEventMenu,
          }}
          components={{ month: { event: ResizableMonthEvent } }}
          contextMenuItems={this.contextMenuItems}
          defaultDate={new Date(2015, 3, 12)}
          defaultView="month"
          events={this.state.events}
          eventsSorter={this.eventsSorter}
          onEventDrop={this.moveEvent}
          onEventResize={this.handleEventResize}
          onEventReorder={this.handleEventReorder}
          onInlineEditEventTitle={this.handleInlineEditEventTitle}
          onRightClickSlot={this.handleRightClickSlot}
          selectable
          showAllEvents
        />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Dnd);
