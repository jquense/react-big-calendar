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

var _EventRow = _interopRequireDefault(require('../../EventRow'))

var _Selection = _interopRequireWildcard(require('../../Selection'))

var dates = _interopRequireWildcard(require('../../utils/dates'))

var _eventLevels = require('../../utils/eventLevels')

var _selection = require('../../utils/selection')

var _common = require('./common')

var _DnDContext = require('./DnDContext')

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

var WeekWrapper = /*#__PURE__*/ (function(_React$Component) {
  ;(0, _inheritsLoose2.default)(WeekWrapper, _React$Component)

  function WeekWrapper() {
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

    _this.handleMove = function(point, bounds, draggedEvent) {
      if (!(0, _selection.pointInBox)(bounds, point)) return _this.reset()
      var event =
        _this.context.draggable.dragAndDropAction.event || draggedEvent
      var _this$props = _this.props,
        accessors = _this$props.accessors,
        slotMetrics = _this$props.slotMetrics,
        rtl = _this$props.rtl
      var slot = (0, _selection.getSlotAtX)(
        bounds,
        point.x,
        rtl,
        slotMetrics.slots
      )
      var date = slotMetrics.getDateForSlot(slot) // Adjust the dates, but maintain the times when moving

      var _eventTimes = (0, _common.eventTimes)(event, accessors),
        start = _eventTimes.start,
        duration = _eventTimes.duration

      start = dates.merge(date, start)
      var end = dates.add(start, duration, 'milliseconds') // LATER: when dragging a multi-row event, only the first row is animating

      _this.update(event, start, end)
    }

    _this.handleDropFromOutside = function(point, bounds) {
      if (!_this.context.draggable.onDropFromOutside) return
      var _this$props2 = _this.props,
        slotMetrics = _this$props2.slotMetrics,
        rtl = _this$props2.rtl
      var slot = (0, _selection.getSlotAtX)(
        bounds,
        point.x,
        rtl,
        slotMetrics.slots
      )
      var start = slotMetrics.getDateForSlot(slot)

      _this.context.draggable.onDropFromOutside({
        start: start,
        end: dates.add(start, 1, 'day'),
        allDay: false,
      })
    }

    _this.handleDragOverFromOutside = function(point, node) {
      if (!_this.context.draggable.dragFromOutsideItem) return

      _this.handleMove(
        point,
        node,
        _this.context.draggable.dragFromOutsideItem()
      )
    }

    _this._selectable = function() {
      var node = _this.ref.current.closest('.rbc-month-row, .rbc-allday-cell')

      var container = node.closest('.rbc-month-view, .rbc-time-view')
      var selector = (_this._selector = new _Selection.default(function() {
        return container
      }))
      selector.on('beforeSelect', function(point) {
        var isAllDay = _this.props.isAllDay
        var action = _this.context.draggable.dragAndDropAction.action
        var bounds = (0, _Selection.getBoundsForNode)(node)
        var isInBox = (0, _selection.pointInBox)(bounds, point)
        return (
          action === 'move' || (action === 'resize' && (!isAllDay || isInBox))
        )
      })
      selector.on('selecting', function(box) {
        var bounds = (0, _Selection.getBoundsForNode)(node)
        var dragAndDropAction = _this.context.draggable.dragAndDropAction
        if (dragAndDropAction.action === 'move') _this.handleMove(box, bounds)
        if (dragAndDropAction.action === 'resize')
          _this.handleResize(box, bounds)
      })
      selector.on('selectStart', function() {
        return _this.context.draggable.onStart()
      })
      selector.on('select', function(point) {
        var bounds = (0, _Selection.getBoundsForNode)(node)
        if (!_this.state.segment) return

        if (!(0, _selection.pointInBox)(bounds, point)) {
          _this.reset()
        } else {
          _this.handleInteractionEnd()
        }
      })
      selector.on('dropFromOutside', function(point) {
        if (!_this.context.draggable.onDropFromOutside) return
        var bounds = (0, _Selection.getBoundsForNode)(node)
        if (!(0, _selection.pointInBox)(bounds, point)) return

        _this.handleDropFromOutside(point, bounds)
      })
      selector.on('dragOverFromOutside', function(point) {
        if (!_this.context.draggable.dragFromOutsideItem) return
        var bounds = (0, _Selection.getBoundsForNode)(node)

        _this.handleDragOverFromOutside(point, bounds)
      })
      selector.on('click', function() {
        return _this.context.draggable.onEnd(null)
      })
      selector.on('reset', function() {
        _this.reset()

        _this.context.draggable.onEnd(null)
      })
    }

    _this.handleInteractionEnd = function() {
      var _this$props3 = _this.props,
        resourceId = _this$props3.resourceId,
        isAllDay = _this$props3.isAllDay
      var event = _this.state.segment.event

      _this.reset()

      _this.context.draggable.onEnd({
        start: event.start,
        end: event.end,
        resourceId: resourceId,
        isAllDay: isAllDay,
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

  var _proto = WeekWrapper.prototype

  _proto.componentDidMount = function componentDidMount() {
    this._selectable()
  }

  _proto.componentWillUnmount = function componentWillUnmount() {
    this._teardownSelectable()
  }

  _proto.reset = function reset() {
    if (this.state.segment)
      this.setState({
        segment: null,
      })
  }

  _proto.update = function update(event, start, end) {
    var segment = (0, _eventLevels.eventSegments)(
      (0, _extends2.default)({}, event, {
        end: end,
        start: start,
        __isPreview: true,
      }),
      this.props.slotMetrics.range,
      _common.dragAccessors
    )
    var lastSegment = this.state.segment

    if (
      lastSegment &&
      segment.span === lastSegment.span &&
      segment.left === lastSegment.left &&
      segment.right === lastSegment.right
    ) {
      return
    }

    this.setState({
      segment: segment,
    })
  }

  _proto.handleResize = function handleResize(point, bounds) {
    var _this$context$draggab = this.context.draggable.dragAndDropAction,
      event = _this$context$draggab.event,
      direction = _this$context$draggab.direction
    var _this$props4 = this.props,
      accessors = _this$props4.accessors,
      slotMetrics = _this$props4.slotMetrics,
      rtl = _this$props4.rtl

    var _eventTimes2 = (0, _common.eventTimes)(event, accessors),
      start = _eventTimes2.start,
      end = _eventTimes2.end

    var slot = (0, _selection.getSlotAtX)(
      bounds,
      point.x,
      rtl,
      slotMetrics.slots
    )
    var date = slotMetrics.getDateForSlot(slot)
    var cursorInRow = (0, _selection.pointInBox)(bounds, point)

    if (direction === 'RIGHT') {
      if (cursorInRow) {
        if (slotMetrics.last < start) return this.reset()
        end = dates.add(date, 1, 'day')
      } else if (
        dates.inRange(start, slotMetrics.first, slotMetrics.last) ||
        (bounds.bottom < point.y && +slotMetrics.first > +start)
      ) {
        end = dates.add(slotMetrics.last, 1, 'milliseconds')
      } else {
        this.setState({
          segment: null,
        })
        return
      }

      var originalEnd = accessors.end(event)
      end = dates.merge(end, originalEnd)

      if (dates.lt(end, start)) {
        end = originalEnd
      }
    } else if (direction === 'LEFT') {
      if (cursorInRow) {
        if (slotMetrics.first > end) return this.reset()
        start = date
      } else if (
        dates.inRange(end, slotMetrics.first, slotMetrics.last) ||
        (bounds.top > point.y && dates.lt(slotMetrics.last, end))
      ) {
        start = dates.add(slotMetrics.first, -1, 'milliseconds')
      } else {
        this.reset()
        return
      }

      var originalStart = accessors.start(event)
      start = dates.merge(start, originalStart)

      if (dates.gt(start, end)) {
        start = originalStart
      }
    }

    this.update(event, start, end)
  }

  _proto.render = function render() {
    var _this$props5 = this.props,
      children = _this$props5.children,
      accessors = _this$props5.accessors
    var segment = this.state.segment
    return /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        ref: this.ref,
        className: 'rbc-addons-dnd-row-body',
      },
      children,
      segment &&
        /*#__PURE__*/ _react.default.createElement(
          _EventRow.default,
          (0, _extends2.default)({}, this.props, {
            selected: null,
            className: 'rbc-addons-dnd-drag-row',
            segments: [segment],
            accessors: (0, _extends2.default)(
              {},
              accessors,
              _common.dragAccessors
            ),
          })
        )
    )
  }

  return WeekWrapper
})(_react.default.Component)

WeekWrapper.contextType = _DnDContext.DnDContext
WeekWrapper.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        isAllDay: _propTypes.default.bool,
        slotMetrics: _propTypes.default.object.isRequired,
        accessors: _propTypes.default.object.isRequired,
        getters: _propTypes.default.object.isRequired,
        components: _propTypes.default.object.isRequired,
        resourceId: _propTypes.default.any,
        rtl: _propTypes.default.bool,
      }
    : {}
var _default = WeekWrapper
exports.default = _default
module.exports = exports['default']
