import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';


class CalendarResizerDraggableBox extends React.Component {

  componentDidMount() {
    // Use empty image as a drag preview so browsers don't draw it
    // and we can draw whatever we want on the custom drag layer instead.
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback: specify that we'd rather screenshot the node
      // when it already knows it's being dragged so we can hide it with CSS.
      captureDraggingState: true,
    });
  }

  render() {
    const { children, connectDragSource } = this.props;
    return connectDragSource(children);
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    connectDragSource: PropTypes.func.isRequired,
  };
}

export default DragSource(
  'event-resize',
  {
    beginDrag(props) { // pass props to DragLayer, getting with monitor.getItem()
      return props.event;
    },
    endDrag(props) { // pass special state to mark the end of the drag
      return { endDrag: true };
    },
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    // isDragging: monitor.isDragging(),
    // item: monitor.getItem(),
    // itemType: monitor.getItemType(),
    // dropResult: monitor.getDropResult(),
    // didDrop: monitor.didDrop(),
    // differenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(),
    connectDragPreview: connect.dragPreview(), // prevent from displaying ghost image
  })
)(CalendarResizerDraggableBox)
