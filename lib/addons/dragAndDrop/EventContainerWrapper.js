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

var _dates = require('../../utils/dates')

var _dates2 = _interopRequireDefault(_dates)

var _reactDom = require('react-dom')

var _Selection = require('../../Selection')

var _Selection2 = _interopRequireDefault(_Selection)

var _TimeGridEvent = require('../../TimeGridEvent')

var _TimeGridEvent2 = _interopRequireDefault(_TimeGridEvent)

var _common = require('./common')

var _NoopWrapper = require('../../NoopWrapper')

var _NoopWrapper2 = _interopRequireDefault(_NoopWrapper)

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

var pointerInColumn = function pointerInColumn(node, x, y) {
  var _getBoundsForNode = (0, _Selection.getBoundsForNode)(node),
    left = _getBoundsForNode.left,
    right = _getBoundsForNode.right,
    top = _getBoundsForNode.top

  return x < right + 10 && x > left && (y == null || y > top)
}
var propTypes = {}

var EventContainerWrapper = (function(_React$Component) {
  _inherits(EventContainerWrapper, _React$Component)

  function EventContainerWrapper() {
    _classCallCheck(this, EventContainerWrapper)

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    var _this = _possibleConstructorReturn(
      this,
      _React$Component.call.apply(_React$Component, [this].concat(args))
    )

    _this.handleMove = function(_ref, point, node) {
      var event = _ref.event
      var slotMetrics = _this.props.slotMetrics

      if (!pointerInColumn(node, point.x, point.y)) {
        _this.reset()
        return
      }

      var currentSlot = slotMetrics.closestSlotFromPoint(
        { y: point.y - _this.eventOffsetTop, x: point.x },
        (0, _Selection.getBoundsForNode)(node)
      )

      var end = _dates2.default.add(
        currentSlot,
        _dates2.default.diff(event.start, event.end, 'minutes'),
        'minutes'
      )

      _this.update(event, slotMetrics.getRange(currentSlot, end))
    }

    _this._selectable = function() {
      var node = (0, _reactDom.findDOMNode)(_this)
      var selector = (_this._selector = new _Selection2.default(function() {
        return node.closest('.rbc-time-view')
      }))

      selector.on('beforeSelect', function(point) {
        var action = _this.context.dragAndDropAction.action

        var eventNode = (0, _Selection.getEventNodeFromPoint)(node, point)

        if (!eventNode) return false
        _this.eventOffsetTop =
          point.y - (0, _Selection.getBoundsForNode)(eventNode).top

        return (
          action === 'move' ||
          (action === 'resize' && pointerInColumn(node, point.x, point.y))
        )
      })

      var handler = function handler(box) {
        var dragAndDropAction = _this.context.dragAndDropAction

        switch (dragAndDropAction.action) {
          case 'move':
            _this.handleMove(dragAndDropAction, box, node)
            break
          case 'resize':
            _this.handleResize(dragAndDropAction, box, node)
            break
        }
      }

      selector.on('selecting', handler)

      selector.on('select', function() {
        var dragAndDropAction = _this.context.dragAndDropAction

        switch (dragAndDropAction.action) {
          case 'move':
            _this.handleEventDrop()
            break
          case 'resize':
            _this.handleEventResize()
            break
        }

        _this._isInitialContainer = false
      })

      selector.on('click', function() {
        _this._isInitialContainer = false
        _this.context.onMove(null)
      })
    }

    _this.handleEventDrop = function() {
      if (!_this.state.event) return

      var resource = _this.props.resource
      var _this$state$event = _this.state.event,
        start = _this$state$event.start,
        end = _this$state$event.end
      var _this$context = _this.context,
        dragAndDropAction = _this$context.dragAndDropAction,
        onMove = _this$context.onMove,
        onEventDrop = _this$context.onEventDrop

      _this.reset()

      onMove(null)

      onEventDrop({
        end: end,
        start: start,
        event: dragAndDropAction.event,
        resourceId: resource,
      })
    }

    _this.handleEventResize = function() {
      var event = _this.state.event
      var _this$context2 = _this.context,
        dragAndDropAction = _this$context2.dragAndDropAction,
        onResize = _this$context2.onResize,
        onEventResize = _this$context2.onEventResize

      _this.reset()

      onResize(null)

      onEventResize({
        event: dragAndDropAction.event,
        start: event.start,
        end: event.end,
      })
    }

    _this._teardownSelectable = function() {
      if (!_this._selector) return
      _this._selector.teardown()
      _this._selector = null
    }

    _this.state = {}
    return _this
  }

  EventContainerWrapper.prototype.componentDidMount = function componentDidMount() {
    this._selectable()
  }

  EventContainerWrapper.prototype.componentWillUnmount = function componentWillUnmount() {
    this._teardownSelectable()
  }

  EventContainerWrapper.prototype.reset = function reset() {
    if (this.state.event)
      this.setState({ event: null, top: null, height: null })
  }

  EventContainerWrapper.prototype.update = function update(event, _ref2) {
    var startDate = _ref2.startDate,
      endDate = _ref2.endDate,
      top = _ref2.top,
      height = _ref2.height

    this.setState()

    var lastEvent = this.state.event

    if (
      lastEvent &&
      startDate === lastEvent.start &&
      endDate === lastEvent.end
    ) {
      return
    }

    this.setState({
      top: top,
      height: height,
      event: _extends({}, event, { start: startDate, end: endDate }),
    })
  }

  EventContainerWrapper.prototype.handleResize = function handleResize(
    _ref3,
    point,
    node
  ) {
    var event = _ref3.event,
      direction = _ref3.direction

    var start = void 0,
      end = void 0
    var _props = this.props,
      accessors = _props.accessors,
      slotMetrics = _props.slotMetrics

    var bounds = (0, _Selection.getBoundsForNode)(node)

    var currentSlot = slotMetrics.closestSlotFromPoint(point, bounds)
    if (direction === 'UP') {
      end = accessors.end(event)
      start = _dates2.default.min(
        currentSlot,
        slotMetrics.closestSlotFromDate(end, -1)
      )
    } else if (direction === 'DOWN') {
      start = accessors.start(event)
      end = _dates2.default.max(
        currentSlot,
        slotMetrics.closestSlotFromDate(start)
      )
    }

    this.update(event, slotMetrics.getRange(start, end))
  }

  EventContainerWrapper.prototype.render = function render() {
    var _props2 = this.props,
      children = _props2.children,
      accessors = _props2.accessors,
      components = _props2.components,
      getters = _props2.getters,
      slotMetrics = _props2.slotMetrics,
      localizer = _props2.localizer
    var _state = this.state,
      event = _state.event,
      top = _state.top,
      height = _state.height

    if (!event) return children

    var events = children.props.children
    var start = event.start,
      end = event.end

    var label = void 0
    var format = 'eventTimeRangeFormat'

    var startsBeforeDay = slotMetrics.startsBeforeDay(start)
    var startsAfterDay = slotMetrics.startsAfterDay(end)

    if (startsBeforeDay) format = 'eventTimeRangeEndFormat'
    else if (startsAfterDay) format = 'eventTimeRangeStartFormat'

    if (startsBeforeDay && startsAfterDay) label = localizer.messages.allDay
    else label = localizer.format({ start: start, end: end }, format)

    return _react2.default.cloneElement(children, {
      children: _react2.default.createElement(
        _react2.default.Fragment,
        null,
        events,
        event &&
          _react2.default.createElement(_TimeGridEvent2.default, {
            event: event,
            label: label,
            className: 'rbc-addons-dnd-drag-preview',
            style: { top: top, height: height, width: 100 },
            getters: getters,
            components: _extends({}, components, {
              eventWrapper: _NoopWrapper2.default,
            }),
            accessors: _extends({}, accessors, _common.dragAccessors),
            continuesEarlier: startsBeforeDay,
            continuesLater: startsAfterDay,
          })
      ),
    })
  }

  return EventContainerWrapper
})(_react2.default.Component)

EventContainerWrapper.propTypes = {
  accessors: _propTypes2.default.object.isRequired,
  components: _propTypes2.default.object.isRequired,
  getters: _propTypes2.default.object.isRequired,
  localizer: _propTypes2.default.object.isRequired,
  slotMetrics: _propTypes2.default.object.isRequired,
  resource: _propTypes2.default.any,
}
EventContainerWrapper.contextTypes = {
  onEventDrop: _propTypes2.default.func,
  onEventResize: _propTypes2.default.func,
  dragAndDropAction: _propTypes2.default.object,
  onMove: _propTypes2.default.func,
  onResize: _propTypes2.default.func,
}

EventContainerWrapper.propTypes = propTypes

exports.default = EventContainerWrapper
module.exports = exports['default']
