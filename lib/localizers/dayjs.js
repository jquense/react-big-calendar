'use strict'

var _interopRequireDefault =
  require('@babel/runtime/helpers/interopRequireDefault').default
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = _default
exports.formats = void 0
var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
)
var _localizer = require('../localizer')
var _isBetween = _interopRequireDefault(require('dayjs/plugin/isBetween'))
var _isSameOrAfter = _interopRequireDefault(
  require('dayjs/plugin/isSameOrAfter')
)
var _isSameOrBefore = _interopRequireDefault(
  require('dayjs/plugin/isSameOrBefore')
)
var _localeData = _interopRequireDefault(require('dayjs/plugin/localeData'))
var _localizedFormat = _interopRequireDefault(
  require('dayjs/plugin/localizedFormat')
)
var _minMax = _interopRequireDefault(require('dayjs/plugin/minMax'))
var _utc = _interopRequireDefault(require('dayjs/plugin/utc'))
// import dayjs plugins
// Note that the timezone plugin is not imported here
// this plugin can be optionally loaded by the user

var weekRangeFormat = function weekRangeFormat(_ref, culture, local) {
  var start = _ref.start,
    end = _ref.end
  return (
    local.format(start, 'MMMM DD', culture) +
    ' – ' +
    // updated to use this localizer 'eq()' method
    local.format(end, local.eq(start, end, 'month') ? 'DD' : 'MMMM DD', culture)
  )
}
var dateRangeFormat = function dateRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
    end = _ref2.end
  return (
    local.format(start, 'L', culture) + ' – ' + local.format(end, 'L', culture)
  )
}
var timeRangeFormat = function timeRangeFormat(_ref3, culture, local) {
  var start = _ref3.start,
    end = _ref3.end
  return (
    local.format(start, 'LT', culture) +
    ' – ' +
    local.format(end, 'LT', culture)
  )
}
var timeRangeStartFormat = function timeRangeStartFormat(
  _ref4,
  culture,
  local
) {
  var start = _ref4.start
  return local.format(start, 'LT', culture) + ' – '
}
var timeRangeEndFormat = function timeRangeEndFormat(_ref5, culture, local) {
  var end = _ref5.end
  return ' – ' + local.format(end, 'LT', culture)
}
var formats = (exports.formats = {
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
  agendaTimeRangeFormat: timeRangeFormat,
})
function fixUnit(unit) {
  var datePart = unit ? unit.toLowerCase() : unit
  if (datePart === 'FullYear') {
    datePart = 'year'
  } else if (!datePart) {
    datePart = undefined
  }
  return datePart
}
function _default(dayjsLib) {
  // load dayjs plugins
  dayjsLib.extend(_isBetween.default)
  dayjsLib.extend(_isSameOrAfter.default)
  dayjsLib.extend(_isSameOrBefore.default)
  dayjsLib.extend(_localeData.default)
  dayjsLib.extend(_localizedFormat.default)
  dayjsLib.extend(_minMax.default)
  dayjsLib.extend(_utc.default)
  var locale = function locale(dj, c) {
    return c ? dj.locale(c) : dj
  }

  // if the timezone plugin is loaded,
  // then use the timezone aware version
  var dayjs = dayjsLib.tz ? dayjsLib.tz : dayjsLib
  function getTimezoneOffset(date) {
    // ensures this gets cast to timezone
    return dayjs(date).toDate().getTimezoneOffset()
  }
  function getDstOffset(start, end) {
    var _st$tz$$x$$timezone
    // convert to dayjs, in case
    var st = dayjs(start)
    var ed = dayjs(end)
    // if not using the dayjs timezone plugin
    if (!dayjs.tz) {
      return st.toDate().getTimezoneOffset() - ed.toDate().getTimezoneOffset()
    }
    /**
     * If a default timezone has been applied, then
     * use this to get the proper timezone offset, otherwise default
     * the timezone to the browser local
     */
    var tzName =
      (_st$tz$$x$$timezone = st.tz().$x.$timezone) !== null &&
      _st$tz$$x$$timezone !== void 0
        ? _st$tz$$x$$timezone
        : dayjsLib.tz.guess()
    // invert offsets to be inline with moment.js
    var startOffset = -dayjs.tz(+st, tzName).utcOffset()
    var endOffset = -dayjs.tz(+ed, tzName).utcOffset()
    return startOffset - endOffset
  }
  function getDayStartDstOffset(start) {
    var dayStart = dayjs(start).startOf('day')
    return getDstOffset(dayStart, start)
  }

  /*** BEGIN localized date arithmetic methods with dayjs ***/
  function defineComparators(a, b, unit) {
    var datePart = fixUnit(unit)
    var dtA = datePart ? dayjs(a).startOf(datePart) : dayjs(a)
    var dtB = datePart ? dayjs(b).startOf(datePart) : dayjs(b)
    return [dtA, dtB, datePart]
  }
  function startOf() {
    var date =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
    var unit = arguments.length > 1 ? arguments[1] : undefined
    var datePart = fixUnit(unit)
    if (datePart) {
      return dayjs(date).startOf(datePart).toDate()
    }
    return dayjs(date).toDate()
  }
  function endOf() {
    var date =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
    var unit = arguments.length > 1 ? arguments[1] : undefined
    var datePart = fixUnit(unit)
    if (datePart) {
      return dayjs(date).endOf(datePart).toDate()
    }
    return dayjs(date).toDate()
  }

  // dayjs comparison operations *always* convert both sides to dayjs objects
  // prior to running the comparisons
  function eq(a, b, unit) {
    var _defineComparators = defineComparators(a, b, unit),
      _defineComparators2 = (0, _slicedToArray2.default)(_defineComparators, 3),
      dtA = _defineComparators2[0],
      dtB = _defineComparators2[1],
      datePart = _defineComparators2[2]
    return dtA.isSame(dtB, datePart)
  }
  function neq(a, b, unit) {
    return !eq(a, b, unit)
  }
  function gt(a, b, unit) {
    var _defineComparators3 = defineComparators(a, b, unit),
      _defineComparators4 = (0, _slicedToArray2.default)(
        _defineComparators3,
        3
      ),
      dtA = _defineComparators4[0],
      dtB = _defineComparators4[1],
      datePart = _defineComparators4[2]
    return dtA.isAfter(dtB, datePart)
  }
  function lt(a, b, unit) {
    var _defineComparators5 = defineComparators(a, b, unit),
      _defineComparators6 = (0, _slicedToArray2.default)(
        _defineComparators5,
        3
      ),
      dtA = _defineComparators6[0],
      dtB = _defineComparators6[1],
      datePart = _defineComparators6[2]
    return dtA.isBefore(dtB, datePart)
  }
  function gte(a, b, unit) {
    var _defineComparators7 = defineComparators(a, b, unit),
      _defineComparators8 = (0, _slicedToArray2.default)(
        _defineComparators7,
        3
      ),
      dtA = _defineComparators8[0],
      dtB = _defineComparators8[1],
      datePart = _defineComparators8[2]
    return dtA.isSameOrBefore(dtB, datePart)
  }
  function lte(a, b, unit) {
    var _defineComparators9 = defineComparators(a, b, unit),
      _defineComparators10 = (0, _slicedToArray2.default)(
        _defineComparators9,
        3
      ),
      dtA = _defineComparators10[0],
      dtB = _defineComparators10[1],
      datePart = _defineComparators10[2]
    return dtA.isSameOrBefore(dtB, datePart)
  }
  function inRange(day, min, max) {
    var unit =
      arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'day'
    var datePart = fixUnit(unit)
    var djDay = dayjs(day)
    var djMin = dayjs(min)
    var djMax = dayjs(max)
    return djDay.isBetween(djMin, djMax, datePart, '[]')
  }
  function min(dateA, dateB) {
    var dtA = dayjs(dateA)
    var dtB = dayjs(dateB)
    var minDt = dayjsLib.min(dtA, dtB)
    return minDt.toDate()
  }
  function max(dateA, dateB) {
    var dtA = dayjs(dateA)
    var dtB = dayjs(dateB)
    var maxDt = dayjsLib.max(dtA, dtB)
    return maxDt.toDate()
  }
  function merge(date, time) {
    if (!date && !time) return null
    var tm = dayjs(time).format('HH:mm:ss')
    var dt = dayjs(date).startOf('day').format('MM/DD/YYYY')
    // We do it this way to avoid issues when timezone switching
    return dayjsLib(
      ''.concat(dt, ' ').concat(tm),
      'MM/DD/YYYY HH:mm:ss'
    ).toDate()
  }
  function add(date, adder, unit) {
    var datePart = fixUnit(unit)
    return dayjs(date).add(adder, datePart).toDate()
  }
  function range(start, end) {
    var unit =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day'
    var datePart = fixUnit(unit)
    // because the add method will put these in tz, we have to start that way
    var current = dayjs(start).toDate()
    var days = []
    while (lte(current, end)) {
      days.push(current)
      current = add(current, 1, datePart)
    }
    return days
  }
  function ceil(date, unit) {
    var datePart = fixUnit(unit)
    var floor = startOf(date, datePart)
    return eq(floor, date) ? floor : add(floor, 1, datePart)
  }
  function diff(a, b) {
    var unit =
      arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'day'
    var datePart = fixUnit(unit)
    // don't use 'defineComparators' here, as we don't want to mutate the values
    var dtA = dayjs(a)
    var dtB = dayjs(b)
    return dtB.diff(dtA, datePart)
  }
  function minutes(date) {
    var dt = dayjs(date)
    return dt.minutes()
  }
  function firstOfWeek(culture) {
    var data = culture ? dayjsLib.localeData(culture) : dayjsLib.localeData()
    return data ? data.firstDayOfWeek() : 0
  }
  function firstVisibleDay(date) {
    return dayjs(date).startOf('month').startOf('week').toDate()
  }
  function lastVisibleDay(date) {
    return dayjs(date).endOf('month').endOf('week').toDate()
  }
  function visibleDays(date) {
    var current = firstVisibleDay(date)
    var last = lastVisibleDay(date)
    var days = []
    while (lte(current, last)) {
      days.push(current)
      current = add(current, 1, 'd')
    }
    return days
  }
  /*** END localized date arithmetic methods with dayjs ***/

  /**
   * Moved from TimeSlots.js, this method overrides the method of the same name
   * in the localizer.js, using dayjs to construct the js Date
   * @param {Date} dt - date to start with
   * @param {Number} minutesFromMidnight
   * @param {Number} offset
   * @returns {Date}
   */
  function getSlotDate(dt, minutesFromMidnight, offset) {
    return dayjs(dt)
      .startOf('day')
      .minute(minutesFromMidnight + offset)
      .toDate()
  }

  // dayjs will automatically handle DST differences in it's calculations
  function getTotalMin(start, end) {
    return diff(start, end, 'minutes')
  }
  function getMinutesFromMidnight(start) {
    var dayStart = dayjs(start).startOf('day')
    var day = dayjs(start)
    return day.diff(dayStart, 'minutes') + getDayStartDstOffset(start)
  }

  // These two are used by DateSlotMetrics
  function continuesPrior(start, first) {
    var djStart = dayjs(start)
    var djFirst = dayjs(first)
    return djStart.isBefore(djFirst, 'day')
  }
  function continuesAfter(start, end, last) {
    var djEnd = dayjs(end)
    var djLast = dayjs(last)
    return djEnd.isSameOrAfter(djLast, 'minutes')
  }
  function daySpan(start, end) {
    var startDay = dayjs(start)
    var endDay = dayjs(end)
    return endDay.diff(startDay, 'day')
  }

  // These two are used by eventLevels
  function sortEvents(_ref6) {
    var _ref6$evtA = _ref6.evtA,
      aStart = _ref6$evtA.start,
      aEnd = _ref6$evtA.end,
      aAllDay = _ref6$evtA.allDay,
      _ref6$evtB = _ref6.evtB,
      bStart = _ref6$evtB.start,
      bEnd = _ref6$evtB.end,
      bAllDay = _ref6$evtB.allDay
    var startSort = +startOf(aStart, 'day') - +startOf(bStart, 'day')
    var durA = daySpan(aStart, aEnd)
    var durB = daySpan(bStart, bEnd)
    return (
      startSort ||
      // sort by start Day first
      durB - durA ||
      // events spanning multiple days go first
      !!bAllDay - !!aAllDay ||
      // then allDay single day events
      +aStart - +bStart ||
      // then sort by start time *don't need dayjs conversion here
      +aEnd - +bEnd // then sort by end time *don't need dayjs conversion here either
    )
  }
  function inEventRange(_ref7) {
    var _ref7$event = _ref7.event,
      start = _ref7$event.start,
      end = _ref7$event.end,
      _ref7$range = _ref7.range,
      rangeStart = _ref7$range.start,
      rangeEnd = _ref7$range.end
    var startOfDay = dayjs(start).startOf('day')
    var eEnd = dayjs(end)
    var rStart = dayjs(rangeStart)
    var rEnd = dayjs(rangeEnd)
    var startsBeforeEnd = startOfDay.isSameOrBefore(rEnd, 'day')
    // when the event is zero duration we need to handle a bit differently
    var sameMin = !startOfDay.isSame(eEnd, 'minutes')
    var endsAfterStart = sameMin
      ? eEnd.isAfter(rStart, 'minutes')
      : eEnd.isSameOrAfter(rStart, 'minutes')
    return startsBeforeEnd && endsAfterStart
  }
  function isSameDate(date1, date2) {
    var dt = dayjs(date1)
    var dt2 = dayjs(date2)
    return dt.isSame(dt2, 'day')
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
    var dt = new Date()
    var neg = /-/.test(dt.toString()) ? '-' : ''
    var dtOffset = dt.getTimezoneOffset()
    var comparator = Number(''.concat(neg).concat(Math.abs(dtOffset)))
    // dayjs correctly provides positive/negative offset, as expected
    var mtOffset = dayjs().utcOffset()
    return mtOffset > comparator ? 1 : 0
  }
  return new _localizer.DateLocalizer({
    formats: formats,
    firstOfWeek: firstOfWeek,
    firstVisibleDay: firstVisibleDay,
    lastVisibleDay: lastVisibleDay,
    visibleDays: visibleDays,
    format: function format(value, _format, culture) {
      return locale(dayjs(value), culture).format(_format)
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
    browserTZOffset: browserTZOffset,
  })
}
