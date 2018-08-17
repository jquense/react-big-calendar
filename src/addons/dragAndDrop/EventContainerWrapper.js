import PropTypes from 'prop-types'
import React from 'react'
import dates from '../../utils/dates'
import { findDOMNode } from 'react-dom'

import Selection, {
  getBoundsForNode,
  getEventNodeFromPoint,
} from '../../Selection'
import TimeGridEvent from '../../TimeGridEvent'
import { dragAccessors } from './common'
import NoopWrapper from '../../NoopWrapper'

const pointInColumn = (bounds, { x, y }) => {
  const { left, right, top } = bounds
  return x < right + 10 && x > left && y > top
}
// const isZeroBoundaryBox = ({ top, left, right, bottom }) => (top === 0 && left === 0 && right === 0 && bottom === 0);

const propTypes = {}
const MOUSE_EVENT_ACTION = {
  UNKNOWN: 0,
  DRAG: 1,
  CLICK: 2,
  RESIZE: 3,
  CLICK_OR_DRAG: 4,
}
class EventContainerWrapper extends React.Component {
  static propTypes = {
    accessors: PropTypes.object.isRequired,
    components: PropTypes.object.isRequired,
    getters: PropTypes.object.isRequired,
    localizer: PropTypes.object.isRequired,
    slotMetrics: PropTypes.object.isRequired,
    // eslint-disable-next-line
    resource: PropTypes.any,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.func,
    ]).isRequired,
  }

  static contextTypes = {
    eventEqualityChecker: PropTypes.func,
    draggable: PropTypes.shape({
      onStart: PropTypes.func,
      onEnd: PropTypes.func,
      onBeginAction: PropTypes.func,
      dragAndDropAction: PropTypes.object,
    }),
  }

  constructor(...args) {
    super(...args)
    this.lastMouseEventType = MOUSE_EVENT_ACTION.UNKNOWN
    this.state = {}
  }

  componentDidMount() {
    this._selectable()
  }

  componentWillUnmount() {
    this._teardownSelectable()
  }

  createEventsSubset() {
    // remove the event we're currently dragging from the events array
    // we do that because we'll be creating a new event on screen at the time of the drag
    // therefore we want to avoid duplication of the same event
    const { event: updatee } = this.context.draggable.dragAndDropAction
    const events = this.props.children.props.children
    if (updatee && events && events.length > 0) {
      const newEvents = []
      for (let i = 0; i < events.length; i += 1) {
        // go through the events
        const curEv = events[i]
        if (
          curEv &&
          curEv.props && // and if the cur evt is NOT the updatee
          this.context.eventEqualityChecker(curEv.props.event, updatee) ===
            false
        ) {
          newEvents.push(curEv) // keep it
        } // otherwise we won't be using it
      }

      // that way we don't end up with 2 events looking the same
      return newEvents
    }
    return null
  }

  reset() {
    if (this.state.event) {
      this.setState({ event: null, top: null, height: null })
    }
  }

  update(event, { startDate, endDate, top, height }) {
    const { event: lastEvent } = this.state
    if (
      lastEvent &&
      startDate === lastEvent.start &&
      endDate === lastEvent.end
    ) {
      return
    }

    this.setState({
      top,
      height,
      event: { ...event, start: startDate, end: endDate },
    })
  }

  handleMove = (point, boundaryBox) => {
    const { event } = this.context.draggable.dragAndDropAction
    const { slotMetrics } = this.props

    if (!pointInColumn(boundaryBox, point)) {
      this.reset()
      return
    }

    const currentSlot = slotMetrics.closestSlotFromPoint(
      { y: point.y - this.eventOffsetTop, x: point.x },
      boundaryBox
    )

    const end = dates.add(
      currentSlot,
      dates.diff(event.start, event.end, 'minutes'),
      'minutes'
    )

    this.update(event, slotMetrics.getRange(currentSlot, end))
  }

  handleResize(point, boundaryBox) {
    let start
    let end
    const { accessors, slotMetrics } = this.props
    const { event, direction } = this.context.draggable.dragAndDropAction

    const currentSlot = slotMetrics.closestSlotFromPoint(point, boundaryBox)
    if (direction === 'UP') {
      end = accessors.end(event)
      start = dates.min(currentSlot, slotMetrics.closestSlotFromDate(end, -1))
    } else if (direction === 'DOWN') {
      start = accessors.start(event)
      end = dates.max(currentSlot, slotMetrics.closestSlotFromDate(start))
    }

    this.update(event, slotMetrics.getRange(start, end))
  }

  _selectable = () => {
    // eslint-disable-next-line
    const node = findDOMNode(this)
    this._selector = new Selection(() => node.closest('.rbc-time-view'))
    const selector = this._selector

    // eslint-disable-next-line
    selector.on('beforeSelect', point => {
      this.lastMouseEventType = MOUSE_EVENT_ACTION.UNKNOWN
      const { dragAndDropAction } = this.context.draggable
      if (!dragAndDropAction.action) return false
      if (dragAndDropAction.action === 'resize') {
        this.lastMouseEventType = MOUSE_EVENT_ACTION.RESIZE
        const isResizingCurEvent = pointInColumn(getBoundsForNode(node), point)
        if (isResizingCurEvent) {
          // if the cur item is the one we started resizing
          // create a subset of events, so that we don't end up with a duplicate event (of the one that's being updated)
          this.eventSubset = this.createEventsSubset()
        }
        return isResizingCurEvent
      }

      const eventNode = getEventNodeFromPoint(node, point)
      if (!eventNode) return false

      // move event initializations

      // get the item top offset
      this.eventOffsetTop = point.y - getBoundsForNode(eventNode).top

      if (pointInColumn(getBoundsForNode(node), point)) {
        // if the cur item is the one we started dragging
        this.lastMouseEventType = MOUSE_EVENT_ACTION.CLICK_OR_DRAG
      }
    })

    selector.on('selecting', box => {
      const bounds = getBoundsForNode(node)
      const { dragAndDropAction } = this.context.draggable

      if (dragAndDropAction.action === 'move') {
        if (this.lastMouseEventType === MOUSE_EVENT_ACTION.CLICK_OR_DRAG) {
          this.lastMouseEventType = MOUSE_EVENT_ACTION.DRAG
          // create a subset of events, so that we don't end up with a duplicate event (of the one that's being updated)
          this.eventSubset = this.createEventsSubset()
        }
      }
      this.handleMove(box, bounds)
      if (dragAndDropAction.action === 'resize') this.handleResize(box, bounds)
    })

    selector.on('selectStart', () => this.context.draggable.onStart())

    selector.on('select', point => {
      const bounds = getBoundsForNode(node)

      this.eventSubset = null

      if (!this.state.event || !pointInColumn(bounds, point)) return
      this.handleInteractionEnd()
    })

    selector.on('click', () => {
      if (this.lastMouseEventType === MOUSE_EVENT_ACTION.CLICK_OR_DRAG) {
        this.lastMouseEventType = MOUSE_EVENT_ACTION.CLICK
      }
      this.context.draggable.onEnd(null)
    })

    selector.on('doubleClick', () => {
      this.lastMouseEventType = MOUSE_EVENT_ACTION.CLICK
    })
  }

  handleInteractionEnd = () => {
    const { resource } = this.props
    const { event } = this.state

    this.reset()
    this.lastMouseEventType = MOUSE_EVENT_ACTION.UNKNOWN

    this.context.draggable.onEnd({
      start: event.start,
      end: event.end,
      resourceId: resource,
    })
  }

  _teardownSelectable = () => {
    if (!this._selector) return
    this._selector.teardown()
    this._selector = null
  }

  render() {
    const {
      children,
      accessors,
      components,
      getters,
      slotMetrics,
      localizer,
    } = this.props

    const { event, top, height } = this.state
    const events = this.eventSubset || children.props.children

    let draggedElement = null
    if (event) {
      const { start, end } = event

      let label
      let format = 'eventTimeRangeFormat'

      const startsBeforeDay = slotMetrics.startsBeforeDay(start)
      const startsAfterDay = slotMetrics.startsAfterDay(end)

      if (startsBeforeDay) format = 'eventTimeRangeEndFormat'
      else if (startsAfterDay) format = 'eventTimeRangeStartFormat'

      if (startsBeforeDay && startsAfterDay) label = localizer.messages.allDay
      else label = localizer.format({ start, end }, format)

      draggedElement = (
        <TimeGridEvent
          event={event}
          label={label}
          className="rbc-addons-dnd-drag-preview"
          style={{ top, height, width: 100 }}
          getters={getters}
          components={{
            ...components,
            eventWrapper: NoopWrapper,
          }}
          accessors={{ ...accessors, ...dragAccessors }}
          continuesEarlier={startsBeforeDay}
          continuesLater={startsAfterDay}
        />
      )
    } else if (this.eventSubset == null) {
      return children
    }

    return React.cloneElement(children, {
      children: (
        <React.Fragment>
          {events}
          {draggedElement}
        </React.Fragment>
      ),
    })
  }
}

EventContainerWrapper.propTypes = propTypes

export default EventContainerWrapper
