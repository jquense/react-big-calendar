import PropTypes from 'prop-types';
import React from 'react';
import { DragSource } from 'react-dnd';

class ResizableEventLR extends React.Component {
  render () {
    const { title, connectLeftDragSource, connectRightDragSource } = this.props;
    return (
      <div className="rbc-addons-dnd-resizable-event-left-right">
        {connectLeftDragSource(<div className="rbc-addons-dnd-resize-anchor-left">{" "}</div>)}
        <div className='rbc-addons-dnd-resize-content'>{title}</div>
        {connectRightDragSource(<div className="rbc-addons-dnd-resize-anchor-right">{" "}</div>)}
      </div>
    );
  }
}

const eventSourceLeft = {
  beginDrag: ({ event }) => ({ event, type: 'resizeL' })
}

const eventSourceRight = {
  beginDrag: ({ event }) => ({ event, type: 'resizeR' })
}

ResizableEventLR = DragSource('resize', eventSourceLeft, (connect, monitor) => ({
  connectLeftDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(ResizableEventLR);

ResizableEventLR = DragSource('resize', eventSourceRight, (connect, monitor) => ({
  connectRightDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(ResizableEventLR);

export default ResizableEventLR
