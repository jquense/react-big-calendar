'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.mergeComponents = mergeComponents
exports.pointInColumn = pointInColumn
exports.eventTimes = eventTimes
exports.dragAccessors = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutPropertiesLoose')
)

var _accessors = require('../../utils/accessors')

var _react = require('react')

var dates = _interopRequireWildcard(require('../../utils/dates'))

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null
  var cacheBabelInterop = new WeakMap()
  var cacheNodeInterop = new WeakMap()
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop
  })(nodeInterop)
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return { default: obj }
  }
  var cache = _getRequireWildcardCache(nodeInterop)
  if (cache && cache.has(obj)) {
    return cache.get(obj)
  }
  var newObj = {}
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc)
      } else {
        newObj[key] = obj[key]
      }
    }
  }
  newObj.default = obj
  if (cache) {
    cache.set(obj, newObj)
  }
  return newObj
}

var dragAccessors = {
  start: (0, _accessors.wrapAccessor)(function(e) {
    return e.start
  }),
  end: (0, _accessors.wrapAccessor)(function(e) {
    return e.end
  }),
}
exports.dragAccessors = dragAccessors

function nest() {
  for (
    var _len = arguments.length, Components = new Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    Components[_key] = arguments[_key]
  }

  var factories = Components.filter(Boolean).map(_react.createFactory)

  var Nest = function Nest(_ref) {
    var children = _ref.children,
      props = (0, _objectWithoutPropertiesLoose2.default)(_ref, ['children'])
    return factories.reduceRight(function(child, factory) {
      return factory(props, child)
    }, children)
  }

  return Nest
}

function mergeComponents(components, addons) {
  if (components === void 0) {
    components = {}
  }

  var keys = Object.keys(addons)
  var result = (0, _extends2.default)({}, components)
  keys.forEach(function(key) {
    result[key] = components[key]
      ? nest(components[key], addons[key])
      : addons[key]
  })
  return result
}

function pointInColumn(bounds, point) {
  var left = bounds.left,
    right = bounds.right,
    top = bounds.top
  var x = point.x,
    y = point.y
  return x < right + 10 && x > left && y > top
}

function eventTimes(event, accessors) {
  var start = accessors.start(event)
  var end = accessors.end(event)
  var isZeroDuration =
    dates.eq(start, end, 'minutes') && start.getMinutes() === 0 // make zero duration midnight events at least one day long

  if (isZeroDuration) end = dates.add(end, 1, 'day')
  var duration = dates.diff(end, start, 'milliseconds')
  return {
    start: start,
    end: end,
    duration: duration,
  }
}
