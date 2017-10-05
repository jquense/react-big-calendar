import PropTypes from 'prop-types';
import React from 'react'
import { DropTarget } from 'react-dnd'
import cn from 'classnames';

import { accessor } from '../../utils/propTypes';
import { accessor as get } from '../../utils/accessors';
import dates from '../../utils/dates';
import BigCalendar from '../../index'

export function getEventTimes(start, end, dropDate, type) {
  // Calculate duration between original start and end dates
  const duration = dates.diff(start, end)

  // If the event is dropped in a "Day" cell, preserve an event's start time by extracting the hours and minutes off
  // the original start date and add it to newDate.value
  const nextStart = type === 'dateCellWrapper'
    ? dates.merge(dropDate, start) : dropDate

  const nextEnd = dates.add(nextStart, duration, 'milliseconds')

  return {
    start: nextStart,
    end: nextEnd
  }
}

const propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  type: PropTypes.string,
  isOver: PropTypes.bool,
}

class DraggableBackgroundWrapper extends React.Component {
  // constructor(...args) {
  //   super(...args);
  //   this.state = { isOver: false };
  // }
  //
  // componentWillMount() {
  //   let monitor = this.context.dragDropManager.getMonitor()
  //
  //   this.monitor = monitor
  //
  //   this.unsubscribeToStateChange = monitor
  //     .subscribeToStateChange(this.handleStateChange)
  //
  //   this.unsubscribeToOffsetChange = monitor
  //     .subscribeToOffsetChange(this.handleOffsetChange)
  // }
  //
  // componentWillUnmount() {
  //   this.monitor = null
  //   this.unsubscribeToStateChange()
  //   this.unsubscribeToOffsetChange()
  // }
  //
  // handleStateChange = () => {
  //   const event = this.monitor.getItem();
  //   if (!event && this.state.isOver) {
  //     this.setState({ isOver: false });
  //   }
  // }
  //
  // handleOffsetChange = () => {
  //   const { value } = this.props;
  //   const { start, end } = this.monitor.getItem();
  //
  //   const isOver = dates.inRange(value, start, end, 'minute');
  //   if (this.state.isOver !== isOver) {
  //     this.setState({ isOver });
  //   }
  // };

  render() {
    const { connectDropTarget, children, type, isOver } = this.props;
    const BackgroundWrapper = BigCalendar.components[type];

    let resultingChildren = children
    if (isOver)
      resultingChildren = React.cloneElement(children, {
        className: cn(children.props.className, 'rbc-addons-dnd-over')
      })

    return (
      <BackgroundWrapper>
        {connectDropTarget(resultingChildren)}
      </BackgroundWrapper>
    );
  }
}
DraggableBackgroundWrapper.propTypes = propTypes;

DraggableBackgroundWrapper.contextTypes = {
  onEventDrop: PropTypes.func,
  onEventResize: PropTypes.func,
  dragDropManager: PropTypes.object,
  startAccessor: accessor,
  endAccessor: accessor
}

function getEventResizeTimes(event, value, startAccessor) { // calculate new start/end when resizing an event

  // resizing down
  var start = get(event, startAccessor);
  var end = value;

  // resizing up, when resizer pass above event start
  var isPassAbove = (start >= end);
  if (isPassAbove) {
    var temp = start;
    start = end;
    end = temp;
  }

  return {
    event: event,
    start,
    end
  };
}

function createWrapper(type) {
  function collectTarget(connect, monitor) {
    return {
      type,
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    };
  }


  const dropTarget = {
    drop(_, monitor, { props, context }) {
      const event = monitor.getItem();
      const itemType = monitor.getItemType();
      const { value } = props
      const { onEventDrop, startAccessor, endAccessor } = context


      var propsCallback;
      if (itemType === 'event-resize') { // handle after resize, drop and calculate start/end like when resizing
        propsCallback = getEventResizeTimes(event, value, startAccessor);

      } else if (itemType === 'event') {
        var start = get(event, startAccessor);
        var end = get(event, endAccessor);
        propsCallback = Object.assign({
          event: event
        }, getEventTimes(start, end, value, type));

      }

      onEventDrop(propsCallback);

    },
    hover: function hover(_, monitor, { props, context }) { // new hover callback
      const event = monitor.getItem();
      const itemType = monitor.getItemType();
      const { value } = props
      const { onEventResize, startAccessor } = context


      if ((!window.reactBigCalendarResizerValue || window.reactBigCalendarResizerValue.toString() !== value.toString())) { // TODO > find a better solution
        window.reactBigCalendarResizerValue = value; // store value to not trigger event each time

        var propsCallback;
        if (itemType === 'event-resize') {
          propsCallback = getEventResizeTimes(event, value, startAccessor);
        } else if (itemType === 'event') {
          propsCallback = { event, value };
        }
        onEventResize(itemType, propsCallback); // callback
      }
    }
  };

  return DropTarget(['event', 'event-resize'], dropTarget, collectTarget)(DraggableBackgroundWrapper);
}

export const DateCellWrapper = createWrapper('dateCellWrapper');
export const DayWrapper = createWrapper('dayWrapper');
