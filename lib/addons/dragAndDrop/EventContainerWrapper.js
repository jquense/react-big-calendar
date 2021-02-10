'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var dates = _interopRequireWildcard(require('../../utils/dates'))

var _reactDom = require('react-dom')

var _Selection = _interopRequireWildcard(require('../../Selection'))

var _TimeGridEvent = _interopRequireDefault(require('../../TimeGridEvent'))

var _common = require('./common')

var _NoopWrapper = _interopRequireDefault(require('../../NoopWrapper'))

var _jsxFileName =
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\addons\\dragAndDrop\\EventContainerWrapper.js'

var pointInColumn = (bounds, _ref) => {
  var { x, y } = _ref
  var { left, right, top } = bounds
  return x < right + 10 && x > left && y > top
}

var propTypes = process.env.NODE_ENV !== 'production' ? {} : {}

class EventContainerWrapper extends _react.default.Component {
  constructor() {
    super(...arguments)

    this.handleMove = (point, boundaryBox) => {
      var { event } = this.context.draggable.dragAndDropAction
      var { accessors, slotMetrics } = this.props

      if (!pointInColumn(boundaryBox, point)) {
        this.reset()
        return
      }

      var currentSlot = slotMetrics.closestSlotFromPoint(
        {
          y: point.y - this.eventOffsetTop,
          x: point.x,
        },
        boundaryBox
      )
      var eventStart = accessors.start(event)
      var eventEnd = accessors.end(event)
      var end = dates.add(
        currentSlot,
        dates.diff(eventStart, eventEnd, 'minutes'),
        'minutes'
      )
      this.update(event, slotMetrics.getRange(currentSlot, end, false, true))
    }

    this.handleDropFromOutside = (point, boundaryBox) => {
      var { slotMetrics, resource } = this.props
      var start = slotMetrics.closestSlotFromPoint(
        {
          y: point.y,
          x: point.x,
        },
        boundaryBox
      )
      this.context.draggable.onDropFromOutside({
        start,
        end: slotMetrics.nextSlot(start),
        allDay: false,
        resource,
      })
    }

    this._selectable = () => {
      var node = (0, _reactDom.findDOMNode)(this)
      var isBeingDragged = false
      var selector = (this._selector = new _Selection.default(() =>
        node.closest('.rbc-time-view')
      ))
      selector.on('beforeSelect', point => {
        var { dragAndDropAction } = this.context.draggable
        if (!dragAndDropAction.action) return false

        if (dragAndDropAction.action === 'resize') {
          return pointInColumn((0, _Selection.getBoundsForNode)(node), point)
        }

        var eventNode = (0, _Selection.getEventNodeFromPoint)(node, point)
        if (!eventNode) return false
        this.eventOffsetTop =
          point.y - (0, _Selection.getBoundsForNode)(eventNode).top
      })
      selector.on('selecting', box => {
        var bounds = (0, _Selection.getBoundsForNode)(node)
        var { dragAndDropAction } = this.context.draggable
        if (dragAndDropAction.action === 'move') this.handleMove(box, bounds)
        if (dragAndDropAction.action === 'resize')
          this.handleResize(box, bounds)
      })
      selector.on('dropFromOutside', point => {
        if (!this.context.draggable.onDropFromOutside) return
        var bounds = (0, _Selection.getBoundsForNode)(node)
        if (!pointInColumn(bounds, point)) return
        this.handleDropFromOutside(point, bounds)
      })
      selector.on('dragOver', point => {
        if (!this.context.draggable.dragFromOutsideItem) return
        var bounds = (0, _Selection.getBoundsForNode)(node)
        this.handleDropFromOutside(point, bounds)
      })
      selector.on('selectStart', () => {
        isBeingDragged = true
        this.context.draggable.onStart()
      })
      selector.on('select', point => {
        var bounds = (0, _Selection.getBoundsForNode)(node)
        isBeingDragged = false
        if (!this.state.event || !pointInColumn(bounds, point)) return
        this.handleInteractionEnd()
      })
      selector.on('click', () => {
        if (isBeingDragged) this.reset()
        this.context.draggable.onEnd(null)
      })
      selector.on('reset', () => {
        this.reset()
        this.context.draggable.onEnd(null)
      })
    }

    this.handleInteractionEnd = () => {
      var { resource } = this.props
      var { event } = this.state
      this.reset()
      this.context.draggable.onEnd({
        start: event.start,
        end: event.end,
        resourceId: resource,
      })
    }

    this._teardownSelectable = () => {
      if (!this._selector) return

      this._selector.teardown()

      this._selector = null
    }

    this.state = {}
  }

  componentDidMount() {
    this._selectable()
  }

  componentWillUnmount() {
    this._teardownSelectable()
  }

  reset() {
    if (this.state.event)
      this.setState({
        event: null,
        top: null,
        height: null,
      })
  }

  update(event, _ref2) {
    var { startDate, endDate, top, height } = _ref2
    var { event: lastEvent } = this.state

    if (
      lastEvent &&
      startDate === lastEvent.start &&
      endDate === lastEvent.end
    ) {
      return
    }

    this.setState({
      top,
      height,
      event: (0, _extends2.default)({}, event, {
        start: startDate,
        end: endDate,
      }),
    })
  }

  handleResize(point, boundaryBox) {
    var start, end
    var { accessors, slotMetrics } = this.props
    var { event, direction } = this.context.draggable.dragAndDropAction
    var currentSlot = slotMetrics.closestSlotFromPoint(point, boundaryBox)

    if (direction === 'UP') {
      end = accessors.end(event)
      start = dates.min(currentSlot, slotMetrics.closestSlotFromDate(end, -1))
    } else if (direction === 'DOWN') {
      start = accessors.start(event)
      end = dates.max(currentSlot, slotMetrics.closestSlotFromDate(start))
    }

    this.update(event, slotMetrics.getRange(start, end))
  }

  render() {
    var {
      children,
      accessors,
      components,
      getters,
      slotMetrics,
      localizer,
    } = this.props
    var { event, top, height } = this.state
    if (!event) return children
    var events = children.props.children
    var { start, end } = event
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
          start,
          end,
        },
        format
      )
    return /*#__PURE__*/ _react.default.cloneElement(children, {
      children: /*#__PURE__*/ _react.default.createElement(
        _react.default.Fragment,
        {
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 254,
            columnNumber: 9,
          },
        },
        events,
        event &&
          /*#__PURE__*/ _react.default.createElement(_TimeGridEvent.default, {
            event: event,
            label: label,
            className: 'rbc-addons-dnd-drag-preview',
            style: {
              top,
              height,
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
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 258,
              columnNumber: 13,
            },
          })
      ),
    })
  }
}

EventContainerWrapper.contextTypes = {
  draggable: _propTypes.default.shape({
    onStart: _propTypes.default.func,
    onEnd: _propTypes.default.func,
    onDropFromOutside: _propTypes.default.func,
    onBeginAction: _propTypes.default.func,
    dragAndDropAction: _propTypes.default.object,
    dragFromOutsideItem: _propTypes.default.func,
  }),
}
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
EventContainerWrapper.propTypes =
  process.env.NODE_ENV !== 'production' ? propTypes : {}
var _default = EventContainerWrapper
exports.default = _default
module.exports = exports.default
