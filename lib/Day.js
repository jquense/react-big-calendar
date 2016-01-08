'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsDates = require('./utils/dates');

var _utilsDates2 = _interopRequireDefault(_utilsDates);

var _TimeGrid = require('./TimeGrid');

var _TimeGrid2 = _interopRequireDefault(_TimeGrid);

var _utilsConstants = require('./utils/constants');

var Day = _react2['default'].createClass({
  displayName: 'Day',

  propTypes: _TimeGrid2['default'].propTypes,

  render: function render() {
    var date = this.props.date;

    var _Day$range = Day.range(date);

    var start = _Day$range.start;
    var end = _Day$range.end;

    return _react2['default'].createElement(_TimeGrid2['default'], _extends({}, this.props, { start: start, end: end, eventOffset: 10 }));
  }
});

Day.navigate = function (date, action) {
  switch (action) {
    case _utilsConstants.navigate.PREVIOUS:
      return _utilsDates2['default'].add(date, -1, 'day');

    case _utilsConstants.navigate.NEXT:
      return _utilsDates2['default'].add(date, 1, 'day');

    default:
      return date;
  }
};

Day.range = function (date) {
  date = _utilsDates2['default'].startOf(date, 'day');
  return { start: date, end: date };
};

exports['default'] = Day;
module.exports = exports['default'];