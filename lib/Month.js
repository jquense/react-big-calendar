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

var _dates = require('./utils/dates')

var _dates2 = _interopRequireDefault(_dates)

var _localizer = require('./localizer')

var _localizer2 = _interopRequireDefault(_localizer)

var _chunk = require('lodash/chunk')

var _chunk2 = _interopRequireDefault(_chunk)

var _constants = require('./utils/constants')

var _helpers = require('./utils/helpers')

var _position = require('dom-helpers/query/position')

var _position2 = _interopRequireDefault(_position)

var _requestAnimationFrame = require('dom-helpers/util/requestAnimationFrame')

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame)

var _Popup = require('./Popup')

var _Popup2 = _interopRequireDefault(_Popup)

var _Overlay = require('react-overlays/lib/Overlay')

var _Overlay2 = _interopRequireDefault(_Overlay)

var _DateContentRow = require('./DateContentRow')

var _DateContentRow2 = _interopRequireDefault(_DateContentRow)

var _Header = require('./Header')

var _Header2 = _interopRequireDefault(_Header)

var _DateHeader = require('./DateHeader')

var _DateHeader2 = _interopRequireDefault(_DateHeader)

var _propTypes3 = require('./utils/propTypes')

var _eventLevels = require('./utils/eventLevels')

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

var eventsForWeek = function eventsForWeek(evts, start, end, props) {
  return evts.filter(function(e) {
    return (0, _eventLevels.inRange)(e, start, end, props)
  })
}

var propTypes = {
  events: _propTypes2.default.array.isRequired,
  date: _propTypes2.default.instanceOf(Date),

  min: _propTypes2.default.instanceOf(Date),
  max: _propTypes2.default.instanceOf(Date),

  step: _propTypes2.default.number,
  getNow: _propTypes2.default.func.isRequired,

  scrollToTime: _propTypes2.default.instanceOf(Date),
  eventPropGetter: _propTypes2.default.func,
  dayPropGetter: _propTypes2.default.func,

  culture: _propTypes2.default.string,
  dayFormat: _propTypes3.dateFormat,

  rtl: _propTypes2.default.bool,
  width: _propTypes2.default.number,

  titleAccessor: _propTypes3.accessor.isRequired,
  tooltipAccessor: _propTypes3.accessor.isRequired,
  allDayAccessor: _propTypes3.accessor.isRequired,
  startAccessor: _propTypes3.accessor.isRequired,
  endAccessor: _propTypes3.accessor.isRequired,

  selected: _propTypes2.default.object,
  selectable: _propTypes2.default.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: _propTypes2.default.number,

  onNavigate: _propTypes2.default.func,
  onSelectSlot: _propTypes2.default.func,
  onSelectEvent: _propTypes2.default.func,
  onDoubleClickEvent: _propTypes2.default.func,
  onShowMore: _propTypes2.default.func,
  onDrillDown: _propTypes2.default.func,
  getDrilldownView: _propTypes2.default.func.isRequired,

  dateFormat: _propTypes3.dateFormat,

  weekdayFormat: _propTypes3.dateFormat,
  popup: _propTypes2.default.bool,

  messages: _propTypes2.default.object,
  components: _propTypes2.default.object.isRequired,
  popupOffset: _propTypes2.default.oneOfType([
    _propTypes2.default.number,
    _propTypes2.default.shape({
      x: _propTypes2.default.number,
      y: _propTypes2.default.number,
    }),
  ]),
}

var MonthView = (function(_React$Component) {
  _inherits(MonthView, _React$Component)

  function MonthView() {
    _classCallCheck(this, MonthView)

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

    _this._bgRows = []
    _this._pendingSelection = []
    _this.state = {
      rowLimit: 5,
      needLimitMeasure: true,
    }
    return _this
  }

  MonthView.prototype.componentWillReceiveProps = function componentWillReceiveProps(
    _ref
  ) {
    var date = _ref.date

    this.setState({
      needLimitMeasure: !_dates2.default.eq(date, this.props.date),
    })
  }

  MonthView.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this

    var running = void 0

    if (this.state.needLimitMeasure) this.measureRowLimit(this.props)

    window.addEventListener(
      'resize',
      (this._resizeListener = function() {
        if (!running) {
          ;(0, _requestAnimationFrame2.default)(function() {
            running = false
            _this2.setState({ needLimitMeasure: true }) //eslint-disable-line
          })
        }
      }),
      false
    )
  }

  MonthView.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.state.needLimitMeasure) this.measureRowLimit(this.props)
  }

  MonthView.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this._resizeListener, false)
  }

  MonthView.prototype.render = function render() {
    var _props = this.props,
      date = _props.date,
      culture = _props.culture,
      weekdayFormat = _props.weekdayFormat,
      className = _props.className,
      month = _dates2.default.visibleDays(date, culture),
      weeks = (0, _chunk2.default)(month, 7)

    this._weekCount = weeks.length

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('rbc-month-view', className) },
      _react2.default.createElement(
        'div',
        { className: 'rbc-row rbc-month-header' },
        this.renderHeaders(weeks[0], weekdayFormat, culture)
      ),
      weeks.map(this.renderWeek),
      this.props.popup && this.renderOverlay()
    )
  }

  MonthView.prototype.renderHeaders = function renderHeaders(
    row,
    format,
    culture
  ) {
    var first = row[0]
    var last = row[row.length - 1]
    var HeaderComponent = this.props.components.header || _Header2.default

    return _dates2.default.range(first, last, 'day').map(function(day, idx) {
      return _react2.default.createElement(
        'div',
        {
          key: 'header_' + idx,
          className: 'rbc-header',
          style: (0, _eventLevels.segStyle)(1, 7),
        },
        _react2.default.createElement(HeaderComponent, {
          date: day,
          label: _localizer2.default.format(day, format, culture),
          localizer: _localizer2.default,
          format: format,
          culture: culture,
        })
      )
    })
  }

  MonthView.prototype.renderOverlay = function renderOverlay() {
    var _this3 = this

    var overlay = (this.state && this.state.overlay) || {}
    var components = this.props.components

    return _react2.default.createElement(
      _Overlay2.default,
      {
        rootClose: true,
        placement: 'bottom',
        container: this,
        show: !!overlay.position,
        onHide: function onHide() {
          return _this3.setState({ overlay: null })
        },
      },
      _react2.default.createElement(
        _Popup2.default,
        _extends({}, this.props, {
          eventComponent: components.event,
          eventWrapperComponent: components.eventWrapper,
          position: overlay.position,
          events: overlay.events,
          slotStart: overlay.date,
          slotEnd: overlay.end,
          onSelect: this.handleSelectEvent,
          onDoubleClick: this.handleDoubleClickEvent,
        })
      )
    )
  }

  MonthView.prototype.measureRowLimit = function measureRowLimit() {
    this.setState({
      needLimitMeasure: false,
      rowLimit: this.refs.slotRow.getRowLimit(),
    })
  }

  MonthView.prototype.selectDates = function selectDates(slotInfo) {
    var slots = this._pendingSelection.slice()

    this._pendingSelection = []

    slots.sort(function(a, b) {
      return +a - +b
    })

    ;(0, _helpers.notify)(this.props.onSelectSlot, {
      slots: slots,
      start: slots[0],
      end: slots[slots.length - 1],
      action: slotInfo.action,
    })
  }

  MonthView.prototype.clearSelection = function clearSelection() {
    clearTimeout(this._selectTimer)
    this._pendingSelection = []
  }

  return MonthView
})(_react2.default.Component)

MonthView.displayName = 'MonthView'
MonthView.propTypes = propTypes

var _initialiseProps = function _initialiseProps() {
  var _this4 = this

  this.getContainer = function() {
    return (0, _reactDom.findDOMNode)(_this4)
  }

  this.renderWeek = function(week, weekIdx) {
    var _props2 = _this4.props,
      events = _props2.events,
      components = _props2.components,
      selectable = _props2.selectable,
      titleAccessor = _props2.titleAccessor,
      tooltipAccessor = _props2.tooltipAccessor,
      startAccessor = _props2.startAccessor,
      endAccessor = _props2.endAccessor,
      allDayAccessor = _props2.allDayAccessor,
      getNow = _props2.getNow,
      eventPropGetter = _props2.eventPropGetter,
      dayPropGetter = _props2.dayPropGetter,
      messages = _props2.messages,
      selected = _props2.selected,
      date = _props2.date,
      longPressThreshold = _props2.longPressThreshold
    var _state = _this4.state,
      needLimitMeasure = _state.needLimitMeasure,
      rowLimit = _state.rowLimit

    events = eventsForWeek(events, week[0], week[week.length - 1], _this4.props)
    events.sort(function(a, b) {
      return (0, _eventLevels.sortEvents)(a, b, _this4.props)
    })

    return _react2.default.createElement(_DateContentRow2.default, {
      key: weekIdx,
      ref: weekIdx === 0 ? 'slotRow' : undefined,
      container: _this4.getContainer,
      className: 'rbc-month-row',
      getNow: getNow,
      date: date,
      range: week,
      events: events,
      maxRows: rowLimit,
      selected: selected,
      selectable: selectable,
      messages: messages,
      titleAccessor: titleAccessor,
      tooltipAccessor: tooltipAccessor,
      startAccessor: startAccessor,
      endAccessor: endAccessor,
      allDayAccessor: allDayAccessor,
      eventPropGetter: eventPropGetter,
      dayPropGetter: dayPropGetter,
      renderHeader: _this4.readerDateHeading,
      renderForMeasure: needLimitMeasure,
      onShowMore: _this4.handleShowMore,
      onSelect: _this4.handleSelectEvent,
      onDoubleClick: _this4.handleDoubleClickEvent,
      onSelectSlot: _this4.handleSelectSlot,
      eventComponent: components.event,
      eventWrapperComponent: components.eventWrapper,
      dateCellWrapper: components.dateCellWrapper,
      longPressThreshold: longPressThreshold,
    })
  }

  this.readerDateHeading = function(_ref3) {
    var date = _ref3.date,
      className = _ref3.className,
      props = _objectWithoutProperties(_ref3, ['date', 'className'])

    var _props3 = _this4.props,
      currentDate = _props3.date,
      getDrilldownView = _props3.getDrilldownView,
      dateFormat = _props3.dateFormat,
      culture = _props3.culture

    var isOffRange =
      _dates2.default.month(date) !== _dates2.default.month(currentDate)
    var isCurrent = _dates2.default.eq(date, currentDate, 'day')
    var drilldownView = getDrilldownView(date)
    var label = _localizer2.default.format(date, dateFormat, culture)
    var DateHeaderComponent =
      _this4.props.components.dateHeader || _DateHeader2.default

    return _react2.default.createElement(
      'div',
      _extends({}, props, {
        className: (0, _classnames2.default)(
          className,
          isOffRange && 'rbc-off-range',
          isCurrent && 'rbc-current'
        ),
      }),
      _react2.default.createElement(DateHeaderComponent, {
        label: label,
        date: date,
        drilldownView: drilldownView,
        isOffRange: isOffRange,
        onDrillDown: function onDrillDown(e) {
          return _this4.handleHeadingClick(date, drilldownView, e)
        },
      })
    )
  }

  this.handleSelectSlot = function(range, slotInfo) {
    _this4._pendingSelection = _this4._pendingSelection.concat(range)

    clearTimeout(_this4._selectTimer)
    _this4._selectTimer = setTimeout(function() {
      return _this4.selectDates(slotInfo)
    })
  }

  this.handleHeadingClick = function(date, view, e) {
    e.preventDefault()
    _this4.clearSelection()
    ;(0, _helpers.notify)(_this4.props.onDrillDown, [date, view])
  }

  this.handleSelectEvent = function() {
    for (
      var _len2 = arguments.length, args = Array(_len2), _key2 = 0;
      _key2 < _len2;
      _key2++
    ) {
      args[_key2] = arguments[_key2]
    }

    _this4.clearSelection()
    ;(0, _helpers.notify)(_this4.props.onSelectEvent, args)
  }

  this.handleDoubleClickEvent = function() {
    for (
      var _len3 = arguments.length, args = Array(_len3), _key3 = 0;
      _key3 < _len3;
      _key3++
    ) {
      args[_key3] = arguments[_key3]
    }

    _this4.clearSelection()
    ;(0, _helpers.notify)(_this4.props.onDoubleClickEvent, args)
  }

  this.handleShowMore = function(events, date, cell, slot) {
    var _props4 = _this4.props,
      popup = _props4.popup,
      onDrillDown = _props4.onDrillDown,
      onShowMore = _props4.onShowMore,
      getDrilldownView = _props4.getDrilldownView
    //cancel any pending selections so only the event click goes through.

    _this4.clearSelection()

    if (popup) {
      var position = (0, _position2.default)(
        cell,
        (0, _reactDom.findDOMNode)(_this4)
      )

      _this4.setState({
        overlay: { date: date, events: events, position: position },
      })
    } else {
      ;(0, _helpers.notify)(onDrillDown, [
        date,
        getDrilldownView(date) || _constants.views.DAY,
      ])
    }

    ;(0, _helpers.notify)(onShowMore, [events, date, slot])
  }
}

MonthView.navigate = function(date, action) {
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return _dates2.default.add(date, -1, 'month')

    case _constants.navigate.NEXT:
      return _dates2.default.add(date, 1, 'month')

    default:
      return date
  }
}

MonthView.title = function(date, _ref2) {
  var formats = _ref2.formats,
    culture = _ref2.culture
  return _localizer2.default.format(date, formats.monthHeaderFormat, culture)
}

exports.default = MonthView
module.exports = exports['default']
