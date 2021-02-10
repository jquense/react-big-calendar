'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

exports.__esModule = true
exports.default = _default
exports.formats = void 0

var dates = _interopRequireWildcard(require('../utils/dates'))

var _localizer = require('../localizer')

var dateRangeFormat = (_ref, culture, local) => {
  var { start, end } = _ref
  return (
    local.format(start, 'd', culture) + ' – ' + local.format(end, 'd', culture)
  )
}

var timeRangeFormat = (_ref2, culture, local) => {
  var { start, end } = _ref2
  return (
    local.format(start, 't', culture) + ' – ' + local.format(end, 't', culture)
  )
}

var timeRangeStartFormat = (_ref3, culture, local) => {
  var { start } = _ref3
  return local.format(start, 't', culture) + ' – '
}

var timeRangeEndFormat = (_ref4, culture, local) => {
  var { end } = _ref4
  return ' – ' + local.format(end, 't', culture)
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
  dayFormat: 'ddd dd/MM',
  weekdayFormat: 'ddd',
  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,
  timeGutterFormat: 't',
  monthHeaderFormat: 'Y',
  dayHeaderFormat: 'dddd MMM dd',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,
  agendaDateFormat: 'ddd MMM dd',
  agendaTimeFormat: 't',
  agendaTimeRangeFormat: timeRangeFormat,
}
exports.formats = formats

function _default(globalize) {
  function getCulture(culture) {
    return culture ? globalize.findClosestCulture(culture) : globalize.culture()
  }

  function firstOfWeek(culture) {
    culture = getCulture(culture)
    return (culture && culture.calendar.firstDay) || 0
  }

  return new _localizer.DateLocalizer({
    firstOfWeek,
    formats,

    format(value, format, culture) {
      return globalize.format(value, format, culture)
    },
  })
}
