import PropTypes from 'prop-types'
import React from 'react'
import { DropTarget } from 'react-dnd'
import cn from 'classnames'
import noop from 'lodash/noop'

import { accessor } from '../../utils/propTypes'
import { accessor as get } from '../../utils/accessors'
import dates from '../../utils/dates'
import BigCalendar from '../../index'

function getEventDropProps(start, end, dropDate, droppedInAllDay) {
  // Calculate duration between original start and end dates
  const duration = dates.diff(start, end)

  /*
   * If the event is dropped in a "Day" cell, preserve an event's start time by extracting the hours and minutes off
   * the original start date and add it to newDate.value
   * 
   * note: this behavior remains for backward compatibility, but might be counter-intuitive to some:
   * dragging an event from the grid to the day header might more commonly mean "make this an allDay event
   * on that day" - but the behavior here implements "keep the times of the event, but move it to the
   * new day".
   * 
   * To permit either interpretation, we embellish a new `allDay` parameter which determines whether the
   * event was dropped on the day header or not.
   */

  const nextStart = droppedInAllDay ? dates.merge(dropDate, start) : dropDate
  const nextEnd = dates.add(nextStart, duration, 'milliseconds')

  return {
    start: nextStart,
    end: nextEnd,
    allDay: droppedInAllDay,
  }
}

class DropWrapper extends React.Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    type: PropTypes.string,
    isOver: PropTypes.bool,
  }

  static contextTypes = {
    onEventDrop: PropTypes.func,
    onEventResize: PropTypes.func,
    dragDropManager: PropTypes.object,
    startAccessor: accessor,
    endAccessor: accessor,
    allDayAccessor: accessor,
    step: PropTypes.number,
  }

  // TODO: this is WIP to retain the drag offset so the
  // drag target better tracks the mouseDown location, not
  // just the top of the event.
  //
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
    const { connectDropTarget, children, type, isOver } = this.props
    const BackgroundWrapper = BigCalendar.components[type]

    let resultingChildren = children
    if (isOver)
      resultingChildren = React.cloneElement(children, {
        className: cn(children.props.className, 'rbc-addons-dnd-over'),
      })

    return (
      <BackgroundWrapper>
        {connectDropTarget(resultingChildren)}
      </BackgroundWrapper>
    )
  }
}

function createDropWrapper(type) {
  function collectTarget(connect, monitor) {
    return {
      type,
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
    }
  }

  const dropTarget = {
    drop(_, monitor, { props, context }) {
      const itemType = monitor.getItemType()
      if (itemType !== 'event') return

      const item = monitor.getItem()
      const { event, anchor } = item
      const { value } = props
      const {
        onEventDrop = noop,
        onEventResize = noop,
        startAccessor,
        endAccessor,
        allDayAccessor,
        step,
      } = context

      let start = get(event, startAccessor)
      let end = get(event, endAccessor)
      let allDay = get(event, allDayAccessor)
      let droppedInAllDay = type === 'dateCellWrapper'

      switch (anchor) {
        case 'drop':
          onEventDrop({
            event,
            ...getEventDropProps(start, end, value, droppedInAllDay),
          })
          return // all the other cases issue resize action...

        // the remaining cases are all resizes...

        case 'resizeTop':
          // dragging the top means the event isn't an allDay
          // dropping into the header changes the date, preserves the time
          // dropping elsewhere is just a normal resize
          start = droppedInAllDay ? dates.merge(value, start) : value
          break

        case 'resizeBottom':
          // dragging the bottom means the event isn't an allDay
          // dropping into the header changes the date, preserves the time
          // dropping elsewhere is just a normal resize
          // ... but end dates are exclusive so advance it the next slot (e.g. just past the end of this one)
          end = droppedInAllDay
            ? dates.merge(value, end)
            : dates.add(value, step, 'minutes')
          break

        case 'resizeLeft':
          // dragging the left means we're dragging something from an event row
          // all cases are the same:
          // preserve its start time, but change the date (works for both allDay and non-allDay)
          start = dates.merge(value, start)
          break

        case 'resizeRight':
          // dragging the right means we're dragging something from an event row
          // this case is tricky: for non-allDay events, we just want to change
          // the end date (preserving the end time). For allDay events, we want to change
          // the end date to one day later than the drop date because end dates are exclusive
          end = allDay ? dates.add(value, 1, 'day') : dates.merge(value, end)
          break

        default:
          return // don't issue resize
      }

      // fall here for all of the resize cases
      // note: the 'drop' param is here for backward compatibility - maybe remove in future?
      onEventResize('drop', { event, start, end, allDay: droppedInAllDay })
    },
  }

  return DropTarget('event', dropTarget, collectTarget)(DropWrapper)
}

export const DroppableDateCellWrapper = createDropWrapper('dateCellWrapper')
export const DroppableDayWrapper = createDropWrapper('dayWrapper')
