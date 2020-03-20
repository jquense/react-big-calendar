"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var Header = function Header(_ref) {
  var label = _ref.label;
  return _react.default.createElement("span", null, label);
};

Header.propTypes = process.env.NODE_ENV !== "production" ? {
  label: _propTypes.default.node
} : {};
var _default = Header;
exports.default = _default;
module.exports = exports["default"];