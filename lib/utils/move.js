'use strict';

exports.__esModule = true;
exports.default = moveDate;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _constants = require('./constants');

var _Views = require('../Views');

var _Views2 = _interopRequireDefault(_Views);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function moveDate(action, date, View) {
  View = typeof View === 'string' ? _Views2.default[View] : View;

  switch (action) {
    case _constants.navigate.TODAY:
      date = new Date();
      break;
    case _constants.navigate.DATE:
      break;
    default:
      !(View && typeof View.navigate === 'function') ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Calendar View components must implement a static `.navigate(date, action)` method.s') : (0, _invariant2.default)(false) : void 0;
      date = View.navigate(date, action);
  }
  return date;
}