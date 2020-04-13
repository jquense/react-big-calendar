"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getSlotMetrics = getSlotMetrics;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var dates = _interopRequireWildcard(require("./dates"));

var _eventLevels2 = require("./eventLevels");

var isSegmentInSlot = function isSegmentInSlot(seg, slot) {
  return seg.left <= slot && seg.right >= slot;
};

var isEqual = function isEqual(a, b) {
  return a[0].range === b[0].range && a[0].events === b[0].events;
};

function getSlotMetrics() {
  return (0, _memoizeOne.default)(function (options) {
    var range = options.range,
        events = options.events,
        maxRows = options.maxRows,
        minRows = options.minRows,
        accessors = options.accessors;

    var _endOfRange = (0, _eventLevels2.endOfRange)(range),
        first = _endOfRange.first,
        last = _endOfRange.last;

    var segments = events.map(function (evt) {
      return (0, _eventLevels2.eventSegments)(evt, range, accessors);
    });

    var _eventLevels = (0, _eventLevels2.eventLevels)(segments, Math.max(maxRows - 1, 1)),
        levels = _eventLevels.levels,
        extra = _eventLevels.extra;

    while (levels.length < minRows) {
      levels.push([]);
    }

    return {
      first: first,
      last: last,
      levels: levels,
      extra: extra,
      range: range,
      slots: range.length,
      clone: function clone(args) {
        var metrics = getSlotMetrics();
        return metrics((0, _extends2.default)({}, options, args));
      },
      getDateForSlot: function getDateForSlot(slotNumber) {
        return range[slotNumber];
      },
      getSlotForDate: function getSlotForDate(date) {
        return range.find(function (r) {
          return dates.eq(r, date, 'day');
        });
      },
      getEventsForSlot: function getEventsForSlot(slot) {
        return segments.filter(function (seg) {
          return isSegmentInSlot(seg, slot);
        }).map(function (seg) {
          return seg.event;
        });
      },
      continuesPrior: function continuesPrior(event) {
        return dates.lt(accessors.start(event), first, 'day');
      },
      continuesAfter: function continuesAfter(event) {
        var eventEnd = accessors.end(event);
        var singleDayDuration = dates.eq(accessors.start(event), eventEnd, 'minutes');
        return singleDayDuration ? dates.gte(eventEnd, last, 'minutes') : dates.gt(eventEnd, last, 'minutes');
      }
    };
  }, isEqual);
}