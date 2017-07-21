'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Week = require('./Week');

var _Week2 = _interopRequireDefault(_Week);

var _TimeGrid = require('./TimeGrid');

var _TimeGrid2 = _interopRequireDefault(_TimeGrid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WorkWeek = function (_React$Component) {
  _inherits(WorkWeek, _React$Component);

  function WorkWeek() {
    _classCallCheck(this, WorkWeek);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  WorkWeek.prototype.render = function render() {
    var _props = this.props,
        date = _props.date,
        props = _objectWithoutProperties(_props, ['date']);

    var range = WorkWeek.range(date, this.props);

    return _react2.default.createElement(_TimeGrid2.default, _extends({}, props, { range: range, eventOffset: 15 }));
  };

  return WorkWeek;
}(_react2.default.Component);

WorkWeek.propTypes = {
  date: _propTypes2.default.instanceOf(Date).isRequired
};
WorkWeek.defaultProps = _TimeGrid2.default.defaultProps;


WorkWeek.navigate = _Week2.default.navigate;

WorkWeek.range = function (date, options) {
  return _Week2.default.range(date, options).filter(function (d) {
    return [6, 0].indexOf(d.getDay()) === -1;
  });
};

exports.default = WorkWeek;