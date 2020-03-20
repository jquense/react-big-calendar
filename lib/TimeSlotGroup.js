"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _BackgroundWrapper = _interopRequireDefault(require("./BackgroundWrapper"));

var TimeSlotGroup =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(TimeSlotGroup, _Component);

  function TimeSlotGroup() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = TimeSlotGroup.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        renderSlot = _this$props.renderSlot,
        resource = _this$props.resource,
        group = _this$props.group,
        getters = _this$props.getters,
        _this$props$component = _this$props.components;
    _this$props$component = _this$props$component === void 0 ? {} : _this$props$component;
    var _this$props$component2 = _this$props$component.timeSlotWrapper,
        Wrapper = _this$props$component2 === void 0 ? _BackgroundWrapper.default : _this$props$component2;
    return _react.default.createElement("div", {
      className: "rbc-timeslot-group"
    }, group.map(function (value, idx) {
      var slotProps = getters ? getters.slotProp(value, resource) : {};
      return _react.default.createElement(Wrapper, {
        key: idx,
        value: value,
        resource: resource
      }, _react.default.createElement("div", (0, _extends2.default)({}, slotProps, {
        className: (0, _clsx.default)('rbc-time-slot', slotProps.className)
      }), renderSlot && renderSlot(value, idx)));
    }));
  };

  return TimeSlotGroup;
}(_react.Component);

exports.default = TimeSlotGroup;
TimeSlotGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  renderSlot: _propTypes.default.func,
  group: _propTypes.default.array.isRequired,
  resource: _propTypes.default.any,
  components: _propTypes.default.object,
  getters: _propTypes.default.object
} : {};
module.exports = exports["default"];