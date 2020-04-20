"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var dates = _interopRequireWildcard(require("./utils/dates"));

var _constants = require("./utils/constants");

var _TimeGrid = _interopRequireDefault(require("./TimeGrid"));

var Day =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(Day, _React$Component);

  function Day() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Day.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        date = _this$props.date,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["date"]);
    var range = Day.range(date);
    return _react.default.createElement(_TimeGrid.default, (0, _extends2.default)({}, props, {
      range: range,
      eventOffset: 10
    }));
  };

  return Day;
}(_react.default.Component);

Day.propTypes = process.env.NODE_ENV !== "production" ? {
  date: _propTypes.default.instanceOf(Date).isRequired
} : {};

Day.range = function (date) {
  return [dates.startOf(date, 'day')];
};

Day.navigate = function (date, action) {
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return dates.add(date, -1, 'day');

    case _constants.navigate.NEXT:
      return dates.add(date, 1, 'day');

    default:
      return date;
  }
};

Day.title = function (date, _ref) {
  var localizer = _ref.localizer;
  return localizer.format(date, 'dayHeaderFormat');
};

var _default = Day;
exports.default = _default;
module.exports = exports["default"];