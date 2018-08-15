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

var _selection = require('../../utils/selection')

var _reactDom = require('react-dom')

var _eventLevels = require('../../utils/eventLevels')

var _Selection = require('../../Selection')

var _Selection2 = _interopRequireDefault(_Selection)

var _EventRow = require('../../EventRow')

var _EventRow2 = _interopRequireDefault(_EventRow)

var _common = require('./common')

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

var propTypes = {}

var eventTimes = function eventTimes(event, accessors) {
  var start = accessors.start(event)
  var end = accessors.end(event)

  var isZeroDuration =
    _dates2.default.eq(start, end, 'minutes') && start.getMinutes() === 0
  // make zero duration midnight events at least one day long
  if (isZeroDuration) end = _dates2.default.add(end, 1, 'day')
  return { start: start, end: end }
}

var WeekWrapper = (function(_React$Component) {
  _inherits(WeekWrapper, _React$Component)

  function WeekWrapper() {
    _classCallCheck(this, WeekWrapper)

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

    _this.handleMove = function(_ref, _ref2, node) {
      var event = _ref.event
      var x = _ref2.x,
        y = _ref2.y

      var metrics = _this.props.slotMetrics
      var accessors = _this.props.accessors

      if (!event) return

      var rowBox = (0, _Selection.getBoundsForNode)(node)

      if (!(0, _selection.pointInBox)(rowBox, { x: x, y: y })) {
        _this.reset()
        return
      }

      // Make sure to maintain the time of the start date while moving it to the new slot
      var start = _dates2.default.merge(
        metrics.getDateForSlot(
          (0, _selection.getSlotAtX)(rowBox, x, false, metrics.slots)
        ),
        accessors.start(event)
      )

      var end = _dates2.default.add(
        start,
        _dates2.default.diff(
          accessors.start(event),
          accessors.end(event),
          'minutes'
        ),
        'minutes'
      )

      _this.update(event, start, end)
    }

    _this._selectable = function() {
      var node = (0, _reactDom.findDOMNode)(_this).closest(
        '.rbc-month-row, .rbc-allday-cell'
      )
      var container = node.closest('.rbc-month-view, .rbc-time-view')

      var selector = (_this._selector = new _Selection2.default(function() {
        return container
      }))

      selector.on('beforeSelect', function(point) {
        var isAllDay = _this.props.isAllDay
        var action = _this.context.dragAndDropAction.action

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
      selector.on('selectStart', handler)

      selector.on('select', function(box) {
        var dragAndDropAction = _this.context.dragAndDropAction

        switch (dragAndDropAction.action) {
          case 'move':
            _this.handleEventDrop()
            break
          case 'resize':
            _this.handleEventResize(box, node)
            break
        }
      })

      selector.on('click', function() {
        _this.context.onMove(null)
      })
    }

    _this.handleEventResize = function(box, node) {
      var segment = _this.state.segment

      if (
        !segment ||
        !(0, _selection.pointInBox)((0, _Selection.getBoundsForNode)(node), box)
      )
        return
      var _this$context = _this.context,
        dragAndDropAction = _this$context.dragAndDropAction,
        onResize = _this$context.onResize,
        onEventResize = _this$context.onEventResize

      _this.reset()

      onResize(null)

      onEventResize({
        event: dragAndDropAction.event,
        start: segment.event.start,
        end: segment.event.end,
      })
    }

    _this.handleEventDrop = function() {
      var resourceId = _this.props.resourceId
      var segment = _this.state.segment

      if (!segment) return
      var _this$context2 = _this.context,
        dragAndDropAction = _this$context2.dragAndDropAction,
        onMove = _this$context2.onMove,
        onEventDrop = _this$context2.onEventDrop

      _this.reset()

      onMove(null)

      onEventDrop({
        resourceId: resourceId,
        event: dragAndDropAction.event,
        start: segment.event.start,
        end: segment.event.end,
        isAllDay: true,
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

  WeekWrapper.prototype.componentDidMount = function componentDidMount() {
    this._selectable()
  }

  WeekWrapper.prototype.componentWillUnmount = function componentWillUnmount() {
    this._teardownSelectable()
  }

  WeekWrapper.prototype.reset = function reset() {
    if (this.state.segment) this.setState({ segment: null })
  }

  WeekWrapper.prototype.update = function update(event, start, end) {
    var segment = (0, _eventLevels.eventSegments)(
      _extends({}, event, { end: end, start: start, __isPreview: true }),
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
    this.setState({ segment: segment })
  }

  WeekWrapper.prototype.handleResize = function handleResize(
    _ref3,
    point,
    node
  ) {
    var event = _ref3.event,
      direction = _ref3.direction
    var _props = this.props,
      accessors = _props.accessors,
      metrics = _props.slotMetrics

    var _eventTimes = eventTimes(event, accessors),
      start = _eventTimes.start,
      end = _eventTimes.end

    var rowBox = (0, _Selection.getBoundsForNode)(node)
    var cursorInRow = (0, _selection.pointInBox)(rowBox, point)

    if (direction === 'RIGHT') {
      if (cursorInRow) {
        if (metrics.last < start) return this.reset()
        // add min
        end = _dates2.default.add(
          metrics.getDateForSlot(
            (0, _selection.getSlotAtX)(rowBox, point.x, false, metrics.slots)
          ),
          1,
          'day'
        )
      } else if (
        _dates2.default.inRange(start, metrics.first, metrics.last) ||
        (rowBox.bottom < point.y && +metrics.first > +start)
      ) {
        end = _dates2.default.add(metrics.last, 1, 'milliseconds')
      } else {
        this.setState({ segment: null })
        return
      }

      end = _dates2.default.max(end, _dates2.default.add(start, 1, 'day'))
    } else if (direction === 'LEFT') {
      // inbetween Row
      if (cursorInRow) {
        if (metrics.first > end) return this.reset()

        start = metrics.getDateForSlot(
          (0, _selection.getSlotAtX)(rowBox, point.x, false, metrics.slots)
        )
      } else if (
        _dates2.default.inRange(end, metrics.first, metrics.last) ||
        (rowBox.top > point.y && +metrics.last < +end)
      ) {
        start = _dates2.default.add(metrics.first, -1, 'milliseconds')
      } else {
        this.reset()
        return
      }

      start = _dates2.default.min(_dates2.default.add(end, -1, 'day'), start)
    }

    this.update(event, start, end)
  }

  WeekWrapper.prototype.render = function render() {
    var _props2 = this.props,
      children = _props2.children,
      accessors = _props2.accessors
    var segment = this.state.segment

    return _react2.default.createElement(
      'div',
      { className: 'rbc-addons-dnd-row-body' },
      children,
      segment &&
        _react2.default.createElement(
          _EventRow2.default,
          _extends({}, this.props, {
            selected: null,
            className: 'rbc-addons-dnd-drag-row',
            segments: [segment],
            accessors: _extends({}, accessors, _common.dragAccessors),
          })
        )
    )
  }

  return WeekWrapper
})(_react2.default.Component)

WeekWrapper.propTypes = {
  isAllDay: _propTypes2.default.bool,
  slotMetrics: _propTypes2.default.object.isRequired,
  accessors: _propTypes2.default.object.isRequired,
  getters: _propTypes2.default.object.isRequired,
  components: _propTypes2.default.object.isRequired,
  resourceId: _propTypes2.default.any,
}
WeekWrapper.contextTypes = {
  onEventDrop: _propTypes2.default.func,
  onEventResize: _propTypes2.default.func,

  onMove: _propTypes2.default.func,
  onResize: _propTypes2.default.func,
  dragAndDropAction: _propTypes2.default.object,
}

WeekWrapper.propTypes = propTypes

exports.default = WeekWrapper
module.exports = exports['default']
