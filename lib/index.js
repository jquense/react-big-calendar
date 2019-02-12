'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _Calendar = _interopRequireDefault(require('./Calendar'))

var _EventWrapper = _interopRequireDefault(require('./EventWrapper'))

var _BackgroundWrapper = _interopRequireDefault(require('./BackgroundWrapper'))

var _moment = _interopRequireDefault(require('./localizers/moment'))

var _globalize = _interopRequireDefault(require('./localizers/globalize'))

var _move = _interopRequireDefault(require('./utils/move'))

var _constants = require('./utils/constants')

;(0, _extends2.default)(_Calendar.default, {
  globalizeLocalizer: _globalize.default,
  momentLocalizer: _moment.default,
  Views: _constants.views,
  Navigate: _constants.navigate,
  move: _move.default,
  components: {
    eventWrapper: _EventWrapper.default,
    dayWrapper: _BackgroundWrapper.default,
    dateCellWrapper: _BackgroundWrapper.default,
  },
})
var _default = _Calendar.default
exports.default = _default
module.exports = exports['default']
