'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.views = exports.dateRangeFormat = exports.dateFormat = exports.accessor = exports.eventComponent = void 0

var _propTypes = _interopRequireDefault(require('prop-types'))

var _elementType = _interopRequireDefault(
  require('prop-types-extra/lib/elementType')
)

exports.elementType = _elementType.default

var _all = _interopRequireDefault(require('prop-types-extra/lib/all'))

var _constants = require('./constants')

var eventComponent = _propTypes.default.oneOfType([
  _elementType.default,
  _propTypes.default.shape({
    month: _elementType.default,
    week: _elementType.default,
    day: _elementType.default,
    agenda: _elementType.default,
  }),
])

exports.eventComponent = eventComponent
var viewNames = Object.keys(_constants.views).map(function(k) {
  return _constants.views[k]
})

var accessor = _propTypes.default.oneOfType([
  _propTypes.default.string,
  _propTypes.default.func,
])

exports.accessor = accessor
var dateFormat = _propTypes.default.any
exports.dateFormat = dateFormat
var dateRangeFormat = _propTypes.default.func
/**
 * accepts either an array of builtin view names:
 *
 * ```
 * views={['month', 'day', 'agenda']}
 * ```
 *
 * or an object hash of the view name and the component (or boolean for builtin)
 *
 * ```
 * views={{
 *   month: true,
 *   week: false,
 *   workweek: WorkWeekViewComponent,
 * }}
 * ```
 */

exports.dateRangeFormat = dateRangeFormat

var views = _propTypes.default.oneOfType([
  _propTypes.default.arrayOf(_propTypes.default.oneOf(viewNames)),
  (0, _all.default)(_propTypes.default.object, function(props, name) {
    for (
      var _len = arguments.length,
        args = new Array(_len > 2 ? _len - 2 : 0),
        _key = 2;
      _key < _len;
      _key++
    ) {
      args[_key - 2] = arguments[_key]
    }

    var prop = props[name],
      err
    Object.keys(prop).every(function(key) {
      var isBuiltinView =
        viewNames.indexOf(key) !== -1 && typeof prop[key] === 'boolean'
      return (
        isBuiltinView ||
        !(err = _elementType.default.apply(void 0, [prop, key].concat(args)))
      )
    })
    return err || null
  }),
])

exports.views = views
