'use strict';

exports.__esModule = true;
exports.default = moveDate;

var _constants = require('./constants');

var _Views = require('../Views');

var _Views2 = _interopRequireDefault(_Views);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function moveDate(action, date, view) {
  switch (action) {
    case _constants.navigate.TODAY:
      date = new Date();
      break;
    case _constants.navigate.DATE:
      break;
    default:
      date = _Views2.default[view].navigate(date, action);
  }

  return date;
}
module.exports = exports['default'];