"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _constants = require("./utils/constants");

var _Month = _interopRequireDefault(require("./Month"));

var _Day = _interopRequireDefault(require("./Day"));

var _Week = _interopRequireDefault(require("./Week"));

var _WorkWeek = _interopRequireDefault(require("./WorkWeek"));

var _Agenda = _interopRequireDefault(require("./Agenda"));

var _VIEWS;

var VIEWS = (_VIEWS = {}, (0, _defineProperty2.default)(_VIEWS, _constants.views.MONTH, _Month.default), (0, _defineProperty2.default)(_VIEWS, _constants.views.WEEK, _Week.default), (0, _defineProperty2.default)(_VIEWS, _constants.views.WORK_WEEK, _WorkWeek.default), (0, _defineProperty2.default)(_VIEWS, _constants.views.DAY, _Day.default), (0, _defineProperty2.default)(_VIEWS, _constants.views.AGENDA, _Agenda.default), _VIEWS);
var _default = VIEWS;
exports.default = _default;