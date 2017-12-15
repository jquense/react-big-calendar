'use strict';

exports.__esModule = true;
exports.startsBefore = startsBefore;
exports.positionFromDate = positionFromDate;
exports.default = getStyledEvents;

var _accessors = require('./accessors');

var _dates = require('./dates');

var _dates2 = _interopRequireDefault(_dates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function startsBefore(date, min) {
  return _dates2.default.lt(_dates2.default.merge(min, date), min, 'minutes');
}

function positionFromDate(date, min, total) {
  if (startsBefore(date, min)) return 0;

  var diff = _dates2.default.diff(min, _dates2.default.merge(min, date), 'minutes');
  return Math.min(diff, total);
}

/**
 * Events will be sorted primarily according to earliest start time.
 * If two events start at the same time, the one with the longest duration will
 * be placed first.
 */
var sort = function sort(events, _ref) {
  var startAccessor = _ref.startAccessor,
      endAccessor = _ref.endAccessor;
  return events.sort(function (a, b) {
    var startA = +(0, _accessors.accessor)(a, startAccessor);
    var startB = +(0, _accessors.accessor)(b, startAccessor);

    if (startA === startB) {
      return +(0, _accessors.accessor)(b, endAccessor) - +(0, _accessors.accessor)(a, endAccessor);
    }

    return startA - startB;
  });
};

var getSlot = function getSlot(event, accessor, min, totalMin) {
  return event && positionFromDate((0, _accessors.accessor)(event, accessor), min, totalMin);
};

/**
 * Two events are considered siblings if the difference between their
 * start time is less than (step*timeslots) hour.
 */
var isSibling = function isSibling(idx1, idx2, _ref2) {
  var events = _ref2.events,
      startAccessor = _ref2.startAccessor,
      endAccessor = _ref2.endAccessor,
      min = _ref2.min,
      totalMin = _ref2.totalMin,
      step = _ref2.step,
      timeslots = _ref2.timeslots;

  var event1 = events[idx1];
  var event2 = events[idx2];

  if (!event1 || !event2) return false;

  var start1 = getSlot(event1, startAccessor, min, totalMin);
  var start2 = getSlot(event2, startAccessor, min, totalMin);
  var end1 = getSlot(event1, endAccessor, min, totalMin);

  return Math.abs(start1 - start2) < step * timeslots && start2 < end1;
};

/**
 * An event is considered a child of another event if its start time is
 * more than (step*timeslots) hour later than the other event's start time,
 * but before its end time.
 */
var isChild = function isChild(parentIdx, childIdx, _ref3) {
  var events = _ref3.events,
      startAccessor = _ref3.startAccessor,
      endAccessor = _ref3.endAccessor,
      min = _ref3.min,
      totalMin = _ref3.totalMin,
      step = _ref3.step,
      timeslots = _ref3.timeslots;

  if (isSibling(parentIdx, childIdx, { events: events, startAccessor: startAccessor, endAccessor: endAccessor, min: min, totalMin: totalMin, step: step, timeslots: timeslots })) return false;

  var parentEnd = getSlot(events[parentIdx], endAccessor, min, totalMin);
  var childStart = getSlot(events[childIdx], startAccessor, min, totalMin);

  return parentEnd > childStart;
};

/**
 * Given an event index, siblings directly following it will be found and
 * returned as an array of indexes.
 */
var getSiblings = function getSiblings(idx, _ref4) {
  var events = _ref4.events,
      startAccessor = _ref4.startAccessor,
      endAccessor = _ref4.endAccessor,
      min = _ref4.min,
      totalMin = _ref4.totalMin,
      step = _ref4.step,
      timeslots = _ref4.timeslots;

  var nextIdx = idx;
  var siblings = [];

  while (isSibling(idx, ++nextIdx, { events: events, startAccessor: startAccessor, endAccessor: endAccessor, min: min, totalMin: totalMin, step: step, timeslots: timeslots })) {
    siblings.push(nextIdx);
  }

  return siblings;
};

/**
 * Given an event index, and a start search position, all child events to that
 * event will be found and placed into groups of siblings.
 * The return value is an array of child group arrays, as well as the largest
 * size of the child groups.
 */
var getChildGroups = function getChildGroups(idx, nextIdx, _ref5) {
  var events = _ref5.events,
      startAccessor = _ref5.startAccessor,
      endAccessor = _ref5.endAccessor,
      min = _ref5.min,
      totalMin = _ref5.totalMin,
      step = _ref5.step,
      timeslots = _ref5.timeslots;

  var groups = [];
  var nbrOfColumns = 0;

  while (isChild(idx, nextIdx, { events: events, startAccessor: startAccessor, endAccessor: endAccessor, min: min, totalMin: totalMin, step: step, timeslots: timeslots })) {
    var childGroup = [nextIdx];
    var siblingIdx = nextIdx;

    while (isSibling(nextIdx, ++siblingIdx, { events: events, startAccessor: startAccessor, endAccessor: endAccessor, min: min, totalMin: totalMin, step: step, timeslots: timeslots })) {
      childGroup.push(siblingIdx);
    }

    nbrOfColumns = Math.max(nbrOfColumns, childGroup.length);
    groups.push(childGroup);
    nextIdx = siblingIdx;
  }

  return { childGroups: groups, nbrOfChildColumns: nbrOfColumns };
};

var constructEvent = function constructEvent(title, start, end) {
  return {
    title: title,
    start: start,
    end: end
  };
};

var handleMultiDayEvents = function handleMultiDayEvents(title, start, end, current) {
  var s = new Date(start);
  var e = new Date(end);
  var c = new Date(current);

  // use noon to compare dates to avoid DST issues
  s.setHours(12, 0, 0, 0);
  e.setHours(12, 0, 0, 0);
  c.setHours(12, 0, 0, 0);

  // if current day is at the start, but spans multiple days, correct the end
  if (+c === +s && c < e) {
    return constructEvent(title, start, _dates2.default.endOf(start, 'day'));
  }

  // if current day is in between start and end dates, span all day
  else if (c > s && c < e) {
      return constructEvent(title, current, _dates2.default.endOf(current, 'day'));
    }

    // if current day is at the end of a multi day event, start at midnight to the end
    else if (c > s && +c === +e) {
        return constructEvent(title, current, end);
      }
};

/**
 * Returns height and top offset, both in percentage, for an event at
 * the specified index.
 */
var getYStyles = function getYStyles(idx, _ref6) {
  var events = _ref6.events,
      startAccessor = _ref6.startAccessor,
      endAccessor = _ref6.endAccessor,
      min = _ref6.min,
      showMultiDayTimes = _ref6.showMultiDayTimes,
      totalMin = _ref6.totalMin,
      step = _ref6.step;

  var event = events[idx];

  var startDate = (0, _accessors.accessor)(event, startAccessor); // start date
  var endDate = (0, _accessors.accessor)(event, endAccessor); // end date
  var currentDate = new Date(min); // min is the current date at midnight

  var multiDayEvent = void 0;
  if (showMultiDayTimes) {
    multiDayEvent = handleMultiDayEvents(event.title, startDate, endDate, currentDate);
  }

  var start = getSlot(multiDayEvent || event, startAccessor, min, totalMin);
  var end = Math.max(getSlot(multiDayEvent || event, endAccessor, min, totalMin), start + step);
  var top = start / totalMin * 100;
  var bottom = end / totalMin * 100;

  var height = bottom - top;

  return {
    top: top,
    height: height
  };
};

/**
 * Takes an array of unsorted events, and returns a sorted array
 * containing the same events, but with an additional style property.
 * These styles will position the events similarly to Google Calendar.
 *
 * The algorithm will start by sorting the array, and then iterating over it.
 * Starting at the first event, each of its siblings and children, placed in
 * groups of siblings, will be found. Both are needed in order to calculate the
 * width of the first event. When the width is known, its siblings will be
 * given the same width, but with an incremental x-offset.
 *
 * Each group of children will be looking to move as far away from its original
 * parent as possible. A move can be made to one of the parent's siblings, if
 * that sibling is also a parent to the child group. This will make room for
 * more events.
 *
 * When a child group knows its parent, it looks at the space occupied by that
 * parent, and calculates the remaning available space and divides that among
 * each other.
 *
 * All widths and x-offsets are calculated without taking overlapping into
 * account. Overlapping is added in the end according to the OVERLAP_MULTIPLIER.
 * If that is set to 0, the events won't overlap or grow.
 *
 * When one of these rounds are finished, all events connected have been
 * traversed, so the cursor will be moved past all of them.
 */
function getStyledEvents(_ref7) {
  var unsortedEvents = _ref7.events,
      startAccessor = _ref7.startAccessor,
      endAccessor = _ref7.endAccessor,
      min = _ref7.min,
      totalMin = _ref7.totalMin,
      showMultiDayTimes = _ref7.showMultiDayTimes,
      step = _ref7.step,
      timeslots = _ref7.timeslots;

  var OVERLAP_MULTIPLIER = 0.3;
  var events = sort(unsortedEvents, { startAccessor: startAccessor, endAccessor: endAccessor });
  var helperArgs = { events: events, startAccessor: startAccessor, endAccessor: endAccessor, min: min, showMultiDayTimes: showMultiDayTimes, totalMin: totalMin, step: step, timeslots: timeslots };
  var styledEvents = [];
  var idx = 0;

  // One iteration will cover all connected events.

  var _loop = function _loop() {
    var siblings = getSiblings(idx, helperArgs);

    var _getChildGroups = getChildGroups(idx, idx + siblings.length + 1, helperArgs),
        childGroups = _getChildGroups.childGroups,
        nbrOfChildColumns = _getChildGroups.nbrOfChildColumns;

    var nbrOfColumns = Math.max(nbrOfChildColumns, siblings.length) + 1;

    // Set styles to top level events.
    [idx].concat(siblings).forEach(function (eventIdx, siblingIdx) {
      var width = 100 / nbrOfColumns;
      var xAdjustment = width * (nbrOfColumns > 1 ? OVERLAP_MULTIPLIER : 0);

      var _getYStyles = getYStyles(eventIdx, helperArgs),
          top = _getYStyles.top,
          height = _getYStyles.height;

      styledEvents[eventIdx] = {
        event: events[eventIdx],
        style: {
          top: top,
          height: height,
          width: width + xAdjustment,
          xOffset: width * siblingIdx - xAdjustment
        }
      };
    });

    childGroups.forEach(function (group) {
      var parentIdx = idx;
      var siblingIdx = 0;

      // Move child group to sibling if possible, since this will makes
      // room for more events.
      while (isChild(siblings[siblingIdx], group[0], helperArgs)) {
        parentIdx = siblings[siblingIdx];
        siblingIdx++;
      }

      // Set styles to child events.
      group.forEach(function (eventIdx, i) {
        var parentStyle = styledEvents[parentIdx].style;

        var spaceOccupiedByParent = parentStyle.width + parentStyle.xOffset;
        var columns = Math.min(group.length, nbrOfColumns);
        var width = (100 - spaceOccupiedByParent) / columns;
        var xAdjustment = spaceOccupiedByParent * OVERLAP_MULTIPLIER;

        var _getYStyles2 = getYStyles(eventIdx, helperArgs),
            top = _getYStyles2.top,
            height = _getYStyles2.height;

        styledEvents[eventIdx] = {
          event: events[eventIdx],
          style: {
            top: top,
            height: height,
            width: width + xAdjustment,
            xOffset: spaceOccupiedByParent + width * i - xAdjustment
          }
        };
      });
    });

    // Move past all events we just went through
    idx += 1 + siblings.length + childGroups.reduce(function (total, group) {
      return total + group.length;
    }, 0);
  };

  while (idx < events.length) {
    _loop();
  }

  return styledEvents;
}