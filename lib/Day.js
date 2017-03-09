'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _TimeGrid = require('./TimeGrid');

var _TimeGrid2 = _interopRequireDefault(_TimeGrid);

var _constants = require('./utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Day = _react2.default.createClass({
  displayName: 'Day',


  propTypes: {
    date: _react2.default.PropTypes.instanceOf(Date).isRequired
  },

  render: function render() {
    var _props = this.props,
        date = _props.date,
        props = _objectWithoutProperties(_props, ['date']);

    var _Day$range = Day.range(date),
        start = _Day$range.start,
        end = _Day$range.end;

    return _react2.default.createElement(_TimeGrid2.default, _extends({}, props, { start: start, end: end, eventOffset: 10 }));
  }
});

Day.navigate = function (date, action) {
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return _dates2.default.add(date, -1, 'day');

    case _constants.navigate.NEXT:
      return _dates2.default.add(date, 1, 'day');

    default:
      return date;
  }
};

Day.range = function (date) {
  date = _dates2.default.startOf(date, 'day');
  return { start: date, end: date };
};

exports.default = Day;
module.exports = exports['default'];