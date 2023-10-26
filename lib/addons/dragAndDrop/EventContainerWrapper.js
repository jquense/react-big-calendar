'use strict'

var _interopRequireWildcard =
  require('@babel/runtime/helpers/interopRequireWildcard').default
var _interopRequireDefault =
  require('@babel/runtime/helpers/interopRequireDefault').default
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _objectSpread2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectSpread2')
)
var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck')
)
var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass')
)
var _inherits2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inherits')
)
var _createSuper2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createSuper')
)
var _react = _interopRequireDefault(require('react'))
var _DnDContext = require('./DnDContext')
var _domHelpers = require('dom-helpers')
var _querySelectorAll = _interopRequireDefault(
  require('dom-helpers/cjs/querySelectorAll')
)
var _Selection = _interopRequireWildcard(require('../../Selection'))
var _TimeGridEvent = _interopRequireDefault(require('../../TimeGridEvent'))
var _common = require('./common')
var EventContainerWrapper = /*#__PURE__*/ (function (_React$Component) {
  ;(0, _inherits2.default)(EventContainerWrapper, _React$Component)
  var _super = (0, _createSuper2.default)(EventContainerWrapper)
  function EventContainerWrapper() {
    var _this
    ;(0, _classCallCheck2.default)(this, EventContainerWrapper)
    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }
    _this = _super.call.apply(_super, [this].concat(args))
    _this.handleMove = function (point, bounds) {
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
      var _eventTimes = (0, _common.eventTimes)(
          event,
          accessors,
          _this.props.localizer
        ),
        duration = _eventTimes.duration
      var newEnd = _this.props.localizer.add(newSlot, duration, 'milliseconds')
      _this.update(event, slotMetrics.getRange(newSlot, newEnd, false, true))
    }
    _this.handleDropFromOutside = function (point, boundaryBox) {
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
    _this.updateParentScroll = function (parent, node) {
      setTimeout(function () {
        var draggedEl = (0, _querySelectorAll.default)(
          node,
          '.rbc-addons-dnd-drag-preview'
        )[0]
        if (draggedEl) {
          if (draggedEl.offsetTop < parent.scrollTop) {
            ;(0, _domHelpers.scrollTop)(
              parent,
              Math.max(draggedEl.offsetTop, 0)
            )
          } else if (
            draggedEl.offsetTop + draggedEl.offsetHeight >
            parent.scrollTop + parent.clientHeight
          ) {
            ;(0, _domHelpers.scrollTop)(
              parent,
              Math.min(
                draggedEl.offsetTop -
                  parent.offsetHeight +
                  draggedEl.offsetHeight,
                parent.scrollHeight
              )
            )
          }
        }
      })
    }
    _this._selectable = function () {
      var wrapper = _this.ref.current
      var node = wrapper.children[0]
      var isBeingDragged = false
      var selector = (_this._selector = new _Selection.default(function () {
        return wrapper.closest('.rbc-time-view')
      }))
      var parent = (0, _domHelpers.scrollParent)(wrapper)
      selector.on('beforeSelect', function (point) {
        var dragAndDropAction = _this.context.draggable.dragAndDropAction
        if (!dragAndDropAction.action) return false
        if (dragAndDropAction.action === 'resize') {
          return (0, _common.pointInColumn)(
            (0, _Selection.getBoundsForNode)(node),
            point
          )
        }
        var eventNode = (0, _Selection.getEventNodeFromPoint)(node, point)
        if (!eventNode) return false

        // eventOffsetTop is distance from the top of the event to the initial
        // mouseDown position. We need this later to compute the new top of the
        // event during move operations, since the final location is really a
        // delta from this point. note: if we want to DRY this with WeekWrapper,
        // probably better just to capture the mouseDown point here and do the
        // placement computation in handleMove()...
        _this.eventOffsetTop =
          point.y - (0, _Selection.getBoundsForNode)(eventNode).top
      })
      selector.on('selecting', function (box) {
        var bounds = (0, _Selection.getBoundsForNode)(node)
        var dragAndDropAction = _this.context.draggable.dragAndDropAction
        if (dragAndDropAction.action === 'move') {
          _this.updateParentScroll(parent, node)
          _this.handleMove(box, bounds)
        }
        if (dragAndDropAction.action === 'resize') {
          _this.updateParentScroll(parent, node)
          _this.handleResize(box, bounds)
        }
      })
      selector.on('dropFromOutside', function (point) {
        if (!_this.context.draggable.onDropFromOutside) return
        var bounds = (0, _Selection.getBoundsForNode)(node)
        if (!(0, _common.pointInColumn)(bounds, point)) return
        _this.handleDropFromOutside(point, bounds)
      })
      selector.on('dragOver', function (point) {
        if (!_this.context.draggable.dragFromOutsideItem) return
        var bounds = (0, _Selection.getBoundsForNode)(node)
        _this.handleDropFromOutside(point, bounds)
      })
      selector.on('selectStart', function () {
        isBeingDragged = true
        _this.context.draggable.onStart()
      })
      selector.on('select', function (point) {
        var bounds = (0, _Selection.getBoundsForNode)(node)
        isBeingDragged = false
        var dragAndDropAction = _this.context.draggable.dragAndDropAction
        if (dragAndDropAction.action === 'resize') {
          _this.handleInteractionEnd()
        } else if (
          !_this.state.event ||
          !(0, _common.pointInColumn)(bounds, point)
        ) {
          return
        } else {
          _this.handleInteractionEnd()
        }
      })
      selector.on('click', function () {
        if (isBeingDragged) _this.reset()
        _this.context.draggable.onEnd(null)
      })
      selector.on('reset', function () {
        _this.reset()
        _this.context.draggable.onEnd(null)
      })
    }
    _this.handleInteractionEnd = function () {
      var resource = _this.props.resource
      var event = _this.state.event
      _this.reset()
      _this.context.draggable.onEnd({
        start: event.start,
        end: event.end,
        resourceId: resource,
      })
    }
    _this._teardownSelectable = function () {
      if (!_this._selector) return
      _this._selector.teardown()
      _this._selector = null
    }
    _this.state = {}
    _this.ref = /*#__PURE__*/ _react.default.createRef()
    return _this
  }
  ;(0, _createClass2.default)(EventContainerWrapper, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this._selectable()
      },
    },
    {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this._teardownSelectable()
      },
    },
    {
      key: 'reset',
      value: function reset() {
        if (this.state.event)
          this.setState({
            event: null,
            top: null,
            height: null,
          })
      },
    },
    {
      key: 'update',
      value: function update(event, _ref) {
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
          event: (0, _objectSpread2.default)(
            (0, _objectSpread2.default)({}, event),
            {},
            {
              start: startDate,
              end: endDate,
            }
          ),
        })
      },
    },
    {
      key: 'handleResize',
      value: function handleResize(point, bounds) {
        var _this$props3 = this.props,
          accessors = _this$props3.accessors,
          slotMetrics = _this$props3.slotMetrics,
          localizer = _this$props3.localizer
        var _this$context$draggab = this.context.draggable.dragAndDropAction,
          event = _this$context$draggab.event,
          direction = _this$context$draggab.direction
        var newTime = slotMetrics.closestSlotFromPoint(point, bounds)
        var _eventTimes2 = (0, _common.eventTimes)(event, accessors, localizer),
          start = _eventTimes2.start,
          end = _eventTimes2.end
        var newRange
        if (direction === 'UP') {
          var newStart = localizer.min(
            newTime,
            slotMetrics.closestSlotFromDate(end, -1)
          )
          // Get the new range based on the new start
          // but don't overwrite the end date as it could be outside this day boundary.
          newRange = slotMetrics.getRange(newStart, end)
          newRange = (0, _objectSpread2.default)(
            (0, _objectSpread2.default)({}, newRange),
            {},
            {
              endDate: end,
            }
          )
        } else if (direction === 'DOWN') {
          // Get the new range based on the new end
          // but don't overwrite the start date as it could be outside this day boundary.
          var newEnd = localizer.max(
            newTime,
            slotMetrics.closestSlotFromDate(start)
          )
          newRange = slotMetrics.getRange(start, newEnd)
          newRange = (0, _objectSpread2.default)(
            (0, _objectSpread2.default)({}, newRange),
            {},
            {
              startDate: start,
            }
          )
        }
        this.update(event, newRange)
      },
    },
    {
      key: 'renderContent',
      value: function renderContent() {
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
              /*#__PURE__*/ _react.default.createElement(
                _TimeGridEvent.default,
                {
                  event: event,
                  label: label,
                  className: 'rbc-addons-dnd-drag-preview',
                  style: {
                    top: top,
                    height: height,
                    width: 100,
                  },
                  getters: getters,
                  components: components,
                  accessors: (0, _objectSpread2.default)(
                    (0, _objectSpread2.default)({}, accessors),
                    _common.dragAccessors
                  ),
                  continuesPrior: startsBeforeDay,
                  continuesAfter: startsAfterDay,
                }
              )
          ),
        })
      },
    },
    {
      key: 'render',
      value: function render() {
        return /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            ref: this.ref,
          },
          this.renderContent()
        )
      },
    },
  ])
  return EventContainerWrapper
})(_react.default.Component)
EventContainerWrapper.contextType = _DnDContext.DnDContext
var _default = EventContainerWrapper
exports.default = _default
