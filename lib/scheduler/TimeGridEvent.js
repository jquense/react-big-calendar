"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _clsx = _interopRequireDefault(require("clsx"));

var _react = _interopRequireDefault(require("react"));

function stringifyPercent(v) {
  return typeof v === 'string' ? v : v + '%';
}
/* eslint-disable react/prop-types */


function TimeGridEvent(props) {
  var style = props.style,
      className = props.className,
      event = props.event,
      accessors = props.accessors,
      selected = props.selected,
      label = props.label,
      continuesEarlier = props.continuesEarlier,
      continuesLater = props.continuesLater,
      getters = props.getters,
      onClick = props.onClick,
      onDoubleClick = props.onDoubleClick,
      _props$components = props.components,
      Event = _props$components.event,
      EventWrapper = _props$components.eventWrapper;
  var title = accessors.title(event);
  var tooltip = accessors.tooltip(event);
  var end = accessors.end(event);
  var start = accessors.start(event);
  var userProps = getters.eventProp(event, start, end, selected);
  var height = style.height,
      top = style.top,
      width = style.width,
      xOffset = style.xOffset;
  var inner = [_react.default.createElement("div", {
    key: "1",
    className: "rbc-event-label"
  }, label), _react.default.createElement("div", {
    key: "2",
    className: "rbc-event-content"
  }, Event ? _react.default.createElement(Event, {
    event: event,
    title: title
  }) : title)];
  return _react.default.createElement(EventWrapper, (0, _extends2.default)({
    type: "time",
    onSchedulerView: true
  }, props), _react.default.createElement("div", {
    onClick: onClick,
    onDoubleClick: onDoubleClick,
    style: (0, _extends2.default)({}, userProps.style, {
      left: stringifyPercent(top),
      width: stringifyPercent(height),
      height: stringifyPercent(width),
      top: stringifyPercent(xOffset)
    }),
    title: tooltip ? (typeof label === 'string' ? label + ': ' : '') + tooltip : undefined,
    className: (0, _clsx.default)('rbc-event', className, userProps.className, {
      'rbc-selected': selected,
      'rbc-event-continues-earlier': continuesEarlier,
      'rbc-event-continues-later': continuesLater
    })
  }, inner));
}

var _default = TimeGridEvent;
exports.default = _default;
module.exports = exports["default"];