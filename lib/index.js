'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _EventWrapper = require('./EventWrapper');

var _EventWrapper2 = _interopRequireDefault(_EventWrapper);

var _BackgroundWrapper = require('./BackgroundWrapper');

var _BackgroundWrapper2 = _interopRequireDefault(_BackgroundWrapper);

var _localizer = require('./localizer');

var _moment = require('./localizers/moment');

var _moment2 = _interopRequireDefault(_moment);

var _globalize = require('./localizers/globalize');

var _globalize2 = _interopRequireDefault(_globalize);

var _move = require('./utils/move');

var _move2 = _interopRequireDefault(_move);

var _constants = require('./utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_extends(_Calendar2.default, {
  setLocalizer: _localizer.set,
  globalizeLocalizer: _globalize2.default,
  momentLocalizer: _moment2.default,
  Views: _constants.views,
  Navigate: _constants.navigate,
  move: _move2.default,
  components: {
    eventWrapper: _EventWrapper2.default,
    dayWrapper: _BackgroundWrapper2.default,
    dateCellWrapper: _BackgroundWrapper2.default
  }
});

exports.default = _Calendar2.default;
module.exports = exports['default'];