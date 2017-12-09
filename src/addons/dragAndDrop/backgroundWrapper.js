import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import format from 'date-fns/format';
import addHours from 'date-fns/add_hours';
import getHours from 'date-fns/get_hours';
import addMinutes from 'date-fns/add_minutes';
import getMinutes from 'date-fns/get_minutes';
import addMilliseconds from 'date-fns/add_milliseconds';
import isSameDay from 'date-fns/is_same_day';
import parse from 'date-fns/parse';
import findIndex from 'ramda/src/findIndex';

import { accessor } from '../../utils/propTypes';
import { accessor as get } from '../../utils/accessors';
import * as helpers from './helpers';
import BigCalendar from '../../index';
import compose from './compose';
import dates from '../../utils/dates';
import ItemTypes from './itemTypes';

const findDayIndex = (range, date) => findIndex(val => isSameDay(date, val))(range);

const calcPosFromDate = (date, range, span) => {
  const idx = findDayIndex(range, date);
  return { left: idx + 1, right: idx + span, span, level: 0 };
};

export function getEventTimes(start, end, dropDate, type) {
  // Calculate duration between original start and end dates
  const duration = dates.diff(parse(start), parse(end));

  // If the event is dropped in a "Day" cell, preserve an event's start time by extracting the hours and minutes off
  // the original start date and add it to newDate.value

  const nextStart = type === 'dateCellWrapper' ? helpers.merge(dropDate, start) : dropDate;

  const nextEnd = addMilliseconds(nextStart, duration);

  return {
    start: format(nextStart),
    end: format(nextEnd),
  };
}

class DraggableBackgroundWrapper extends React.Component {
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
    onBackgroundCellHoverExit: PropTypes.func,
    onBackgroundCellEnter: PropTypes.func,
    dragDropManager: PropTypes.object,
    startAccessor: accessor,
    endAccessor: accessor,
    reportDayBounds: PropTypes.func,
    setInternalState: PropTypes.func,
  };

  componentWillReceiveProps(nextProps) {
    const { isOver: wasOver } = this.props;
    const { onEventResize, dragDropManager, onBackgroundCellEnter } = this.context;
    const { isOver } = nextProps;
    const monitor = dragDropManager.getMonitor();
    const { value } = this.props;
    if (isOver && !wasOver) {
      if (monitor.getItemType() === 'resize') {
        // This was causing me performance issues so I commented it out. Thoughts? - Adam Recvlohe Oct. 6 2017
        // onEventResize('drag', {event: monitor.getItem(), end: value});
      }
      onBackgroundCellEnter(value, monitor.getItem());
    }

    if (!isOver && wasOver) {
      const { onBackgroundCellHoverExit } = this.context;
      onBackgroundCellHoverExit(value, monitor.getItem());
    }
  }

  componentDidUpdate() {
    const node = ReactDOM.findDOMNode(this);
    const { reportDayBounds } = this.context;
    const { value: date } = this.props;
    reportDayBounds && reportDayBounds(date, node.getBoundingClientRect());
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
      isOver: monitor.isOver({ shallow: true }),
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
        setInternalState,
      } = context;
      const start = get(event, startAccessor);
      const end = get(event, endAccessor);

      // clean up internal state
      setInternalState(null);

      if (itemType === ItemTypes.EVENT) {
        /**
        * `outsideEvent` needs to be re-thought. We shouldn't rely on
        * info inside user setable `data` prop.
        */
        console.log('THIS WAS CALLED');
        if (event.type === 'outsideEvent') {
          return onOutsideEventDrop({
            event,
            start: value,
          });
        } else {
          return onEventDrop('drop', {
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
          default: {
            return;
          }
        }
      }
    },
    hover(_, monitor, { props, context }) {
      const { value } = props;

      // This is to prevent calling hover too many times when the hover value does not change - AR 2017-11-07
      // Got this idea from AgamlaRage per https://git.io/vFBwc
      if (window.RBC_RESIZE_VALUE && window.RBC_RESIZE_VALUE.toString() === value.toString()) {
        return;
      }
      const itemType = monitor.getItemType();
      const { data: event, type: eventType } = monitor.getItem();
      const { onEventResize, startAccessor, endAccessor } = context;
      const start = get(event, startAccessor);
      const end = get(event, endAccessor);

      window.RBC_RESIZE_VALUE = value;
      if (itemType === ItemTypes.RESIZE) {
        switch (eventType) {
          case 'resizeL': {
            return onEventResize('hover', { event, start: value, end });
          }
          case 'resizeR': {
            return onEventResize('hover', { event, start, end: value });
          }
          default: {
            return;
          }
        }
      }
    },
  };

  return DropTarget(['event', 'resize'], dropTarget, collectTarget)(DraggableBackgroundWrapper);
}

export const DateCellWrapper = createWrapper('dateCellWrapper');
export const DayWrapper = createWrapper('dayWrapper');
