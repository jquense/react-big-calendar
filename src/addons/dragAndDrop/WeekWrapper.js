import PropTypes from 'prop-types'
import React from 'react'
import dates from '../../utils/dates'
import { getSlotAtX, pointInBox } from '../../utils/selection'
import { findDOMNode } from 'react-dom'

import { eventSegments } from '../../utils/eventLevels'
import Selection, { getBoundsForNode } from '../../Selection'
import EventRow from '../../EventRow'
import { dragAccessors } from './common'

const propTypes = {}

const eventTimes = (event, accessors) => {
  let start = accessors.start(event)
  let end = accessors.end(event)

  const isZeroDuration =
    dates.eq(start, end, 'minutes') && start.getMinutes() === 0
  // make zero duration midnight events at least one day long
  if (isZeroDuration) end = dates.add(end, 1, 'day')
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
    onEventDrop: PropTypes.func,
    onEventResize: PropTypes.func,

    onMove: PropTypes.func,
    onResize: PropTypes.func,
    dragAndDropAction: PropTypes.object,
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
    if (this.state.segment) this.setState({ segment: null })
  }

  update(event, start, end) {
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
      segment.right === lastSegment.right
    ) {
      return
    }
    this.setState({ segment })
  }

  handleMove = ({ event }, { x, y }, node) => {
    const metrics = this.props.slotMetrics
    const { accessors } = this.props

    if (!event) return

    let rowBox = getBoundsForNode(node)

    if (!pointInBox(rowBox, { x, y })) {
      this.reset()
      return
    }

    // Make sure to maintain the time of the start date while moving it to the new slot
    let start = dates.merge(
      metrics.getDateForSlot(getSlotAtX(rowBox, x, false, metrics.slots)),
      accessors.start(event)
    )

    let end = dates.add(
      start,
      dates.diff(accessors.start(event), accessors.end(event), 'minutes'),
      'minutes'
    )

    this.update(event, start, end)
  }

  handleResize({ event, direction }, point, node) {
    const { accessors, slotMetrics: metrics } = this.props

    let { start, end } = eventTimes(event, accessors)

    let rowBox = getBoundsForNode(node)
    let cursorInRow = pointInBox(rowBox, point)

    if (direction === 'RIGHT') {
      if (cursorInRow) {
        if (metrics.last < start) return this.reset()
        // add min
        end = dates.add(
          metrics.getDateForSlot(
            getSlotAtX(rowBox, point.x, false, metrics.slots)
          ),
          1,
          'day'
        )
      } else if (
        dates.inRange(start, metrics.first, metrics.last) ||
        (rowBox.bottom < point.y && +metrics.first > +start)
      ) {
        end = dates.add(metrics.last, 1, 'milliseconds')
      } else {
        this.setState({ segment: null })
        return
      }

      end = dates.max(end, dates.add(start, 1, 'day'))
    } else if (direction === 'LEFT') {
      // inbetween Row
      if (cursorInRow) {
        if (metrics.first > end) return this.reset()

        start = metrics.getDateForSlot(
          getSlotAtX(rowBox, point.x, false, metrics.slots)
        )
      } else if (
        dates.inRange(end, metrics.first, metrics.last) ||
        (rowBox.top > point.y && +metrics.last < +end)
      ) {
        start = dates.add(metrics.first, -1, 'milliseconds')
      } else {
        this.reset()
        return
      }

      start = dates.min(dates.add(end, -1, 'day'), start)
    }

    this.update(event, start, end)
  }

  _selectable = () => {
    let node = findDOMNode(this).closest('.rbc-month-row, .rbc-allday-cell')
    let container = node.closest('.rbc-month-view, .rbc-time-view')

    let selector = (this._selector = new Selection(() => container))

    selector.on('beforeSelect', point => {
      const { isAllDay } = this.props
      const { action } = this.context.dragAndDropAction

      return (
        action === 'move' ||
        (action === 'resize' &&
          (!isAllDay || pointInBox(getBoundsForNode(node), point)))
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
    selector.on('selectStart', handler)

    selector.on('select', box => {
      const { dragAndDropAction } = this.context

      switch (dragAndDropAction.action) {
        case 'move':
          this.handleEventDrop()
          break
        case 'resize':
          this.handleEventResize(box, node)
          break
      }
    })

    selector.on('click', () => {
      this.context.onMove(null)
    })
  }

  handleEventResize = (box, node) => {
    const { segment } = this.state

    if (!segment || !pointInBox(getBoundsForNode(node), box)) return
    const { dragAndDropAction, onResize, onEventResize } = this.context

    this.reset()

    onResize(null)

    onEventResize({
      event: dragAndDropAction.event,
      start: segment.event.start,
      end: segment.event.end,
    })
  }

  handleEventDrop = () => {
    const { resourceId } = this.props
    const { segment } = this.state

    if (!segment) return
    const { dragAndDropAction, onMove, onEventDrop } = this.context

    this.reset()

    onMove(null)

    onEventDrop({
      resourceId,
      event: dragAndDropAction.event,
      start: segment.event.start,
      end: segment.event.end,
      isAllDay: true,
    })
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
