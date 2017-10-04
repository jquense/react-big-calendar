'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _constants = require('./utils/constants');

var _TimeGrid = require('./TimeGrid');

var _TimeGrid2 = _interopRequireDefault(_TimeGrid);

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Day = function (_React$Component) {
  _inherits(Day, _React$Component);

  function Day() {
    _classCallCheck(this, Day);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Day.prototype.render = function render() {
    var _props = this.props,
        date = _props.date,
        props = _objectWithoutProperties(_props, ['date']);

    return _react2.default.createElement(_TimeGrid2.default, _extends({}, props, { range: [_dates2.default.startOf(date, 'day')], eventOffset: 10 }));
  };

  return Day;
}(_react2.default.Component);

Day.propTypes = {
  date: _propTypes2.default.instanceOf(Date).isRequired
};


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

Day.title = function (date, _ref) {
  var formats = _ref.formats,
      culture = _ref.culture;
  return _localizer2.default.format(date, formats.dayHeaderFormat, culture);
};

exports.default = Day;
module.exports = exports['default'];