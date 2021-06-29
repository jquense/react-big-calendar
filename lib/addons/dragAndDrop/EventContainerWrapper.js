'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var dates = _interopRequireWildcard(require('../../utils/dates'))

var _DnDContext = require('./DnDContext')

var _Selection = _interopRequireWildcard(require('../../Selection'))

var _TimeGridEvent = _interopRequireDefault(require('../../TimeGridEvent'))

var _common = require('./common')

var _NoopWrapper = _interopRequireDefault(require('../../NoopWrapper'))

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null
  var cacheBabelInterop = new WeakMap()
  var cacheNodeInterop = new WeakMap()
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop
  })(nodeInterop)
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return { default: obj }
  }
  var cache = _getRequireWildcardCache(nodeInterop)
  if (cache && cache.has(obj)) {
    return cache.get(obj)
  }
  var newObj = {}
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc)
      } else {
        newObj[key] = obj[key]
      }
    }
  }
  newObj.default = obj
  if (cache) {
    cache.set(obj, newObj)
  }
  return newObj
}

var EventContainerWrapper = /*#__PURE__*/ (function(_React$Component) {
  ;(0, _inheritsLoose2.default)(EventContainerWrapper, _React$Component)

  function EventContainerWrapper() {
    var _this

    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    _this =
      _React$Component.call.apply(_React$Component, [this].concat(args)) || this

    _this.handleMove = function(point, bounds) {
      if (!(0, _common.pointInColumn)(bounds, point)) return _this.reset()
      var event = _this.context.draggable.dragAndDropAction.event
      var _this$props = _this.props,
        accessors = _this$props.accessors,
        slotMetrics = _this$props.slotMetrics
      var newSlot = slotMetrics.closestSlotFromPoint(
        {
          y: point.y - _this.eventOffsetTop,
          x: point.x,
        },
        bounds
      )

      var _eventTimes = (0, _common.eventTimes)(event, accessors),
        duration = _eventTimes.duration

      var newEnd = dates.add(newSlot, duration, 'milliseconds')

      _this.update(event, slotMetrics.getRange(newSlot, newEnd, false, true))
    }

    _this.handleDropFromOutside = function(point, boundaryBox) {
      var _this$props2 = _this.props,
        slotMetrics = _this$props2.slotMetrics,
        resource = _this$props2.resource
      var start = slotMetrics.closestSlotFromPoint(
        {
          y: point.y,
          x: point.x,
        },
        boundaryBox
      )

      _this.context.draggable.onDropFromOutside({
        start: start,
        end: slotMetrics.nextSlot(start),
        allDay: false,
        resource: resource,
      })
    }

    _this._selectable = function() {
      var wrapper = _this.ref.current
      var node = wrapper.children[0]
      var isBeingDragged = false
      var selector = (_this._selector = new _Selection.default(function() {
        return wrapper.closest('.rbc-time-view')
      }))
      selector.on('beforeSelect', function(point) {
        var dragAndDropAction = _this.context.draggable.dragAndDropAction
        if (!dragAndDropAction.action) return false

        if (dragAndDropAction.action === 'resize') {
          return (0, _common.pointInColumn)(
            (0, _Selection.getBoundsForNode)(node),
            point
          )
        }

        var eventNode = (0, _Selection.getEventNodeFromPoint)(node, point)
        if (!eventNode) return false // eventOffsetTop is distance from the top of the event to the initial
        // mouseDown position. We need this later to compute the new top of the
        // event during move operations, since the final location is really a
        // delta from this point. note: if we want to DRY this with WeekWrapper,
        // probably better just to capture the mouseDown point here and do the
        // placement computation in handleMove()...

        _this.eventOffsetTop =
          point.y - (0, _Selection.getBoundsForNode)(eventNode).top
      })
      selector.on('selecting', function(box) {
        var bounds = (0, _Selection.getBoundsForNode)(node)
        var dragAndDropAction = _this.context.draggable.dragAndDropAction
        if (dragAndDropAction.action === 'move') _this.handleMove(box, bounds)
        if (dragAndDropAction.action === 'resize')
          _this.handleResize(box, bounds)
      })
      selector.on('dropFromOutside', function(point) {
        if (!_this.context.draggable.onDropFromOutside) return
        var bounds = (0, _Selection.getBoundsForNode)(node)
        if (!(0, _common.pointInColumn)(bounds, point)) return

        _this.handleDropFromOutside(point, bounds)
      })
      selector.on('dragOver', function(point) {
        if (!_this.context.draggable.dragFromOutsideItem) return
        var bounds = (0, _Selection.getBoundsForNode)(node)

        _this.handleDropFromOutside(point, bounds)
      })
      selector.on('selectStart', function() {
        isBeingDragged = true

        _this.context.draggable.onStart()
      })
      selector.on('select', function(point) {
        var bounds = (0, _Selection.getBoundsForNode)(node)
        isBeingDragged = false
        if (!_this.state.event || !(0, _common.pointInColumn)(bounds, point))
          return

        _this.handleInteractionEnd()
      })
      selector.on('click', function() {
        if (isBeingDragged) _this.reset()

        _this.context.draggable.onEnd(null)
      })
      selector.on('reset', function() {
        _this.reset()

        _this.context.draggable.onEnd(null)
      })
    }

    _this.handleInteractionEnd = function() {
      var resource = _this.props.resource
      var event = _this.state.event

      _this.reset()

      _this.context.draggable.onEnd({
        start: event.start,
        end: event.end,
        resourceId: resource,
      })
    }

    _this._teardownSelectable = function() {
      if (!_this._selector) return

      _this._selector.teardown()

      _this._selector = null
    }

    _this.state = {}
    _this.ref = /*#__PURE__*/ _react.default.createRef()
    return _this
  }

  var _proto = EventContainerWrapper.prototype

  _proto.componentDidMount = function componentDidMount() {
    this._selectable()
  }

  _proto.componentWillUnmount = function componentWillUnmount() {
    this._teardownSelectable()
  }

  _proto.reset = function reset() {
    if (this.state.event)
      this.setState({
        event: null,
        top: null,
        height: null,
      })
  }

  _proto.update = function update(event, _ref) {
    var startDate = _ref.startDate,
      endDate = _ref.endDate,
      top = _ref.top,
      height = _ref.height
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
      event: (0, _extends2.default)({}, event, {
        start: startDate,
        end: endDate,
      }),
    })
  }

  _proto.handleResize = function handleResize(point, bounds) {
    var _this$props3 = this.props,
      accessors = _this$props3.accessors,
      slotMetrics = _this$props3.slotMetrics
    var _this$context$draggab = this.context.draggable.dragAndDropAction,
      event = _this$context$draggab.event,
      direction = _this$context$draggab.direction
    var newTime = slotMetrics.closestSlotFromPoint(point, bounds)

    var _eventTimes2 = (0, _common.eventTimes)(event, accessors),
      start = _eventTimes2.start,
      end = _eventTimes2.end

    if (direction === 'UP') {
      start = dates.min(newTime, slotMetrics.closestSlotFromDate(end, -1))
    } else if (direction === 'DOWN') {
      end = dates.max(newTime, slotMetrics.closestSlotFromDate(start))
    }

    this.update(event, slotMetrics.getRange(start, end))
  }

  _proto.renderContent = function renderContent() {
    var _this$props4 = this.props,
      children = _this$props4.children,
      accessors = _this$props4.accessors,
      components = _this$props4.components,
      getters = _this$props4.getters,
      slotMetrics = _this$props4.slotMetrics,
      localizer = _this$props4.localizer
    var _this$state = this.state,
      event = _this$state.event,
      top = _this$state.top,
      height = _this$state.height
    if (!event) return children
    var events = children.props.children
    var start = event.start,
      end = event.end
    var label
    var format = 'eventTimeRangeFormat'
    var startsBeforeDay = slotMetrics.startsBeforeDay(start)
    var startsAfterDay = slotMetrics.startsAfterDay(end)
    if (startsBeforeDay) format = 'eventTimeRangeEndFormat'
    else if (startsAfterDay) format = 'eventTimeRangeStartFormat'
    if (startsBeforeDay && startsAfterDay) label = localizer.messages.allDay
    else
      label = localizer.format(
        {
          start: start,
          end: end,
        },
        format
      )
    return /*#__PURE__*/ _react.default.cloneElement(children, {
      children: /*#__PURE__*/ _react.default.createElement(
        _react.default.Fragment,
        null,
        events,
        event &&
          /*#__PURE__*/ _react.default.createElement(_TimeGridEvent.default, {
            event: event,
            label: label,
            className: 'rbc-addons-dnd-drag-preview',
            style: {
              top: top,
              height: height,
              width: 100,
            },
            getters: getters,
            components: (0, _extends2.default)({}, components, {
              eventWrapper: _NoopWrapper.default,
            }),
            accessors: (0, _extends2.default)(
              {},
              accessors,
              _common.dragAccessors
            ),
            continuesEarlier: startsBeforeDay,
            continuesLater: startsAfterDay,
          })
      ),
    })
  }

  _proto.render = function render() {
    return /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        ref: this.ref,
      },
      this.renderContent()
    )
  }

  return EventContainerWrapper
})(_react.default.Component)

EventContainerWrapper.contextType = _DnDContext.DnDContext
EventContainerWrapper.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        accessors: _propTypes.default.object.isRequired,
        components: _propTypes.default.object.isRequired,
        getters: _propTypes.default.object.isRequired,
        localizer: _propTypes.default.object.isRequired,
        slotMetrics: _propTypes.default.object.isRequired,
        resource: _propTypes.default.any,
      }
    : {}
var _default = EventContainerWrapper
exports.default = _default
module.exports = exports['default']
