'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsDates = require('../utils/dates');

var _utilsDates2 = _interopRequireDefault(_utilsDates);

var _formats = require('../formats');

var _localizer = require('../localizer');

var dateRangeFormat = function dateRangeFormat(_ref, culture, local) {
  var start = _ref.start;
  var end = _ref.end;
  return local.format(start, 'd', culture) + ' — ' + local.format(end, 'd', culture);
};

var timeRangeFormat = function timeRangeFormat(_ref2, culture, local) {
  var start = _ref2.start;
  var end = _ref2.end;
  return local.format(start, 't', culture) + ' — ' + local.format(end, 't', culture);
};

var weekRangeFormat = function weekRangeFormat(_ref3, culture, local) {
  var start = _ref3.start;
  var end = _ref3.end;
  return local.format(start, 'MMM dd', culture) + ' - ' + local.format(end, _utilsDates2['default'].eq(start, end, 'month') ? 'dd' : 'MMM dd', culture);
};

exports['default'] = function (globalize) {};

var formats = {
  dateFormat: 'dd',
  dayFormat: 'ddd dd/MM',
  weekdayFormat: 'ddd',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,

  timeGutterFormat: 't',

  monthHeaderFormat: 'Y',
  dayHeaderFormat: 'dddd MMM dd',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,

  agendaDateFormat: 'ddd MMM dd',
  agendaTimeFormat: 't',
  agendaTimeRangeFormat: timeRangeFormat
};

exports.formats = formats;

exports['default'] = function (globalize) {

  function getCulture(culture) {
    return culture ? globalize.findClosestCulture(culture) : globalize.culture();
  }

  function firstOfWeek(culture) {
    culture = getCulture(culture);
    return culture && culture.calendar.firstDay || 0;
  }

  _formats.set(formats);

  return _localizer.set({
    firstOfWeek: firstOfWeek,

    parse: function parse(value, format, culture) {
      return globalize.parseDate(value, format, culture);
    },

    format: function format(value, _format, culture) {
      return globalize.format(value, _format, culture);
    }
  });
};