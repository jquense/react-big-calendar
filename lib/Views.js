'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _constants = require('./utils/constants')

var _Month = _interopRequireDefault(require('./Month'))

var _Day = _interopRequireDefault(require('./Day'))

var _Week = _interopRequireDefault(require('./Week'))

var _WorkWeek = _interopRequireDefault(require('./WorkWeek'))

var _Agenda = _interopRequireDefault(require('./Agenda'))

var _VIEWS

var VIEWS = ((_VIEWS = {}),
(_VIEWS[_constants.views.MONTH] = _Month.default),
(_VIEWS[_constants.views.WEEK] = _Week.default),
(_VIEWS[_constants.views.WORK_WEEK] = _WorkWeek.default),
(_VIEWS[_constants.views.DAY] = _Day.default),
(_VIEWS[_constants.views.AGENDA] = _Agenda.default),
_VIEWS)
var _default = VIEWS
exports.default = _default
module.exports = exports['default']
