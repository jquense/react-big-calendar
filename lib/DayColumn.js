'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

exports.__esModule = true
exports.default = void 0

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutPropertiesLoose')
)

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _reactDom = require('react-dom')

var _clsx = _interopRequireDefault(require('clsx'))

var _Selection = _interopRequireWildcard(require('./Selection'))

var dates = _interopRequireWildcard(require('./utils/dates'))

var TimeSlotUtils = _interopRequireWildcard(require('./utils/TimeSlots'))

var _selection = require('./utils/selection')

var _helpers = require('./utils/helpers')

var DayEventLayout = _interopRequireWildcard(require('./utils/DayEventLayout'))

var _TimeSlotGroup = _interopRequireDefault(require('./TimeSlotGroup'))

var _TimeGridEvent = _interopRequireDefault(require('./TimeGridEvent'))

var _propTypes2 = require('./utils/propTypes')

var _jsxFileName =
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\DayColumn.js'

class DayColumn extends _react.default.Component {
  constructor() {
    var _this

    super(...arguments)
    _this = this
    this.state = {
      selecting: false,
      timeIndicatorPosition: null,
    }
    this.intervalTriggered = false

    this.renderEvents = _ref => {
      var { events, isBackgroundEvent } = _ref
      var {
        rtl,
        selected,
        accessors,
        localizer,
        getters,
        components,
        step,
        timeslots,
        dayLayoutAlgorithm,
        resizable,
      } = this.props
      var { slotMetrics } = this
      var { messages } = localizer
      var styledEvents = DayEventLayout.getStyledEvents({
        events,
        accessors,
        slotMetrics,
        minimumStartDifference: Math.ceil((step * timeslots) / 2),
        dayLayoutAlgorithm,
      })
      return styledEvents.map((_ref2, idx) => {
        var { event, style } = _ref2
        var end = accessors.end(event)
        var start = accessors.start(event)
        var format = 'eventTimeRangeFormat'
        var label
        var startsBeforeDay = slotMetrics.startsBeforeDay(start)
        var startsAfterDay = slotMetrics.startsAfterDay(end)
        if (startsBeforeDay) format = 'eventTimeRangeEndFormat'
        else if (startsAfterDay) format = 'eventTimeRangeStartFormat'
        if (startsBeforeDay && startsAfterDay) label = messages.allDay
        else
          label = localizer.format(
            {
              start,
              end,
            },
            format
          )
        var continuesEarlier =
          startsBeforeDay || slotMetrics.startsBefore(start)
        var continuesLater = startsAfterDay || slotMetrics.startsAfter(end)
        return /*#__PURE__*/ _react.default.createElement(
          _TimeGridEvent.default,
          {
            style: style,
            event: event,
            label: label,
            key: 'evt_' + idx,
            getters: getters,
            rtl: rtl,
            components: components,
            continuesEarlier: continuesEarlier,
            continuesLater: continuesLater,
            accessors: accessors,
            selected: (0, _selection.isSelected)(event, selected),
            onClick: e => this._select(event, e),
            onDoubleClick: e => this._doubleClick(event, e),
            isBackgroundEvent: isBackgroundEvent,
            onKeyPress: e => this._keyPress(event, e),
            resizable: resizable,
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 225,
              columnNumber: 9,
            },
          }
        )
      })
    }

    this._selectable = () => {
      var node = (0, _reactDom.findDOMNode)(this)
      var selector = (this._selector = new _Selection.default(
        () => (0, _reactDom.findDOMNode)(this),
        {
          longPressThreshold: this.props.longPressThreshold,
        }
      ))

      var maybeSelect = box => {
        var onSelecting = this.props.onSelecting
        var current = this.state || {}
        var state = selectionState(box)
        var { startDate: start, endDate: end } = state

        if (onSelecting) {
          if (
            (dates.eq(current.startDate, start, 'minutes') &&
              dates.eq(current.endDate, end, 'minutes')) ||
            onSelecting({
              start,
              end,
              resourceId: this.props.resource,
            }) === false
          )
            return
        }

        if (
          this.state.start !== state.start ||
          this.state.end !== state.end ||
          this.state.selecting !== state.selecting
        ) {
          this.setState(state)
        }
      }

      var selectionState = point => {
        var currentSlot = this.slotMetrics.closestSlotFromPoint(
          point,
          (0, _Selection.getBoundsForNode)(node)
        )

        if (!this.state.selecting) {
          this._initialSlot = currentSlot
        }

        var initialSlot = this._initialSlot

        if (dates.lte(initialSlot, currentSlot)) {
          currentSlot = this.slotMetrics.nextSlot(currentSlot)
        } else if (dates.gt(initialSlot, currentSlot)) {
          initialSlot = this.slotMetrics.nextSlot(initialSlot)
        }

        var selectRange = this.slotMetrics.getRange(
          dates.min(initialSlot, currentSlot),
          dates.max(initialSlot, currentSlot)
        )
        return (0, _extends2.default)({}, selectRange, {
          selecting: true,
          top: selectRange.top + '%',
          height: selectRange.height + '%',
        })
      }

      var selectorClicksHandler = (box, actionType) => {
        if (!(0, _Selection.isEvent)((0, _reactDom.findDOMNode)(this), box)) {
          var { startDate, endDate } = selectionState(box)

          this._selectSlot({
            startDate,
            endDate,
            action: actionType,
            box,
          })
        }

        this.setState({
          selecting: false,
        })
      }

      selector.on('selecting', maybeSelect)
      selector.on('selectStart', maybeSelect)
      selector.on('beforeSelect', box => {
        if (this.props.selectable !== 'ignoreEvents') return
        return !(0, _Selection.isEvent)((0, _reactDom.findDOMNode)(this), box)
      })
      selector.on('click', box => selectorClicksHandler(box, 'click'))
      selector.on('doubleClick', box =>
        selectorClicksHandler(box, 'doubleClick')
      )
      selector.on('select', bounds => {
        if (this.state.selecting) {
          this._selectSlot(
            (0, _extends2.default)({}, this.state, {
              action: 'select',
              bounds,
            })
          )

          this.setState({
            selecting: false,
          })
        }
      })
      selector.on('reset', () => {
        if (this.state.selecting) {
          this.setState({
            selecting: false,
          })
        }
      })
    }

    this._teardownSelectable = () => {
      if (!this._selector) return

      this._selector.teardown()

      this._selector = null
    }

    this._selectSlot = _ref3 => {
      var { startDate, endDate, action, bounds, box } = _ref3
      var current = startDate,
        slots = []

      while (dates.lte(current, endDate)) {
        slots.push(current)
        current = new Date(+current + this.props.step * 60 * 1000) // using Date ensures not to create an endless loop the day DST begins
      }

      ;(0, _helpers.notify)(this.props.onSelectSlot, {
        slots,
        start: startDate,
        end: endDate,
        resourceId: this.props.resource,
        action,
        bounds,
        box,
      })
    }

    this._select = function() {
      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key]
      }

      ;(0, _helpers.notify)(_this.props.onSelectEvent, args)
    }

    this._doubleClick = function() {
      for (
        var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
        _key2 < _len2;
        _key2++
      ) {
        args[_key2] = arguments[_key2]
      }

      ;(0, _helpers.notify)(_this.props.onDoubleClickEvent, args)
    }

    this._keyPress = function() {
      for (
        var _len3 = arguments.length, args = new Array(_len3), _key3 = 0;
        _key3 < _len3;
        _key3++
      ) {
        args[_key3] = arguments[_key3]
      }

      ;(0, _helpers.notify)(_this.props.onKeyPressEvent, args)
    }

    this.slotMetrics = TimeSlotUtils.getSlotMetrics(this.props)
  }

  componentDidMount() {
    this.props.selectable && this._selectable()

    if (this.props.isNow) {
      this.setTimeIndicatorPositionUpdateInterval()
    }
  }

  componentWillUnmount() {
    this._teardownSelectable()

    this.clearTimeIndicatorInterval()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selectable && !this.props.selectable) this._selectable()
    if (!nextProps.selectable && this.props.selectable)
      this._teardownSelectable()
    this.slotMetrics = this.slotMetrics.update(nextProps)
  }

  componentDidUpdate(prevProps, prevState) {
    var getNowChanged = !dates.eq(
      prevProps.getNow(),
      this.props.getNow(),
      'minutes'
    )

    if (prevProps.isNow !== this.props.isNow || getNowChanged) {
      this.clearTimeIndicatorInterval()

      if (this.props.isNow) {
        var tail =
          !getNowChanged &&
          dates.eq(prevProps.date, this.props.date, 'minutes') &&
          prevState.timeIndicatorPosition === this.state.timeIndicatorPosition
        this.setTimeIndicatorPositionUpdateInterval(tail)
      }
    } else if (
      this.props.isNow &&
      (!dates.eq(prevProps.min, this.props.min, 'minutes') ||
        !dates.eq(prevProps.max, this.props.max, 'minutes'))
    ) {
      this.positionTimeIndicator()
    }
  }
  /**
   * @param tail {Boolean} - whether `positionTimeIndicator` call should be
   *   deferred or called upon setting interval (`true` - if deferred);
   */

  setTimeIndicatorPositionUpdateInterval(tail) {
    if (tail === void 0) {
      tail = false
    }

    if (!this.intervalTriggered && !tail) {
      this.positionTimeIndicator()
    }

    this._timeIndicatorTimeout = window.setTimeout(() => {
      this.intervalTriggered = true
      this.positionTimeIndicator()
      this.setTimeIndicatorPositionUpdateInterval()
    }, 60000)
  }

  clearTimeIndicatorInterval() {
    this.intervalTriggered = false
    window.clearTimeout(this._timeIndicatorTimeout)
  }

  positionTimeIndicator() {
    var { min, max, getNow } = this.props
    var current = getNow()

    if (current >= min && current <= max) {
      var top = this.slotMetrics.getCurrentTimePosition(current)
      this.intervalTriggered = true
      this.setState({
        timeIndicatorPosition: top,
      })
    } else {
      this.clearTimeIndicatorInterval()
    }
  }

  render() {
    var _this$props = this.props,
      {
        max,
        rtl,
        isNow,
        resource,
        accessors,
        localizer,
        getters: { dayProp },
        components: { eventContainerWrapper: EventContainer },
      } = _this$props,
      getters = (0, _objectWithoutPropertiesLoose2.default)(
        _this$props.getters,
        ['dayProp']
      ),
      components = (0,
      _objectWithoutPropertiesLoose2.default)(_this$props.components, [
        'eventContainerWrapper',
      ])
    var { slotMetrics } = this
    var { selecting, top, height, startDate, endDate } = this.state
    var selectDates = {
      start: startDate,
      end: endDate,
    }
    var { className, style } = dayProp(max)
    return /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        style: style,
        className: (0, _clsx.default)(
          className,
          'rbc-day-slot',
          'rbc-time-column',
          isNow && 'rbc-now',
          isNow && 'rbc-today', // WHY
          selecting && 'rbc-slot-selecting'
        ),
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 129,
          columnNumber: 7,
        },
      },
      slotMetrics.groups.map((grp, idx) =>
        /*#__PURE__*/ _react.default.createElement(_TimeSlotGroup.default, {
          key: idx,
          group: grp,
          resource: resource,
          getters: getters,
          components: components,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 141,
            columnNumber: 11,
          },
        })
      ),
      /*#__PURE__*/ _react.default.createElement(
        EventContainer,
        {
          localizer: localizer,
          resource: resource,
          accessors: accessors,
          getters: getters,
          components: components,
          slotMetrics: slotMetrics,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 149,
            columnNumber: 9,
          },
        },
        /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            className: (0, _clsx.default)('rbc-events-container', rtl && 'rtl'),
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 157,
              columnNumber: 11,
            },
          },
          this.renderEvents({
            events: this.props.backgroundEvents,
            isBackgroundEvent: true,
          }),
          this.renderEvents({
            events: this.props.events,
          })
        )
      ),
      selecting &&
        /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            className: 'rbc-slot-selection',
            style: {
              top,
              height,
            },
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 167,
              columnNumber: 11,
            },
          },
          /*#__PURE__*/ _react.default.createElement(
            'span',
            {
              __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 168,
                columnNumber: 13,
              },
            },
            localizer.format(selectDates, 'selectRangeFormat')
          )
        ),
      isNow &&
        this.intervalTriggered &&
        /*#__PURE__*/ _react.default.createElement('div', {
          className: 'rbc-current-time-indicator',
          style: {
            top: this.state.timeIndicatorPosition + '%',
          },
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 172,
            columnNumber: 11,
          },
        })
    )
  }
}

DayColumn.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        events: _propTypes.default.array.isRequired,
        backgroundEvents: _propTypes.default.array.isRequired,
        step: _propTypes.default.number.isRequired,
        date: _propTypes.default.instanceOf(Date).isRequired,
        min: _propTypes.default.instanceOf(Date).isRequired,
        max: _propTypes.default.instanceOf(Date).isRequired,
        getNow: _propTypes.default.func.isRequired,
        isNow: _propTypes.default.bool,
        rtl: _propTypes.default.bool,
        resizable: _propTypes.default.bool,
        accessors: _propTypes.default.object.isRequired,
        components: _propTypes.default.object.isRequired,
        getters: _propTypes.default.object.isRequired,
        localizer: _propTypes.default.object.isRequired,
        showMultiDayTimes: _propTypes.default.bool,
        culture: _propTypes.default.string,
        timeslots: _propTypes.default.number,
        selected: _propTypes.default.object,
        selectable: _propTypes.default.oneOf([true, false, 'ignoreEvents']),
        eventOffset: _propTypes.default.number,
        longPressThreshold: _propTypes.default.number,
        onSelecting: _propTypes.default.func,
        onSelectSlot: _propTypes.default.func.isRequired,
        onSelectEvent: _propTypes.default.func.isRequired,
        onDoubleClickEvent: _propTypes.default.func.isRequired,
        onKeyPressEvent: _propTypes.default.func,
        className: _propTypes.default.string,
        dragThroughEvents: _propTypes.default.bool,
        resource: _propTypes.default.any,
        dayLayoutAlgorithm: _propTypes2.DayLayoutAlgorithmPropType,
      }
    : {}
DayColumn.defaultProps = {
  dragThroughEvents: true,
  timeslots: 2,
}
var _default = DayColumn
exports.default = _default
module.exports = exports.default
