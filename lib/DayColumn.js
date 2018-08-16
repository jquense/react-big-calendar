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

var _reactDom = require('react-dom')

var _classnames = require('classnames')

var _classnames2 = _interopRequireDefault(_classnames)

var _Selection = require('./Selection')

var _Selection2 = _interopRequireDefault(_Selection)

var _dates = require('./utils/dates')

var _dates2 = _interopRequireDefault(_dates)

var _TimeSlots = require('./utils/TimeSlots')

var TimeSlotUtils = _interopRequireWildcard(_TimeSlots)

var _selection = require('./utils/selection')

var _helpers = require('./utils/helpers')

var _DayEventLayout = require('./utils/DayEventLayout')

var DayEventLayout = _interopRequireWildcard(_DayEventLayout)

var _TimeSlotGroup = require('./TimeSlotGroup')

var _TimeSlotGroup2 = _interopRequireDefault(_TimeSlotGroup)

var _TimeGridEvent = require('./TimeGridEvent')

var _TimeGridEvent2 = _interopRequireDefault(_TimeGridEvent)

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj
  } else {
    var newObj = {}
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key]
      }
    }
    newObj.default = obj
    return newObj
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _objectWithoutProperties(obj, keys) {
  var target = {}
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    target[i] = obj[i]
  }
  return target
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

var DayColumn = (function(_React$Component) {
  _inherits(DayColumn, _React$Component)

  function DayColumn() {
    _classCallCheck(this, DayColumn)

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

    _initialiseProps.call(_this)

    _this.slotMetrics = TimeSlotUtils.getSlotMetrics(_this.props)
    return _this
  }

  DayColumn.prototype.componentDidMount = function componentDidMount() {
    this.props.selectable && this._selectable()
  }

  DayColumn.prototype.componentWillUnmount = function componentWillUnmount() {
    this._teardownSelectable()
  }

  DayColumn.prototype.componentWillReceiveProps = function componentWillReceiveProps(
    nextProps
  ) {
    if (nextProps.selectable && !this.props.selectable) this._selectable()
    if (!nextProps.selectable && this.props.selectable)
      this._teardownSelectable()

    this.slotMetrics = this.slotMetrics.update(nextProps)
  }

  DayColumn.prototype.renderSelection = function renderSelection() {
    var selecting = this.state.selecting

    if (selecting) {
      var _state = this.state,
        top = _state.top,
        height = _state.height,
        startDate = _state.startDate,
        endDate = _state.endDate,
        noMovementYet = _state.noMovementYet
      var _props = this.props,
        localizer = _props.localizer,
        components = _props.components

      var selectDates = { start: startDate, end: endDate }

      var selectionElement = void 0
      if (
        noMovementYet &&
        components &&
        components.beforeSelectIndicatorComponent
      ) {
        // if the user is about to start selecting but hasn't started dragging yet
        selectionElement = components.beforeSelectIndicatorComponent({
          top: top,
          height: height,
          startDate: startDate,
          endDate: endDate,
        })
      } else {
        // the user has already started dragging/selecting a time slot
        selectionElement = _react2.default.createElement(
          'div',
          {
            className: 'rbc-slot-selection',
            style: { top: top, height: height },
          },
          _react2.default.createElement(
            'span',
            null,
            localizer.format(selectDates, 'selectRangeFormat')
          )
        )
      }

      return selectionElement
    }

    return null
  }

  DayColumn.prototype.render = function render() {
    var _props2 = this.props,
      max = _props2.max,
      rtl = _props2.rtl,
      date = _props2.date,
      getNow = _props2.getNow,
      resource = _props2.resource,
      accessors = _props2.accessors,
      localizer = _props2.localizer,
      _props2$getters = _props2.getters,
      dayProp = _props2$getters.dayProp,
      getters = _objectWithoutProperties(_props2$getters, ['dayProp']),
      _props2$components = _props2.components,
      EventContainer = _props2$components.eventContainerWrapper,
      components = _objectWithoutProperties(_props2$components, [
        'eventContainerWrapper',
      ])

    var slotMetrics = this.slotMetrics
    var selecting = this.state.selecting

    var _dayProp = dayProp(max),
      className = _dayProp.className,
      style = _dayProp.style

    var current = getNow()

    return _react2.default.createElement(
      'div',
      {
        style: style,
        className: (0, _classnames2.default)(
          className,
          'rbc-day-slot',
          'rbc-time-column',
          selecting && 'rbc-slot-selecting',
          _dates2.default.eq(date, current, 'day') && 'rbc-today'
        ),
      },
      slotMetrics.groups.map(function(grp, idx) {
        return _react2.default.createElement(_TimeSlotGroup2.default, {
          key: idx,
          group: grp,
          resource: resource,
          getters: getters,
          components: components,
        })
      }),
      _react2.default.createElement(
        EventContainer,
        {
          localizer: localizer,
          resource: resource,
          accessors: accessors,
          getters: getters,
          components: components,
          slotMetrics: slotMetrics,
        },
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)(
              'rbc-events-container',
              rtl && 'rtl'
            ),
          },
          this.renderEvents()
        )
      ),
      this.renderSelection()
    )
  }

  return DayColumn
})(_react2.default.Component)

DayColumn.propTypes = {
  events: _propTypes2.default.array.isRequired,
  step: _propTypes2.default.number.isRequired,
  date: _propTypes2.default.instanceOf(Date).isRequired,
  min: _propTypes2.default.instanceOf(Date).isRequired,
  max: _propTypes2.default.instanceOf(Date).isRequired,
  getNow: _propTypes2.default.func.isRequired,

  rtl: _propTypes2.default.bool,

  accessors: _propTypes2.default.object.isRequired,
  components: _propTypes2.default.object.isRequired,
  getters: _propTypes2.default.object.isRequired,
  localizer: _propTypes2.default.object.isRequired,

  showMultiDayTimes: _propTypes2.default.bool,
  culture: _propTypes2.default.string,
  timeslots: _propTypes2.default.number,

  selected: _propTypes2.default.object,
  selectable: _propTypes2.default.oneOf([true, false, 'ignoreEvents']),
  eventOffset: _propTypes2.default.number,
  longPressThreshold: _propTypes2.default.number,

  onSelecting: _propTypes2.default.func,
  onSelectSlot: _propTypes2.default.func.isRequired,
  onSelectEvent: _propTypes2.default.func.isRequired,
  onDoubleClickEvent: _propTypes2.default.func.isRequired,

  className: _propTypes2.default.string,
  dragThroughEvents: _propTypes2.default.bool,
  resource: _propTypes2.default.any,
}
DayColumn.defaultProps = {
  dragThroughEvents: true,
  timeslots: 2,
}

var _initialiseProps = function _initialiseProps() {
  var _this2 = this

  this.state = { selecting: false }

  this.renderEvents = function() {
    var _props3 = _this2.props,
      events = _props3.events,
      isRtl = _props3.rtl,
      selected = _props3.selected,
      accessors = _props3.accessors,
      localizer = _props3.localizer,
      getters = _props3.getters,
      components = _props3.components,
      step = _props3.step,
      timeslots = _props3.timeslots
    var slotMetrics = _this2.slotMetrics
    var messages = localizer.messages

    var styledEvents = DayEventLayout.getStyledEvents({
      events: events,
      accessors: accessors,
      slotMetrics: slotMetrics,
      minimumStartDifference: Math.ceil(step * timeslots / 2),
    })

    return styledEvents.map(function(_ref, idx) {
      var _React$createElement

      var event = _ref.event,
        style = _ref.style

      var end = accessors.end(event)
      var start = accessors.start(event)
      var format = 'eventTimeRangeFormat'
      var label = void 0

      var startsBeforeDay = slotMetrics.startsBeforeDay(start)
      var startsAfterDay = slotMetrics.startsAfterDay(end)

      if (startsBeforeDay) format = 'eventTimeRangeEndFormat'
      else if (startsAfterDay) format = 'eventTimeRangeStartFormat'

      if (startsBeforeDay && startsAfterDay) label = messages.allDay
      else label = localizer.format({ start: start, end: end }, format)

      var continuesEarlier = startsBeforeDay || slotMetrics.startsBefore(start)
      var continuesLater = startsAfterDay || slotMetrics.startsAfter(end)

      return _react2.default.createElement(
        _TimeGridEvent2.default,
        ((_React$createElement = {
          style: style,
          event: event,
          label: label,
          key: 'evt_' + idx,
          getters: getters,
          isRtl: isRtl,
        }),
        (_React$createElement['getters'] = getters),
        (_React$createElement.components = components),
        (_React$createElement.continuesEarlier = continuesEarlier),
        (_React$createElement.continuesLater = continuesLater),
        (_React$createElement.accessors = accessors),
        (_React$createElement.selected = (0, _selection.isSelected)(
          event,
          selected
        )),
        (_React$createElement.onClick = function onClick(e) {
          return _this2._select(event, e)
        }),
        (_React$createElement.onDoubleClick = function onDoubleClick(e) {
          return _this2._doubleClick(event, e)
        }),
        _React$createElement)
      )
    })
  }

  this._selectable = function() {
    var node = (0, _reactDom.findDOMNode)(_this2)
    var selector = (_this2._selector = new _Selection2.default(
      function() {
        return (0, _reactDom.findDOMNode)(_this2)
      },
      {
        longPressThreshold: _this2.props.longPressThreshold,
      }
    ))

    var maybeSelect = function maybeSelect(box) {
      var onSelecting = _this2.props.onSelecting
      var current = _this2.state || {}
      var state = selectionState(box)
      var start = state.startDate,
        end = state.endDate

      if (onSelecting) {
        if (
          (_dates2.default.eq(current.startDate, start, 'minutes') &&
            _dates2.default.eq(current.endDate, end, 'minutes')) ||
          onSelecting({ start: start, end: end }) === false
        )
          return
      }

      if (
        _this2.state.start !== state.start ||
        _this2.state.end !== state.end ||
        _this2.state.selecting !== state.selecting ||
        _this2.state.noMovementYet === true
      ) {
        _this2.setState(state)
      }
    }

    var selectionState = function selectionState(point) {
      var currentSlot = _this2.slotMetrics.closestSlotFromPoint(
        point,
        (0, _Selection.getBoundsForNode)(node)
      )

      if (!_this2.state.selecting) _this2._initialSlot = currentSlot

      var initialSlot = _this2._initialSlot
      if (initialSlot === currentSlot)
        currentSlot = _this2.slotMetrics.nextSlot(initialSlot)

      var selectRange = _this2.slotMetrics.getRange(
        _dates2.default.min(initialSlot, currentSlot),
        _dates2.default.max(initialSlot, currentSlot)
      )

      return _extends({}, selectRange, {
        selecting: true,
        noMovementYet: point.noMovementYet,

        top: selectRange.top + '%',
        height: selectRange.height + '%',
      })
    }

    var selectorClicksHandler = function selectorClicksHandler(
      box,
      actionType
    ) {
      if (!(0, _Selection.isEvent)((0, _reactDom.findDOMNode)(_this2), box)) {
        var _selectionState = selectionState(box),
          startDate = _selectionState.startDate,
          endDate = _selectionState.endDate

        _this2._selectSlot({
          startDate: startDate,
          endDate: endDate,
          action: actionType,
          box: box,
        })
      }
      _this2.setState({ selecting: false })
    }

    selector.on('selecting', maybeSelect)
    selector.on('selectStart', maybeSelect)

    selector.on('beforeSelect', function(box) {
      var didNotClickOnAnEvent = !(0, _Selection.isEvent)(
        (0, _reactDom.findDOMNode)(_this2),
        box
      )
      if (
        didNotClickOnAnEvent &&
        _this2.props.components &&
        _this2.props.components.beforeSelectIndicatorComponent
      ) {
        maybeSelect(_extends({}, box, { noMovementYet: true }))
      }
      if (_this2.props.selectable !== 'ignoreEvents') return

      return didNotClickOnAnEvent
    })

    selector.on('click', function(box) {
      return selectorClicksHandler(box, 'click')
    })

    selector.on('doubleClick', function(box) {
      return selectorClicksHandler(box, 'doubleClick')
    })

    selector.on('select', function(bounds) {
      if (_this2.state.selecting) {
        _this2._selectSlot(
          _extends({}, _this2.state, { action: 'select', bounds: bounds })
        )
        _this2.setState({ selecting: false })
      }
    })
  }

  this._teardownSelectable = function() {
    if (!_this2._selector) return
    _this2._selector.teardown()
    _this2._selector = null
  }

  this._selectSlot = function(_ref2) {
    var startDate = _ref2.startDate,
      endDate = _ref2.endDate,
      action = _ref2.action,
      bounds = _ref2.bounds,
      box = _ref2.box

    var current = startDate,
      slots = []

    while (_dates2.default.lte(current, endDate)) {
      slots.push(current)
      current = _dates2.default.add(current, _this2.props.step, 'minutes')
    }

    ;(0, _helpers.notify)(_this2.props.onSelectSlot, {
      slots: slots,
      start: startDate,
      end: endDate,
      resourceId: _this2.props.resource,
      action: action,
      bounds: bounds,
      box: box,
    })
  }

  this._select = function() {
    for (
      var _len2 = arguments.length, args = Array(_len2), _key2 = 0;
      _key2 < _len2;
      _key2++
    ) {
      args[_key2] = arguments[_key2]
    }

    ;(0, _helpers.notify)(_this2.props.onSelectEvent, args)
  }

  this._doubleClick = function() {
    for (
      var _len3 = arguments.length, args = Array(_len3), _key3 = 0;
      _key3 < _len3;
      _key3++
    ) {
      args[_key3] = arguments[_key3]
    }

    ;(0, _helpers.notify)(_this2.props.onDoubleClickEvent, args)
  }
}

exports.default = DayColumn
module.exports = exports['default']
