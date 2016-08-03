'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _localizer = require('./localizer');

var _moment = require('./localizers/moment');

var _moment2 = _interopRequireDefault(_moment);

var _globalize = require('./localizers/globalize');

var _globalize2 = _interopRequireDefault(_globalize);

var _viewLabel = require('./utils/viewLabel');

var _viewLabel2 = _interopRequireDefault(_viewLabel);

var _move = require('./utils/move');

var _move2 = _interopRequireDefault(_move);

var _constants = require('./utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_extends(_Calendar2.default, {
  setLocalizer: _localizer.set,
  globalizeLocalizer: _globalize2.default,
  momentLocalizer: _moment2.default,
  label: _viewLabel2.default,
  views: _constants.views,
  move: _move2.default
});

exports.default = _Calendar2.default;
module.exports = exports['default'];