'use strict'

exports.__esModule = true
exports.positionFromDate = exports.startsBefore = undefined

var _event2 = require('./event')

Object.defineProperty(exports, 'startsBefore', {
  enumerable: true,
  get: function get() {
    return _event2.startsBefore
  },
})
Object.defineProperty(exports, 'positionFromDate', {
  enumerable: true,
  get: function get() {
    return _event2.positionFromDate
  },
})

var _sortBy = require('lodash/sortBy')

var _sortBy2 = _interopRequireDefault(_sortBy)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _objectWithoutProperties(obj, keys) {
  var target = {}
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    target[i] = obj[i]
  }
  return target
}

/**
 * Return true if event a and b is considered to be on the same row.
 */
function onSameRow(a, b) {
  return (
    // Occupies the same start slot.
    Math.abs(b.startSlot - a.startSlot) <= 30 ||
    // A's start slot overlaps with b's end slot.
    (a.startSlot > b.startSlot && a.startSlot < b.endSlot)
  )
}

function sortByRender(events) {
  var sortedByTime = (0, _sortBy2.default)(events, [
    'start',
    function(e) {
      return -e.end
    },
  ])

  var sorted = []
  while (sortedByTime.length > 0) {
    var event = sortedByTime.shift()
    sorted.push(event)

    for (var i = 0; i < sortedByTime.length; i++) {
      var test = sortedByTime[i]

      // Still inside this event, look for next.
      if (event.end > test.start) {
        continue
      }

      // We've found the first event of the next event group.
      // If that event is not right next to our current event, we have to
      // move it here.
      if (i > 0) {
        var _sortedByTime$splice = sortedByTime.splice(i, 1),
          _event = _sortedByTime$splice[0]

        sorted.push(_event)
      }

      // We've already found the next event group, so stop looking.
      break
    }
  }

  return sorted
}

function getStyledEvents(_ref) {
  var events = _ref.events,
    props = _objectWithoutProperties(_ref, ['events'])

  // Create proxy events and order them so that we don't have
  // to fiddle with z-indexes.
  var proxies = events.map(function(event) {
    return new _event2.Event(event, props)
  })
  var eventsInRenderOrder = sortByRender(proxies)

  // Group overlapping events, while keeping order.
  // Every event is always one of: container, row or leaf.
  // Containers can contain rows, and rows can contain leaves.
  var containerEvents = []

  var _loop = function _loop(i) {
    var event = eventsInRenderOrder[i]

    // Check if this event can go into a container event.
    var container = containerEvents.find(function(c) {
      return c.endSlot > event.startSlot
    })

    // Couldn't find a container — that means this event is a container.
    if (!container) {
      event.rows = []
      containerEvents.push(event)
      return 'continue'
    }

    // Found a container for the event.
    event.container = container

    // Check if the event can be placed in an existing row.
    // Start looking from behind.
    var row = null
    for (var j = container.rows.length - 1; !row && j >= 0; j--) {
      if (onSameRow(container.rows[j], event)) {
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
  }

  // Return the original events, along with their styles.
  return eventsInRenderOrder.map(function(event) {
    return {
      event: event.data,
      style: {
        top: event.top,
        height: event.height,
        width: event.width,
        xOffset: event.xOffset,
      },
    }
  })
}

exports.default = getStyledEvents
