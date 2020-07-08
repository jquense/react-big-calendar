'use strict'

exports.__esModule = true
exports.notify = notify
exports.instanceId = instanceId
exports.isFirstFocusedRender = isFirstFocusedRender
var idCount = 0

function uniqueId(prefix) {
  return '' + ((prefix == null ? '' : prefix) + ++idCount)
}

function notify(handler, args) {
  handler && handler.apply(null, [].concat(args))
}

function instanceId(component, suffix) {
  if (suffix === void 0) {
    suffix = ''
  }

  component.__id || (component.__id = uniqueId('rw_'))
  return (component.props.id || component.__id) + suffix
}

function isFirstFocusedRender(component) {
  return (
    component._firstFocus ||
    (component.state.focused && (component._firstFocus = true))
  )
}
