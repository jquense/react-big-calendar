'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

exports.__esModule = true
exports.getSlotMetrics = getSlotMetrics

var dates = _interopRequireWildcard(require('./dates'))

var getDstOffset = function getDstOffset(start, end) {
  return start.getTimezoneOffset() - end.getTimezoneOffset()
}

var getKey = function getKey(min, max, step, slots) {
  return (
    '' +
    +dates.startOf(min, 'minutes') +
    ('' + +dates.startOf(max, 'minutes')) +
    (step + '-' + slots)
  )
}

function getSlotMetrics(_ref) {
  var start = _ref.min,
    end = _ref.max,
    step = _ref.step,
    timeslots = _ref.timeslots
  var key = getKey(start, end, step, timeslots) // if the start is on a DST-changing day but *after* the moment of DST
  // transition we need to add those extra minutes to our minutesFromMidnight

  var daystart = dates.startOf(start, 'day')
  var daystartdstoffset = getDstOffset(daystart, start)
  var totalMin =
    1 + dates.diff(start, end, 'minutes') + getDstOffset(start, end)
  var minutesFromMidnight =
    dates.diff(daystart, start, 'minutes') + daystartdstoffset
  var numGroups = Math.ceil(totalMin / (step * timeslots))
  var numSlots = numGroups * timeslots
  var groups = new Array(numGroups)
  var slots = new Array(numSlots) // Each slot date is created from "zero", instead of adding `step` to
  // the previous one, in order to avoid DST oddities

  for (var grp = 0; grp < numGroups; grp++) {
    groups[grp] = new Array(timeslots)

    for (var slot = 0; slot < timeslots; slot++) {
      var slotIdx = grp * timeslots + slot
      var minFromStart = slotIdx * step // A date with total minutes calculated from the start of the day

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
  } // Necessary to be able to select up until the last timeslot in a day

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
    var diff = dates.diff(start, date, 'minutes') + getDstOffset(start, date)
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
      return dates.inRange(
        date,
        groups[groupIndex][0],
        nextGroup ? nextGroup[0] : end,
        'minutes'
      )
    },
    nextSlot: function nextSlot(slot) {
      var next = slots[Math.min(slots.indexOf(slot) + 1, slots.length - 1)] // in the case of the last slot we won't a long enough range so manually get it

      if (next === slot) next = dates.add(slot, step, 'minutes')
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
    closestSlotFromDate: function closestSlotFromDate(date, offset) {
      if (offset === void 0) {
        offset = 0
      }

      if (dates.lt(date, start, 'minutes')) return slots[0]
      var diffMins = dates.diff(start, date, 'minutes')
      return slots[(diffMins - (diffMins % step)) / step + offset]
    },
    startsBeforeDay: function startsBeforeDay(date) {
      return dates.lt(date, start, 'day')
    },
    startsAfterDay: function startsAfterDay(date) {
      return dates.gt(date, end, 'day')
    },
    startsBefore: function startsBefore(date) {
      return dates.lt(dates.merge(start, date), start, 'minutes')
    },
    startsAfter: function startsAfter(date) {
      return dates.gt(dates.merge(end, date), end, 'minutes')
    },
    getRange: function getRange(rangeStart, rangeEnd, ignoreMin, ignoreMax) {
      if (!ignoreMin) rangeStart = dates.min(end, dates.max(start, rangeStart))
      if (!ignoreMax) rangeEnd = dates.min(end, dates.max(start, rangeEnd))
      var rangeStartMin = positionFromDate(rangeStart)
      var rangeEndMin = positionFromDate(rangeEnd)
      var top =
        rangeEndMin > step * numSlots && !dates.eq(end, rangeEnd)
          ? ((rangeStartMin - step) / (step * numSlots)) * 100
          : (rangeStartMin / (step * numSlots)) * 100
      return {
        top: top,
        height: (rangeEndMin / (step * numSlots)) * 100 - top,
        start: positionFromDate(rangeStart),
        startDate: rangeStart,
        end: positionFromDate(rangeEnd),
        endDate: rangeEnd,
      }
    },
    getCurrentTimePosition: function getCurrentTimePosition(rangeStart) {
      var rangeStartMin = positionFromDate(rangeStart)
      var top = (rangeStartMin / (step * numSlots)) * 100
      return top
    },
  }
}
