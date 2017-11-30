import PropTypes from 'prop-types';
import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import cn from 'classnames';
import { compose } from 'recompose';

import BigCalendar from '../../index';

/* drag sources */

let eventSource = {
  beginDrag({ event }, monitor, { context }) {
    const { onSegmentDrag } = context;
    const { data, position } = event;
    onSegmentDrag({ ...position, event: data });
    return event;
  },
  endDrag(props, monitor, component) {
    if (!component) {
      return;
    }
    const { onSegmentDragEnd } = component.context;
    onSegmentDragEnd();
  },
};

const eventTarget = {
  hover(props, monitor, { decoratedComponentInstance: component }) {
    const { onSegmentHover } = component.context;
    const { event: hoverEvent } = props;
    const dragEvent = monitor.getItem();
    onSegmentHover(hoverEvent, dragEvent);
  },
  drop(_, monitor, { props, decoratedComponentInstance: component }) {
    const { onSegmentDrop } = component.context;
    const { position } = monitor.getItem();
    onSegmentDrop(position);
  },
};

const contextTypes = {
  onEventReorder: PropTypes.func,
  onSegmentDrag: PropTypes.func,
  onSegmentDragEnd: PropTypes.func,
  onSegmentDrop: PropTypes.func,
  onSegmentHover: PropTypes.func,
};

const propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired,
};

class DraggableEventWrapper extends React.Component {
  render() {
    let { connectDragSource, connectDropTarget, children, event } = this.props;
    let EventWrapper = BigCalendar.components.eventWrapper;

    const enhancer = compose(connectDragSource, connectDropTarget);

    return <EventWrapper event={event}>{enhancer(children)}</EventWrapper>;
  }
}

DraggableEventWrapper.propTypes = propTypes;
DraggableEventWrapper.contextTypes = contextTypes;

const dragAndDrop = compose(
  DropTarget('event', eventTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource('event', eventSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
);

export default dragAndDrop(DraggableEventWrapper);
