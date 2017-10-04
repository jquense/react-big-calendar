import PropTypes from 'prop-types';
import React from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

class ResizableMonthEvent extends React.Component {

  componentDidMount() {
    this.props.connectLeftDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
    this.props.connectRightDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  render () {
    const { title, connectLeftDragSource, connectRightDragSource } = this.props;
    return (
      <div className="rbc-addons-dnd-resizable-month-event">
        {connectLeftDragSource(<div className="rbc-addons-dnd-resize-month-event-anchor">{" "}</div>)}
        <div className='rbc-addons-dnd-resize-month-event-content'>{title}</div>
        {connectRightDragSource(<div className="rbc-addons-dnd-resize-month-event-anchor">{" "}</div>)}
      </div>
    );
  }
}

const eventSourceLeft = {
  beginDrag: ({ event }) => ({ ...event, type: 'resizeL' })
}

const eventSourceRight = {
  beginDrag: ({ event }) => ({ ...event, type: 'resizeR' })
}

ResizableMonthEvent = DragSource('resize', eventSourceLeft, (connect, monitor) => ({
  connectLeftDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectLeftDragPreview: connect.dragPreview(),
}))(ResizableMonthEvent);

ResizableMonthEvent = DragSource('resize', eventSourceRight, (connect, monitor) => ({
  connectRightDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectRightDragPreview: connect.dragPreview(),
}))(ResizableMonthEvent);

export default ResizableMonthEvent
