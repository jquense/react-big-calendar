import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import addHours from 'date-fns/add_hours';
import getHours from 'date-fns/get_hours';
import addMinutes from 'date-fns/add_minutes';
import getMinutes from 'date-fns/get_minutes';
import addMilliseconds from 'date-fns/add_milliseconds';

import compose from './compose';
import dates from '../../utils/dates';
import BigCalendar from '../../index';
import { accessor } from '../../utils/propTypes';
import { accessor as get } from '../../utils/accessors';
import * as helpers from './helpers';

export function getEventTimes(start, end, dropDate, type) {
  // Calculate duration between original start and end dates
  const duration = dates.diff(start, end);

  // If the event is dropped in a "Day" cell, preserve an event's start time by extracting the hours and minutes off
  // the original start date and add it to newDate.value

  const nextStart = type === 'dateCellWrapper' ? helpers.merge(dropDate, start) : dropDate;

  const nextEnd = addMilliseconds(nextStart, duration);

  return {
    start: nextStart,
    end: nextEnd,
  };
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

  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    type: PropTypes.string,
    isOver: PropTypes.bool,
  };

  static contextTypes = {
    onEventDrop: PropTypes.func,
    onEventResize: PropTypes.func,
    onEventReorder: PropTypes.func,
    onOutsideEventDrop: PropTypes.func,
    dragDropManager: PropTypes.object,
    startAccessor: accessor,
    endAccessor: accessor,
  };

  componentWillReceiveProps(nextProps) {
    const { isOver: wasOver } = this.props;
    const { isOver } = nextProps;
    if (isOver && !wasOver) {
      const { onEventResize, dragDropManager } = this.context;
      const { value } = this.props;
      const monitor = dragDropManager.getMonitor();
      if (monitor.getItemType() === 'resize') {
        // This was causing me performance issues so I commented it out. Thoughts? - Adam Recvlohe Oct. 6 2017
        // onEventResize('drag', {event: monitor.getItem(), end: value});
      }
    }
  }

  render() {
    const { connectDropTarget, children, type, isOver } = this.props;
    const BackgroundWrapper = BigCalendar.components[type];

    let resultingChildren = children;
    if (isOver)
      resultingChildren = React.cloneElement(children, {
        className: cn(children.props.className, 'rbc-addons-dnd-over'),
      });

    return <BackgroundWrapper>{connectDropTarget(resultingChildren)}</BackgroundWrapper>;
  }
}

function createWrapper(type) {
  function collectTarget(connect, monitor) {
    return {
      type,
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
    };
  }

  const dropTarget = {
    drop(p, monitor, { props, context }) {
      const itemType = monitor.getItemType();
      const { data: event, type: eventType } = monitor.getItem();
      const { value } = props;
      const {
        onEventDrop,
        onEventResize,
        onEventReorder,
        onOutsideEventDrop,
        startAccessor,
        endAccessor,
      } = context;
      const start = get(event, startAccessor);
      const end = get(event, endAccessor);

      if (itemType === 'event') {
        /**
        * `outsideEvent` needs to be re-thought. We shouldn't rely on
        * info inside user setable `data` prop.
        */
        if (event.type === 'outsideEvent') {
          return onOutsideEventDrop({
            event,
            start: value,
          });
        } else {
          return onEventDrop({
            event,
            ...getEventTimes(start, end, value, type),
          });
        }
      }

      if (itemType === 'resize') {
        switch (eventType) {
          case 'resizeL': {
            return onEventResize('drop', { event, start: value, end });
          }
          case 'resizeR': {
            return onEventResize('drop', { event, start, end: value });
          }
        }

        // Catch All
        onEventResize('drop', {
          event,
          start,
          end: value,
        });
      }
    },
  };

  return DropTarget(['event', 'resize'], dropTarget, collectTarget)(DraggableBackgroundWrapper);
}

export const DateCellWrapper = createWrapper('dateCellWrapper');
export const DayWrapper = createWrapper('dayWrapper');
