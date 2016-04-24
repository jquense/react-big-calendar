import React from 'react';
import BigCalendar from 'react-big-calendar';
import { DragSource, DragDropContext, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import HTML5Backend from 'react-dnd-html5-backend';
import events from '../events';

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

DraggableEventWrapper = DragSource('event', eventSource, collectSource)(DraggableEventWrapper);

/* drop targets */
const dropTarget = {
  drop(props, monitor) {
    const event = monitor.getItem();
    alert(`${event.title} was dropped`);
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class DroppableBackgroundWrapper extends React.Component {
  render() {
    const { connectDropTarget, children } = this.props;
    const BackgroundWrapper = BigCalendar.components.backgroundWrapper;

    return (<BackgroundWrapper
      children={children}
      ref={instance => connectDropTarget(findDOMNode(instance))}
    />);
  }
}

DroppableBackgroundWrapper = DropTarget(['event'], dropTarget, collectTarget)(DroppableBackgroundWrapper);

let Dnd = React.createClass({
  render(){
    return (
      <BigCalendar
        components={{
          eventWrapper: DraggableEventWrapper,
          backgroundWrapper: DroppableBackgroundWrapper
        }}
        events={events}
        defaultDate={new Date(2015, 3, 1)}
      />
    )
  }
})

export default DragDropContext(HTML5Backend)(Dnd);
