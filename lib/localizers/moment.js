'use strict';

exports.__esModule = true;
exports.formats = undefined;

exports.default = function (moment) {
  var locale = function locale(m, c) {
    return c ? m.locale(c) : m;
  };

  (0, _formats.set)(formats);

  return (0, _localizer.set)({
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

var _dates = require('../utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _formats = require('../formats');

var _localizer = require('../localizer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dateRangeFormat = function dateRangeFormat(_ref, culture, local) {
  var start = _ref.start,
      end = _ref.end;
  return local.format(start, 'L', culture) + ' — ' + local.format(end, 'L', culture);
};

var timeRangeFormat = function timeRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
      end = _ref2.end;
  return local.format(start, 'LT', culture) + ' — ' + local.format(end, 'LT', culture);
};

var weekRangeFormat = function weekRangeFormat(_ref3, culture, local) {
  var start = _ref3.start,
      end = _ref3.end;
  return local.format(start, 'MMM DD', culture) + ' - ' + local.format(end, _dates2.default.eq(start, end, 'month') ? 'DD' : 'MMM DD', culture);
};

var formats = exports.formats = {
  dateFormat: 'DD',
  dayFormat: 'ddd DD/MM',
  weekdayFormat: 'ddd',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,

  timeGutterFormat: 'LT',

  monthHeaderFormat: 'MMMM YYYY',
  dayHeaderFormat: 'dddd MMM DD',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,

  agendaDateFormat: 'ddd MMM DD',
  agendaTimeFormat: 'LT',
  agendaTimeRangeFormat: timeRangeFormat
};