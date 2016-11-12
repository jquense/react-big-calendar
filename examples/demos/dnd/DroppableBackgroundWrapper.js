import React from 'react'
import { DropTarget } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import { updateEventTime } from './dropActions'
import cn from 'classnames';


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

    const resultingChildren = isOver ?
        React.cloneElement(children, { className: cn(children.props.className, 'dnd-over') })
      : children;

    return (<BackgroundWrapper
      children={connectDropTarget(resultingChildren)}
    />);
  }
}

DroppableBackgroundWrapper.contextTypes = {
  moveEvent: React.PropTypes.func,
  dragDropManager: React.PropTypes.object.isRequired
}

export default DropTarget(['event'], dropTarget, collectTarget)(DroppableBackgroundWrapper)
