'use strict'

exports.__esModule = true

var _typeof =
  typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
    ? function(obj) {
        return typeof obj
      }
    : function(obj) {
        return obj &&
          typeof Symbol === 'function' &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj
      }

exports.accessor = accessor
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
    (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' &&
    data != null &&
    field in data
  )
    value = data[field]

  return value
}
