import PropTypes from 'prop-types';
import React from 'react';
import { DragSource } from 'react-dnd';

class ResizableEvent extends React.Component {
  render () {
    const { title, connectDragSource } = this.props;
    return (
      <div className="rbc-addons-dnd-resizable-event">
        {title}
        {
          connectDragSource(
            <div className="rbc-addons-dnd-resize-anchor">
              <div className="rbc-addons-dnd-resize-icon" />
            </div>
          )
        }
      </div>
    );
  }
}

const eventSource = {
  beginDrag: (props) => props.event
}

const collectSource = (connect, monitor) =>
  ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })

export default DragSource('resize', eventSource, collectSource)(ResizableEvent);
