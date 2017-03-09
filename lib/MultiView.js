'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _MultiTimeGrid = require('./MultiTimeGrid');

var _MultiTimeGrid2 = _interopRequireDefault(_MultiTimeGrid);

var _constants = require('./utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var MultiView = _react2.default.createClass({
  displayName: 'MultiView',


  propTypes: {
    date: _react2.default.PropTypes.instanceOf(Date).isRequired
  },

  render: function render() {
    var _props = this.props,
        date = _props.date,
        props = _objectWithoutProperties(_props, ['date']);

    var _MultiView$range = MultiView.range(date),
        start = _MultiView$range.start,
        end = _MultiView$range.end;

    return _react2.default.createElement(_MultiTimeGrid2.default, _extends({}, props, { start: start, end: end, eventOffset: 10 }));
  }
});

MultiView.navigate = function (date, action) {
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return _dates2.default.add(date, -1, 'day');

    case _constants.navigate.NEXT:
      return _dates2.default.add(date, 1, 'day');

    default:
      return date;
  }
};

MultiView.range = function (date) {
  date = _dates2.default.startOf(date, 'day');
  return { start: date, end: date };
};

exports.default = MultiView;
module.exports = exports['default'];