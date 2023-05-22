"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSlotMetrics = getSlotMetrics;

var getKey = function getKey(_ref) {
  var min = _ref.min,
      max = _ref.max,
      step = _ref.step,
      slots = _ref.slots,
      localizer = _ref.localizer;
  return "".concat(+localizer.startOf(min, 'minutes')) + "".concat(+localizer.startOf(max, 'minutes')) + "".concat(step, "-").concat(slots);
};

function getSlotMetrics(_ref2) {
  var start = _ref2.min,
      end = _ref2.max,
      step = _ref2.step,
      timeslots = _ref2.timeslots,
      localizer = _ref2.localizer;
  var key = getKey({
    start: start,
    end: end,
    step: step,
    timeslots: timeslots,
    localizer: localizer
  }); // DST differences are handled inside the localizer

  var totalMin = 1 + localizer.getTotalMin(start, end);
  var minutesFromMidnight = localizer.getMinutesFromMidnight(start);
  var numGroups = Math.ceil((totalMin - 1) / (step * timeslots));
  var numSlots = numGroups * timeslots;
  var groups = new Array(numGroups);
  var slots = new Array(numSlots); // Each slot date is created from "zero", instead of adding `step` to
  // the previous one, in order to avoid DST oddities

  for (var grp = 0; grp < numGroups; grp++) {
    groups[grp] = new Array(timeslots);

    for (var slot = 0; slot < timeslots; slot++) {
      var slotIdx = grp * timeslots + slot;
      var minFromStart = slotIdx * step; // A date with total minutes calculated from the start of the day

      slots[slotIdx] = groups[grp][slot] = localizer.getSlotDate(start, minutesFromMidnight, minFromStart);
    }
  } // Necessary to be able to select up until the last timeslot in a day


  var lastSlotMinFromStart = slots.length * step;
  slots.push(localizer.getSlotDate(start, minutesFromMidnight, lastSlotMinFromStart));

  function positionFromDate(date) {
    var diff = localizer.diff(start, date, 'minutes') + localizer.getDstOffset(start, date);
    return Math.min(diff, totalMin);
  }

  return {
    groups: groups,
    update: function update(args) {
      if (getKey(args) !== key) return getSlotMetrics(args);
      return this;
    },
    dateIsInGroup: function dateIsInGroup(date, groupIndex) {
      var nextGroup = groups[groupIndex + 1];
      return localizer.inRange(date, groups[groupIndex][0], nextGroup ? nextGroup[0] : end, 'minutes');
    },
    nextSlot: function nextSlot(slot) {
      var next = slots[Math.min(slots.indexOf(slot) + 1, slots.length - 1)]; // in the case of the last slot we won't a long enough range so manually get it

      if (next === slot) next = localizer.add(slot, step, 'minutes');
      return next;
    },
    closestSlotToPosition: function closestSlotToPosition(percent) {
      var slot = Math.min(slots.length - 1, Math.max(0, Math.floor(percent * numSlots)));
      return slots[slot];
    },
    closestSlotFromPoint: function closestSlotFromPoint(point, boundaryRect) {
      var range = Math.abs(boundaryRect.top - boundaryRect.bottom);
      return this.closestSlotToPosition((point.y - boundaryRect.top) / range);
    },
    closestSlotFromDate: function closestSlotFromDate(date) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      if (localizer.lt(date, start, 'minutes')) return slots[0];
      if (localizer.gt(date, end, 'minutes')) return slots[slots.length - 1];
      var diffMins = localizer.diff(start, date, 'minutes');
      return slots[(diffMins - diffMins % step) / step + offset];
    },
    startsBeforeDay: function startsBeforeDay(date) {
      return localizer.lt(date, start, 'day');
    },
    startsAfterDay: function startsAfterDay(date) {
      return localizer.gt(date, end, 'day');
    },
    startsBefore: function startsBefore(date) {
      return localizer.lt(localizer.merge(start, date), start, 'minutes');
    },
    startsAfter: function startsAfter(date) {
      return localizer.gt(localizer.merge(end, date), end, 'minutes');
    },
    getRange: function getRange(rangeStart, rangeEnd, ignoreMin, ignoreMax) {
      if (!ignoreMin) rangeStart = localizer.min(end, localizer.max(start, rangeStart));
      if (!ignoreMax) rangeEnd = localizer.min(end, localizer.max(start, rangeEnd));
      var rangeStartMin = positionFromDate(rangeStart);
      var rangeEndMin = positionFromDate(rangeEnd);
      var top = rangeEndMin > step * numSlots && !localizer.eq(end, rangeEnd) ? (rangeStartMin - step) / (step * numSlots) * 100 : rangeStartMin / (step * numSlots) * 100;
      return {
        top: top,
        height: rangeEndMin / (step * numSlots) * 100 - top,
        start: positionFromDate(rangeStart),
        startDate: rangeStart,
        end: positionFromDate(rangeEnd),
        endDate: rangeEnd
      };
    },
    getCurrentTimePosition: function getCurrentTimePosition(rangeStart) {
      var rangeStartMin = positionFromDate(rangeStart);
      var top = rangeStartMin / (step * numSlots) * 100;
      return top;
    }
  };
}