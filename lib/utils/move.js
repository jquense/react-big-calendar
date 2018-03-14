'use strict'

exports.__esModule = true
exports.default = moveDate

var _invariant = require('invariant')

var _invariant2 = _interopRequireDefault(_invariant)

var _constants = require('./constants')

var _Views = require('../Views')

var _Views2 = _interopRequireDefault(_Views)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _objectWithoutProperties(obj, keys) {
  var target = {}
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    target[i] = obj[i]
  }
  return target
}

function moveDate(View, _ref) {
  var action = _ref.action,
    date = _ref.date,
    today = _ref.today,
    props = _objectWithoutProperties(_ref, ['action', 'date', 'today'])

  View = typeof View === 'string' ? _Views2.default[View] : View

  switch (action) {
    case _constants.navigate.TODAY:
      date = today || new Date()
      break
    case _constants.navigate.DATE:
      break
    default:
      !(View && typeof View.navigate === 'function')
        ? process.env.NODE_ENV !== 'production'
          ? (0, _invariant2.default)(
              false,
              'Calendar View components must implement a static `.navigate(date, action)` method.s'
            )
          : (0, _invariant2.default)(false)
        : void 0
      date = View.navigate(date, action, props)
  }
  return date
}
module.exports = exports['default']
