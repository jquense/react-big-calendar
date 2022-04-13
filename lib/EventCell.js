"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _react = _interopRequireDefault(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _excluded = ["style", "className", "event", "selected", "isAllDay", "onSelect", "onDoubleClick", "onKeyPress", "localizer", "continuesPrior", "continuesAfter", "accessors", "getters", "children", "components", "slotStart", "slotEnd"];

var EventCell = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(EventCell, _React$Component);

  var _super = (0, _createSuper2.default)(EventCell);

  function EventCell() {
    (0, _classCallCheck2.default)(this, EventCell);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(EventCell, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          style = _this$props.style,
          className = _this$props.className,
          event = _this$props.event,
          selected = _this$props.selected,
          isAllDay = _this$props.isAllDay,
          onSelect = _this$props.onSelect,
          _onDoubleClick = _this$props.onDoubleClick,
          _onKeyPress = _this$props.onKeyPress,
          localizer = _this$props.localizer,
          continuesPrior = _this$props.continuesPrior,
          continuesAfter = _this$props.continuesAfter,
          accessors = _this$props.accessors,
          getters = _this$props.getters,
          children = _this$props.children,
          _this$props$component = _this$props.components,
          Event = _this$props$component.event,
          EventWrapper = _this$props$component.eventWrapper,
          slotStart = _this$props.slotStart,
          slotEnd = _this$props.slotEnd,
          props = (0, _objectWithoutProperties2.default)(_this$props, _excluded);
      delete props.resizable;
      var title = accessors.title(event);
      var tooltip = accessors.tooltip(event);
      var end = accessors.end(event);
      var start = accessors.start(event);
      var allDay = accessors.allDay(event);
      var showAsAllDay = isAllDay || allDay || localizer.diff(start, localizer.ceil(end, 'day'), 'day') > 1;
      var userProps = getters.eventProp(event, start, end, selected);

      var content = /*#__PURE__*/_react.default.createElement("div", {
        className: "rbc-event-content",
        title: tooltip || undefined
      }, Event ? /*#__PURE__*/_react.default.createElement(Event, {
        event: event,
        continuesPrior: continuesPrior,
        continuesAfter: continuesAfter,
        title: title,
        isAllDay: allDay,
        localizer: localizer,
        slotStart: slotStart,
        slotEnd: slotEnd
      }) : title);

      return /*#__PURE__*/_react.default.createElement(EventWrapper, Object.assign({}, this.props, {
        type: "date"
      }), /*#__PURE__*/_react.default.createElement("div", Object.assign({}, props, {
        tabIndex: 0,
        style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, userProps.style), style),
        className: (0, _clsx.default)('rbc-event', className, userProps.className, {
          'rbc-selected': selected,
          'rbc-event-allday': showAsAllDay,
          'rbc-event-continues-prior': continuesPrior,
          'rbc-event-continues-after': continuesAfter
        }),
        onClick: function onClick(e) {
          return onSelect && onSelect(event, e);
        },
        onDoubleClick: function onDoubleClick(e) {
          return _onDoubleClick && _onDoubleClick(event, e);
        },
        onKeyPress: function onKeyPress(e) {
          return _onKeyPress && _onKeyPress(event, e);
        }
      }), typeof children === 'function' ? children(content) : content));
    }
  }]);
  return EventCell;
}(_react.default.Component);

var _default = EventCell;
exports.default = _default;