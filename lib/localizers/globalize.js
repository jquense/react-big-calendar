'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsDates = require('../utils/dates');

var _utilsDates2 = _interopRequireDefault(_utilsDates);

var _oldGlobalize = require('./oldGlobalize');

var _oldGlobalize2 = _interopRequireDefault(_oldGlobalize);

var _formats = require('../formats');

var _localizer = require('../localizer');

var dateRangeFormat = function dateRangeFormat(_ref, culture, local) {
  var start = _ref.start;
  var end = _ref.end;
  return local.format(start, { date: 'short' }, culture) + ' — ' + local.format(end, { date: 'short' }, culture);
};

var timeRangeFormat = function timeRangeFormat(_ref2, culture, local) {
  var start = _ref2.start;
  var end = _ref2.end;
  return local.format(start, { time: 'short' }, culture) + ' — ' + local.format(end, { time: 'short' }, culture);
};

var weekRangeFormat = function weekRangeFormat(_ref3, culture, local) {
  var start = _ref3.start;
  var end = _ref3.end;
  return local.format(start, 'MMM dd', culture) + ' — ' + local.format(end, _utilsDates2['default'].eq(start, end, 'month') ? 'dd' : 'MMM dd', culture);
};

var formats = {
  dateFormat: 'dd',
  dayFormat: 'eee dd/MM',
  weekdayFormat: 'eee',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,

  timeGutterFormat: { time: 'short' },

  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'eeee MMM dd',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,

  agendaDateFormat: 'eee MMM dd',
  agendaTimeFormat: { time: 'short' },
  agendaTimeRangeFormat: timeRangeFormat
};

exports.formats = formats;

exports['default'] = function (globalize) {
  var locale = function locale(culture) {
    return culture ? globalize(culture) : globalize;
  };

  function firstOfWeek(culture) {
    var date = new Date();
    //cldr-data doesn't seem to be zero based
    var localeDay = Math.max(parseInt(locale(culture).formatDate(date, { raw: 'e' }), 10) - 1, 0);

    return Math.abs(date.getDay() - localeDay);
  }

  if (!globalize.load) return _oldGlobalize2['default'](globalize);

  _formats.set(formats);

  return _localizer.set({
    firstOfWeek: firstOfWeek,

    parse: function parse(value, format, culture) {
      format = typeof format === 'string' ? { raw: format } : format;
      return locale(culture).parseDate(value, format);
    },

    format: function format(value, _format, culture) {
      _format = typeof _format === 'string' ? { raw: _format } : _format;
      return locale(culture).formatDate(value, _format);
    }
  });
};