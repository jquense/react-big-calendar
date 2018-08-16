'use strict'

exports.__esModule = true

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _classnames = require('classnames')

var _classnames2 = _interopRequireDefault(_classnames)

var _propTypes3 = require('../../utils/propTypes')

var _accessors = require('../../utils/accessors')

var _index = require('../../index')

var _index2 = _interopRequireDefault(_index)

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

var EventWrapper = (function(_React$Component) {
  _inherits(EventWrapper, _React$Component)

  function EventWrapper() {
    var _temp, _this, _ret

    _classCallCheck(this, EventWrapper)

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    return (
      (_ret = ((_temp = ((_this = _possibleConstructorReturn(
        this,
        _React$Component.call.apply(_React$Component, [this].concat(args))
      )),
      _this)),
      (_this.handleResizeUp = function(e) {
        if (e.button !== 0) return
        e.stopPropagation()
        _this.context.onResize(_this.props.event, 'UP')
      }),
      (_this.handleResizeDown = function(e) {
        if (e.button !== 0) return
        e.stopPropagation()
        _this.context.onResize(_this.props.event, 'DOWN')
      }),
      (_this.handleResizeLeft = function(e) {
        if (e.button !== 0) return
        e.stopPropagation()
        _this.context.onResize(_this.props.event, 'LEFT')
      }),
      (_this.handleResizeRight = function(e) {
        if (e.button !== 0) return
        e.stopPropagation()
        _this.context.onResize(_this.props.event, 'RIGHT')
      }),
      (_this.handleStartDragging = function(e) {
        if (e.button === 0) _this.context.onMove(_this.props.event)
      }),
      _temp)),
      _possibleConstructorReturn(_this, _ret)
    )
  }

  EventWrapper.prototype.renderAnchor = function renderAnchor(direction) {
    var cls = direction === 'Up' || direction === 'Down' ? 'ns' : 'ew'
    return _react2.default.createElement(
      'div',
      {
        className: 'rbc-addons-dnd-resize-' + cls + '-anchor',
        onMouseDown: this['handleResize' + direction],
      },
      _react2.default.createElement('div', {
        className: 'rbc-addons-dnd-resize-' + cls + '-icon',
      })
    )
  }

  EventWrapper.prototype.render = function render() {
    var components = this.context.components

    var EventWrapper =
      components.eventWrapper || _index2.default.components.eventWrapper

    var _props = this.props,
      isResizing = _props.isResizing,
      children = _props.children,
      event = _props.event,
      allDay = _props.allDay,
      type = _props.type,
      continuesPrior = _props.continuesPrior,
      continuesAfter = _props.continuesAfter

    if (event.__isPreview)
      return _react2.default.cloneElement(children, {
        className: (0, _classnames2.default)(
          children.props.className,
          'rbc-addons-dnd-drag-preview'
        ),
      })

    var _context = this.context,
      draggableAccessor = _context.draggableAccessor,
      resizableAccessor = _context.resizableAccessor

    var isDraggable = draggableAccessor
      ? !!(0, _accessors.accessor)(event, draggableAccessor)
      : true

    /* Event is not draggable, no need to wrap it */
    if (!isDraggable) {
      return children
    }

    var StartAnchor = null,
      EndAnchor = null

    /*
     * The resizability of events depends on whether they are
     * allDay events and how they are displayed.
     *
     * 1. If the event is being shown in an event row (because
     * it is an allDay event shown in the header row or because as
     * in month view the view is showing all events as rows) then we
     * allow east-west resizing.
     *
     * 2. Otherwise the event is being displayed
     * normally, we can drag it north-south to resize the times.
     *
     * See `DropWrappers` for handling of the drop of such events.
     *
     * Notwithstanding the above, we never show drag anchors for
     * events which continue beyond current component. This happens
     * in the middle of events when showMultiDay is true, and to
     * events at the edges of the calendar's min/max location.
     */

    var isResizable = resizableAccessor
      ? !!(0, _accessors.accessor)(event, resizableAccessor)
      : true

    if (isResizable) {
      if (type === 'date') {
        StartAnchor = !continuesPrior && this.renderAnchor('Left')
        EndAnchor = !continuesAfter && this.renderAnchor('Right')
      } else {
        StartAnchor = !continuesPrior && this.renderAnchor('Up')
        EndAnchor = !continuesAfter && this.renderAnchor('Down')
      }

      var isDragging = this.context.dragAndDropAction.event === event

      /*
      * props.children is the singular <Event> component.
      * BigCalendar positions the Event abolutely and we
      * need the anchors to be part of that positioning.
      * So we insert the anchors inside the Event's children
      * rather than wrap the Event here as the latter approach
      * would lose the positioning.
      */
      children = _react2.default.cloneElement(children, {
        onMouseDown: this.handleStartDragging,
        onTouchStart: this.handleStartDragging,
        className: (0, _classnames2.default)(
          children.props.className,
          isDragging && 'rbc-addons-dnd-dragging',
          isResizing && 'rbc-addons-dnd-resizing'
        ),
        // replace original event child with anchor-embellished child
        children: _react2.default.createElement(
          'div',
          { className: 'rbc-addons-dnd-resizable' },
          StartAnchor,
          children.props.children,
          EndAnchor
        ),
      })
    }

    return _react2.default.createElement(
      EventWrapper,
      { event: event, allDay: allDay },
      children
    )
  }

  return EventWrapper
})(_react2.default.Component)

EventWrapper.contextTypes = {
  components: _propTypes2.default.object,
  draggableAccessor: _propTypes3.accessor,
  resizableAccessor: _propTypes3.accessor,
  onMove: _propTypes2.default.func.isRequired,
  onResize: _propTypes2.default.func.isRequired,
  dragAndDropAction: _propTypes2.default.object,
}
EventWrapper.propTypes = {
  type: _propTypes2.default.oneOf(['date', 'time']),
  event: _propTypes2.default.object.isRequired,

  draggable: _propTypes2.default.bool,
  allDay: _propTypes2.default.bool,
  isRow: _propTypes2.default.bool,
  continuesPrior: _propTypes2.default.bool,
  continuesAfter: _propTypes2.default.bool,
  isDragging: _propTypes2.default.bool,
  isResizing: _propTypes2.default.bool,
}
exports.default = EventWrapper
module.exports = exports['default']
