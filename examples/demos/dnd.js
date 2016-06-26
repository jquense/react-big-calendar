import React from 'react';
import BigCalendar from 'react-big-calendar';
import { DragSource, DragDropContext } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import HTML5Backend from 'react-dnd-html5-backend';
import events from '../events';

let eventSource = {
  beginDrag: function (props) {
    return props.event;
  }
}

function collect(connect) {
  return {
    connectDragSource: connect.dragSource()
  };
}

let DraggableEventWrapper = React.createClass({
  render() {
    let { connectDragSource, children, event } = this.props;
    let EventWrapper = BigCalendar.components.eventWrapper;

    return (<EventWrapper
      event={event}
      children={children}
      ref={instance => connectDragSource(findDOMNode(instance))}
    />);
  }
});

DraggableEventWrapper = DragSource('event', eventSource, collect)(DraggableEventWrapper);

let Dnd = React.createClass({
  render(){
    return (
      <BigCalendar
        components={{eventWrapper: DraggableEventWrapper}}
        events={events}
        defaultDate={new Date(2015, 3, 1)}
      />
    )
  }
})

export default DragDropContext(HTML5Backend)(Dnd);
