"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.formats = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _localizer = require("../localizer");

var weekRangeFormat = function weekRangeFormat(_ref, culture, local) {
  var start = _ref.start,
      end = _ref.end;
  return local.format(start, 'MMMM DD', culture) + ' – ' + // updated to use this localizer 'eq()' method
  local.format(end, local.eq(start, end, 'month') ? 'DD' : 'MMMM DD', culture);
};

var dateRangeFormat = function dateRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
      end = _ref2.end;
  return local.format(start, 'L', culture) + ' – ' + local.format(end, 'L', culture);
};

var timeRangeFormat = function timeRangeFormat(_ref3, culture, local) {
  var start = _ref3.start,
      end = _ref3.end;
  return local.format(start, 'LT', culture) + ' – ' + local.format(end, 'LT', culture);
};

var timeRangeStartFormat = function timeRangeStartFormat(_ref4, culture, local) {
  var start = _ref4.start;
  return local.format(start, 'LT', culture) + ' – ';
};

var timeRangeEndFormat = function timeRangeEndFormat(_ref5, culture, local) {
  var end = _ref5.end;
  return ' – ' + local.format(end, 'LT', culture);
};

var formats = {
  dateFormat: 'DD',
  dayFormat: 'DD ddd',
  weekdayFormat: 'ddd',
  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,
  timeGutterFormat: 'LT',
  monthHeaderFormat: 'MMMM YYYY',
  dayHeaderFormat: 'dddd MMM DD',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,
  agendaDateFormat: 'ddd MMM DD',
  agendaTimeFormat: 'LT',
  agendaTimeRangeFormat: timeRangeFormat
};
exports.formats = formats;

function fixUnit(unit) {
  var datePart = unit ? unit.toLowerCase() : unit;

  if (datePart === 'FullYear') {
    datePart = 'year';
  } else if (!datePart) {
    datePart = undefined;
  }

  return datePart;
}

function _default(moment) {
  var locale = function locale(m, c) {
    return c ? m.locale(c) : m;
  };

  function getTimezoneOffset(date) {
    // ensures this gets cast to timezone
    return moment(date).toDate().getTimezoneOffset();
  }

  function getDstOffset(start, end) {
    var _st$_z$name, _st$_z;

    // convert to moment, in case
    var st = moment(start);
    var ed = moment(end); // if not using moment timezone

    if (!moment.tz) {
      return st.toDate().getTimezoneOffset() - ed.toDate().getTimezoneOffset();
    }
    /**
     * If using moment-timezone, and a timezone has been applied, then
     * use this to get the proper timezone offset, otherwise default
     * the timezone to the browser local
     */


    var tzName = (_st$_z$name = st === null || st === void 0 ? void 0 : (_st$_z = st._z) === null || _st$_z === void 0 ? void 0 : _st$_z.name) !== null && _st$_z$name !== void 0 ? _st$_z$name : moment.tz.guess();
    var startOffset = moment.tz.zone(tzName).utcOffset(+st);
    var endOffset = moment.tz.zone(tzName).utcOffset(+ed);
    return startOffset - endOffset;
  }

  function getDayStartDstOffset(start) {
    var dayStart = moment(start).startOf('day');
    return getDstOffset(dayStart, start);
  }
  /*** BEGIN localized date arithmetic methods with moment ***/


  function defineComparators(a, b, unit) {
    var datePart = fixUnit(unit);
    var dtA = datePart ? moment(a).startOf(datePart) : moment(a);
    var dtB = datePart ? moment(b).startOf(datePart) : moment(b);
    return [dtA, dtB, datePart];
  }

  function startOf() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var unit = arguments.length > 1 ? arguments[1] : undefined;
    var datePart = fixUnit(unit);

    if (datePart) {
      return moment(date).startOf(datePart).toDate();
    }

    return moment(date).toDate();
  }

  function endOf() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var unit = arguments.length > 1 ? arguments[1] : undefined;
    var datePart = fixUnit(unit);

    if (datePart) {
      return moment(date).endOf(datePart).toDate();
    }

    return moment(date).toDate();
  } // moment comparison operations *always* convert both sides to moment objects
  // prior to running the comparisons


  function eq(a, b, unit) {
    var _defineComparators = defineComparators(a, b, unit),
        _defineComparators2 = (0, _slicedToArray2.default)(_defineComparators, 3),
        dtA = _defineComparators2[0],
        dtB = _defineComparators2[1],
        datePart = _defineComparators2[2];

    return dtA.isSame(dtB, datePart);
  }

  function neq(a, b, unit) {
    return !eq(a, b, unit);
  }

  function gt(a, b, unit) {
    var _defineComparators3 = defineComparators(a, b, unit),
        _defineComparators4 = (0, _slicedToArray2.default)(_defineComparators3, 3),
        dtA = _defineComparators4[0],
        dtB = _defineComparators4[1],
        datePart = _defineComparators4[2];

    return dtA.isAfter(dtB, datePart);
  }

  function lt(a, b, unit) {
    var _defineComparators5 = defineComparators(a, b, unit),
        _defineComparators6 = (0, _slicedToArray2.default)(_defineComparators5, 3),
        dtA = _defineComparators6[0],
        dtB = _defineComparators6[1],
        datePart = _defineComparators6[2];

    return dtA.isBefore(dtB, datePart);
  }

  function gte(a, b, unit) {
    var _defineComparators7 = defineComparators(a, b, unit),
        _defineComparators8 = (0, _slicedToArray2.default)(_defineComparators7, 3),
        dtA = _defineComparators8[0],
        dtB = _defineComparators8[1],
        datePart = _defineComparators8[2];

    return dtA.isSameOrBefore(dtB, datePart);
  }

  function lte(a, b, unit) {
    var _defineComparators9 = defineComparators(a, b, unit),
        _defineComparators10 = (0, _slicedToArray2.default)(_defineComparators9, 3),
        dtA = _defineComparators10[0],
        dtB = _defineComparators10[1],
        datePart = _defineComparators10[2];

    return dtA.isSameOrBefore(dtB, datePart);
  }

  function inRange(day, min, max) {
    var unit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'day';
    var datePart = fixUnit(unit);
    var mDay = moment(day);
    var mMin = moment(min);
    var mMax = moment(max);
    return mDay.isBetween(mMin, mMax, datePart, '[]');
  }

  function min(dateA, dateB) {
    var dtA = moment(dateA);
    var dtB = moment(dateB);
    var minDt = moment.min(dtA, dtB);
    return minDt.toDate();
  }

  function max(dateA, dateB) {
    var dtA = moment(dateA);
    var dtB = moment(dateB);
    var maxDt = moment.max(dtA, dtB);
    return maxDt.toDate();
  }

  function merge(date, time) {
    if (!date && !time) return null;
    var tm = moment(time).format('HH:mm:ss');
    var dt = moment(date).startOf('day').format('MM/DD/YYYY'); // We do it this way to avoid issues when timezone switching

    return moment("".concat(dt, " ").concat(tm), 'MM/DD/YYYY HH:mm:ss').toDate();
  }

  function add(date, adder, unit) {
    var datePart = fixUnit(unit);
    return moment(date).add(adder, datePart).toDate();
  }

  function range(start, end) {
    var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
    var datePart = fixUnit(unit); // because the add method will put these in tz, we have to start that way

    var current = moment(start).toDate();
    var days = [];

    while (lte(current, end)) {
      days.push(current);
      current = add(current, 1, datePart);
    }

    return days;
  }

  function ceil(date, unit) {
    var datePart = fixUnit(unit);
    var floor = startOf(date, datePart);
    return eq(floor, date) ? floor : add(floor, 1, datePart);
  }

  function diff(a, b) {
    var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day';
    var datePart = fixUnit(unit); // don't use 'defineComparators' here, as we don't want to mutate the values

    var dtA = moment(a);
    var dtB = moment(b);
    return dtB.diff(dtA, datePart);
  }

  function minutes(date) {
    var dt = moment(date);
    return dt.minutes();
  }

  function firstOfWeek(culture) {
    var data = culture ? moment.localeData(culture) : moment.localeData();
    return data ? data.firstDayOfWeek() : 0;
  }

  function firstVisibleDay(date) {
    return moment(date).startOf('month').startOf('week').toDate();
  }

  function lastVisibleDay(date) {
    return moment(date).endOf('month').endOf('week').toDate();
  }

  function visibleDays(date) {
    var current = firstVisibleDay(date);
    var last = lastVisibleDay(date);
    var days = [];

    while (lte(current, last)) {
      days.push(current);
      current = add(current, 1, 'd');
    }

    return days;
  }
  /*** END localized date arithmetic methods with moment ***/

  /**
   * Moved from TimeSlots.js, this method overrides the method of the same name
   * in the localizer.js, using moment to construct the js Date
   * @param {Date} dt - date to start with
   * @param {Number} minutesFromMidnight
   * @param {Number} offset
   * @returns {Date}
   */


  function getSlotDate(dt, minutesFromMidnight, offset) {
    return moment(dt).startOf('day').minute(minutesFromMidnight + offset).toDate();
  } // moment will automatically handle DST differences in it's calculations


  function getTotalMin(start, end) {
    return diff(start, end, 'minutes');
  }

  function getMinutesFromMidnight(start) {
    var dayStart = moment(start).startOf('day');
    var day = moment(start);
    return day.diff(dayStart, 'minutes') + getDayStartDstOffset(start);
  } // These two are used by DateSlotMetrics


  function continuesPrior(start, first) {
    var mStart = moment(start);
    var mFirst = moment(first);
    return mStart.isBefore(mFirst, 'day');
  }

  function continuesAfter(start, end, last) {
    var mEnd = moment(end);
    var mLast = moment(last);
    return mEnd.isSameOrAfter(mLast, 'minutes');
  } // These two are used by eventLevels


  function sortEvents(_ref6) {
    var _ref6$evtA = _ref6.evtA,
        aStart = _ref6$evtA.start,
        aEnd = _ref6$evtA.end,
        aAllDay = _ref6$evtA.allDay,
        _ref6$evtB = _ref6.evtB,
        bStart = _ref6$evtB.start,
        bEnd = _ref6$evtB.end,
        bAllDay = _ref6$evtB.allDay;
    var startSort = +startOf(aStart, 'day') - +startOf(bStart, 'day');
    var durA = diff(aStart, ceil(aEnd, 'day'), 'day');
    var durB = diff(bStart, ceil(bEnd, 'day'), 'day');
    return startSort || // sort by start Day first
    Math.max(durB, 1) - Math.max(durA, 1) || // events spanning multiple days go first
    !!bAllDay - !!aAllDay || // then allDay single day events
    +aStart - +bStart || // then sort by start time *don't need moment conversion here
    +aEnd - +bEnd // then sort by end time *don't need moment conversion here either
    ;
  }

  function inEventRange(_ref7) {
    var _ref7$event = _ref7.event,
        start = _ref7$event.start,
        end = _ref7$event.end,
        _ref7$range = _ref7.range,
        rangeStart = _ref7$range.start,
        rangeEnd = _ref7$range.end;
    var startOfDay = moment(start).startOf('day');
    var eEnd = moment(end);
    var rStart = moment(rangeStart);
    var rEnd = moment(rangeEnd);
    var startsBeforeEnd = startOfDay.isSameOrBefore(rEnd, 'day'); // when the event is zero duration we need to handle a bit differently

    var sameMin = !startOfDay.isSame(eEnd, 'minutes');
    var endsAfterStart = sameMin ? eEnd.isAfter(rStart, 'minutes') : eEnd.isSameOrAfter(rStart, 'minutes');
    return startsBeforeEnd && endsAfterStart;
  } // moment treats 'day' and 'date' equality very different
  // moment(date1).isSame(date2, 'day') would test that they were both the same day of the week
  // moment(date1).isSame(date2, 'date') would test that they were both the same date of the month of the year


  function isSameDate(date1, date2) {
    var dt = moment(date1);
    var dt2 = moment(date2);
    return dt.isSame(dt2, 'date');
  }
  /**
   * This method, called once in the localizer constructor, is used by eventLevels
   * 'eventSegments()' to assist in determining the 'span' of the event in the display,
   * specifically when using a timezone that is greater than the browser native timezone.
   * @returns number
   */


  function browserTZOffset() {
    /**
     * Date.prototype.getTimezoneOffset horrifically flips the positive/negative from
     * what you see in it's string, so we have to jump through some hoops to get a value
     * we can actually compare.
     */
    var dt = new Date();
    var neg = /-/.test(dt.toString()) ? '-' : '';
    var dtOffset = dt.getTimezoneOffset();
    var comparator = Number("".concat(neg).concat(Math.abs(dtOffset))); // moment correctly provides positive/negative offset, as expected

    var mtOffset = moment().utcOffset();
    return mtOffset > comparator ? 1 : 0;
  }

  return new _localizer.DateLocalizer({
    formats: formats,
    firstOfWeek: firstOfWeek,
    firstVisibleDay: firstVisibleDay,
    lastVisibleDay: lastVisibleDay,
    visibleDays: visibleDays,
    format: function format(value, _format, culture) {
      return locale(moment(value), culture).format(_format);
    },
    lt: lt,
    lte: lte,
    gt: gt,
    gte: gte,
    eq: eq,
    neq: neq,
    merge: merge,
    inRange: inRange,
    startOf: startOf,
    endOf: endOf,
    range: range,
    add: add,
    diff: diff,
    ceil: ceil,
    min: min,
    max: max,
    minutes: minutes,
    getSlotDate: getSlotDate,
    getTimezoneOffset: getTimezoneOffset,
    getDstOffset: getDstOffset,
    getTotalMin: getTotalMin,
    getMinutesFromMidnight: getMinutesFromMidnight,
    continuesPrior: continuesPrior,
    continuesAfter: continuesAfter,
    sortEvents: sortEvents,
    inEventRange: inEventRange,
    isSameDate: isSameDate,
    browserTZOffset: browserTZOffset
  });
}