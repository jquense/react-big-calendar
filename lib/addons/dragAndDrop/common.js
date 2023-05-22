"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dragAccessors = void 0;
exports.eventTimes = eventTimes;
exports.mergeComponents = mergeComponents;
exports.pointInColumn = pointInColumn;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _accessors = require("../../utils/accessors");

var _react = require("react");

var _excluded = ["children"];
var dragAccessors = {
  start: (0, _accessors.wrapAccessor)(function (e) {
    return e.start;
  }),
  end: (0, _accessors.wrapAccessor)(function (e) {
    return e.end;
  })
};
exports.dragAccessors = dragAccessors;

function nest() {
  for (var _len = arguments.length, Components = new Array(_len), _key = 0; _key < _len; _key++) {
    Components[_key] = arguments[_key];
  }

  var factories = Components.filter(Boolean).map(_react.createFactory);

  var Nest = function Nest(_ref) {
    var children = _ref.children,
        props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    return factories.reduceRight(function (child, factory) {
      return factory(props, child);
    }, children);
  };

  return Nest;
}

function mergeComponents() {
  var components = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var addons = arguments.length > 1 ? arguments[1] : undefined;
  var keys = Object.keys(addons);
  var result = (0, _objectSpread2.default)({}, components);
  keys.forEach(function (key) {
    result[key] = components[key] ? nest(components[key], addons[key]) : addons[key];
  });
  return result;
}

function pointInColumn(bounds, point) {
  var left = bounds.left,
      right = bounds.right,
      top = bounds.top;
  var x = point.x,
      y = point.y;
  return x < right + 10 && x > left && y > top;
}

function eventTimes(event, accessors, localizer) {
  var start = accessors.start(event);
  var end = accessors.end(event);
  var isZeroDuration = localizer.eq(start, end, 'minutes') && localizer.diff(start, end, 'minutes') === 0; // make zero duration midnight events at least one day long

  if (isZeroDuration) end = localizer.add(end, 1, 'day');
  var duration = localizer.diff(start, end, 'milliseconds');
  return {
    start: start,
    end: end,
    duration: duration
  };
}