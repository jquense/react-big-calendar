import PropTypes from 'prop-types'
import React from 'react'
import * as dates from '../../utils/dates'
import { getSlotAtX, pointInBox, pointInColumn } from '../../utils/selection'
import { findDOMNode } from 'react-dom'

import { eventSegments } from '../../utils/eventLevels'
import Selection, { getBoundsForNode } from '../../Selection'
import EventRow from '../../EventRow'
import { dragAccessors } from './common'

const propTypes = {}

const eventTimes = (event, accessors) => {
  let start = accessors.start(event)
  let end = accessors.end(event)

  return { start, end }
}

class WeekWrapper extends React.Component {
  static propTypes = {
    isAllDay: PropTypes.bool,
    slotMetrics: PropTypes.object.isRequired,
    accessors: PropTypes.object.isRequired,
    getters: PropTypes.object.isRequired,
    components: PropTypes.object.isRequired,
    resourceId: PropTypes.any,
  }

  static contextTypes = {
    draggable: PropTypes.shape({
      onStart: PropTypes.func,
      onEnd: PropTypes.func,
      dragAndDropAction: PropTypes.object,
      onDropFromOutside: PropTypes.func,
      onBeginAction: PropTypes.func,
      dragFromOutsideItem: PropTypes.func,
      onEventChange: PropTypes.func,
    }),
  }

  constructor(...args) {
    super(...args)
    this.initialState = { segment: null }
    this.state = this.initialState
  }

  componentDidMount() {
    this._selectable()
  }

  componentWillUnmount() {
    this._teardownSelectable()
  }

  resetSegment() {
    if (this.state.segment) this.setState({ segment: null })
  }

  resetState() {
    this.setState(this.initialState)
  }

  update(event, start, end, shouldTriggerEventChange = true) {
    const segment = eventSegments(
      { ...event, end, start, __isPreview: true },
      this.props.slotMetrics.range,
      dragAccessors
    )

    const { segment: lastSegment } = this.state
    if (
      lastSegment &&
      segment.span === lastSegment.span &&
      segment.left === lastSegment.left &&
      segment.right === lastSegment.right &&
      dates.eq(lastSegment.event.start, segment.event.start) &&
      dates.eq(lastSegment.event.end, segment.event.end)
    ) {
      return
    }
    this.setState({ segment })

    if (shouldTriggerEventChange) {
      this.context.draggable.onEventChange(
        segment.event.start,
        segment.event.end
      )
    }
  }

  handleMove = ({ x, y }, node, draggedEvent) => {
    const { dragAndDropAction } = this.context.draggable
    const { actionOriginalDate } = dragAndDropAction
    const event = dragAndDropAction.event || draggedEvent
    const metrics = this.props.slotMetrics
    const { accessors } = this.props

    if (!event) return

    let rowBox = getBoundsForNode(node)

    if (!pointInBox(rowBox, { x, y })) {
      this.resetSegment()

      // If we are dragging off the calendar grid, set to the
      // original segment/initial event
      const withinGridWidth = pointInColumn(rowBox, x)
      if (
        !withinGridWidth &&
        actionOriginalDate &&
        dates.inRange(
          actionOriginalDate,
          metrics.first,
          dates.add(metrics.last, -1, 'milliseconds')
        )
      ) {
        this.resetToInitialEvent()
      }
      return
    }

    // Make sure to maintain the time of the start date while moving it to the new slot.
    // Also, ensure that when we drag from the middle of the event,
    // we don't automatically set the current date slot as the
    // start of the event.
    const currentSlotDate = metrics.getDateForSlot(
      getSlotAtX(rowBox, x, false, metrics.slots)
    )
    let start = dates.add(
      currentSlotDate,
      dates.relativeDiff(accessors.start(event), actionOriginalDate, 'minutes'),
      'minutes'
    )

    let end = dates.add(
      start,
      dates.diff(accessors.start(event), accessors.end(event), 'minutes'),
      'minutes'
    )

    this.update(event, start, end)
  }

  handleDropFromOutside = (point, rowBox) => {
    if (!this.context.draggable.onDropFromOutside) return
    const { slotMetrics: metrics } = this.props

    let start = metrics.getDateForSlot(
      getSlotAtX(rowBox, point.x, false, metrics.slots)
    )

    this.context.draggable.onDropFromOutside({
      start,
      end: dates.add(start, 1, 'day'),
      allDay: false,
    })
  }

  handleDragOverFromOutside = ({ x, y }, node) => {
    if (!this.context.draggable.dragFromOutsideItem) return

    this.handleMove(
      { x, y },
      node,
      this.context.draggable.dragFromOutsideItem()
    )
  }

  handleResize(point, node) {
    const { event, direction } = this.context.draggable.dragAndDropAction
    const { accessors, slotMetrics: metrics } = this.props

    let { start, end } = eventTimes(event, accessors)

    let rowBox = getBoundsForNode(node)

    const rangeEnd = dates.add(metrics.last, -1, 'milliseconds')
    const aboveTopOfRow = point.y < rowBox.top
    const aboveBottomOfRow = point.y <= rowBox.bottom
    const belowBottomOfRow = point.y > rowBox.bottom
    const belowTopOfRow = point.y >= rowBox.top
    const withinGridWidth = pointInColumn(rowBox, point.x)
    const startIsAfterEndOfWeek = rangeEnd < start
    const endIsBeforeStartOfWeek = metrics.first > end
    const getNewDatePosition = () =>
      metrics.getDateForSlot(getSlotAtX(rowBox, point.x, false, metrics.slots))

    // Check resize direction
    if (direction === 'RIGHT') {
      // Check if we're resizing outside the X bounds
      if (!withinGridWidth) {
        // If the initial event spanned this week, set the
        // preview segment to the initial event
        if (
          dates.inRange(start, metrics.first, rangeEnd) ||
          dates.inRange(metrics.first, start, end)
        ) {
          this.resetToInitialEvent()
          return
          // Else, remove the segment
        } else {
          this.resetSegment()
          return
        }
        // If we are resizing above the current row
      } else if (aboveTopOfRow) {
        // If the date started in this row, set the end to
        // the start (0 duration event)
        if (dates.inRange(start, metrics.first, rangeEnd)) {
          end = start
          // Else, remove the segment
        } else {
          this.resetSegment()
          return
        }
      } else {
        // Check if we're resizing within this row
        if (aboveBottomOfRow) {
          // Check if we're trying to change the end date to
          // before the start date by resizing up a week
          if (startIsAfterEndOfWeek) {
            return
            // Otherwise, get the current slot's date
          } else {
            end = getNewDatePosition()
          }
          // Otherwise, we are resizing a week below
        } else {
          // Check if current start is after end of this week
          // (should not render segment)
          if (startIsAfterEndOfWeek) {
            this.resetSegment()
            return
          } else {
            end = dates.add(metrics.last, 1, 'milliseconds')
          }
        }
        // Keep the original time
        end = dates.merge(end, accessors.end(event))
        // Ensure end date is not before start date
        if (dates.lt(end, start)) {
          end = start
        }
      }
    } else if (direction === 'LEFT') {
      // Check if we're resizing outside the X bounds
      if (!withinGridWidth) {
        // If the initial event spanned this week, set the
        // preview segment to the initial event
        if (
          dates.inRange(end, metrics.first, rangeEnd) ||
          dates.inRange(rangeEnd, start, end)
        ) {
          this.resetToInitialEvent()
          return
          // Else, remove the segment
        } else {
          this.resetSegment()
          return
        }
        // If we are resizing below the current row
      } else if (belowBottomOfRow) {
        // If the date ended in this row, set the end to
        // the start (0 duration event)
        if (dates.inRange(end, metrics.first, rangeEnd)) {
          start = end
          // Else, remove the segment
        } else {
          this.resetSegment()
          return
        }
      } else {
        // Check if we're resizing within this row
        if (belowTopOfRow) {
          // Check if we're trying to change the start date to
          // after the end date by resizing down a week
          if (endIsBeforeStartOfWeek) {
            return
            // Otherwise, get the current slot's date
          } else {
            start = getNewDatePosition()
          }
          // Otherwise, we are resizing a week above
        } else {
          // Check if current end is before start this week
          // should not render segment
          if (endIsBeforeStartOfWeek) {
            this.resetSegment()
            return
          } else {
            start = dates.add(metrics.first, -1, 'milliseconds')
          }
        }
        // Keep the original time
        start = dates.merge(start, accessors.start(event))
        // Ensure start date is not after end date
        if (dates.gt(start, end)) {
          start = end
        }
      }
    }

    this.update(event, start, end, pointInBox(rowBox, point))
  }

  resetToInitialEvent() {
    const { dragAndDropAction, onEventChange } = this.context.draggable
    const segment = eventSegments(
      { ...dragAndDropAction.event, __isPreview: true },
      this.props.slotMetrics.range,
      dragAccessors
    )

    this.setState({ segment: segment })
    onEventChange(segment.event.start, segment.event.end)
  }

  _selectable = () => {
    let node = findDOMNode(this).closest('.rbc-month-row, .rbc-allday-cell')
    let container = node.closest('.rbc-month-view, .rbc-time-view')

    let selector = (this._selector = new Selection(() => container))

    selector.on('beforeSelect', point => {
      const { isAllDay } = this.props
      const { action } = this.context.draggable.dragAndDropAction

      return (
        action === 'move' ||
        (action === 'resize' &&
          (!isAllDay || pointInBox(getBoundsForNode(node), point)))
      )
    })

    selector.on('selecting', box => {
      const bounds = getBoundsForNode(node)
      const { dragAndDropAction } = this.context.draggable

      if (dragAndDropAction.action === 'move') this.handleMove(box, bounds)
      if (dragAndDropAction.action === 'resize') this.handleResize(box, bounds)
    })

    selector.on('selectStart', box => {
      const bounds = getBoundsForNode(node)
      this.handleInteractionStart(box, bounds)
    })

    selector.on('select', point => {
      const bounds = getBoundsForNode(node)

      if (!pointInBox(bounds, point)) {
        this.resetSegment()
      } else {
        this.handleInteractionEnd()
      }
    })

    selector.on('dropFromOutside', point => {
      if (!this.context.draggable.onDropFromOutside) return

      const bounds = getBoundsForNode(node)

      if (!pointInBox(bounds, point)) return

      this.handleDropFromOutside(point, bounds)
    })

    selector.on('dragOverFromOutside', point => {
      if (!this.context.draggable.dragFromOutsideItem) return

      const bounds = getBoundsForNode(node)

      this.handleDragOverFromOutside(point, bounds)
    })

    selector.on('click', () => this.context.draggable.onEnd(null))

    selector.on('reset', () => {
      this.resetState()
      this.context.draggable.onEnd(null)
    })
  }

  handleInteractionStart = ({ x, y }, node) => {
    const { dragAndDropAction, onStart } = this.context.draggable
    const metrics = this.props.slotMetrics

    const rowBox = getBoundsForNode(node)

    if (pointInBox(rowBox, { x, y })) {
      onStart(
        dragAndDropAction.action === 'move'
          ? metrics.getDateForSlot(getSlotAtX(rowBox, x, false, metrics.slots))
          : null
      )
    }
  }

  handleInteractionEnd = () => {
    const { resourceId, isAllDay } = this.props
    const { segment } = this.state
    const {
      event: initialEvent,
      direction,
    } = this.context.draggable.dragAndDropAction

    if (segment) {
      this.context.draggable.onEnd({
        start: segment.event.start,
        end: segment.event.end,
        resourceId,
        isAllDay,
      })
    } else {
      if (direction === 'RIGHT') {
        this.context.draggable.onEnd({
          start: initialEvent.start,
          end: initialEvent.start,
          resourceId,
          isAllDay,
        })
      } else if (direction === 'LEFT') {
        this.context.draggable.onEnd({
          start: initialEvent.end,
          end: initialEvent.end,
          resourceId,
          isAllDay,
        })
      } else {
        this.context.draggable.onEnd(null)
      }
    }
    this.resetState()
  }

  _teardownSelectable = () => {
    if (!this._selector) return
    this._selector.teardown()
    this._selector = null
  }

  render() {
    const { children, accessors } = this.props

    let { segment } = this.state

    return (
      <div className="rbc-addons-dnd-row-body">
        {children}

        {segment && (
          <EventRow
            {...this.props}
            selected={null}
            className="rbc-addons-dnd-drag-row"
            segments={[segment]}
            accessors={{
              ...accessors,
              ...dragAccessors,
            }}
          />
        )}
      </div>
    )
  }
}

WeekWrapper.propTypes = propTypes

export default WeekWrapper
