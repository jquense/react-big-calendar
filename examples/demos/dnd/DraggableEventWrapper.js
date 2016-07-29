import React from 'react'
import BigCalendar from 'react-big-calendar'
import { findDOMNode } from 'react-dom'
import { DragSource } from 'react-dnd'

/* drag sources */

let eventSource = {
  beginDrag: function (props) {
    return props.event;
  }
}

function collectSource(connect) {
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

export default DragSource('event', eventSource, collectSource)(DraggableEventWrapper);
