"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateLocalizer = void 0;
exports.mergeWithDefaults = mergeWithDefaults;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _invariant = _interopRequireDefault(require("invariant"));

var _dates = require("./utils/dates");

var localePropType = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func]);

function _format(localizer, formatter, value, format, culture) {
  var result = typeof format === 'function' ? format(value, culture, localizer) : formatter.call(localizer, value, format, culture);
  (0, _invariant.default)(result == null || typeof result === 'string', '`localizer format(..)` must return a string, null, or undefined');
  return result;
}
/**
 * This date conversion was moved out of TimeSlots.js, to
 * allow for localizer override
 * @param {Date} dt - The date to start from
 * @param {Number} minutesFromMidnight
 * @param {Number} offset
 * @returns {Date}
 */


function getSlotDate(dt, minutesFromMidnight, offset) {
  return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, minutesFromMidnight + offset, 0, 0);
}

function getDstOffset(start, end) {
  return start.getTimezoneOffset() - end.getTimezoneOffset();
} // if the start is on a DST-changing day but *after* the moment of DST
// transition we need to add those extra minutes to our minutesFromMidnight


function getTotalMin(start, end) {
  return (0, _dates.diff)(start, end, 'minutes') + getDstOffset(start, end);
}

function getMinutesFromMidnight(start) {
  var daystart = (0, _dates.startOf)(start, 'day');
  return (0, _dates.diff)(daystart, start, 'minutes') + getDstOffset(daystart, start);
} // These two are used by DateSlotMetrics


function continuesPrior(start, first) {
  return (0, _dates.lt)(start, first, 'day');
}

function continuesAfter(start, end, last) {
  var singleDayDuration = (0, _dates.eq)(start, end, 'minutes');
  return singleDayDuration ? (0, _dates.gte)(end, last, 'minutes') : (0, _dates.gt)(end, last, 'minutes');
} // These two are used by eventLevels


function sortEvents(_ref) {
  var _ref$evtA = _ref.evtA,
      aStart = _ref$evtA.start,
      aEnd = _ref$evtA.end,
      aAllDay = _ref$evtA.allDay,
      _ref$evtB = _ref.evtB,
      bStart = _ref$evtB.start,
      bEnd = _ref$evtB.end,
      bAllDay = _ref$evtB.allDay;
  var startSort = +(0, _dates.startOf)(aStart, 'day') - +(0, _dates.startOf)(bStart, 'day');
  var durA = (0, _dates.diff)(aStart, (0, _dates.ceil)(aEnd, 'day'), 'day');
  var durB = (0, _dates.diff)(bStart, (0, _dates.ceil)(bEnd, 'day'), 'day');
  return startSort || // sort by start Day first
  Math.max(durB, 1) - Math.max(durA, 1) || // events spanning multiple days go first
  !!bAllDay - !!aAllDay || // then allDay single day events
  +aStart - +bStart || // then sort by start time
  +aEnd - +bEnd // then sort by end time
  ;
}

function inEventRange(_ref2) {
  var _ref2$event = _ref2.event,
      start = _ref2$event.start,
      end = _ref2$event.end,
      _ref2$range = _ref2.range,
      rangeStart = _ref2$range.start,
      rangeEnd = _ref2$range.end;
  var eStart = (0, _dates.startOf)(start, 'day');
  var startsBeforeEnd = (0, _dates.lte)(eStart, rangeEnd, 'day'); // when the event is zero duration we need to handle a bit differently

  var sameMin = (0, _dates.neq)(eStart, end, 'minutes');
  var endsAfterStart = sameMin ? (0, _dates.gt)(end, rangeStart, 'minutes') : (0, _dates.gte)(end, rangeStart, 'minutes');
  return startsBeforeEnd && endsAfterStart;
} // other localizers treats 'day' and 'date' equality very differently, so we
// abstract the change the 'localizer.eq(date1, date2, 'day') into this
// new method, where they can be treated correctly by the localizer overrides


function isSameDate(date1, date2) {
  return (0, _dates.eq)(date1, date2, 'day');
}

function startAndEndAreDateOnly(start, end) {
  return (0, _dates.isJustDate)(start) && (0, _dates.isJustDate)(end);
}

var DateLocalizer = /*#__PURE__*/(0, _createClass2.default)(function DateLocalizer(spec) {
  var _this = this;

  (0, _classCallCheck2.default)(this, DateLocalizer);
  (0, _invariant.default)(typeof spec.format === 'function', 'date localizer `format(..)` must be a function');
  (0, _invariant.default)(typeof spec.firstOfWeek === 'function', 'date localizer `firstOfWeek(..)` must be a function');
  this.propType = spec.propType || localePropType;
  this.formats = spec.formats;

  this.format = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _format.apply(void 0, [_this, spec.format].concat(args));
  }; // These date arithmetic methods can be overriden by the localizer


  this.startOfWeek = spec.firstOfWeek;
  this.merge = spec.merge || _dates.merge;
  this.inRange = spec.inRange || _dates.inRange;
  this.lt = spec.lt || _dates.lt;
  this.lte = spec.lte || _dates.lte;
  this.gt = spec.gt || _dates.gt;
  this.gte = spec.gte || _dates.gte;
  this.eq = spec.eq || _dates.eq;
  this.neq = spec.neq || _dates.neq;
  this.startOf = spec.startOf || _dates.startOf;
  this.endOf = spec.endOf || _dates.endOf;
  this.add = spec.add || _dates.add;
  this.range = spec.range || _dates.range;
  this.diff = spec.diff || _dates.diff;
  this.ceil = spec.ceil || _dates.ceil;
  this.min = spec.min || _dates.min;
  this.max = spec.max || _dates.max;
  this.minutes = spec.minutes || _dates.minutes;
  this.firstVisibleDay = spec.firstVisibleDay || _dates.firstVisibleDay;
  this.lastVisibleDay = spec.lastVisibleDay || _dates.lastVisibleDay;
  this.visibleDays = spec.visibleDays || _dates.visibleDays;
  this.getSlotDate = spec.getSlotDate || getSlotDate;

  this.getTimezoneOffset = spec.getTimezoneOffset || function (value) {
    return value.getTimezoneOffset();
  };

  this.getDstOffset = spec.getDstOffset || getDstOffset;
  this.getTotalMin = spec.getTotalMin || getTotalMin;
  this.getMinutesFromMidnight = spec.getMinutesFromMidnight || getMinutesFromMidnight;
  this.continuesPrior = spec.continuesPrior || continuesPrior;
  this.continuesAfter = spec.continuesAfter || continuesAfter;
  this.sortEvents = spec.sortEvents || sortEvents;
  this.inEventRange = spec.inEventRange || inEventRange;
  this.isSameDate = spec.isSameDate || isSameDate;
  this.startAndEndAreDateOnly = spec.startAndEndAreDateOnly || startAndEndAreDateOnly;
  this.segmentOffset = spec.browserTZOffset ? spec.browserTZOffset() : 0;
});
exports.DateLocalizer = DateLocalizer;

function mergeWithDefaults(localizer, culture, formatOverrides, messages) {
  var formats = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, localizer.formats), formatOverrides);
  return (0, _objectSpread2.default)((0, _objectSpread2.default)({}, localizer), {}, {
    messages: messages,
    startOfWeek: function startOfWeek() {
      return localizer.startOfWeek(culture);
    },
    format: function format(value, _format2) {
      return localizer.format(value, formats[_format2] || _format2, culture);
    }
  });
}