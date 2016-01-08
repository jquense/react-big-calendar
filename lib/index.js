'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _localizer = require('./localizer');

var _localizersMoment = require('./localizers/moment');

var _localizersMoment2 = _interopRequireDefault(_localizersMoment);

var _localizersGlobalize = require('./localizers/globalize');

var _localizersGlobalize2 = _interopRequireDefault(_localizersGlobalize);

var _utilsViewLabel = require('./utils/viewLabel');

var _utilsViewLabel2 = _interopRequireDefault(_utilsViewLabel);

var _utilsMove = require('./utils/move');

var _utilsMove2 = _interopRequireDefault(_utilsMove);

var _utilsConstants = require('./utils/constants');

_extends(_Calendar2['default'], {
  setLocalizer: _localizer.set,
  globalizeLocalizer: _localizersGlobalize2['default'],
  momentLocalizer: _localizersMoment2['default'],
  label: _utilsViewLabel2['default'],
  views: _utilsConstants.views,
  move: _utilsMove2['default']
});

exports['default'] = _Calendar2['default'];
module.exports = exports['default'];