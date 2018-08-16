'use strict'

exports.__esModule = true

var _VIEWS

var _constants = require('./utils/constants')

var _Month = require('./Month')

var _Month2 = _interopRequireDefault(_Month)

var _Day = require('./Day')

var _Day2 = _interopRequireDefault(_Day)

var _Week = require('./Week')

var _Week2 = _interopRequireDefault(_Week)

var _WorkWeek = require('./WorkWeek')

var _WorkWeek2 = _interopRequireDefault(_WorkWeek)

var _Agenda = require('./Agenda')

var _Agenda2 = _interopRequireDefault(_Agenda)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

var VIEWS = ((_VIEWS = {}),
(_VIEWS[_constants.views.MONTH] = _Month2.default),
(_VIEWS[_constants.views.WEEK] = _Week2.default),
(_VIEWS[_constants.views.WORK_WEEK] = _WorkWeek2.default),
(_VIEWS[_constants.views.DAY] = _Day2.default),
(_VIEWS[_constants.views.AGENDA] = _Agenda2.default),
_VIEWS)

exports.default = VIEWS
module.exports = exports['default']
