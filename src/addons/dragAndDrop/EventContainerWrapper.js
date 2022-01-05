import PropTypes from 'prop-types'
import React from 'react'
import { DnDContext } from './DnDContext'

import Selection, {
  getBoundsForNode,
  getEventNodeFromPoint,
} from '../../Selection'
import TimeGridEvent from '../../TimeGridEvent'
import { dragAccessors, eventTimes, pointInColumn } from './common'
import NoopWrapper from '../../NoopWrapper'

class EventContainerWrapper extends React.Component {
  static propTypes = {
    accessors: PropTypes.object.isRequired,
    components: PropTypes.object.isRequired,
    getters: PropTypes.object.isRequired,
    localizer: PropTypes.object.isRequired,
    slotMetrics: PropTypes.object.isRequired,
    resource: PropTypes.any,
  }

  static contextType = DnDContext

  constructor(...args) {
    super(...args)
    this.state = {}
    this.ref = React.createRef()
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

  handleMove = (point, bounds) => {
    if (!pointInColumn(bounds, point)) return this.reset()
    const { event } = this.context.draggable.dragAndDropAction
    const { accessors, slotMetrics } = this.props

    const newSlot = slotMetrics.closestSlotFromPoint(
      { y: point.y - this.eventOffsetTop, x: point.x },
      bounds
    )

    const { duration } = eventTimes(event, accessors, this.props.localizer)
    let newEnd = this.props.localizer.add(newSlot, duration, 'milliseconds')
    this.update(event, slotMetrics.getRange(newSlot, newEnd, false, true))
  }

  handleResize(point, bounds) {
    const { accessors, slotMetrics, localizer } = this.props
    const { event, direction } = this.context.draggable.dragAndDropAction
    const newTime = slotMetrics.closestSlotFromPoint(point, bounds)

    let { start, end } = eventTimes(event, accessors, localizer)
    if (direction === 'UP') {
      start = localizer.min(newTime, slotMetrics.closestSlotFromDate(end, -1))
    } else if (direction === 'DOWN') {
      end = localizer.max(newTime, slotMetrics.closestSlotFromDate(start))
    }

    this.update(event, slotMetrics.getRange(start, end))
  }

  handleDropFromOutside = (point, boundaryBox) => {
    const { slotMetrics, resource } = this.props

    let start = slotMetrics.closestSlotFromPoint(
      { y: point.y, x: point.x },
      boundaryBox
    )

    this.context.draggable.onDropFromOutside({
      start,
      end: slotMetrics.nextSlot(start),
      allDay: false,
      resource,
    })
  }

  _selectable = () => {
    let wrapper = this.ref.current
    let node = wrapper.children[0]
    let isBeingDragged = false
    let selector = (this._selector = new Selection(() =>
      wrapper.closest('.rbc-time-view')
    ))

    selector.on('beforeSelect', point => {
      const { dragAndDropAction } = this.context.draggable

      if (!dragAndDropAction.action) return false
      if (dragAndDropAction.action === 'resize') {
        return pointInColumn(getBoundsForNode(node), point)
      }

      const eventNode = getEventNodeFromPoint(node, point)
      if (!eventNode) return false

      // eventOffsetTop is distance from the top of the event to the initial
      // mouseDown position. We need this later to compute the new top of the
      // event during move operations, since the final location is really a
      // delta from this point. note: if we want to DRY this with WeekWrapper,
      // probably better just to capture the mouseDown point here and do the
      // placement computation in handleMove()...
      this.eventOffsetTop = point.y - getBoundsForNode(eventNode).top
    })

    selector.on('selecting', box => {
      const bounds = getBoundsForNode(node)
      const { dragAndDropAction } = this.context.draggable

      if (dragAndDropAction.action === 'move') this.handleMove(box, bounds)
      if (dragAndDropAction.action === 'resize') this.handleResize(box, bounds)
    })

    selector.on('dropFromOutside', point => {
      if (!this.context.draggable.onDropFromOutside) return
      const bounds = getBoundsForNode(node)
      if (!pointInColumn(bounds, point)) return
      this.handleDropFromOutside(point, bounds)
    })

    selector.on('dragOver', point => {
      if (!this.context.draggable.dragFromOutsideItem) return
      const bounds = getBoundsForNode(node)
      this.handleDropFromOutside(point, bounds)
    })

    selector.on('selectStart', () => {
      isBeingDragged = true
      this.context.draggable.onStart()
    })

    selector.on('select', point => {
      const bounds = getBoundsForNode(node)
      isBeingDragged = false
      if (!this.state.event || !pointInColumn(bounds, point)) return
      this.handleInteractionEnd()
    })

    selector.on('click', () => {
      if (isBeingDragged) this.reset()
      this.context.draggable.onEnd(null)
    })

    selector.on('reset', () => {
      this.reset()
      this.context.draggable.onEnd(null)
    })
  }

  handleInteractionEnd = () => {
    const { resource } = this.props
    const { event } = this.state

    this.reset()

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

  renderContent() {
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

  render() {
    return <div ref={this.ref}>{this.renderContent()}</div>
  }
}

export default EventContainerWrapper
