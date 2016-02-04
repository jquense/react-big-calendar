'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsDates = require('./utils/dates');

var _utilsDates2 = _interopRequireDefault(_utilsDates);

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _utilsConstants = require('./utils/constants');

var _TimeGrid = require('./TimeGrid');

var _TimeGrid2 = _interopRequireDefault(_TimeGrid);

var Week = _react2['default'].createClass({
  displayName: 'Week',

  propTypes: _TimeGrid2['default'].propTypes,

  render: function render() {
    var date = this.props.date;

    var _Week$range = Week.range(date, this.props);

    var start = _Week$range.start;
    var end = _Week$range.end;

    return _react2['default'].createElement(_TimeGrid2['default'], _extends({}, this.props, { start: start, end: end, eventOffset: 15 }));
  }

});

Week.navigate = function (date, action) {
  switch (action) {
    case _utilsConstants.navigate.PREVIOUS:
      return _utilsDates2['default'].add(date, -1, 'week');

    case _utilsConstants.navigate.NEXT:
      return _utilsDates2['default'].add(date, 1, 'week');

    default:
      return date;
  }
};

Week.range = function (date, _ref) {
  var culture = _ref.culture;

  var firstOfWeek = _localizer2['default'].startOfWeek(culture);
  var start = _utilsDates2['default'].startOf(date, 'week', firstOfWeek);
  var end = _utilsDates2['default'].endOf(date, 'week', firstOfWeek);

  return { start: start, end: end };
};

exports['default'] = Week;
module.exports = exports['default'];