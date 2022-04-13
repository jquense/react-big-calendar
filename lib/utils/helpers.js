"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instanceId = instanceId;
exports.isFirstFocusedRender = isFirstFocusedRender;
exports.notify = notify;
var idCount = 0;

function uniqueId(prefix) {
  return '' + ((prefix == null ? '' : prefix) + ++idCount);
}

function notify(handler, args) {
  handler && handler.apply(null, [].concat(args));
}

function instanceId(component) {
  var suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  component.__id || (component.__id = uniqueId('rw_'));
  return (component.props.id || component.__id) + suffix;
}

function isFirstFocusedRender(component) {
  return component._firstFocus || component.state.focused && (component._firstFocus = true);
}