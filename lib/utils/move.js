"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = moveDate;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _invariant = _interopRequireDefault(require("invariant"));

var _constants = require("./constants");

var _Views = _interopRequireDefault(require("../Views"));

var _excluded = ["action", "date", "today"];

function moveDate(View, _ref) {
  var action = _ref.action,
      date = _ref.date,
      today = _ref.today,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  View = typeof View === 'string' ? _Views.default[View] : View;

  switch (action) {
    case _constants.navigate.TODAY:
      date = today || new Date();
      break;

    case _constants.navigate.DATE:
      break;

    default:
      (0, _invariant.default)(View && typeof View.navigate === 'function', 'Calendar View components must implement a static `.navigate(date, action)` method.s');
      date = View.navigate(date, action, props);
  }

  return date;
}