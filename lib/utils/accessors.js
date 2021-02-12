'use strict'

exports.__esModule = true
exports.accessor = accessor
exports.wrapAccessor = void 0

/**
 * Retrieve via an accessor-like property
 *
 *    accessor(obj, 'name')   // => retrieves obj['name']
 *    accessor(data, func)    // => retrieves func(data)
 *    ... otherwise null
 */
function accessor(data, field) {
  var value = null
  if (typeof field === 'function') value = field(data)
  else if (
    typeof field === 'string' &&
    typeof data === 'object' &&
    data != null &&
    field in data
  )
    value = data[field]
  return value
}

var wrapAccessor = function wrapAccessor(acc) {
  return function(data) {
    return accessor(data, acc)
  }
}

exports.wrapAccessor = wrapAccessor
