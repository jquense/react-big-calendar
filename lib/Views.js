'use strict';

exports.__esModule = true;

var _VIEWS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsConstants = require('./utils/constants');

var _Month = require('./Month');

var _Month2 = _interopRequireDefault(_Month);

var _Day = require('./Day');

var _Day2 = _interopRequireDefault(_Day);

var _Week = require('./Week');

var _Week2 = _interopRequireDefault(_Week);

var _Agenda = require('./Agenda');

var _Agenda2 = _interopRequireDefault(_Agenda);

var VIEWS = (_VIEWS = {}, _VIEWS[_utilsConstants.views.MONTH] = _Month2['default'], _VIEWS[_utilsConstants.views.WEEK] = _Week2['default'], _VIEWS[_utilsConstants.views.DAY] = _Day2['default'], _VIEWS[_utilsConstants.views.AGENDA] = _Agenda2['default'], _VIEWS);

exports['default'] = VIEWS;
module.exports = exports['default'];