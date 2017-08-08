'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResizableEvent = function (_React$Component) {
  _inherits(ResizableEvent, _React$Component);

  function ResizableEvent() {
    _classCallCheck(this, ResizableEvent);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ResizableEvent.prototype.render = function render() {
    var _props = this.props,
        title = _props.title,
        connectDragSource = _props.connectDragSource;

    return _react2.default.createElement(
      'div',
      { className: 'rbc-addons-dnd-resizable-event' },
      title,
      connectDragSource(_react2.default.createElement(
        'div',
        { className: 'rbc-addons-dnd-resize-anchor' },
        _react2.default.createElement('div', { className: 'rbc-addons-dnd-resize-icon' })
      ))
    );
  };

  return ResizableEvent;
}(_react2.default.Component);

var eventSource = {
  beginDrag: function beginDrag(props) {
    return props.event;
  }
};

var collectSource = function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

exports.default = (0, _reactDnd.DragSource)('resize', eventSource, collectSource)(ResizableEvent);
module.exports = exports['default'];