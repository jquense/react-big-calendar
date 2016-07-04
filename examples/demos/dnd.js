import React from 'react';
import BigCalendar from 'react-big-calendar';
import { DragSource, DragDropContext, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import HTML5Backend from 'react-dnd-html5-backend';
import events from '../events';
import merge from 'lodash/object/merge';

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
  drop(props, monitor, backgroundWrapper) {
    const event = monitor.getItem();
    alert(`${event.title} was dropped onto ${backgroundWrapper.props.type} ${backgroundWrapper.props.value}`);
  }
};

function collectTarget(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class DroppableBackgroundWrapper extends React.Component {
  render() {
    const { connectDropTarget, children, isOver } = this.props;
    const BackgroundWrapper = BigCalendar.components.backgroundWrapper;

    return (<BackgroundWrapper
      children={children}
      ref={instance => {
        const domNode = findDOMNode(instance);
        if(domNode) {
          domNode.style.backgroundColor = isOver ? '#dddddd' : '';
        }
        return connectDropTarget(domNode);
      }}
    />);
  }
}

DroppableBackgroundWrapper = DropTarget(['event'], dropTarget, collectTarget)(DroppableBackgroundWrapper);

class DndBigCalendar extends React.Component {
  propTypes: BigCalendar.propTypes

  render() {
    const propsCopy = merge({}, this.props);
    propsCopy.components = merge({}, this.props.components, {
      eventWrapper: DraggableEventWrapper,
      backgroundWrapper: DroppableBackgroundWrapper
    })
    return <BigCalendar {...propsCopy} />
  }
}


let Dnd = React.createClass({
  render(){
    return (
      <DndBigCalendar
        events={events}
        defaultDate={new Date(2015, 3, 1)}
      />
    )
  }
})

export default DragDropContext(HTML5Backend)(Dnd);
