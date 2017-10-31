'use strict';

exports.__esModule = true;
exports.endOfRange = endOfRange;
exports.eventSegments = eventSegments;
exports.segStyle = segStyle;
exports.eventLevels = eventLevels;
exports.inRange = inRange;
exports.within = within;
exports.formatAwareInRange = formatAwareInRange;
exports.segsOverlap = segsOverlap;
exports.sortEvents = sortEvents;

var _dates = require('./dates');

var _dates2 = _interopRequireDefault(_dates);

var _accessors = require('./accessors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function endOfRange(dateRange) {
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'day';

  return {
    first: dateRange[0],
    last: _dates2.default.add(dateRange[dateRange.length - 1], 1, unit)
  };
}

function eventSegments(event, first, last, _ref) {
  var startAccessor = _ref.startAccessor,
      endAccessor = _ref.endAccessor;

  var slots = _dates2.default.diff(first, last, 'day');
  var start = _dates2.default.max(_dates2.default.startOf((0, _accessors.accessor)(event, startAccessor), 'day'), first);
  var end = _dates2.default.min(_dates2.default.ceil((0, _accessors.accessor)(event, endAccessor), 'day'), last);

  var padding = _dates2.default.diff(first, start, 'day');
  var span = _dates2.default.diff(start, end, 'day');

  span = Math.min(span, slots);
  span = Math.max(span, 1);

  return {
    event: event,
    span: span,
    left: padding + 1,
    right: Math.max(padding + span, 1)
  };
}

function segStyle(span, slots) {
  var per = span / slots * 100 + '%';
  return { flexBasis: per, maxWidth: per }; // IE10/11 need max-width. flex-basis doesn't respect box-sizing
}

function eventLevels(rowSegments) {
  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;

  var i = void 0,
      j = void 0,
      seg = void 0,
      levels = [],
      extra = [];

  for (i = 0; i < rowSegments.length; i++) {
    seg = rowSegments[i];

    for (j = 0; j < levels.length; j++) {
      if (!segsOverlap(seg, levels[j])) {
        break;
      }
    }

    if (j >= limit) {
      extra.push(seg);
    } else {
      (levels[j] || (levels[j] = [])).push(seg);
    }
  }

  for (i = 0; i < levels.length; i++) {
    levels[i].sort(function (a, b) {
      return a.left - b.left;
    }); //eslint-disable-line
  }

  return { levels: levels, extra: extra };
}

/**
 * check if an event is in the given day range
 * @param e the event to check
 * @param start start of range
 * @param end end of range
 * @param startAccessor
 * @param endAccessor
 * @returns {*}
 */
function inRange(e, start, end, _ref2) {
  var startAccessor = _ref2.startAccessor,
      endAccessor = _ref2.endAccessor;

  var eStart = _dates2.default.startOf((0, _accessors.accessor)(e, startAccessor), 'day');
  var eEnd = (0, _accessors.accessor)(e, endAccessor);

  var startsBeforeEnd = _dates2.default.lte(eStart, end, 'day');
  var endsAfterStart = _dates2.default.gte(eEnd, start, 'day');

  return startsBeforeEnd && endsAfterStart;
}

/**
 * check if an event is in the given date range
 * @param e the event to check
 * @param start start of range
 * @param end end of range
 * @param startAccessor
 * @param endAccessor
 * @returns {*}
 */
function within(e, start, end, _ref3) {
  var startAccessor = _ref3.startAccessor,
      endAccessor = _ref3.endAccessor;

  var eStart = (0, _accessors.accessor)(e, startAccessor);
  var eEnd = (0, _accessors.accessor)(e, endAccessor);

  var startsBeforeEnd = eStart <= end;
  var endsAfterStart = eEnd > start;

  return startsBeforeEnd && endsAfterStart;
}

/**
 * check if an event is in the given day range
 * @param e the event to check
 * @param start start of range
 * @param end end of range
 * @param startAccessor
 * @param endAccessor
 * @returns {*}
 */

function formatAwareInRange(e, start, end, _ref4) {
  var startAccessor = _ref4.startAccessor,
      endAccessor = _ref4.endAccessor;

  var eStart = void 0,
      eEnd = void 0,
      startsBeforeEnd = void 0,
      endsAfterStart = void 0;

  if (e.startType === 'date') {
    eStart = (0, _accessors.accessor)(e, startAccessor);
    startsBeforeEnd = eStart <= end;
  } else {
    eStart = _dates2.default.startOf((0, _accessors.accessor)(e, startAccessor), 'day');
    startsBeforeEnd = _dates2.default.lte(eStart, end, 'day');
  }

  if (e.endType === 'date') {
    eEnd = (0, _accessors.accessor)(e, endAccessor);
    endsAfterStart = eEnd > start;
  } else {
    eEnd = (0, _accessors.accessor)(e, endAccessor);
    endsAfterStart = _dates2.default.gte(eEnd, start, 'day');
  }

  return startsBeforeEnd && endsAfterStart;
}

function segsOverlap(seg, otherSegs) {
  return otherSegs.some(function (otherSeg) {
    return otherSeg.left <= seg.right && otherSeg.right >= seg.left;
  });
}

function sortEvents(evtA, evtB, _ref5) {
  var startAccessor = _ref5.startAccessor,
      endAccessor = _ref5.endAccessor,
      allDayAccessor = _ref5.allDayAccessor;

  var startSort = +_dates2.default.startOf((0, _accessors.accessor)(evtA, startAccessor), 'day') - +_dates2.default.startOf((0, _accessors.accessor)(evtB, startAccessor), 'day');

  var durA = _dates2.default.diff((0, _accessors.accessor)(evtA, startAccessor), _dates2.default.ceil((0, _accessors.accessor)(evtA, endAccessor), 'day'), 'day');

  var durB = _dates2.default.diff((0, _accessors.accessor)(evtB, startAccessor), _dates2.default.ceil((0, _accessors.accessor)(evtB, endAccessor), 'day'), 'day');

  return startSort // sort by start Day first
  || Math.max(durB, 1) - Math.max(durA, 1) // events spanning multiple days go first
  || !!(0, _accessors.accessor)(evtB, allDayAccessor) - !!(0, _accessors.accessor)(evtA, allDayAccessor) // then allDay single day events
  || +(0, _accessors.accessor)(evtA, startAccessor) - +(0, _accessors.accessor)(evtB, startAccessor); // then sort by start time
}