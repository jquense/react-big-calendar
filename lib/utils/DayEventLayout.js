'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.getStyledEvents = getStyledEvents

var _overlap = _interopRequireDefault(require('./layout-algorithms/overlap'))

var _noOverlap = _interopRequireDefault(
  require('./layout-algorithms/no-overlap')
)

/*eslint no-unused-vars: "off"*/
var DefaultAlgorithms = {
  overlap: _overlap.default,
  'no-overlap': _noOverlap.default,
}

function isFunction(a) {
  return !!(a && a.constructor && a.call && a.apply)
} //

function getStyledEvents(_ref) {
  var {
    events,
    minimumStartDifference,
    slotMetrics,
    accessors,
    dayLayoutAlgorithm, // one of DefaultAlgorithms keys
    // or custom function
  } = _ref
  var algorithm = dayLayoutAlgorithm
  if (dayLayoutAlgorithm in DefaultAlgorithms)
    algorithm = DefaultAlgorithms[dayLayoutAlgorithm]

  if (!isFunction(algorithm)) {
    // invalid algorithm
    return []
  }

  return algorithm.apply(this, arguments)
}
