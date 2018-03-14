'use strict'

exports.__esModule = true

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i]
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _reactDnd = require('react-dnd')

var _reactDndHtml5Backend = require('react-dnd-html5-backend')

var _compose = require('./compose')

var _compose2 = _interopRequireDefault(_compose)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    )
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

var ResizableMonthEvent = (function(_React$Component) {
  _inherits(ResizableMonthEvent, _React$Component)

  function ResizableMonthEvent() {
    _classCallCheck(this, ResizableMonthEvent)

    return _possibleConstructorReturn(
      this,
      _React$Component.apply(this, arguments)
    )
  }

  ResizableMonthEvent.prototype.componentDidMount = function componentDidMount() {
    this.props.connectLeftDragPreview(
      (0, _reactDndHtml5Backend.getEmptyImage)(),
      {
        captureDraggingState: true,
      }
    )
    this.props.connectRightDragPreview(
      (0, _reactDndHtml5Backend.getEmptyImage)(),
      {
        captureDraggingState: true,
      }
    )
  }

  ResizableMonthEvent.prototype.render = function render() {
    var _props = this.props,
      title = _props.title,
      connectLeftDragSource = _props.connectLeftDragSource,
      connectRightDragSource = _props.connectRightDragSource

    var _map = [connectLeftDragSource, connectRightDragSource].map(function(
        connectDragSource
      ) {
        return connectDragSource(
          _react2.default.createElement(
            'div',
            { className: 'rbc-addons-dnd-resize-month-event-anchor' },
            ' '
          )
        )
      }),
      Left = _map[0],
      Right = _map[1]

    return _react2.default.createElement(
      'div',
      { className: 'rbc-addons-dnd-resizable-month-event' },
      Left,
      title,
      Right
    )
  }

  return ResizableMonthEvent
})(_react2.default.Component)

var eventSourceLeft = {
  beginDrag: function beginDrag(_ref) {
    var event = _ref.event
    return _extends({}, event, { type: 'resizeLeft' })
  },
}

var eventSourceRight = {
  beginDrag: function beginDrag(_ref2) {
    var event = _ref2.event
    return _extends({}, event, { type: 'resizeRight' })
  },
}

ResizableMonthEvent.propTypes = {
  connectLeftDragPreview: _propTypes2.default.func,
  connectLeftDragSource: _propTypes2.default.func,
  connectRightDragPreview: _propTypes2.default.func,
  connectRightDragSource: _propTypes2.default.func,
  title: _propTypes2.default.string,
}

exports.default = (0, _compose2.default)(
  (0, _reactDnd.DragSource)('resize', eventSourceLeft, function(connect) {
    return {
      connectLeftDragSource: connect.dragSource(),
      connectLeftDragPreview: connect.dragPreview(),
    }
  }),
  (0, _reactDnd.DragSource)('resize', eventSourceRight, function(connect) {
    return {
      connectRightDragSource: connect.dragSource(),
      connectRightDragPreview: connect.dragPreview(),
    }
  })
)(ResizableMonthEvent)
module.exports = exports['default']
