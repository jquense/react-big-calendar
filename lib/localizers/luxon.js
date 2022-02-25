'use strict'

exports.__esModule = true
exports.default = _default
exports.formats = void 0

var _localizer = require('../localizer')

function pluralizeUnit(unit) {
  return /s$/.test(unit) ? unit : unit + 's'
}

var weekRangeFormat = function weekRangeFormat(_ref, culture, local) {
  var start = _ref.start,
    end = _ref.end
  return (
    local.format(start, 'MMMM dd', culture) +
    ' – ' + // updated to use this localizer 'eq()' method
    local.format(end, local.eq(start, end, 'month') ? 'dd' : 'MMMM dd', culture)
  )
}

var dateRangeFormat = function dateRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
    end = _ref2.end
  return (
    local.format(start, 'D', culture) + ' – ' + local.format(end, 'D', culture)
  )
}

var timeRangeFormat = function timeRangeFormat(_ref3, culture, local) {
  var start = _ref3.start,
    end = _ref3.end
  return (
    local.format(start, 't', culture) + ' – ' + local.format(end, 't', culture)
  )
}

var timeRangeStartFormat = function timeRangeStartFormat(
  _ref4,
  culture,
  local
) {
  var start = _ref4.start
  return local.format(start, 't', culture) + ' – '
}

var timeRangeEndFormat = function timeRangeEndFormat(_ref5, culture, local) {
  var end = _ref5.end
  return ' – ' + local.format(end, 't', culture)
}

var formats = {
  dateFormat: 'dd',
  dayFormat: 'dd EEE',
  weekdayFormat: 'EEE',
  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,
  timeGutterFormat: 't',
  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'EEEE MMM dd',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,
  agendaDateFormat: 'EEE MMM dd',
  agendaTimeFormat: 't',
  agendaTimeRangeFormat: timeRangeFormat,
}
exports.formats = formats

function fixUnit(unit) {
  var datePart = unit ? pluralizeUnit(unit.toLowerCase()) : unit

  if (datePart === 'FullYear') {
    datePart = 'year'
  } else if (!datePart) {
    datePart = undefined
  }

  return datePart
} // Luxon does not currently have weekInfo by culture
// Luxon uses 1 based values for month and weekday
// So we default to Sunday (7)

function _default(DateTime, _temp) {
  var _ref6 = _temp === void 0 ? {} : _temp,
    _ref6$firstDayOfWeek = _ref6.firstDayOfWeek,
    firstDayOfWeek = _ref6$firstDayOfWeek === void 0 ? 7 : _ref6$firstDayOfWeek

  function formatDate(value, format) {
    return DateTime.fromJSDate(value).toFormat(format)
  }

  function formatDateWithCulture(value, culture, format) {
    return DateTime.fromJSDate(value)
      .setLocale(culture)
      .format(format)
  }
  /*** BEGIN localized date arithmetic methods with Luxon ***/

  function defineComparators(a, b, unit) {
    var datePart = fixUnit(unit)
    var dtA = datePart
      ? DateTime.fromJSDate(a).startOf(datePart)
      : DateTime.fromJSDate(a)
    var dtB = datePart
      ? DateTime.fromJSDate(b).startOf(datePart)
      : DateTime.fromJSDate(b)
    return [dtA, dtB, datePart]
  } // Since Luxon (and current Intl API) has no support
  // for culture based weekInfo, we need to handle
  // the start of the week differently
  // depending on locale, the firstDayOfWeek could also be Saturday, Sunday or Monday

  function startOfDTWeek(dtObj) {
    var weekday = dtObj.weekday

    if (weekday === firstDayOfWeek) {
      return dtObj.startOf('day') // already beginning of week
    } else if (firstDayOfWeek === 1) {
      return dtObj.startOf('week') // fow is Monday, which is Luxon default
    }

    var diff = firstDayOfWeek === 7 ? weekday : weekday + (7 - firstDayOfWeek)
    return dtObj
      .minus({
        day: diff,
      })
      .startOf('day')
  }

  function endOfDTWeek(dtObj) {
    var weekday = dtObj.weekday
    var eow = firstDayOfWeek === 1 ? 7 : firstDayOfWeek - 1

    if (weekday === eow) {
      return dtObj.endOf('day') // already last day of the week
    } else if (firstDayOfWeek === 1) {
      return dtObj.endOf('week') // use Luxon default (Sunday)
    }

    var fromDate =
      firstDayOfWeek > eow
        ? dtObj.plus({
            day: firstDayOfWeek - eow,
          })
        : dtObj
    return fromDate
      .set({
        weekday: eow,
      })
      .endOf('day')
  } // This returns a DateTime instance

  function startOfDT(date, unit) {
    if (date === void 0) {
      date = new Date()
    }

    var datePart = fixUnit(unit)

    if (datePart) {
      var dt = DateTime.fromJSDate(date)
      return datePart.includes('week')
        ? startOfDTWeek(dt)
        : dt.startOf(datePart)
    }

    return DateTime.fromJSDate(date)
  }

  function firstOfWeek() {
    return firstDayOfWeek
  } // This returns a JS Date from a DateTime instance

  function startOf(date, unit) {
    if (date === void 0) {
      date = new Date()
    }

    return startOfDT(date, unit).toJSDate()
  } // This returns a DateTime instance

  function endOfDT(date, unit) {
    if (date === void 0) {
      date = new Date()
    }

    var datePart = fixUnit(unit)

    if (datePart) {
      var dt = DateTime.fromJSDate(date)
      return datePart.includes('week') ? endOfDTWeek(dt) : dt.endOf(datePart)
    }

    return DateTime.fromJSDate(date)
  }

  function endOf(date, unit) {
    if (date === void 0) {
      date = new Date()
    }

    return endOfDT(date, unit).toJSDate()
  }

  function eq(a, b, unit) {
    var _defineComparators = defineComparators(a, b, unit),
      dtA = _defineComparators[0],
      dtB = _defineComparators[1]

    return +dtA == +dtB
  }

  function neq(a, b, unit) {
    return !eq(a, b, unit)
  }

  function gt(a, b, unit) {
    var _defineComparators2 = defineComparators(a, b, unit),
      dtA = _defineComparators2[0],
      dtB = _defineComparators2[1]

    return +dtA > +dtB
  }

  function lt(a, b, unit) {
    var _defineComparators3 = defineComparators(a, b, unit),
      dtA = _defineComparators3[0],
      dtB = _defineComparators3[1]

    return +dtA < +dtB
  }

  function gte(a, b, unit) {
    var _defineComparators4 = defineComparators(a, b, unit),
      dtA = _defineComparators4[0],
      dtB = _defineComparators4[1]

    return +dtA >= +dtB
  }

  function lte(a, b, unit) {
    var _defineComparators5 = defineComparators(a, b, unit),
      dtA = _defineComparators5[0],
      dtB = _defineComparators5[1]

    return +dtA <= +dtB
  }

  function inRange(day, min, max, unit) {
    if (unit === void 0) {
      unit = 'day'
    }

    var datePart = fixUnit(unit)
    var mDay = startOfDT(day, datePart)
    var mMin = startOfDT(min, datePart)
    var mMax = startOfDT(max, datePart)
    return +mDay >= +mMin && +mDay <= +mMax
  }

  function min(dateA, dateB) {
    var dtA = DateTime.fromJSDate(dateA)
    var dtB = DateTime.fromJSDate(dateB)
    var minDt = DateTime.min(dtA, dtB)
    return minDt.toJSDate()
  }

  function max(dateA, dateB) {
    var dtA = DateTime.fromJSDate(dateA)
    var dtB = DateTime.fromJSDate(dateB)
    var maxDt = DateTime.max(dtA, dtB)
    return maxDt.toJSDate()
  }

  function merge(date, time) {
    if (!date && !time) return null
    var tm = DateTime.fromJSDate(time)
    var dt = startOfDT(date, 'day')
    return dt
      .set({
        hour: tm.hour,
        minute: tm.minute,
        second: tm.second,
        millisecond: tm.millisecond,
      })
      .toJSDate()
  }

  function add(date, adder, unit) {
    var _DateTime$fromJSDate$

    var datePart = fixUnit(unit)
    return DateTime.fromJSDate(date)
      .plus(
        ((_DateTime$fromJSDate$ = {}),
        (_DateTime$fromJSDate$[datePart] = adder),
        _DateTime$fromJSDate$)
      )
      .toJSDate()
  }

  function range(start, end, unit) {
    if (unit === void 0) {
      unit = 'day'
    }

    var datePart = fixUnit(unit)
    var current = DateTime.fromJSDate(start).toJSDate() // this is to get it to tz

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

  function diff(a, b, unit) {
    if (unit === void 0) {
      unit = 'day'
    }

    var datePart = fixUnit(unit) // don't use 'defineComparators' here, as we don't want to mutate the values

    var dtA = DateTime.fromJSDate(a)
    var dtB = DateTime.fromJSDate(b)
    return Math.round(
      dtB
        .diff(dtA, datePart, {
          conversionAccuracy: 'longterm',
        })
        .toObject()[datePart]
    )
  }

  function firstVisibleDay(date) {
    var startOfMonth = startOfDT(date, 'month')
    return startOfDTWeek(startOfMonth).toJSDate()
  }

  function lastVisibleDay(date) {
    var endOfMonth = endOfDT(date, 'month')
    return endOfDTWeek(endOfMonth).toJSDate()
  }

  function visibleDays(date) {
    var current = firstVisibleDay(date)
    var last = lastVisibleDay(date)
    var days = []

    while (lte(current, last)) {
      days.push(current)
      current = add(current, 1, 'day')
    }

    return days
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
    return startOfDT(dt, 'day')
      .set({
        minutes: minutesFromMidnight + offset,
      })
      .toJSDate()
  } // Luxon will automatically handle DST differences in it's calculations

  function getTotalMin(start, end) {
    return diff(start, end, 'minutes')
  }

  function getMinutesFromMidnight(start) {
    var dayStart = startOfDT(start, 'day')
    var day = DateTime.fromJSDate(start)
    return Math.round(
      day
        .diff(dayStart, 'minutes', {
          conversionAccuracy: 'longterm',
        })
        .toObject().minutes
    )
  } // These two are used by DateSlotMetrics

  function continuesPrior(start, first) {
    return lt(start, first)
  }

  function continuesAfter(start, end, last) {
    return gte(end, last)
  } // These two are used by eventLevels

  function sortEvents(_ref7) {
    var _ref7$evtA = _ref7.evtA,
      aStart = _ref7$evtA.start,
      aEnd = _ref7$evtA.end,
      aAllDay = _ref7$evtA.allDay,
      _ref7$evtB = _ref7.evtB,
      bStart = _ref7$evtB.start,
      bEnd = _ref7$evtB.end,
      bAllDay = _ref7$evtB.allDay
    var startSort = +startOf(aStart, 'day') - +startOf(bStart, 'day')
    var durA = diff(aStart, ceil(aEnd, 'day'), 'day')
    var durB = diff(bStart, ceil(bEnd, 'day'), 'day')
    return (
      startSort || // sort by start Day first
      Math.max(durB, 1) - Math.max(durA, 1) || // events spanning multiple days go first
      !!bAllDay - !!aAllDay || // then allDay single day events
      +aStart - +bStart || // then sort by start time *don't need moment conversion here
      +aEnd - +bEnd // then sort by end time *don't need moment conversion here either
    )
  }

  function inEventRange(_ref8) {
    var _ref8$event = _ref8.event,
      start = _ref8$event.start,
      end = _ref8$event.end,
      _ref8$range = _ref8.range,
      rangeStart = _ref8$range.start,
      rangeEnd = _ref8$range.end
    var eStart = startOf(start, 'day')
    var startsBeforeEnd = lte(eStart, rangeEnd, 'day') // when the event is zero duration we need to handle a bit differently

    var sameMin = neq(eStart, end, 'minutes')
    var endsAfterStart = sameMin
      ? gt(end, rangeStart, 'minutes')
      : gte(end, rangeStart, 'minutes')
    return startsBeforeEnd && endsAfterStart
  } // moment treats 'day' and 'date' equality very different
  // moment(date1).isSame(date2, 'day') would test that they were both the same day of the week
  // moment(date1).isSame(date2, 'date') would test that they were both the same date of the month of the year

  function isSameDate(date1, date2) {
    var dt = DateTime.fromJSDate(date1)
    var dt2 = DateTime.fromJSDate(date2)
    return dt.hasSame(dt2, 'day')
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
    var comparator = Number('' + neg + Math.abs(dtOffset)) // moment correctly provides positive/negative offset, as expected

    var mtOffset = DateTime.local().offset
    return mtOffset > comparator ? 1 : 0
  }

  return new _localizer.DateLocalizer({
    format: function format(value, _format, culture) {
      if (culture) {
        return formatDateWithCulture(value, culture, _format)
      }

      return formatDate(value, _format)
    },
    formats: formats,
    firstOfWeek: firstOfWeek,
    firstVisibleDay: firstVisibleDay,
    lastVisibleDay: lastVisibleDay,
    visibleDays: visibleDays,
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
    getSlotDate: getSlotDate,
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
