'use strict';

exports.__esModule = true;
exports.getDaylightSavingsShift = getDaylightSavingsShift;
exports.isDaylightSavingsSpring = isDaylightSavingsSpring;
exports.isDaylightSavingsFall = isDaylightSavingsFall;

var _dates = require('./dates');

var _dates2 = _interopRequireDefault(_dates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets the timezone offset difference between the start of the given day and
 * the end of the given day. This usually only happens during daylight savings,
 * springing forward/falling back.
 */
function getDaylightSavingsShift(date) {
  var dayStart = _dates2.default.startOf(date, 'day');
  var dayEnd = _dates2.default.endOf(date, 'day');
  return dayStart.getTimezoneOffset() - dayEnd.getTimezoneOffset();
}

/**
 * @param {Date|number} dateOrShift - either a date to check, or a shift value
 * obtained via getDaylightSavingsShift
 */
function isDaylightSavingsSpring(dateOrShift) {
  var shift = dateOrShift instanceof Date ? getDaylightSavingsShift(dateOrShift) : dateOrShift;
  return shift > 0;
}

/**
 * @param {Date|number} dateOrShift - either a date to check, or a shift value
 * obtained via getDaylightSavingsShift
 */
function isDaylightSavingsFall(dateOrShift) {
  var shift = dateOrShift instanceof Date ? getDaylightSavingsShift(dateOrShift) : dateOrShift;
  return shift < 0;
}