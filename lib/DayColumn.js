'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutPropertiesLoose')
)

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _assertThisInitialized2 = _interopRequireDefault(
  require('@babel/runtime/helpers/assertThisInitialized')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _reactDom = require('react-dom')

var _classnames = _interopRequireDefault(require('classnames'))

var _Selection = _interopRequireWildcard(require('./Selection'))

var _dates = _interopRequireDefault(require('./utils/dates'))

var TimeSlotUtils = _interopRequireWildcard(require('./utils/TimeSlots'))

var _selection = require('./utils/selection')

var _helpers = require('./utils/helpers')

var DayEventLayout = _interopRequireWildcard(require('./utils/DayEventLayout'))

var _TimeSlotGroup = _interopRequireDefault(require('./TimeSlotGroup'))

var _TimeGridEvent = _interopRequireDefault(require('./TimeGridEvent'))

var DayColumn =
  /*#__PURE__*/
  (function(_React$Component) {
    ;(0, _inheritsLoose2.default)(DayColumn, _React$Component)

    function DayColumn() {
      var _this

      for (
        var _len = arguments.length, _args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        _args[_key] = arguments[_key]
      }

      _this =
        _React$Component.call.apply(_React$Component, [this].concat(_args)) ||
        this
      _this.state = {
        selecting: false,
        timeIndicatorPosition: null,
      }
      _this.intervalTriggered = false

      _this.renderEvents = function() {
        var _this$props = _this.props,
          events = _this$props.events,
          isRtl = _this$props.rtl,
          selected = _this$props.selected,
          accessors = _this$props.accessors,
          localizer = _this$props.localizer,
          getters = _this$props.getters,
          components = _this$props.components,
          step = _this$props.step,
          timeslots = _this$props.timeslots

        var _assertThisInitialize = (0, _assertThisInitialized2.default)(
            (0, _assertThisInitialized2.default)(_this)
          ),
          slotMetrics = _assertThisInitialize.slotMetrics

        var messages = localizer.messages
        var styledEvents = DayEventLayout.getStyledEvents({
          events: events,
          accessors: accessors,
          slotMetrics: slotMetrics,
          minimumStartDifference: Math.ceil((step * timeslots) / 2),
        })
        return styledEvents.map(function(_ref, idx) {
          var event = _ref.event,
            style = _ref.style
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
                start: start,
                end: end,
              },
              format
            )
          var continuesEarlier =
            startsBeforeDay || slotMetrics.startsBefore(start)
          var continuesLater = startsAfterDay || slotMetrics.startsAfter(end)
          return _react.default.createElement(_TimeGridEvent.default, {
            style: style,
            event: event,
            label: label,
            key: 'evt_' + idx,
            getters: getters,
            isRtl: isRtl,
            components: components,
            continuesEarlier: continuesEarlier,
            continuesLater: continuesLater,
            accessors: accessors,
            selected: (0, _selection.isSelected)(event, selected),
            onClick: function onClick(e) {
              return _this._select(event, e)
            },
            onDoubleClick: function onDoubleClick(e) {
              return _this._doubleClick(event, e)
            },
          })
        })
      }

      _this._selectable = function() {
        var node = (0, _reactDom.findDOMNode)(
          (0, _assertThisInitialized2.default)(
            (0, _assertThisInitialized2.default)(_this)
          )
        )
        var selector = (_this._selector = new _Selection.default(
          function() {
            return (0, _reactDom.findDOMNode)(
              (0, _assertThisInitialized2.default)(
                (0, _assertThisInitialized2.default)(_this)
              )
            )
          },
          {
            longPressThreshold: _this.props.longPressThreshold,
          }
        ))

        var maybeSelect = function maybeSelect(box) {
          var onSelecting = _this.props.onSelecting
          var current = _this.state || {}
          var state = selectionState(box)
          var start = state.startDate,
            end = state.endDate

          if (onSelecting) {
            if (
              (_dates.default.eq(current.startDate, start, 'minutes') &&
                _dates.default.eq(current.endDate, end, 'minutes')) ||
              onSelecting({
                start: start,
                end: end,
              }) === false
            )
              return
          }

          if (
            _this.state.start !== state.start ||
            _this.state.end !== state.end ||
            _this.state.selecting !== state.selecting
          ) {
            _this.setState(state)
          }
        }

        var selectionState = function selectionState(point) {
          var currentSlot = _this.slotMetrics.closestSlotFromPoint(
            point,
            (0, _Selection.getBoundsForNode)(node)
          )

          if (!_this.state.selecting) _this._initialSlot = currentSlot
          var initialSlot = _this._initialSlot
          if (initialSlot === currentSlot)
            currentSlot = _this.slotMetrics.nextSlot(initialSlot)

          var selectRange = _this.slotMetrics.getRange(
            _dates.default.min(initialSlot, currentSlot),
            _dates.default.max(initialSlot, currentSlot)
          )

          return (0, _extends2.default)({}, selectRange, {
            selecting: true,
            top: selectRange.top + '%',
            height: selectRange.height + '%',
          })
        }

        var selectorClicksHandler = function selectorClicksHandler(
          box,
          actionType
        ) {
          if (
            !(0, _Selection.isEvent)(
              (0, _reactDom.findDOMNode)(
                (0, _assertThisInitialized2.default)(
                  (0, _assertThisInitialized2.default)(_this)
                )
              ),
              box
            )
          ) {
            var _selectionState = selectionState(box),
              startDate = _selectionState.startDate,
              endDate = _selectionState.endDate

            _this._selectSlot({
              startDate: startDate,
              endDate: endDate,
              action: actionType,
              box: box,
            })
          }

          _this.setState({
            selecting: false,
          })
        }

        selector.on('selecting', maybeSelect)
        selector.on('selectStart', maybeSelect)
        selector.on('beforeSelect', function(box) {
          if (_this.props.selectable !== 'ignoreEvents') return
          return !(0,
          _Selection.isEvent)((0, _reactDom.findDOMNode)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))), box)
        })
        selector.on('click', function(box) {
          return selectorClicksHandler(box, 'click')
        })
        selector.on('doubleClick', function(box) {
          return selectorClicksHandler(box, 'doubleClick')
        })
        selector.on('select', function(bounds) {
          if (_this.state.selecting) {
            _this._selectSlot(
              (0, _extends2.default)({}, _this.state, {
                action: 'select',
                bounds: bounds,
              })
            )

            _this.setState({
              selecting: false,
            })
          }
        })
        selector.on('reset', function() {
          if (_this.state.selecting) {
            _this.setState({
              selecting: false,
            })
          }
        })
      }

      _this._teardownSelectable = function() {
        if (!_this._selector) return

        _this._selector.teardown()

        _this._selector = null
      }

      _this._selectSlot = function(_ref2) {
        var startDate = _ref2.startDate,
          endDate = _ref2.endDate,
          action = _ref2.action,
          bounds = _ref2.bounds,
          box = _ref2.box
        var current = startDate,
          slots = []

        while (_dates.default.lte(current, endDate)) {
          slots.push(current)
          current = _dates.default.add(current, _this.props.step, 'minutes')
        }

        ;(0, _helpers.notify)(_this.props.onSelectSlot, {
          slots: slots,
          start: startDate,
          end: endDate,
          resourceId: _this.props.resource,
          action: action,
          bounds: bounds,
          box: box,
        })
      }

      _this._select = function() {
        for (
          var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
          _key2 < _len2;
          _key2++
        ) {
          args[_key2] = arguments[_key2]
        }

        ;(0, _helpers.notify)(_this.props.onSelectEvent, args)
      }

      _this._doubleClick = function() {
        for (
          var _len3 = arguments.length, args = new Array(_len3), _key3 = 0;
          _key3 < _len3;
          _key3++
        ) {
          args[_key3] = arguments[_key3]
        }

        ;(0, _helpers.notify)(_this.props.onDoubleClickEvent, args)
      }

      _this.slotMetrics = TimeSlotUtils.getSlotMetrics(_this.props)
      return _this
    }

    var _proto = DayColumn.prototype

    _proto.componentDidMount = function componentDidMount() {
      this.props.selectable && this._selectable()

      if (this.props.isNow) {
        this.setTimeIndicatorPositionUpdateInterval()
      }
    }

    _proto.componentWillUnmount = function componentWillUnmount() {
      this._teardownSelectable()

      this.clearTimeIndicatorInterval()
    }

    _proto.componentWillReceiveProps = function componentWillReceiveProps(
      nextProps
    ) {
      if (nextProps.selectable && !this.props.selectable) this._selectable()
      if (!nextProps.selectable && this.props.selectable)
        this._teardownSelectable()
      this.slotMetrics = this.slotMetrics.update(nextProps)
    }

    _proto.componentDidUpdate = function componentDidUpdate(
      prevProps,
      prevState
    ) {
      if (prevProps.isNow !== this.props.isNow) {
        this.clearTimeIndicatorInterval()

        if (this.props.isNow) {
          this.setTimeIndicatorPositionUpdateInterval(
            prevState.timeIndicatorPosition === this.state.timeIndicatorPosition
          )
        }
      }
    }

    /**
     * @param tail {Boolean} - whether `positionTimeIndicator` call should be
     *   deferred or called upon setting interval (`true` - if deferred);
     */
    _proto.setTimeIndicatorPositionUpdateInterval = function setTimeIndicatorPositionUpdateInterval(
      tail
    ) {
      var _this2 = this

      if (tail === void 0) {
        tail = false
      }

      if (!this.intervalTriggered && !tail) {
        this.positionTimeIndicator()
      }

      this._timeIndicatorTimeout = window.setTimeout(function() {
        _this2.intervalTriggered = true

        _this2.positionTimeIndicator()

        _this2.setTimeIndicatorPositionUpdateInterval()
      }, 60000)
    }

    _proto.clearTimeIndicatorInterval = function clearTimeIndicatorInterval() {
      this.intervalTriggered = false
      window.clearTimeout(this._timeIndicatorTimeout)
    }

    _proto.positionTimeIndicator = function positionTimeIndicator() {
      var _this$props2 = this.props,
        min = _this$props2.min,
        max = _this$props2.max,
        getNow = _this$props2.getNow
      var current = getNow()

      if (current >= min && current <= max) {
        var _this$slotMetrics$get = this.slotMetrics.getRange(current, current),
          top = _this$slotMetrics$get.top

        this.setState({
          timeIndicatorPosition: top,
        })
      } else {
        this.clearTimeIndicatorInterval()
      }
    }

    _proto.render = function render() {
      var _this$props3 = this.props,
        max = _this$props3.max,
        rtl = _this$props3.rtl,
        isNow = _this$props3.isNow,
        resource = _this$props3.resource,
        accessors = _this$props3.accessors,
        localizer = _this$props3.localizer,
        _this$props3$getters = _this$props3.getters,
        dayProp = _this$props3$getters.dayProp,
        getters = (0, _objectWithoutPropertiesLoose2.default)(
          _this$props3$getters,
          ['dayProp']
        ),
        _this$props3$componen = _this$props3.components,
        EventContainer = _this$props3$componen.eventContainerWrapper,
        components = (0, _objectWithoutPropertiesLoose2.default)(
          _this$props3$componen,
          ['eventContainerWrapper']
        )
      var slotMetrics = this.slotMetrics
      var _this$state = this.state,
        selecting = _this$state.selecting,
        top = _this$state.top,
        height = _this$state.height,
        startDate = _this$state.startDate,
        endDate = _this$state.endDate
      var selectDates = {
        start: startDate,
        end: endDate,
      }

      var _dayProp = dayProp(max),
        className = _dayProp.className,
        style = _dayProp.style

      return _react.default.createElement(
        'div',
        {
          style: style,
          className: (0, _classnames.default)(
            className,
            'rbc-day-slot',
            'rbc-time-column',
            isNow && 'rbc-now',
            isNow && 'rbc-today', // WHY
            selecting && 'rbc-slot-selecting'
          ),
        },
        slotMetrics.groups.map(function(grp, idx) {
          return _react.default.createElement(_TimeSlotGroup.default, {
            key: idx,
            group: grp,
            resource: resource,
            getters: getters,
            components: components,
          })
        }),
        _react.default.createElement(
          EventContainer,
          {
            localizer: localizer,
            resource: resource,
            accessors: accessors,
            getters: getters,
            components: components,
            slotMetrics: slotMetrics,
          },
          _react.default.createElement(
            'div',
            {
              className: (0, _classnames.default)(
                'rbc-events-container',
                rtl && 'rtl'
              ),
            },
            this.renderEvents()
          )
        ),
        selecting &&
          _react.default.createElement(
            'div',
            {
              className: 'rbc-slot-selection',
              style: {
                top: top,
                height: height,
              },
            },
            _react.default.createElement(
              'span',
              null,
              localizer.format(selectDates, 'selectRangeFormat')
            )
          ),
        isNow &&
          _react.default.createElement('div', {
            className: 'rbc-current-time-indicator',
            style: {
              top: this.state.timeIndicatorPosition + '%',
            },
          })
      )
    }

    return DayColumn
  })(_react.default.Component)

DayColumn.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        events: _propTypes.default.array.isRequired,
        step: _propTypes.default.number.isRequired,
        date: _propTypes.default.instanceOf(Date).isRequired,
        min: _propTypes.default.instanceOf(Date).isRequired,
        max: _propTypes.default.instanceOf(Date).isRequired,
        getNow: _propTypes.default.func.isRequired,
        isNow: _propTypes.default.bool,
        rtl: _propTypes.default.bool,
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
        className: _propTypes.default.string,
        dragThroughEvents: _propTypes.default.bool,
        resource: _propTypes.default.any,
      }
    : {}
DayColumn.defaultProps = {
  dragThroughEvents: true,
  timeslots: 2,
}
var _default = DayColumn
exports.default = _default
module.exports = exports['default']
