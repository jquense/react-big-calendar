import React from 'react'
import { DragSource } from 'react-dnd';
import cn from 'classnames';

import BigCalendar from '../../index';

/* drag sources */

let eventSource = {
  beginDrag(props) {
    return props.event;
  }
}

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

let DraggableEventWrapper = React.createClass({
  render() {
    let { connectDragSource, isDragging, children, event } = this.props;
    let EventWrapper = BigCalendar.components.eventWrapper;

    children = React.cloneElement(children, {
      className: cn(
        children.props.className,
        isDragging && 'rbc-dnd-dragging'
      )
    })

    return (
      <EventWrapper event={event}>
        {connectDragSource(children)}
      </EventWrapper>
    );
  }
});

export default DragSource('event', eventSource, collectSource)(DraggableEventWrapper);
