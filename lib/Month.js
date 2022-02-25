'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutPropertiesLoose')
)

var _assertThisInitialized2 = _interopRequireDefault(
  require('@babel/runtime/helpers/assertThisInitialized')
)

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _reactDom = require('react-dom')

var _clsx = _interopRequireDefault(require('clsx'))

var _chunk = _interopRequireDefault(require('lodash/chunk'))

var _constants = require('./utils/constants')

var _helpers = require('./utils/helpers')

var _position = _interopRequireDefault(require('dom-helpers/position'))

var animationFrame = _interopRequireWildcard(
  require('dom-helpers/animationFrame')
)

var _Popup = _interopRequireDefault(require('./Popup'))

var _Overlay = _interopRequireDefault(require('react-overlays/Overlay'))

var _DateContentRow = _interopRequireDefault(require('./DateContentRow'))

var _Header = _interopRequireDefault(require('./Header'))

var _DateHeader = _interopRequireDefault(require('./DateHeader'))

var _eventLevels = require('./utils/eventLevels')

var _excluded = ['date', 'className']

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

var eventsForWeek = function eventsForWeek(
  evts,
  start,
  end,
  accessors,
  localizer
) {
  return evts.filter(function(e) {
    return (0, _eventLevels.inRange)(e, start, end, accessors, localizer)
  })
}

var MonthView = /*#__PURE__*/ (function(_React$Component) {
  ;(0, _inheritsLoose2.default)(MonthView, _React$Component)

  function MonthView() {
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

    _this.getContainer = function() {
      return (0, _reactDom.findDOMNode)(
        (0, _assertThisInitialized2.default)(_this)
      )
    }

    _this.renderWeek = function(week, weekIdx) {
      var _this$props = _this.props,
        events = _this$props.events,
        components = _this$props.components,
        selectable = _this$props.selectable,
        getNow = _this$props.getNow,
        selected = _this$props.selected,
        date = _this$props.date,
        localizer = _this$props.localizer,
        longPressThreshold = _this$props.longPressThreshold,
        accessors = _this$props.accessors,
        getters = _this$props.getters,
        showAllEvents = _this$props.showAllEvents
      var _this$state = _this.state,
        needLimitMeasure = _this$state.needLimitMeasure,
        rowLimit = _this$state.rowLimit // let's not mutate props

      var weeksEvents = eventsForWeek(
        [].concat(events),
        week[0],
        week[week.length - 1],
        accessors,
        localizer
      )
      weeksEvents.sort(function(a, b) {
        return (0, _eventLevels.sortEvents)(a, b, accessors, localizer)
      })
      return /*#__PURE__*/ _react.default.createElement(
        _DateContentRow.default,
        {
          key: weekIdx,
          ref: weekIdx === 0 ? _this.slotRowRef : undefined,
          container: _this.getContainer,
          className: 'rbc-month-row',
          getNow: getNow,
          date: date,
          range: week,
          events: weeksEvents,
          maxRows: showAllEvents ? Infinity : rowLimit,
          selected: selected,
          selectable: selectable,
          components: components,
          accessors: accessors,
          getters: getters,
          localizer: localizer,
          renderHeader: _this.readerDateHeading,
          renderForMeasure: needLimitMeasure,
          onShowMore: _this.handleShowMore,
          onSelect: _this.handleSelectEvent,
          onDoubleClick: _this.handleDoubleClickEvent,
          onKeyPress: _this.handleKeyPressEvent,
          onSelectSlot: _this.handleSelectSlot,
          longPressThreshold: longPressThreshold,
          rtl: _this.props.rtl,
          resizable: _this.props.resizable,
          showAllEvents: showAllEvents,
        }
      )
    }

    _this.readerDateHeading = function(_ref) {
      var date = _ref.date,
        className = _ref.className,
        props = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded)
      var _this$props2 = _this.props,
        currentDate = _this$props2.date,
        getDrilldownView = _this$props2.getDrilldownView,
        localizer = _this$props2.localizer
      var isOffRange = localizer.neq(date, currentDate, 'month')
      var isCurrent = localizer.isSameDate(date, currentDate)
      var drilldownView = getDrilldownView(date)
      var label = localizer.format(date, 'dateFormat')
      var DateHeaderComponent =
        _this.props.components.dateHeader || _DateHeader.default
      return /*#__PURE__*/ _react.default.createElement(
        'div',
        (0, _extends2.default)({}, props, {
          className: (0, _clsx.default)(
            className,
            isOffRange && 'rbc-off-range',
            isCurrent && 'rbc-current'
          ),
          role: 'cell',
        }),
        /*#__PURE__*/ _react.default.createElement(DateHeaderComponent, {
          label: label,
          date: date,
          drilldownView: drilldownView,
          isOffRange: isOffRange,
          onDrillDown: function onDrillDown(e) {
            return _this.handleHeadingClick(date, drilldownView, e)
          },
        })
      )
    }

    _this.measureRowLimit = function() {
      var disableEventLimit = _this.props.disableEventLimit

      _this.setState({
        needLimitMeasure: false,
        rowLimit: disableEventLimit
          ? Infinity
          : _this.slotRowRef.current.getRowLimit(),
      })
    }

    _this.handleSelectSlot = function(range, slotInfo) {
      _this._pendingSelection = _this._pendingSelection.concat(range)
      clearTimeout(_this._selectTimer)
      _this._selectTimer = setTimeout(function() {
        return _this.selectDates(slotInfo)
      })
    }

    _this.handleHeadingClick = function(date, view, e) {
      e.preventDefault()

      _this.clearSelection()

      ;(0, _helpers.notify)(_this.props.onDrillDown, [date, view])
    }

    _this.handleSelectEvent = function() {
      _this.clearSelection()

      for (
        var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
        _key2 < _len2;
        _key2++
      ) {
        args[_key2] = arguments[_key2]
      }

      ;(0, _helpers.notify)(_this.props.onSelectEvent, args)
    }

    _this.handleDoubleClickEvent = function() {
      _this.clearSelection()

      for (
        var _len3 = arguments.length, args = new Array(_len3), _key3 = 0;
        _key3 < _len3;
        _key3++
      ) {
        args[_key3] = arguments[_key3]
      }

      ;(0, _helpers.notify)(_this.props.onDoubleClickEvent, args)
    }

    _this.handleKeyPressEvent = function() {
      _this.clearSelection()

      for (
        var _len4 = arguments.length, args = new Array(_len4), _key4 = 0;
        _key4 < _len4;
        _key4++
      ) {
        args[_key4] = arguments[_key4]
      }

      ;(0, _helpers.notify)(_this.props.onKeyPressEvent, args)
    }

    _this.handleShowMore = function(events, date, cell, slot, target) {
      var _this$props3 = _this.props,
        popup = _this$props3.popup,
        onDrillDown = _this$props3.onDrillDown,
        onShowMore = _this$props3.onShowMore,
        getDrilldownView = _this$props3.getDrilldownView,
        doShowMoreDrillDown = _this$props3.doShowMoreDrillDown //cancel any pending selections so only the event click goes through.

      _this.clearSelection()

      if (popup) {
        var position = (0, _position.default)(
          cell,
          (0, _reactDom.findDOMNode)(
            (0, _assertThisInitialized2.default)(_this)
          )
        )

        _this.setState({
          overlay: {
            date: date,
            events: events,
            position: position,
            target: target,
          },
        })
      } else if (doShowMoreDrillDown) {
        ;(0, _helpers.notify)(onDrillDown, [
          date,
          getDrilldownView(date) || _constants.views.DAY,
        ])
      }

      ;(0, _helpers.notify)(onShowMore, [events, date, slot])
    }

    _this.overlayDisplay = function() {
      _this.setState({
        overlay: null,
      })
    }

    _this._bgRows = []
    _this._pendingSelection = []
    _this.slotRowRef = /*#__PURE__*/ _react.default.createRef()
    _this.state = {
      rowLimit: _this.props.disableEventLimit ? Infinity : 5,
      needLimitMeasure: true,
    }
    return _this
  }

  var _proto = MonthView.prototype

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(
    _ref2
  ) {
    var date = _ref2.date
    var _this$props4 = this.props,
      propsDate = _this$props4.date,
      localizer = _this$props4.localizer
    this.setState({
      needLimitMeasure: localizer.neq(date, propsDate, 'month'),
    })
  }

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this

    var running
    if (this.state.needLimitMeasure) this.measureRowLimit(this.props)
    window.addEventListener(
      'resize',
      (this._resizeListener = function() {
        if (!running) {
          animationFrame.request(function() {
            running = false

            _this2.setState({
              needLimitMeasure: true,
            }) //eslint-disable-line
          })
        }
      }),
      false
    )
  }

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.state.needLimitMeasure) this.measureRowLimit(this.props)
  }

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this._resizeListener, false)
  }

  _proto.render = function render() {
    var _this$props5 = this.props,
      date = _this$props5.date,
      localizer = _this$props5.localizer,
      className = _this$props5.className,
      month = localizer.visibleDays(date, localizer),
      weeks = (0, _chunk.default)(month, 7)
    this._weekCount = weeks.length
    return /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: (0, _clsx.default)('rbc-month-view', className),
        role: 'table',
        'aria-label': 'Month View',
      },
      /*#__PURE__*/ _react.default.createElement(
        'div',
        {
          className: 'rbc-row rbc-month-header',
          role: 'row',
        },
        this.renderHeaders(weeks[0])
      ),
      weeks.map(this.renderWeek),
      this.props.popup && this.renderOverlay()
    )
  }

  _proto.renderHeaders = function renderHeaders(row) {
    var _this$props6 = this.props,
      localizer = _this$props6.localizer,
      components = _this$props6.components
    var first = row[0]
    var last = row[row.length - 1]
    var HeaderComponent = components.header || _Header.default
    return localizer.range(first, last, 'day').map(function(day, idx) {
      return /*#__PURE__*/ _react.default.createElement(
        'div',
        {
          key: 'header_' + idx,
          className: 'rbc-header',
        },
        /*#__PURE__*/ _react.default.createElement(HeaderComponent, {
          date: day,
          localizer: localizer,
          label: localizer.format(day, 'weekdayFormat'),
        })
      )
    })
  }

  _proto.renderOverlay = function renderOverlay() {
    var _this3 = this

    var overlay = (this.state && this.state.overlay) || {}
    var _this$props7 = this.props,
      accessors = _this$props7.accessors,
      localizer = _this$props7.localizer,
      components = _this$props7.components,
      getters = _this$props7.getters,
      selected = _this$props7.selected,
      popupOffset = _this$props7.popupOffset
    return /*#__PURE__*/ _react.default.createElement(
      _Overlay.default,
      {
        rootClose: true,
        placement: 'bottom',
        show: !!overlay.position,
        onHide: function onHide() {
          return _this3.setState({
            overlay: null,
          })
        },
        target: function target() {
          return overlay.target
        },
      },
      function(_ref3) {
        var props = _ref3.props
        return /*#__PURE__*/ _react.default.createElement(
          _Popup.default,
          (0, _extends2.default)({}, props, {
            popupOffset: popupOffset,
            accessors: accessors,
            getters: getters,
            selected: selected,
            components: components,
            localizer: localizer,
            position: overlay.position,
            show: _this3.overlayDisplay,
            events: overlay.events,
            slotStart: overlay.date,
            slotEnd: overlay.end,
            onSelect: _this3.handleSelectEvent,
            onDoubleClick: _this3.handleDoubleClickEvent,
            onKeyPress: _this3.handleKeyPressEvent,
            handleDragStart: _this3.props.handleDragStart,
          })
        )
      }
    )
  }

  _proto.selectDates = function selectDates(slotInfo) {
    var slots = this._pendingSelection.slice()

    this._pendingSelection = []
    slots.sort(function(a, b) {
      return +a - +b
    })
    var start = new Date(slots[0])
    var end = new Date(slots[slots.length - 1])
    end.setDate(slots[slots.length - 1].getDate() + 1)
    ;(0, _helpers.notify)(this.props.onSelectSlot, {
      slots: slots,
      start: start,
      end: end,
      action: slotInfo.action,
      bounds: slotInfo.bounds,
      box: slotInfo.box,
    })
  }

  _proto.clearSelection = function clearSelection() {
    clearTimeout(this._selectTimer)
    this._pendingSelection = []
  }

  return MonthView
})(_react.default.Component)

MonthView.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        events: _propTypes.default.array.isRequired,
        date: _propTypes.default.instanceOf(Date),
        min: _propTypes.default.instanceOf(Date),
        max: _propTypes.default.instanceOf(Date),
        step: _propTypes.default.number,
        getNow: _propTypes.default.func.isRequired,
        scrollToTime: _propTypes.default.instanceOf(Date),
        rtl: _propTypes.default.bool,
        resizable: _propTypes.default.bool,
        width: _propTypes.default.number,
        accessors: _propTypes.default.object.isRequired,
        components: _propTypes.default.object.isRequired,
        getters: _propTypes.default.object.isRequired,
        localizer: _propTypes.default.object.isRequired,
        selected: _propTypes.default.object,
        selectable: _propTypes.default.oneOf([true, false, 'ignoreEvents']),
        longPressThreshold: _propTypes.default.number,
        onNavigate: _propTypes.default.func,
        onSelectSlot: _propTypes.default.func,
        onSelectEvent: _propTypes.default.func,
        onDoubleClickEvent: _propTypes.default.func,
        onKeyPressEvent: _propTypes.default.func,
        onShowMore: _propTypes.default.func,
        showAllEvents: _propTypes.default.bool,
        doShowMoreDrillDown: _propTypes.default.bool,
        onDrillDown: _propTypes.default.func,
        getDrilldownView: _propTypes.default.func.isRequired,
        disableEventLimit: _propTypes.default.bool,
        popup: _propTypes.default.bool,
        handleDragStart: _propTypes.default.func,
        popupOffset: _propTypes.default.oneOfType([
          _propTypes.default.number,
          _propTypes.default.shape({
            x: _propTypes.default.number,
            y: _propTypes.default.number,
          }),
        ]),
      }
    : {}

MonthView.range = function(date, _ref4) {
  var localizer = _ref4.localizer
  var start = localizer.firstVisibleDay(date, localizer)
  var end = localizer.lastVisibleDay(date, localizer)
  return {
    start: start,
    end: end,
  }
}

MonthView.navigate = function(date, action, _ref5) {
  var localizer = _ref5.localizer

  switch (action) {
    case _constants.navigate.PREVIOUS:
      return localizer.add(date, -1, 'month')

    case _constants.navigate.NEXT:
      return localizer.add(date, 1, 'month')

    default:
      return date
  }
}

MonthView.title = function(date, _ref6) {
  var localizer = _ref6.localizer
  return localizer.format(date, 'monthHeaderFormat')
}

var _default = MonthView
exports.default = _default
module.exports = exports.default
