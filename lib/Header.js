"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var Header = function Header(_ref) {
  var label = _ref.label;
  return /*#__PURE__*/_react.default.createElement("span", {
    role: "columnheader",
    "aria-sort": "none"
  }, label);
};

var _default = Header;
exports.default = _default;