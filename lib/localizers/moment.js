'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsDates = require('../utils/dates');

var _utilsDates2 = _interopRequireDefault(_utilsDates);

var _formats = require('../formats');

var _localizer = require('../localizer');

function inSame12Hr(start, end) {
  var s = 12 - _utilsDates2['default'].hours(start);
  var e = 12 - _utilsDates2['default'].hours(end);
  return s <= 0 && e <= 0 || s >= 0 && e >= 0;
}

var dateRangeFormat = function dateRangeFormat(_ref, culture, local) {
  var start = _ref.start;
  var end = _ref.end;
  return local.format(start, 'L', culture) + ' — ' + local.format(end, 'L', culture);
};

var timeRangeFormat = function timeRangeFormat(_ref2, culture, local) {
  var start = _ref2.start;
  var end = _ref2.end;
  return local.format(start, 'h:mma', culture) + ' — ' + local.format(end, inSame12Hr(start, end) ? 'h:mm' : 'h:mma', culture);
};

var weekRangeFormat = function weekRangeFormat(_ref3, culture, local) {
  var start = _ref3.start;
  var end = _ref3.end;
  return local.format(start, 'MMM DD', culture) + ' - ' + local.format(end, _utilsDates2['default'].eq(start, end, 'month') ? 'DD' : 'MMM DD', culture);
};

var formats = {
  dateFormat: 'DD',
  dayFormat: 'ddd DD/MM',
  weekdayFormat: 'ddd',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,

  timeGutterFormat: 'LT',

  monthHeaderFormat: 'MMMM YYYY',
  dayHeaderFormat: 'dddd MMM dd',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,

  agendaDateFormat: 'ddd MMM DD',
  agendaTimeFormat: 'LT',
  agendaTimeRangeFormat: timeRangeFormat
};

exports.formats = formats;

exports['default'] = function (moment) {
  var locale = function locale(m, c) {
    return c ? m.locale(c) : m;
  };

  _formats.set(formats);

  return _localizer.set({

    firstOfWeek: function firstOfWeek(culture) {
      var data = culture ? moment.localeData(culture) : moment.localeData();
      return data ? data.firstDayOfWeek() : 0;
    },

    parse: function parse(value, format, culture) {
      return locale(moment(value, format), culture).toDate();
    },

    format: function format(value, _format, culture) {
      return locale(moment(value), culture).format(_format);
    }
  });
};