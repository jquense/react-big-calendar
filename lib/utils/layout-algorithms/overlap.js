'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = getStyledEvents

var _sortBy = _interopRequireDefault(require('lodash/sortBy'))

class Event {
  constructor(data, _ref) {
    var { accessors, slotMetrics } = _ref
    var { start, startDate, end, endDate, top, height } = slotMetrics.getRange(
      accessors.start(data),
      accessors.end(data)
    )
    this.start = start
    this.end = end
    this.startMs = +startDate
    this.endMs = +endDate
    this.top = top
    this.height = height
    this.data = data
  }
  /**
   * The event's width without any overlap.
   */

  get _width() {
    // The container event's width is determined by the maximum number of
    // events in any of its rows.
    if (this.rows) {
      var columns =
        this.rows.reduce(
          (max, row) => Math.max(max, row.leaves.length + 1), // add itself
          0
        ) + 1 // add the container

      return 100 / columns
    }

    var availableWidth = 100 - this.container._width // The row event's width is the space left by the container, divided
    // among itself and its leaves.

    if (this.leaves) {
      return availableWidth / (this.leaves.length + 1)
    } // The leaf event's width is determined by its row's width

    return this.row._width
  }
  /**
   * The event's calculated width, possibly with extra width added for
   * overlapping effect.
   */

  get width() {
    var noOverlap = this._width
    var overlap = Math.min(100, this._width * 1.7) // Containers can always grow.

    if (this.rows) {
      return overlap
    } // Rows can grow if they have leaves.

    if (this.leaves) {
      return this.leaves.length > 0 ? overlap : noOverlap
    } // Leaves can grow unless they're the last item in a row.

    var { leaves } = this.row
    var index = leaves.indexOf(this)
    return index === leaves.length - 1 ? noOverlap : overlap
  }

  get xOffset() {
    // Containers have no offset.
    if (this.rows) return 0 // Rows always start where their container ends.

    if (this.leaves) return this.container._width // Leaves are spread out evenly on the space left by its row.

    var { leaves, xOffset, _width } = this.row
    var index = leaves.indexOf(this) + 1
    return xOffset + index * _width
  }
}
/**
 * Return true if event a and b is considered to be on the same row.
 */

function onSameRow(a, b, minimumStartDifference) {
  return (
    // Occupies the same start slot.
    Math.abs(b.start - a.start) < minimumStartDifference || // A's start slot overlaps with b's end slot.
    (b.start > a.start && b.start < a.end)
  )
}

function sortByRender(events) {
  var sortedByTime = (0, _sortBy.default)(events, ['startMs', e => -e.endMs])
  var sorted = []

  while (sortedByTime.length > 0) {
    var event = sortedByTime.shift()
    sorted.push(event)

    for (var i = 0; i < sortedByTime.length; i++) {
      var test = sortedByTime[i] // Still inside this event, look for next.

      if (event.endMs > test.startMs) continue // We've found the first event of the next event group.
      // If that event is not right next to our current event, we have to
      // move it here.

      if (i > 0) {
        var _event = sortedByTime.splice(i, 1)[0]
        sorted.push(_event)
      } // We've already found the next event group, so stop looking.

      break
    }
  }

  return sorted
}

function getStyledEvents(_ref2) {
  var { events, minimumStartDifference, slotMetrics, accessors } = _ref2
  // Create proxy events and order them so that we don't have
  // to fiddle with z-indexes.
  var proxies = events.map(
    event =>
      new Event(event, {
        slotMetrics,
        accessors,
      })
  )
  var eventsInRenderOrder = sortByRender(proxies) // Group overlapping events, while keeping order.
  // Every event is always one of: container, row or leaf.
  // Containers can contain rows, and rows can contain leaves.

  var containerEvents = []

  var _loop = function _loop(i) {
    var event = eventsInRenderOrder[i] // Check if this event can go into a container event.

    var container = containerEvents.find(
      c =>
        c.end > event.start ||
        Math.abs(event.start - c.start) < minimumStartDifference
    ) // Couldn't find a container — that means this event is a container.

    if (!container) {
      event.rows = []
      containerEvents.push(event)
      return 'continue'
    } // Found a container for the event.

    event.container = container // Check if the event can be placed in an existing row.
    // Start looking from behind.

    var row = null

    for (var j = container.rows.length - 1; !row && j >= 0; j--) {
      if (onSameRow(container.rows[j], event, minimumStartDifference)) {
        row = container.rows[j]
      }
    }

    if (row) {
      // Found a row, so add it.
      row.leaves.push(event)
      event.row = row
    } else {
      // Couldn't find a row – that means this event is a row.
      event.leaves = []
      container.rows.push(event)
    }
  }

  for (var i = 0; i < eventsInRenderOrder.length; i++) {
    var _ret = _loop(i)

    if (_ret === 'continue') continue
  } // Return the original events, along with their styles.

  return eventsInRenderOrder.map(event => ({
    event: event.data,
    style: {
      top: event.top,
      height: event.height,
      width: event.width,
      xOffset: Math.max(0, event.xOffset),
    },
  }))
}

module.exports = exports.default
