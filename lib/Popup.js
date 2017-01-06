'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EventCell = require('./EventCell');

var _EventCell2 = _interopRequireDefault(_EventCell);

var _selection = require('./utils/selection');

var _localizer = require('./localizer');

var _localizer2 = _interopRequireDefault(_localizer);

var _offset = require('dom-helpers/query/offset');

var _offset2 = _interopRequireDefault(_offset);

var _scrollTop = require('dom-helpers/query/scrollTop');

var _scrollTop2 = _interopRequireDefault(_scrollTop);

var _scrollLeft = require('dom-helpers/query/scrollLeft');

var _scrollLeft2 = _interopRequireDefault(_scrollLeft);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Popup = function (_React$Component) {
  _inherits(Popup, _React$Component);

  function Popup() {
    _classCallCheck(this, Popup);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Popup.prototype.componentDidMount = function componentDidMount() {
    var _props$popupOffset = this.props.popupOffset;
    var popupOffset = _props$popupOffset === undefined ? 5 : _props$popupOffset;

    var _getOffset = (0, _offset2.default)(this.refs.root);

    var top = _getOffset.top;
    var left = _getOffset.left;
    var width = _getOffset.width;
    var height = _getOffset.height;
    var viewBottom = window.innerHeight + (0, _scrollTop2.default)(window);
    var viewRight = window.innerWidth + (0, _scrollLeft2.default)(window);
    var bottom = top + height;
    var right = left + width;

    if (bottom > viewBottom || right > viewRight) {
      var topOffset = void 0,
          leftOffset = void 0;

      if (bottom > viewBottom) topOffset = bottom - viewBottom + (popupOffset.y || +popupOffset || 0);
      if (right > viewRight) leftOffset = right - viewRight + (popupOffset.x || +popupOffset || 0);

      this.setState({ topOffset: topOffset, leftOffset: leftOffset }); //eslint-disable-line
    }
  };

  Popup.prototype.render = function render() {
    var _props = this.props;
    var events = _props.events;
    var selected = _props.selected;
    var eventComponent = _props.eventComponent;

    var props = _objectWithoutProperties(_props, ['events', 'selected', 'eventComponent']);

    var _props$position = this.props.position;
    var left = _props$position.left;
    var width = _props$position.width;
    var top = _props$position.top;
    var topOffset = (this.state || {}).topOffset || 0;
    var leftOffset = (this.state || {}).leftOffset || 0;

    var style = {
      top: top - topOffset,
      left: left - leftOffset,
      minWidth: width + width / 2
    };

    return _react2.default.createElement(
      'div',
      { ref: 'root', style: style, className: 'rbc-overlay' },
      _react2.default.createElement(
        'div',
        { className: 'rbc-overlay-header' },
        _localizer2.default.format(props.slotStart, props.dayHeaderFormat, props.culture)
      ),
      events.map(function (event, idx) {
        return _react2.default.createElement(_EventCell2.default, _extends({ key: idx
        }, props, {
          event: event,
          component: eventComponent,
          selected: (0, _selection.isSelected)(event, selected)
        }));
      })
    );
  };

  return Popup;
}(_react2.default.Component);

exports.default = Popup;
module.exports = exports['default'];