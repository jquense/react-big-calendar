import PropTypes from 'prop-types';
import React from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import compose from './compose';

class ResizableEvent extends React.Component {

  componentDidMount() {
    this.props.connectTopDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
    this.props.connectBottomDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  render () {
    const { title, connectTopDragSource, connectBottomDragSource } = this.props;
    const [Top, Bottom] = [connectTopDragSource, connectBottomDragSource]
      .map(connectDragSource => {
        return connectDragSource(
          <div className="rbc-addons-dnd-resize-anchor">
            <div className="rbc-addons-dnd-resize-icon" />
          </div>
        )
      })
    return (
      <div className="rbc-addons-dnd-resizable-event">
        {Top}
        {title}
        {Bottom}
      </div>
    );
  }
}

const eventSourceTop = {
  beginDrag: ({ event }) => ({ ...event, type: 'resizeT' })
}

const eventSourceBottom = {
  beginDrag: ({ event }) => ({ ...event, type: 'resizeB' })
}

export default compose(
  DragSource('resize', eventSourceTop, (connect, monitor) => ({
    connectTopDragSource: connect.dragSource(),
    connectTopDragPreview: connect.dragPreview(),
  })),
  DragSource('resize', eventSourceBottom, (connect, monitor) => ({
    connectBottomDragSource: connect.dragSource(),
    connectBottomDragPreview: connect.dragPreview(),
  }))
)(ResizableEvent)

