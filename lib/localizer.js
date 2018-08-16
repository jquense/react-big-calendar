'use strict'

exports.__esModule = true
exports.mergeWithDefaults = exports.DateLocalizer = undefined

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _invariant = require('invariant')

var _invariant2 = _interopRequireDefault(_invariant)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

var localePropType = _propTypes2.default.oneOfType([
  _propTypes2.default.string,
  _propTypes2.default.func,
])

function _format(localizer, formatter, value, format, culture) {
  var result =
    typeof format === 'function'
      ? format(value, culture, localizer)
      : formatter.call(localizer, value, format, culture)

  !(result == null || typeof result === 'string')
    ? process.env.NODE_ENV !== 'production'
      ? (0, _invariant2.default)(
          false,
          '`localizer format(..)` must return a string, null, or undefined'
        )
      : (0, _invariant2.default)(false)
    : void 0

  return result
}

var DateLocalizer = (exports.DateLocalizer = function DateLocalizer(spec) {
  var _this = this

  _classCallCheck(this, DateLocalizer)

  !(typeof spec.format === 'function')
    ? process.env.NODE_ENV !== 'production'
      ? (0, _invariant2.default)(
          false,
          'date localizer `format(..)` must be a function'
        )
      : (0, _invariant2.default)(false)
    : void 0
  !(typeof spec.firstOfWeek === 'function')
    ? process.env.NODE_ENV !== 'production'
      ? (0, _invariant2.default)(
          false,
          'date localizer `firstOfWeek(..)` must be a function'
        )
      : (0, _invariant2.default)(false)
    : void 0

  this.propType = spec.propType || localePropType

  this.startOfWeek = spec.firstOfWeek
  this.formats = spec.formats
  this.format = function() {
    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    return _format.apply(undefined, [_this, spec.format].concat(args))
  }
})

function mergeWithDefaults(localizer, culture, formatOverrides, messages) {
  var formats = _extends({}, localizer.formats, formatOverrides)

  return _extends({}, localizer, {
    messages: messages,
    startOfWeek: function startOfWeek() {
      return localizer.startOfWeek(culture)
    },
    format: function format(value, _format2) {
      return localizer.format(value, formats[_format2] || _format2, culture)
    },
  })
}
exports.mergeWithDefaults = mergeWithDefaults
