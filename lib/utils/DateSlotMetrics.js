'use strict'

exports.__esModule = true

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

exports.getSlotMetrics = getSlotMetrics

var _memoizeOne = require('memoize-one')

var _memoizeOne2 = _interopRequireDefault(_memoizeOne)

var _dates = require('./dates')

var _dates2 = _interopRequireDefault(_dates)

var _eventLevels2 = require('./eventLevels')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

var isSegmentInSlot = function isSegmentInSlot(seg, slot) {
  return seg.left <= slot && seg.right >= slot
}

var isEqual = function isEqual(a, b) {
  return a.range === b.range && a.events === b.events
}

function getSlotMetrics() {
  return (0, _memoizeOne2.default)(function(options) {
    var range = options.range,
      events = options.events,
      maxRows = options.maxRows,
      minRows = options.minRows,
      accessors = options.accessors

    var _endOfRange = (0, _eventLevels2.endOfRange)(range),
      first = _endOfRange.first,
      last = _endOfRange.last

    var segments = events.map(function(evt) {
      return (0, _eventLevels2.eventSegments)(evt, range, accessors)
    })

    var _eventLevels = (0, _eventLevels2.eventLevels)(
        segments,
        Math.max(maxRows - 1, 1)
      ),
      levels = _eventLevels.levels,
      extra = _eventLevels.extra

    while (levels.length < minRows) {
      levels.push([])
    }
    return {
      first: first,
      last: last,

      levels: levels,
      extra: extra,
      range: range,
      slots: range.length,

      clone: function clone(args) {
        var metrics = getSlotMetrics()
        return metrics(_extends({}, options, args))
      },
      getDateForSlot: function getDateForSlot(slotNumber) {
        return range[slotNumber]
      },
      getSlotForDate: function getSlotForDate(date) {
        return range.find(function(r) {
          return _dates2.default.eq(r, date, 'day')
        })
      },
      getEventsForSlot: function getEventsForSlot(slot) {
        return segments
          .filter(function(seg) {
            return isSegmentInSlot(seg, slot)
          })
          .map(function(seg) {
            return seg.event
          })
      },
      continuesPrior: function continuesPrior(event) {
        return _dates2.default.lt(accessors.start(event), first, 'day')
      },
      continuesAfter: function continuesAfter(event) {
        var eventEnd = accessors.end(event)
        var singleDayDuration = _dates2.default.eq(
          accessors.start(event),
          eventEnd,
          'minutes'
        )

        return singleDayDuration
          ? _dates2.default.gte(eventEnd, last, 'minutes')
          : _dates2.default.gt(eventEnd, last, 'minutes')
      },
    }
  }, isEqual)
}
