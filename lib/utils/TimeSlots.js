'use strict'

exports.__esModule = true
exports.getSlotMetrics = getSlotMetrics

var _dates = require('./dates')

var _dates2 = _interopRequireDefault(_dates)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

var getDstOffset = function getDstOffset(start, end) {
  return Math.abs(start.getTimezoneOffset() - end.getTimezoneOffset())
}

var getKey = function getKey(min, max, step, slots) {
  return (
    '' +
    +_dates2.default.startOf(min, 'minutes') +
    ('' + +_dates2.default.startOf(max, 'minutes')) +
    (step + '-' + slots)
  )
}

function getSlotMetrics(_ref) {
  var start = _ref.min,
    end = _ref.max,
    step = _ref.step,
    timeslots = _ref.timeslots

  var key = getKey(start, end, step, timeslots)

  var totalMin =
    _dates2.default.diff(start, end, 'minutes') + getDstOffset(start, end)
  var minutesFromMidnight = _dates2.default.diff(
    _dates2.default.startOf(start, 'day'),
    start,
    'minutes'
  )

  var numGroups = Math.ceil(totalMin / (step * timeslots))
  var numSlots = numGroups * timeslots

  var groups = new Array(numGroups)
  var slots = new Array(numSlots)
  // Each slot date is created from "zero", instead of adding `step` to
  // the previous one, in order to avoid DST oddities
  for (var grp = 0; grp < numGroups; grp++) {
    groups[grp] = new Array(timeslots)

    for (var slot = 0; slot < timeslots; slot++) {
      var slotIdx = grp * timeslots + slot
      var minFromStart = slotIdx * step
      // A date with total minutes calculated from the start of the day
      slots[slotIdx] = groups[grp][slot] = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate(),
        0,
        minutesFromMidnight + minFromStart,
        0,
        0
      )
    }
  }

  // Necessary to be able to select up until the last timeslot in a day
  var lastSlotMinFromStart = slots.length * step
  slots.push(
    new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
      0,
      minutesFromMidnight + lastSlotMinFromStart,
      0,
      0
    )
  )

  function positionFromDate(date) {
    var diff =
      _dates2.default.diff(start, date, 'minutes') + getDstOffset(start, date)
    return Math.min(diff, totalMin)
  }

  return {
    groups: groups,
    update: function update(args) {
      if (getKey(args) !== key) return getSlotMetrics(args)
      return this
    },
    dateIsInGroup: function dateIsInGroup(date, groupIndex) {
      var nextGroup = groups[groupIndex + 1]
      return _dates2.default.inRange(
        date,
        groups[groupIndex][0],
        nextGroup ? nextGroup[0] : end,
        'minutes'
      )
    },
    nextSlot: function nextSlot(slot) {
      var next = slots[Math.min(slots.indexOf(slot) + 1, slots.length - 1)]
      // in the case of the last slot we won't a long enough range so manually get it
      if (next === slot) next = _dates2.default.add(slot, step, 'minutes')
      return next
    },
    closestSlotToPosition: function closestSlotToPosition(percent) {
      var slot = Math.min(
        slots.length - 1,
        Math.max(0, Math.floor(percent * numSlots))
      )
      return slots[slot]
    },
    closestSlotFromPoint: function closestSlotFromPoint(point, boundaryRect) {
      var range = Math.abs(boundaryRect.top - boundaryRect.bottom)
      return this.closestSlotToPosition((point.y - boundaryRect.top) / range)
    },
    closestSlotFromDate: function closestSlotFromDate(date) {
      var offset =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0

      if (_dates2.default.lt(date, start, 'minutes')) return slots[0]

      var diffMins = _dates2.default.diff(start, date, 'minutes')
      return slots[(diffMins - diffMins % step) / step + offset]
    },
    startsBeforeDay: function startsBeforeDay(date) {
      return _dates2.default.lt(date, start, 'day')
    },
    startsAfterDay: function startsAfterDay(date) {
      return _dates2.default.gt(date, end, 'day')
    },
    startsBefore: function startsBefore(date) {
      return _dates2.default.lt(
        _dates2.default.merge(start, date),
        start,
        'minutes'
      )
    },
    startsAfter: function startsAfter(date) {
      return _dates2.default.gt(
        _dates2.default.merge(end, date),
        end,
        'minutes'
      )
    },
    getRange: function getRange(rangeStart, rangeEnd) {
      rangeStart = _dates2.default.min(
        end,
        _dates2.default.max(start, rangeStart)
      )
      rangeEnd = _dates2.default.min(end, _dates2.default.max(start, rangeEnd))

      var rangeStartMin = positionFromDate(rangeStart)
      var rangeEndMin = positionFromDate(rangeEnd)
      var top = rangeStartMin / totalMin * 100

      return {
        top: top,
        height: rangeEndMin / totalMin * 100 - top,
        start: positionFromDate(rangeStart),
        startDate: rangeStart,
        end: positionFromDate(rangeEnd),
        endDate: rangeEnd,
      }
    },
  }
}
