'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

exports.__esModule = true
exports.default = _default
exports.formats = void 0

var dates = _interopRequireWildcard(require('../utils/dates'))

var _oldGlobalize = _interopRequireDefault(require('./oldGlobalize'))

var _localizer = require('../localizer')

var dateRangeFormat = (_ref, culture, local) => {
  var { start, end } = _ref
  return (
    local.format(
      start,
      {
        date: 'short',
      },
      culture
    ) +
    ' – ' +
    local.format(
      end,
      {
        date: 'short',
      },
      culture
    )
  )
}

var timeRangeFormat = (_ref2, culture, local) => {
  var { start, end } = _ref2
  return (
    local.format(
      start,
      {
        time: 'short',
      },
      culture
    ) +
    ' – ' +
    local.format(
      end,
      {
        time: 'short',
      },
      culture
    )
  )
}

var timeRangeStartFormat = (_ref3, culture, local) => {
  var { start } = _ref3
  return (
    local.format(
      start,
      {
        time: 'short',
      },
      culture
    ) + ' – '
  )
}

var timeRangeEndFormat = (_ref4, culture, local) => {
  var { end } = _ref4
  return (
    ' – ' +
    local.format(
      end,
      {
        time: 'short',
      },
      culture
    )
  )
}

var weekRangeFormat = (_ref5, culture, local) => {
  var { start, end } = _ref5
  return (
    local.format(start, 'MMM dd', culture) +
    ' – ' +
    local.format(end, dates.eq(start, end, 'month') ? 'dd' : 'MMM dd', culture)
  )
}

var formats = {
  dateFormat: 'dd',
  dayFormat: 'eee dd/MM',
  weekdayFormat: 'eee',
  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,
  timeGutterFormat: {
    time: 'short',
  },
  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'eeee MMM dd',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,
  agendaDateFormat: 'eee MMM dd',
  agendaTimeFormat: {
    time: 'short',
  },
  agendaTimeRangeFormat: timeRangeFormat,
}
exports.formats = formats

function _default(globalize) {
  var locale = culture => (culture ? globalize(culture) : globalize) // return the first day of the week from the locale data. Defaults to 'world'
  // territory if no territory is derivable from CLDR.
  // Failing to use CLDR supplemental (not loaded?), revert to the original
  // method of getting first day of week.

  function firstOfWeek(culture) {
    try {
      var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
      var cldr = locale(culture).cldr
      var territory = cldr.attributes.territory
      var weekData = cldr.get('supplemental').weekData
      var firstDay = weekData.firstDay[territory || '001']
      return days.indexOf(firstDay)
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          'Failed to accurately determine first day of the week.' +
            ' Is supplemental data loaded into CLDR?'
        )
      } // maybe cldr supplemental is not loaded? revert to original method

      var date = new Date() //cldr-data doesn't seem to be zero based

      var localeDay = Math.max(
        parseInt(
          locale(culture).formatDate(date, {
            raw: 'e',
          }),
          10
        ) - 1,
        0
      )
      return Math.abs(date.getDay() - localeDay)
    }
  }

  if (!globalize.load) return (0, _oldGlobalize.default)(globalize)
  return new _localizer.DateLocalizer({
    firstOfWeek,
    formats,

    format(value, format, culture) {
      format =
        typeof format === 'string'
          ? {
              raw: format,
            }
          : format
      return locale(culture).formatDate(value, format)
    },
  })
}
