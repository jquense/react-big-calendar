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

const pointerInColumn = (node, x, y) => {
  const { left, right, top } = getBoundsForNode(node)
  return x < right + 10 && x > left && (y == null || y > top)
}
const propTypes = {}

class EventContainerWrapper extends React.Component {
  static propTypes = {
    accessors: PropTypes.object.isRequired,
    components: PropTypes.object.isRequired,
    getters: PropTypes.object.isRequired,
    localizer: PropTypes.object.isRequired,
    slotMetrics: PropTypes.object.isRequired,
    resource: PropTypes.any,
  }

  static contextTypes = {
    onEventDrop: PropTypes.func,
    onEventResize: PropTypes.func,
    dragAndDropAction: PropTypes.object,
    onMove: PropTypes.func,
    onResize: PropTypes.func,
  }

  constructor(...args) {
    super(...args)
    this.state = {}
  }

  componentDidMount() {
    this._selectable()
  }

  componentWillUnmount() {
    this._teardownSelectable()
  }

  reset() {
    if (this.state.event)
      this.setState({ event: null, top: null, height: null })
  }

  update(event, { startDate, endDate, top, height }) {
    this.setState()

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

  handleMove = ({ event }, point, node) => {
    const { slotMetrics } = this.props

    if (!pointerInColumn(node, point.x, point.y)) {
      this.reset()
      return
    }

    let currentSlot = slotMetrics.closestSlotFromPoint(
      { y: point.y - this.eventOffsetTop, x: point.x },
      getBoundsForNode(node)
    )

    let end = dates.add(
      currentSlot,
      dates.diff(event.start, event.end, 'minutes'),
      'minutes'
    )

    this.update(event, slotMetrics.getRange(currentSlot, end))
  }

  handleResize({ event, direction }, point, node) {
    let start, end
    const { accessors, slotMetrics } = this.props
    const bounds = getBoundsForNode(node)

    let currentSlot = slotMetrics.closestSlotFromPoint(point, bounds)
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
    let node = findDOMNode(this)
    let selector = (this._selector = new Selection(() =>
      node.closest('.rbc-time-view')
    ))

    selector.on('beforeSelect', point => {
      const { action } = this.context.dragAndDropAction
      const eventNode = getEventNodeFromPoint(node, point)

      if (!eventNode) return false
      this.eventOffsetTop = point.y - getBoundsForNode(eventNode).top

      return (
        action === 'move' ||
        (action === 'resize' && pointerInColumn(node, point.x, point.y))
      )
    })

    let handler = box => {
      const { dragAndDropAction } = this.context

      switch (dragAndDropAction.action) {
        case 'move':
          this.handleMove(dragAndDropAction, box, node)
          break
        case 'resize':
          this.handleResize(dragAndDropAction, box, node)
          break
      }
    }

    selector.on('selecting', handler)

    selector.on('select', () => {
      const { dragAndDropAction } = this.context

      switch (dragAndDropAction.action) {
        case 'move':
          this.handleEventDrop()
          break
        case 'resize':
          this.handleEventResize()
          break
      }

      this._isInitialContainer = false
    })

    selector.on('click', () => {
      this._isInitialContainer = false
      this.context.onMove(null)
    })
  }

  handleEventDrop = () => {
    if (!this.state.event) return

    const { resource } = this.props
    const { start, end } = this.state.event
    const { dragAndDropAction, onMove, onEventDrop } = this.context

    this.reset()

    onMove(null)

    onEventDrop({
      end,
      start,
      event: dragAndDropAction.event,
      resourceId: resource,
    })
  }

  handleEventResize = () => {
    const { event } = this.state

    const { dragAndDropAction, onResize, onEventResize } = this.context

    this.reset()

    onResize(null)

    onEventResize({
      event: dragAndDropAction.event,
      start: event.start,
      end: event.end,
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

    let { event, top, height } = this.state

    if (!event) return children

    const events = children.props.children
    const { start, end } = event

    let label
    let format = 'eventTimeRangeFormat'

    const startsBeforeDay = slotMetrics.startsBeforeDay(start)
    const startsAfterDay = slotMetrics.startsAfterDay(end)

    if (startsBeforeDay) format = 'eventTimeRangeEndFormat'
    else if (startsAfterDay) format = 'eventTimeRangeStartFormat'

    if (startsBeforeDay && startsAfterDay) label = localizer.messages.allDay
    else label = localizer.format({ start, end }, format)

    return React.cloneElement(children, {
      children: (
        <React.Fragment>
          {events}

          {event && (
            <TimeGridEvent
              event={event}
              label={label}
              className="rbc-addons-dnd-drag-preview"
              style={{ top, height, width: 100 }}
              getters={getters}
              components={{ ...components, eventWrapper: NoopWrapper }}
              accessors={{ ...accessors, ...dragAccessors }}
              continuesEarlier={startsBeforeDay}
              continuesLater={startsAfterDay}
            />
          )}
        </React.Fragment>
      ),
    })
  }
}

EventContainerWrapper.propTypes = propTypes

export default EventContainerWrapper
