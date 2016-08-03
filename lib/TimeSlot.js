'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeSlot = function (_Component) {
  _inherits(TimeSlot, _Component);

  function TimeSlot() {
    _classCallCheck(this, TimeSlot);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  TimeSlot.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)('rbc-time-slot', this.props.showLabel && 'rbc-label', this.props.isNow && 'rbc-now')
      },
      this.props.showLabel && _react2.default.createElement(
        'span',
        null,
        this.props.content
      )
    );
  };

  return TimeSlot;
}(_react.Component);

TimeSlot.propTypes = {
  value: _react.PropTypes.instanceOf(Date).isRequired,
  isNow: _react.PropTypes.bool,
  showLabel: _react.PropTypes.bool,
  content: _react.PropTypes.string,
  culture: _react.PropTypes.string
};
TimeSlot.defaultProps = {
  isNow: false,
  showLabel: false,
  content: ''
};
exports.default = TimeSlot;
module.exports = exports['default'];