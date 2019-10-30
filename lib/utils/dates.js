'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _dateArithmetic = _interopRequireDefault(require('date-arithmetic'))

/* eslint no-fallthrough: off */
var MILLI = {
  seconds: 1000,
  minutes: 1000 * 60,
  hours: 1000 * 60 * 60,
  day: 1000 * 60 * 60 * 24,
}
var MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
var dates = (0, _extends2.default)({}, _dateArithmetic.default, {
  monthsInYear: function monthsInYear(year) {
    var date = new Date(year, 0, 1)
    return MONTHS.map(function(i) {
      return dates.month(date, i)
    })
  },
  firstVisibleDay: function firstVisibleDay(date, localizer) {
    var firstOfMonth = dates.startOf(date, 'month')
    return dates.startOf(firstOfMonth, 'week', localizer.startOfWeek())
  },
  lastVisibleDay: function lastVisibleDay(date, localizer) {
    var endOfMonth = dates.endOf(date, 'month')
    return dates.endOf(endOfMonth, 'week', localizer.startOfWeek())
  },
  visibleDays: function visibleDays(date, localizer) {
    var current = dates.firstVisibleDay(date, localizer),
      last = dates.lastVisibleDay(date, localizer),
      days = []

    while (dates.lte(current, last, 'day')) {
      days.push(current)
      current = dates.add(current, 1, 'day')
    }

    return days
  },
  ceil: function ceil(date, unit) {
    var floor = dates.startOf(date, unit)
    return dates.eq(floor, date) ? floor : dates.add(floor, 1, unit)
  },
  range: function range(start, end, unit) {
    if (unit === void 0) {
      unit = 'day'
    }

    var current = start,
      days = []

    while (dates.lte(current, end, unit)) {
      days.push(current)
      current = dates.add(current, 1, unit)
    }

    return days
  },
  merge: function merge(date, time) {
    if (time == null && date == null) return null
    if (time == null) time = new Date()
    if (date == null) date = new Date()
    date = dates.startOf(date, 'day')
    date = dates.hours(date, dates.hours(time))
    date = dates.minutes(date, dates.minutes(time))
    date = dates.seconds(date, dates.seconds(time))
    return dates.milliseconds(date, dates.milliseconds(time))
  },
  eqTime: function eqTime(dateA, dateB) {
    return (
      dates.hours(dateA) === dates.hours(dateB) &&
      dates.minutes(dateA) === dates.minutes(dateB) &&
      dates.seconds(dateA) === dates.seconds(dateB)
    )
  },
  isJustDate: function isJustDate(date) {
    return (
      dates.hours(date) === 0 &&
      dates.minutes(date) === 0 &&
      dates.seconds(date) === 0 &&
      dates.milliseconds(date) === 0
    )
  },
  duration: function duration(start, end, unit, firstOfWeek) {
    if (unit === 'day') unit = 'date'
    return Math.abs(
      dates[unit](start, undefined, firstOfWeek) -
        dates[unit](end, undefined, firstOfWeek)
    )
  },
  diff: function diff(dateA, dateB, unit) {
    if (!unit || unit === 'milliseconds') return Math.abs(+dateA - +dateB) // the .round() handles an edge case
    // with DST where the total won't be exact
    // since one day in the range may be shorter/longer by an hour

    return Math.round(
      Math.abs(
        +dates.startOf(dateA, unit) / MILLI[unit] -
          +dates.startOf(dateB, unit) / MILLI[unit]
      )
    )
  },
  total: function total(date, unit) {
    var ms = date.getTime(),
      div = 1

    switch (unit) {
      case 'week':
        div *= 7

      case 'day':
        div *= 24

      case 'hours':
        div *= 60

      case 'minutes':
        div *= 60

      case 'seconds':
        div *= 1000
    }

    return ms / div
  },
  week: function week(date) {
    var d = new Date(date)
    d.setHours(0, 0, 0)
    d.setDate(d.getDate() + 4 - (d.getDay() || 7))
    return Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7)
  },
  today: function today() {
    return dates.startOf(new Date(), 'day')
  },
  yesterday: function yesterday() {
    return dates.add(dates.startOf(new Date(), 'day'), -1, 'day')
  },
  tomorrow: function tomorrow() {
    return dates.add(dates.startOf(new Date(), 'day'), 1, 'day')
  },
})
var _default = dates
exports.default = _default
module.exports = exports['default']
