"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _scrollbarSize = _interopRequireDefault(require("dom-helpers/scrollbarSize"));

var _react = _interopRequireDefault(require("react"));

var TimeSlotUtils = _interopRequireWildcard(require("./utils/TimeSlots"));

var _TimeSlotGroup = _interopRequireDefault(require("./TimeSlotGroup"));

var dates = _interopRequireWildcard(require("./utils/dates"));

var _DateContentRow = _interopRequireDefault(require("./DateContentRow"));

var _Header = _interopRequireDefault(require("./Header"));

var _ResourceHeader = _interopRequireDefault(require("./ResourceHeader"));

var _helpers = require("./utils/helpers");

var _BackgroundWrapper = _interopRequireDefault(require("./BackgroundWrapper"));

var TimeGridRowHeader =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(TimeGridRowHeader, _React$Component);

  function TimeGridRowHeader() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.slotMetrics = TimeSlotUtils.getSlotMetrics(_this.props);
    return _this;
  }

  var _proto = TimeGridRowHeader.prototype;

  _proto.renderHeaderCells = function renderHeaderCells(date) {
    var _this2 = this;

    var _this$props = this.props,
        localizer = _this$props.localizer,
        getDrilldownView = _this$props.getDrilldownView,
        getNow = _this$props.getNow,
        dayProp = _this$props.getters.dayProp,
        _this$props$component = _this$props.components.header,
        HeaderComponent = _this$props$component === void 0 ? _Header.default : _this$props$component;
    var today = getNow();
    var drilldownView = getDrilldownView(date);
    var label = localizer.format(date, 'dayFormat');

    var _dayProp = dayProp(date),
        className = _dayProp.className,
        style = _dayProp.style;

    var header = _react.default.createElement(HeaderComponent, {
      date: date,
      label: label,
      localizer: localizer
    });

    return _react.default.createElement("div", {
      style: style,
      className: (0, _clsx.default)('rbc-header', className, dates.eq(date, today, 'day') && 'rbc-today')
    }, drilldownView ? _react.default.createElement("a", {
      href: "#",
      onClick: function onClick(e) {
        return _this2.handleHeaderClick(date, drilldownView, e);
      }
    }, header) : _react.default.createElement("span", null, header));
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.slotMetrics = this.slotMetrics.update(nextProps);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        max = _this$props2.max,
        rtl = _this$props2.rtl,
        isNow = _this$props2.isNow,
        resource = _this$props2.resource,
        accessors = _this$props2.accessors,
        localizer = _this$props2.localizer,
        _this$props2$getters = _this$props2.getters,
        dayProp = _this$props2$getters.dayProp,
        getters = (0, _objectWithoutPropertiesLoose2.default)(_this$props2$getters, ["dayProp"]),
        _this$props2$componen = _this$props2.components,
        EventContainer = _this$props2$componen.eventContainerWrapper,
        _this$props2$componen2 = _this$props2$componen.timeSlotWrapper,
        Wrapper = _this$props2$componen2 === void 0 ? _BackgroundWrapper.default : _this$props2$componen2,
        components = (0, _objectWithoutPropertiesLoose2.default)(_this$props2$componen, ["eventContainerWrapper", "timeSlotWrapper"]);
    var slotMetrics = this.slotMetrics;

    var _dayProp2 = dayProp(max),
        className = _dayProp2.className,
        style = _dayProp2.style;

    return _react.default.createElement("div", {
      className: "rbc-time-header-content"
    }, _react.default.createElement("div", {
      className: "rbc-row rbc-time-header-cell"
    }, this.renderHeaderCells(max)), _react.default.createElement("div", {
      style: style,
      className: (0, _clsx.default)(className, 'rbc-day-slot', 'rbc-time-header-row')
    }, slotMetrics.groups.map(function (grp, idx) {
      return _react.default.createElement("div", {
        key: idx,
        className: "rbc-timeslot-row-group"
      }, grp.map(function (value, idx) {
        var slotProps = getters ? getters.slotProp(value, resource) : {};
        return _react.default.createElement(Wrapper, {
          key: idx,
          value: value,
          resource: resource
        }, _react.default.createElement("div", (0, _extends2.default)({}, slotProps, {
          className: (0, _clsx.default)('rbc-time-slot', slotProps.className)
        }), idx === 0 && localizer.format(value, 'timeGutterFormat')));
      }));
    })));
  };

  return TimeGridRowHeader;
}(_react.default.Component);

TimeGridRowHeader.propTypes = process.env.NODE_ENV !== "production" ? {
  range: _propTypes.default.array.isRequired,
  events: _propTypes.default.array.isRequired,
  getNow: _propTypes.default.func.isRequired,
  isOverflowing: _propTypes.default.bool,
  rtl: _propTypes.default.bool,
  width: _propTypes.default.number,
  localizer: _propTypes.default.object.isRequired,
  accessors: _propTypes.default.object.isRequired,
  components: _propTypes.default.object.isRequired,
  getters: _propTypes.default.object.isRequired,
  selected: _propTypes.default.object,
  selectable: _propTypes.default.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: _propTypes.default.number,
  onSelectSlot: _propTypes.default.func,
  onSelectEvent: _propTypes.default.func,
  onDoubleClickEvent: _propTypes.default.func,
  onDrillDown: _propTypes.default.func,
  getDrilldownView: _propTypes.default.func.isRequired,
  scrollRef: _propTypes.default.any
} : {};
var _default = TimeGridRowHeader;
exports.default = _default;
module.exports = exports["default"];