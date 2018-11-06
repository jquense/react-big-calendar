'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.endOfRange = endOfRange
exports.eventSegments = eventSegments
exports.eventLevels = eventLevels
exports.inRange = inRange
exports.segsOverlap = segsOverlap
exports.sortEvents = sortEvents

var _findIndex = _interopRequireDefault(require('lodash/findIndex'))

var _dates = _interopRequireDefault(require('./dates'))

function endOfRange(dateRange, unit) {
  if (unit === void 0) {
    unit = 'day'
  }

  return {
    first: dateRange[0],
    last: _dates.default.add(dateRange[dateRange.length - 1], 1, unit),
  }
}

function eventSegments(event, range, accessors) {
  var _endOfRange = endOfRange(range),
    first = _endOfRange.first,
    last = _endOfRange.last

  var slots = _dates.default.diff(first, last, 'day')

  var start = _dates.default.max(
    _dates.default.startOf(accessors.start(event), 'day'),
    first
  )

  var end = _dates.default.min(
    _dates.default.ceil(accessors.end(event), 'day'),
    last
  )

  var padding = (0, _findIndex.default)(range, function(x) {
    return _dates.default.eq(x, start, 'day')
  })

  var span = _dates.default.diff(start, end, 'day')

  span = Math.min(span, slots)
  span = Math.max(span, 1)
  return {
    event: event,
    span: span,
    left: padding + 1,
    right: Math.max(padding + span, 1),
  }
}

function eventLevels(rowSegments, limit) {
  if (limit === void 0) {
    limit = Infinity
  }

  var i,
    j,
    seg,
    levels = [],
    extra = []

  for (i = 0; i < rowSegments.length; i++) {
    seg = rowSegments[i]

    for (j = 0; j < levels.length; j++) {
      if (!segsOverlap(seg, levels[j])) break
    }

    if (j >= limit) {
      extra.push(seg)
    } else {
      ;(levels[j] || (levels[j] = [])).push(seg)
    }
  }

  for (i = 0; i < levels.length; i++) {
    levels[i].sort(function(a, b) {
      return a.left - b.left
    }) //eslint-disable-line
  }

  return {
    levels: levels,
    extra: extra,
  }
}

function inRange(e, start, end, accessors) {
  var eStart = _dates.default.startOf(accessors.start(e), 'day')

  var eEnd = accessors.end(e)

  var startsBeforeEnd = _dates.default.lte(eStart, end, 'day') // when the event is zero duration we need to handle a bit differently

  var endsAfterStart = !_dates.default.eq(eStart, eEnd, 'minutes')
    ? _dates.default.gt(eEnd, start, 'minutes')
    : _dates.default.gte(eEnd, start, 'minutes')
  return startsBeforeEnd && endsAfterStart
}

function segsOverlap(seg, otherSegs) {
  return otherSegs.some(function(otherSeg) {
    return otherSeg.left <= seg.right && otherSeg.right >= seg.left
  })
}

function sortEvents(evtA, evtB, accessors) {
  var startSort =
    +_dates.default.startOf(accessors.start(evtA), 'day') -
    +_dates.default.startOf(accessors.start(evtB), 'day')

  var durA = _dates.default.diff(
    accessors.start(evtA),
    _dates.default.ceil(accessors.end(evtA), 'day'),
    'day'
  )

  var durB = _dates.default.diff(
    accessors.start(evtB),
    _dates.default.ceil(accessors.end(evtB), 'day'),
    'day'
  )

  return (
    startSort || // sort by start Day first
    Math.max(durB, 1) - Math.max(durA, 1) || // events spanning multiple days go first
    !!accessors.allDay(evtB) - !!accessors.allDay(evtA) || // then allDay single day events
    +accessors.start(evtA) - +accessors.start(evtB)
  ) // then sort by start time
}
