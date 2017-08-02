'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* drag sources */

var eventSource = {
  beginDrag: function beginDrag(props) {
    return props.event;
  }
};

function collectSource(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

var propTypes = {
  connectDragSource: _propTypes2.default.func.isRequired,
  isDragging: _propTypes2.default.bool.isRequired,
  event: _propTypes2.default.object.isRequired
};

var DraggableEventWrapper = function (_React$Component) {
  _inherits(DraggableEventWrapper, _React$Component);

  function DraggableEventWrapper() {
    _classCallCheck(this, DraggableEventWrapper);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DraggableEventWrapper.prototype.render = function render() {
    var _props = this.props,
        connectDragSource = _props.connectDragSource,
        isDragging = _props.isDragging,
        children = _props.children,
        event = _props.event;

    var EventWrapper = _index2.default.components.eventWrapper;

    children = _react2.default.cloneElement(children, {
      className: (0, _classnames2.default)(children.props.className, isDragging && 'rbc-addons-dnd-dragging')
    });

    return _react2.default.createElement(
      EventWrapper,
      { event: event },
      connectDragSource(children)
    );
  };

  return DraggableEventWrapper;
}(_react2.default.Component);

DraggableEventWrapper.propTypes = propTypes;

exports.default = (0, _reactDnd.DragSource)('event', eventSource, collectSource)(DraggableEventWrapper);
module.exports = exports['default'];