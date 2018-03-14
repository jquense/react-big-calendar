'use strict'

exports.__esModule = true
exports.DayWrapper = exports.DateCellWrapper = undefined

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

exports.getEventTimes = getEventTimes

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _reactDnd = require('react-dnd')

var _classnames = require('classnames')

var _classnames2 = _interopRequireDefault(_classnames)

var _propTypes3 = require('../../utils/propTypes')

var _accessors = require('../../utils/accessors')

var _dates = require('../../utils/dates')

var _dates2 = _interopRequireDefault(_dates)

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

function getEventTimes(start, end, dropDate, type) {
  // Calculate duration between original start and end dates
  var duration = _dates2.default.diff(start, end)

  // If the event is dropped in a "Day" cell, preserve an event's start time by extracting the hours and minutes off
  // the original start date and add it to newDate.value
  var nextStart =
    type === 'dateCellWrapper'
      ? _dates2.default.merge(dropDate, start)
      : dropDate

  var nextEnd = _dates2.default.add(nextStart, duration, 'milliseconds')

  return {
    start: nextStart,
    end: nextEnd,
  }
}

var propTypes = {
  connectDropTarget: _propTypes2.default.func.isRequired,
  type: _propTypes2.default.string,
  isOver: _propTypes2.default.bool,
}

var DraggableBackgroundWrapper = (function(_React$Component) {
  _inherits(DraggableBackgroundWrapper, _React$Component)

  function DraggableBackgroundWrapper() {
    _classCallCheck(this, DraggableBackgroundWrapper)

    return _possibleConstructorReturn(
      this,
      _React$Component.apply(this, arguments)
    )
  }

  // constructor(...args) {
  //   super(...args);
  //   this.state = { isOver: false };
  // }
  //
  // componentWillMount() {
  //   let monitor = this.context.dragDropManager.getMonitor()
  //
  //   this.monitor = monitor
  //
  //   this.unsubscribeToStateChange = monitor
  //     .subscribeToStateChange(this.handleStateChange)
  //
  //   this.unsubscribeToOffsetChange = monitor
  //     .subscribeToOffsetChange(this.handleOffsetChange)
  // }
  //
  // componentWillUnmount() {
  //   this.monitor = null
  //   this.unsubscribeToStateChange()
  //   this.unsubscribeToOffsetChange()
  // }
  //
  // handleStateChange = () => {
  //   const event = this.monitor.getItem();
  //   if (!event && this.state.isOver) {
  //     this.setState({ isOver: false });
  //   }
  // }
  //
  // handleOffsetChange = () => {
  //   const { value } = this.props;
  //   const { start, end } = this.monitor.getItem();
  //
  //   const isOver = dates.inRange(value, start, end, 'minute');
  //   if (this.state.isOver !== isOver) {
  //     this.setState({ isOver });
  //   }
  // };

  DraggableBackgroundWrapper.prototype.render = function render() {
    var _props = this.props,
      connectDropTarget = _props.connectDropTarget,
      children = _props.children,
      type = _props.type,
      isOver = _props.isOver

    var BackgroundWrapper = _index2.default.components[type]

    var resultingChildren = children
    if (isOver)
      resultingChildren = _react2.default.cloneElement(children, {
        className: (0, _classnames2.default)(
          children.props.className,
          'rbc-addons-dnd-over'
        ),
      })

    return _react2.default.createElement(
      BackgroundWrapper,
      null,
      connectDropTarget(resultingChildren)
    )
  }

  return DraggableBackgroundWrapper
})(_react2.default.Component)

DraggableBackgroundWrapper.propTypes = propTypes

DraggableBackgroundWrapper.contextTypes = {
  onEventDrop: _propTypes2.default.func,
  onEventResize: _propTypes2.default.func,
  dragDropManager: _propTypes2.default.object,
  startAccessor: _propTypes3.accessor,
  endAccessor: _propTypes3.accessor,
}

function createWrapper(type) {
  function collectTarget(connect, monitor) {
    return {
      type: type,
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
    }
  }

  var dropTarget = {
    drop: function drop(_, monitor, _ref) {
      var props = _ref.props,
        context = _ref.context

      var event = monitor.getItem()
      var value = props.value
      var onEventDrop = context.onEventDrop,
        onEventResize = context.onEventResize,
        startAccessor = context.startAccessor,
        endAccessor = context.endAccessor

      var start = (0, _accessors.accessor)(event, startAccessor)
      var end = (0, _accessors.accessor)(event, endAccessor)

      if (monitor.getItemType() === 'event') {
        onEventDrop(
          _extends(
            {
              event: event,
            },
            getEventTimes(start, end, value, type)
          )
        )
      }

      if (monitor.getItemType() === 'resize') {
        switch (event.type) {
          case 'resizeTop': {
            return onEventResize('drop', {
              event: event,
              start: value,
              end: event.end,
            })
          }
          case 'resizeBottom': {
            var nextEnd = _dates2.default.add(value, 30, 'minutes')
            return onEventResize('drop', {
              event: event,
              start: event.start,
              end: nextEnd,
            })
          }
          case 'resizeLeft': {
            return onEventResize('drop', {
              event: event,
              start: value,
              end: event.end,
            })
          }
          case 'resizeRight': {
            var _nextEnd = _dates2.default.add(value, 1, 'day')
            return onEventResize('drop', {
              event: event,
              start: event.start,
              end: _nextEnd,
            })
          }
        }

        // Catch all
        onEventResize('drop', {
          event: event,
          start: event.start,
          end: value,
        })
      }
    },
  }

  return (0, _reactDnd.DropTarget)(
    ['event', 'resize'],
    dropTarget,
    collectTarget
  )(DraggableBackgroundWrapper)
}

var DateCellWrapper = (exports.DateCellWrapper = createWrapper(
  'dateCellWrapper'
))
var DayWrapper = (exports.DayWrapper = createWrapper('dayWrapper'))
