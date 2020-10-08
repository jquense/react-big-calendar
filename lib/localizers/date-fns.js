'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

exports.__esModule = true
exports.default = exports.formats = void 0

var dates = _interopRequireWildcard(require('../utils/dates'))

var _localizer = require('../localizer')

var dateRangeFormat = function dateRangeFormat(_ref, culture, local) {
  var start = _ref.start,
    end = _ref.end
  return (
    local.format(start, 'P', culture) +
    ' \u2013 ' +
    local.format(end, 'P', culture)
  )
}

var timeRangeFormat = function timeRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
    end = _ref2.end
  return (
    local.format(start, 'p', culture) +
    ' \u2013 ' +
    local.format(end, 'p', culture)
  )
}

var timeRangeStartFormat = function timeRangeStartFormat(
  _ref3,
  culture,
  local
) {
  var start = _ref3.start
  return local.format(start, 'h:mma', culture) + ' \u2013 '
}

var timeRangeEndFormat = function timeRangeEndFormat(_ref4, culture, local) {
  var end = _ref4.end
  return ' \u2013 ' + local.format(end, 'h:mma', culture)
}

var weekRangeFormat = function weekRangeFormat(_ref5, culture, local) {
  var start = _ref5.start,
    end = _ref5.end
  return (
    local.format(start, 'MMMM dd', culture) +
    ' \u2013 ' +
    local.format(end, dates.eq(start, end, 'month') ? 'dd' : 'MMMM dd', culture)
  )
}

var formats = {
  dateFormat: 'dd',
  dayFormat: 'dd eee',
  weekdayFormat: 'cccc',
  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,
  timeGutterFormat: 'p',
  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'cccc MMM dd',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,
  agendaDateFormat: 'ccc MMM dd',
  agendaTimeFormat: 'p',
  agendaTimeRangeFormat: timeRangeFormat,
}
exports.formats = formats

var dateFnsLocalizer = function dateFnsLocalizer(_ref6) {
  var startOfWeek = _ref6.startOfWeek,
    getDay = _ref6.getDay,
    _format = _ref6.format,
    locales = _ref6.locales
  return new _localizer.DateLocalizer({
    formats: formats,
    firstOfWeek: function firstOfWeek(culture) {
      return getDay(
        startOfWeek(new Date(), {
          locale: locales[culture],
        })
      )
    },
    format: function format(value, formatString, culture) {
      return _format(new Date(value), formatString, {
        locale: locales[culture],
      })
    },
  })
}

var _default = dateFnsLocalizer
exports.default = _default
