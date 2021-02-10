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
    local.format(start, 'L', culture) + ' – ' + local.format(end, 'L', culture)
  )
}

var timeRangeFormat = (_ref2, culture, local) => {
  var { start, end } = _ref2
  return (
    local.format(start, 'LT', culture) +
    ' – ' +
    local.format(end, 'LT', culture)
  )
}

var timeRangeStartFormat = (_ref3, culture, local) => {
  var { start } = _ref3
  return local.format(start, 'LT', culture) + ' – '
}

var timeRangeEndFormat = (_ref4, culture, local) => {
  var { end } = _ref4
  return ' – ' + local.format(end, 'LT', culture)
}

var weekRangeFormat = (_ref5, culture, local) => {
  var { start, end } = _ref5
  return (
    local.format(start, 'MMMM DD', culture) +
    ' – ' +
    local.format(end, dates.eq(start, end, 'month') ? 'DD' : 'MMMM DD', culture)
  )
}

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
  agendaTimeRangeFormat: timeRangeFormat,
}
exports.formats = formats

function _default(moment) {
  var locale = (m, c) => (c ? m.locale(c) : m)

  return new _localizer.DateLocalizer({
    formats,

    firstOfWeek(culture) {
      var data = culture ? moment.localeData(culture) : moment.localeData()
      return data ? data.firstDayOfWeek() : 0
    },

    format(value, format, culture) {
      return locale(moment(value), culture).format(format)
    },
  })
}
