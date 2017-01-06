'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.set = set;
exports.default = format;

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inSame12Hr(start, end) {
  var s = 12 - _dates2.default.hours(start);
  var e = 12 - _dates2.default.hours(end);
  return s <= 0 && e <= 0 || s >= 0 && e >= 0;
}

var dateRangeFormat = function dateRangeFormat(_ref, culture, local) {
  var start = _ref.start;
  var end = _ref.end;
  return local.format(start, 'd', culture) + ' — ' + local.format(end, 'd', culture);
};

var timeRangeFormat = function timeRangeFormat(_ref2, culture, local) {
  var start = _ref2.start;
  var end = _ref2.end;
  return local.format(start, 'h:mmtt', culture) + ' — ' + local.format(end, inSame12Hr(start, end) ? 'h:mm' : 'h:mmtt', culture);
};

var weekRangeFormat = function weekRangeFormat(_ref3, culture, local) {
  var start = _ref3.start;
  var end = _ref3.end;
  return local.format(start, 'MMM dd', culture) + ' - ' + local.format(end, _dates2.default.eq(start, end, 'month') ? 'dd' : 'MMM dd', culture);
};

var formats = {

  dateFormat: 'dd',
  dayFormat: 'ddd dd/MM',
  weekdayFormat: 'ddd',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,

  timeGutterFormat: 'h:mm tt',

  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'dddd MMM dd',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,

  agendaDateFormat: 'ddd MMM dd',
  agendaTimeFormat: 'hh:mm tt',
  agendaTimeRangeFormat: timeRangeFormat
};

function set(_formats) {
  var _formats2;

  if (arguments.length > 1) _formats = (_formats2 = {}, _formats2[_formats] = arguments[1], _formats2);

  _extends(formats, _formats);
}

function format(fmts) {
  return _extends({}, formats, fmts);
}