import React from 'react'
import { DropTarget } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import { findDOMNode } from 'react-dom'
import { updateEventTime } from './dropActions'


/* drop targets */
const dropTarget = {
  drop(props, monitor, backgroundWrapper) {
    const event = monitor.getItem();
    const { moveEvent } = backgroundWrapper.context
    const updatedEvent = updateEventTime(event, backgroundWrapper.props)
    moveEvent(updatedEvent)
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

DroppableBackgroundWrapper.contextTypes = {
  moveEvent: React.PropTypes.func
}

export default DropTarget(['event'], dropTarget, collectTarget)(DroppableBackgroundWrapper)
