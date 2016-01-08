'use strict';

exports.__esModule = true;
exports.eventSegments = eventSegments;
exports.segStyle = segStyle;
exports.eventLevels = eventLevels;
exports.inRange = inRange;
exports.segsOverlap = segsOverlap;
exports.sortEvents = sortEvents;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dates = require('./dates');

var _dates2 = _interopRequireDefault(_dates);

var _accessors = require('./accessors');

function eventSegments(event, first, last, _ref) {
  var startAccessor = _ref.startAccessor;
  var endAccessor = _ref.endAccessor;
  var culture = _ref.culture;

  var slots = _dates2['default'].diff(first, last, 'day');
  var start = _dates2['default'].max(_dates2['default'].startOf(_accessors.accessor(event, startAccessor), 'day'), first);
  var end = _dates2['default'].min(_dates2['default'].ceil(_accessors.accessor(event, endAccessor), 'day'), _dates2['default'].add(last, 1, 'day'));

  var span = _dates2['default'].diff(start, end, 'day');

  span = Math.floor(Math.max(Math.min(span, slots), 1));

  var padding = Math.floor(_dates2['default'].diff(first, start, 'day'));

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
  var limit = arguments.length <= 1 || arguments[1] === undefined ? Infinity : arguments[1];

  var i = undefined,
      j = undefined,
      seg = undefined,
      levels = [],
      extra = [];

  for (i = 0; i < rowSegments.length; i++) {
    seg = rowSegments[i];

    for (j = 0; j < levels.length; j++) if (!segsOverlap(seg, levels[j])) break;

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

function inRange(e, start, end, _ref2) {
  var startAccessor = _ref2.startAccessor;
  var endAccessor = _ref2.endAccessor;

  var eStart = _accessors.accessor(e, startAccessor);
  var eEnd = _accessors.accessor(e, endAccessor);

  var starts = _dates2['default'].inRange(eStart, start, end, 'day');
  var during = _dates2['default'].lt(eStart, start, 'day') && _dates2['default'].gt(eEnd, end, 'day');
  var ends = _dates2['default'].lt(eStart, start) && _dates2['default'].inRange(eEnd, start, end, 'day');

  return starts || ends || during;
}

function segsOverlap(seg, otherSegs) {
  return otherSegs.some(function (otherSeg) {
    return otherSeg.left <= seg.right && otherSeg.right >= seg.left;
  });
}

function sortEvents(evtA, evtB, _ref3) {
  var startAccessor = _ref3.startAccessor;
  var endAccessor = _ref3.endAccessor;
  var allDayAccessor = _ref3.allDayAccessor;

  var startSort = +_dates2['default'].startOf(_accessors.accessor(evtA, startAccessor), 'day') - +_dates2['default'].startOf(_accessors.accessor(evtB, startAccessor), 'day');

  var durA = _dates2['default'].diff(_accessors.accessor(evtA, startAccessor), _dates2['default'].ceil(_accessors.accessor(evtA, endAccessor), 'day'), 'day');

  var durB = _dates2['default'].diff(_accessors.accessor(evtB, startAccessor), _dates2['default'].ceil(_accessors.accessor(evtB, endAccessor), 'day'), 'day');

  return startSort // sort by start Day first
   || Math.max(durB, 1) - Math.max(durA, 1) // events spanning multiple days go first
   || !!_accessors.accessor(evtB, allDayAccessor) - !!_accessors.accessor(evtA, allDayAccessor) // then allDay single day events
   || +_accessors.accessor(evtA, startAccessor) - +_accessors.accessor(evtB, startAccessor); // then sort by start time
}