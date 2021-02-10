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

var _selection = require('../../utils/selection')

var _reactDom = require('react-dom')

var _eventLevels = require('../../utils/eventLevels')

var _Selection = _interopRequireWildcard(require('../../Selection'))

var _EventRow = _interopRequireDefault(require('../../EventRow'))

var _common = require('./common')

var _jsxFileName =
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\addons\\dragAndDrop\\WeekWrapper.js'
var propTypes = process.env.NODE_ENV !== 'production' ? {} : {}

var eventTimes = (event, accessors) => {
  var start = accessors.start(event)
  var end = accessors.end(event)
  var isZeroDuration =
    dates.eq(start, end, 'minutes') && start.getMinutes() === 0 // make zero duration midnight events at least one day long

  if (isZeroDuration) end = dates.add(end, 1, 'day')
  return {
    start,
    end,
  }
}

class WeekWrapper extends _react.default.Component {
  constructor() {
    super(...arguments)

    this.handleMove = (_ref, node, draggedEvent) => {
      var { x, y } = _ref
      var event = this.context.draggable.dragAndDropAction.event || draggedEvent
      var metrics = this.props.slotMetrics
      var { accessors } = this.props
      if (!event) return
      var rowBox = (0, _Selection.getBoundsForNode)(node)

      if (
        !(0, _selection.pointInBox)(rowBox, {
          x,
          y,
        })
      ) {
        this.reset()
        return
      } // Make sure to maintain the time of the start date while moving it to the new slot

      var start = dates.merge(
        metrics.getDateForSlot(
          (0, _selection.getSlotAtX)(rowBox, x, false, metrics.slots)
        ),
        accessors.start(event)
      )
      var end = dates.add(
        start,
        dates.diff(accessors.start(event), accessors.end(event), 'minutes'),
        'minutes'
      )
      this.update(event, start, end)
    }

    this.handleDropFromOutside = (point, rowBox) => {
      if (!this.context.draggable.onDropFromOutside) return
      var { slotMetrics: metrics } = this.props
      var start = metrics.getDateForSlot(
        (0, _selection.getSlotAtX)(rowBox, point.x, false, metrics.slots)
      )
      this.context.draggable.onDropFromOutside({
        start,
        end: dates.add(start, 1, 'day'),
        allDay: false,
      })
    }

    this.handleDragOverFromOutside = (_ref2, node) => {
      var { x, y } = _ref2
      if (!this.context.draggable.dragFromOutsideItem) return
      this.handleMove(
        {
          x,
          y,
        },
        node,
        this.context.draggable.dragFromOutsideItem()
      )
    }

    this._selectable = () => {
      var node = (0, _reactDom.findDOMNode)(this).closest(
        '.rbc-month-row, .rbc-allday-cell'
      )
      var container = node.closest('.rbc-month-view, .rbc-time-view')
      var selector = (this._selector = new _Selection.default(() => container))
      selector.on('beforeSelect', point => {
        var { isAllDay } = this.props
        var { action } = this.context.draggable.dragAndDropAction
        return (
          action === 'move' ||
          (action === 'resize' &&
            (!isAllDay ||
              (0, _selection.pointInBox)(
                (0, _Selection.getBoundsForNode)(node),
                point
              )))
        )
      })
      selector.on('selecting', box => {
        var bounds = (0, _Selection.getBoundsForNode)(node)
        var { dragAndDropAction } = this.context.draggable
        if (dragAndDropAction.action === 'move') this.handleMove(box, bounds)
        if (dragAndDropAction.action === 'resize')
          this.handleResize(box, bounds)
      })
      selector.on('selectStart', () => this.context.draggable.onStart())
      selector.on('select', point => {
        var bounds = (0, _Selection.getBoundsForNode)(node)
        if (!this.state.segment) return

        if (!(0, _selection.pointInBox)(bounds, point)) {
          this.reset()
        } else {
          this.handleInteractionEnd()
        }
      })
      selector.on('dropFromOutside', point => {
        if (!this.context.draggable.onDropFromOutside) return
        var bounds = (0, _Selection.getBoundsForNode)(node)
        if (!(0, _selection.pointInBox)(bounds, point)) return
        this.handleDropFromOutside(point, bounds)
      })
      selector.on('dragOverFromOutside', point => {
        if (!this.context.draggable.dragFromOutsideItem) return
        var bounds = (0, _Selection.getBoundsForNode)(node)
        this.handleDragOverFromOutside(point, bounds)
      })
      selector.on('click', () => this.context.draggable.onEnd(null))
      selector.on('reset', () => {
        this.reset()
        this.context.draggable.onEnd(null)
      })
    }

    this.handleInteractionEnd = () => {
      var { resourceId, isAllDay } = this.props
      var { event } = this.state.segment
      this.reset()
      this.context.draggable.onEnd({
        start: event.start,
        end: event.end,
        resourceId,
        isAllDay,
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
    if (this.state.segment)
      this.setState({
        segment: null,
      })
  }

  update(event, start, end) {
    var segment = (0, _eventLevels.eventSegments)(
      (0, _extends2.default)({}, event, {
        end,
        start,
        __isPreview: true,
      }),
      this.props.slotMetrics.range,
      _common.dragAccessors
    )
    var { segment: lastSegment } = this.state

    if (
      lastSegment &&
      segment.span === lastSegment.span &&
      segment.left === lastSegment.left &&
      segment.right === lastSegment.right
    ) {
      return
    }

    this.setState({
      segment,
    })
  }

  handleResize(point, node) {
    var { event, direction } = this.context.draggable.dragAndDropAction
    var { accessors, slotMetrics: metrics } = this.props
    var { start, end } = eventTimes(event, accessors)
    var originalStart = start
    var originalEnd = end
    var rowBox = (0, _Selection.getBoundsForNode)(node)
    var cursorInRow = (0, _selection.pointInBox)(rowBox, point)

    if (direction === 'RIGHT') {
      if (cursorInRow) {
        if (metrics.last < start) return this.reset()
        end = metrics.getDateForSlot(
          (0, _selection.getSlotAtX)(rowBox, point.x, false, metrics.slots)
        )
      } else if (
        dates.inRange(start, metrics.first, metrics.last) ||
        (rowBox.bottom < point.y && +metrics.first > +start)
      ) {
        end = dates.add(metrics.last, 1, 'milliseconds')
      } else {
        this.setState({
          segment: null,
        })
        return
      }

      end = dates.merge(end, accessors.end(event))

      if (dates.lt(end, start)) {
        end = originalEnd
      }
    } else if (direction === 'LEFT') {
      // inbetween Row
      if (cursorInRow) {
        if (metrics.first > end) return this.reset()
        start = metrics.getDateForSlot(
          (0, _selection.getSlotAtX)(rowBox, point.x, false, metrics.slots)
        )
      } else if (
        dates.inRange(end, metrics.first, metrics.last) ||
        (rowBox.top > point.y && +metrics.last < +end)
      ) {
        start = dates.add(metrics.first, -1, 'milliseconds')
      } else {
        this.reset()
        return
      }

      start = dates.merge(start, accessors.start(event))

      if (dates.gt(start, end)) {
        start = originalStart
      }
    }

    this.update(event, start, end)
  }

  render() {
    var { children, accessors } = this.props
    var { segment } = this.state
    return /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: 'rbc-addons-dnd-row-body',
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 282,
          columnNumber: 7,
        },
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
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 286,
              columnNumber: 11,
            },
          })
        )
    )
  }
}

WeekWrapper.contextTypes = {
  draggable: _propTypes.default.shape({
    onStart: _propTypes.default.func,
    onEnd: _propTypes.default.func,
    dragAndDropAction: _propTypes.default.object,
    onDropFromOutside: _propTypes.default.func,
    onBeginAction: _propTypes.default.func,
    dragFromOutsideItem: _propTypes.default.func,
  }),
}
WeekWrapper.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        isAllDay: _propTypes.default.bool,
        slotMetrics: _propTypes.default.object.isRequired,
        accessors: _propTypes.default.object.isRequired,
        getters: _propTypes.default.object.isRequired,
        components: _propTypes.default.object.isRequired,
        resourceId: _propTypes.default.any,
      }
    : {}
WeekWrapper.propTypes = process.env.NODE_ENV !== 'production' ? propTypes : {}
var _default = WeekWrapper
exports.default = _default
module.exports = exports.default
