'use strict'

var _interopRequireDefault =
  require('@babel/runtime/helpers/interopRequireDefault').default
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
)
var _constants = require('./utils/constants')
var _Month = _interopRequireDefault(require('./Month'))
var _Day = _interopRequireDefault(require('./Day'))
var _Week = _interopRequireDefault(require('./Week'))
var _WorkWeek = _interopRequireDefault(require('./WorkWeek'))
var _Agenda = _interopRequireDefault(require('./Agenda'))
var VIEWS = (0, _defineProperty2.default)(
  (0, _defineProperty2.default)(
    (0, _defineProperty2.default)(
      (0, _defineProperty2.default)(
        (0, _defineProperty2.default)(
          {},
          _constants.views.MONTH,
          _Month.default
        ),
        _constants.views.WEEK,
        _Week.default
      ),
      _constants.views.WORK_WEEK,
      _WorkWeek.default
    ),
    _constants.views.DAY,
    _Day.default
  ),
  _constants.views.AGENDA,
  _Agenda.default
)
var _default = (exports.default = VIEWS)
