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

var _classnames = require('classnames')

var _classnames2 = _interopRequireDefault(_classnames)

var _requestAnimationFrame = require('dom-helpers/util/requestAnimationFrame')

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _reactDom = require('react-dom')

var _dates = require('./utils/dates')

var _dates2 = _interopRequireDefault(_dates)

var _localizer = require('./localizer')

var _localizer2 = _interopRequireDefault(_localizer)

var _DayColumn = require('./DayColumn')

var _DayColumn2 = _interopRequireDefault(_DayColumn)

var _TimeColumn = require('./TimeColumn')

var _TimeColumn2 = _interopRequireDefault(_TimeColumn)

var _DateContentRow = require('./DateContentRow')

var _DateContentRow2 = _interopRequireDefault(_DateContentRow)

var _Header = require('./Header')

var _Header2 = _interopRequireDefault(_Header)

var _width = require('dom-helpers/query/width')

var _width2 = _interopRequireDefault(_width)

var _scrollbarSize = require('dom-helpers/util/scrollbarSize')

var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize)

var _messages = require('./utils/messages')

var _messages2 = _interopRequireDefault(_messages)

var _propTypes3 = require('./utils/propTypes')

var _helpers = require('./utils/helpers')

var _accessors = require('./utils/accessors')

var _eventLevels = require('./utils/eventLevels')

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

var TimeGrid = (function(_Component) {
  _inherits(TimeGrid, _Component)

  function TimeGrid(props) {
    _classCallCheck(this, TimeGrid)

    var _this = _possibleConstructorReturn(this, _Component.call(this, props))

    _this.handleSelectAllDaySlot = function(slots, slotInfo) {
      var onSelectSlot = _this.props.onSelectSlot

      ;(0, _helpers.notify)(onSelectSlot, {
        slots: slots,
        start: slots[0],
        end: slots[slots.length - 1],
        action: slotInfo.action,
      })
    }

    _this.checkOverflow = function() {
      if (_this._updatingOverflow) return

      var isOverflowing =
        _this.refs.content.scrollHeight > _this.refs.content.clientHeight

      if (_this.state.isOverflowing !== isOverflowing) {
        _this._updatingOverflow = true
        _this.setState({ isOverflowing: isOverflowing }, function() {
          _this._updatingOverflow = false
        })
      }
    }

    _this.state = { gutterWidth: undefined, isOverflowing: null }
    _this.handleSelectEvent = _this.handleSelectEvent.bind(_this)
    _this.handleDoubleClickEvent = _this.handleDoubleClickEvent.bind(_this)
    _this.handleHeaderClick = _this.handleHeaderClick.bind(_this)
    return _this
  }

  TimeGrid.prototype.componentWillMount = function componentWillMount() {
    this._gutters = []
    this.calculateScroll()
  }

  TimeGrid.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this

    this.checkOverflow()

    if (this.props.width == null) {
      this.measureGutter()
    }
    this.applyScroll()

    this.positionTimeIndicator()
    this.triggerTimeIndicatorUpdate()

    window.addEventListener('resize', function() {
      _requestAnimationFrame2.default.cancel(_this2.rafHandle)
      _this2.rafHandle = (0, _requestAnimationFrame2.default)(
        _this2.checkOverflow
      )
    })
  }

  TimeGrid.prototype.componentWillUnmount = function componentWillUnmount() {
    window.clearTimeout(this._timeIndicatorTimeout)
  }

  TimeGrid.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.props.width == null && !this.state.gutterWidth) {
      this.measureGutter()
    }

    this.applyScroll()
    this.positionTimeIndicator()
    //this.checkOverflow()
  }

  TimeGrid.prototype.componentWillReceiveProps = function componentWillReceiveProps(
    nextProps
  ) {
    var _props = this.props,
      range = _props.range,
      scrollToTime = _props.scrollToTime
    // When paginating, reset scroll

    if (
      !_dates2.default.eq(nextProps.range[0], range[0], 'minute') ||
      !_dates2.default.eq(nextProps.scrollToTime, scrollToTime, 'minute')
    ) {
      this.calculateScroll(nextProps)
    }
  }

  TimeGrid.prototype.render = function render() {
    var _this3 = this

    var _props2 = this.props,
      events = _props2.events,
      range = _props2.range,
      width = _props2.width,
      startAccessor = _props2.startAccessor,
      endAccessor = _props2.endAccessor,
      getNow = _props2.getNow,
      resources = _props2.resources,
      allDayAccessor = _props2.allDayAccessor,
      showMultiDayTimes = _props2.showMultiDayTimes

    width = width || this.state.gutterWidth

    var start = range[0],
      end = range[range.length - 1]

    this.slots = range.length

    var allDayEvents = [],
      rangeEvents = []

    events.forEach(function(event) {
      if ((0, _eventLevels.inRange)(event, start, end, _this3.props)) {
        var eStart = (0, _accessors.accessor)(event, startAccessor),
          eEnd = (0, _accessors.accessor)(event, endAccessor)

        if (
          (0, _accessors.accessor)(event, allDayAccessor) ||
          (_dates2.default.isJustDate(eStart) &&
            _dates2.default.isJustDate(eEnd)) ||
          (!showMultiDayTimes && !_dates2.default.eq(eStart, eEnd, 'day'))
        ) {
          allDayEvents.push(event)
        } else {
          rangeEvents.push(event)
        }
      }
    })

    allDayEvents.sort(function(a, b) {
      return (0, _eventLevels.sortEvents)(a, b, _this3.props)
    })

    var gutterRef = function gutterRef(ref) {
      return (_this3._gutters[1] = ref && (0, _reactDom.findDOMNode)(ref))
    }

    var eventsRendered = this.renderEvents(
      range,
      rangeEvents,
      getNow(),
      resources || [null]
    )

    return _react2.default.createElement(
      'div',
      { className: 'rbc-time-view' },
      this.renderHeader(range, allDayEvents, width, resources),
      _react2.default.createElement(
        'div',
        { ref: 'content', className: 'rbc-time-content' },
        _react2.default.createElement(
          _TimeColumn2.default,
          _extends({}, this.props, {
            showLabels: true,
            style: { width: width },
            ref: gutterRef,
            className: 'rbc-time-gutter',
          })
        ),
        eventsRendered,
        _react2.default.createElement('div', {
          ref: 'timeIndicator',
          className: 'rbc-current-time-indicator',
        })
      )
    )
  }

  TimeGrid.prototype.renderEvents = function renderEvents(
    range,
    events,
    today,
    resources
  ) {
    var _this4 = this

    var _props3 = this.props,
      min = _props3.min,
      max = _props3.max,
      endAccessor = _props3.endAccessor,
      startAccessor = _props3.startAccessor,
      resourceAccessor = _props3.resourceAccessor,
      resourceIdAccessor = _props3.resourceIdAccessor,
      components = _props3.components

    return range.map(function(date, idx) {
      var daysEvents = events.filter(function(event) {
        return _dates2.default.inRange(
          date,
          (0, _accessors.accessor)(event, startAccessor),
          (0, _accessors.accessor)(event, endAccessor),
          'day'
        )
      })

      return resources.map(function(resource, id) {
        var eventsToDisplay = !resource
          ? daysEvents
          : daysEvents.filter(function(event) {
              return (
                (0, _accessors.accessor)(event, resourceAccessor) ===
                (0, _accessors.accessor)(resource, resourceIdAccessor)
              )
            })

        return _react2.default.createElement(
          _DayColumn2.default,
          _extends({}, _this4.props, {
            min: _dates2.default.merge(date, min),
            max: _dates2.default.merge(date, max),
            resource: resource && resource.id,
            eventComponent: components.event,
            eventWrapperComponent: components.eventWrapper,
            dayWrapperComponent: components.dayWrapper,
            className: (0, _classnames2.default)({
              'rbc-now': _dates2.default.eq(date, today, 'day'),
            }),
            style: (0, _eventLevels.segStyle)(1, _this4.slots),
            key: idx + '-' + id,
            date: date,
            events: eventsToDisplay,
          })
        )
      })
    })
  }

  TimeGrid.prototype.renderHeader = function renderHeader(
    range,
    events,
    width,
    resources
  ) {
    var _this5 = this

    var _props4 = this.props,
      messages = _props4.messages,
      rtl = _props4.rtl,
      selectable = _props4.selectable,
      components = _props4.components,
      getNow = _props4.getNow

    var _ref = this.state || {},
      isOverflowing = _ref.isOverflowing

    var style = {}
    if (isOverflowing)
      style[rtl ? 'marginLeft' : 'marginRight'] =
        (0, _scrollbarSize2.default)() + 'px'

    var headerRendered = resources
      ? this.renderHeaderResources(range, resources)
      : (0, _messages2.default)(messages).allDay

    return _react2.default.createElement(
      'div',
      {
        ref: 'headerCell',
        className: (0, _classnames2.default)(
          'rbc-time-header',
          isOverflowing && 'rbc-overflowing'
        ),
        style: style,
      },
      _react2.default.createElement(
        'div',
        { className: 'rbc-row' },
        _react2.default.createElement('div', {
          className: 'rbc-label rbc-header-gutter',
          style: { width: width },
        }),
        this.renderHeaderCells(range)
      ),
      resources &&
        _react2.default.createElement(
          'div',
          { className: 'rbc-row rbc-row-resource' },
          _react2.default.createElement('div', {
            className: 'rbc-label rbc-header-gutter',
            style: { width: width },
          }),
          headerRendered
        ),
      _react2.default.createElement(
        'div',
        { className: 'rbc-row' },
        _react2.default.createElement(
          'div',
          {
            ref: function ref(_ref2) {
              return (_this5._gutters[0] = _ref2)
            },
            className: 'rbc-label rbc-header-gutter',
            style: { width: width },
          },
          (0, _messages2.default)(messages).allDay
        ),
        _react2.default.createElement(_DateContentRow2.default, {
          getNow: getNow,
          minRows: 2,
          range: range,
          rtl: this.props.rtl,
          events: events,
          className: 'rbc-allday-cell',
          selectable: selectable,
          onSelectSlot: this.handleSelectAllDaySlot,
          dateCellWrapper: components.dateCellWrapper,
          dayPropGetter: this.props.dayPropGetter,
          eventComponent: this.props.components.event,
          eventWrapperComponent: this.props.components.eventWrapper,
          titleAccessor: this.props.titleAccessor,
          tooltipAccessor: this.props.tooltipAccessor,
          startAccessor: this.props.startAccessor,
          endAccessor: this.props.endAccessor,
          allDayAccessor: this.props.allDayAccessor,
          eventPropGetter: this.props.eventPropGetter,
          selected: this.props.selected,
          isAllDay: true,
          onSelect: this.handleSelectEvent,
          onDoubleClick: this.handleDoubleClickEvent,
          longPressThreshold: this.props.longPressThreshold,
        })
      )
    )
  }

  TimeGrid.prototype.renderHeaderResources = function renderHeaderResources(
    range,
    resources
  ) {
    var _this6 = this

    var _props5 = this.props,
      resourceTitleAccessor = _props5.resourceTitleAccessor,
      getNow = _props5.getNow

    var today = getNow()
    return range.map(function(date, i) {
      return resources.map(function(resource, j) {
        return _react2.default.createElement(
          'div',
          {
            key: i + '-' + j,
            className: (0, _classnames2.default)(
              'rbc-header',
              _dates2.default.eq(date, today, 'day') && 'rbc-today'
            ),
            style: (0, _eventLevels.segStyle)(1, _this6.slots),
          },
          _react2.default.createElement(
            'span',
            null,
            (0, _accessors.accessor)(resource, resourceTitleAccessor)
          )
        )
      })
    })
  }

  TimeGrid.prototype.renderHeaderCells = function renderHeaderCells(range) {
    var _this7 = this

    var _props6 = this.props,
      dayFormat = _props6.dayFormat,
      culture = _props6.culture,
      components = _props6.components,
      dayPropGetter = _props6.dayPropGetter,
      getDrilldownView = _props6.getDrilldownView,
      getNow = _props6.getNow

    var HeaderComponent = components.header || _Header2.default
    var today = getNow()

    return range.map(function(date, i) {
      var drilldownView = getDrilldownView(date)
      var label = _localizer2.default.format(date, dayFormat, culture)

      var _ref3 = (dayPropGetter && dayPropGetter(date)) || {},
        className = _ref3.className,
        dayStyles = _ref3.style

      var header = _react2.default.createElement(HeaderComponent, {
        date: date,
        label: label,
        localizer: _localizer2.default,
        format: dayFormat,
        culture: culture,
      })

      return _react2.default.createElement(
        'div',
        {
          key: i,
          className: (0, _classnames2.default)(
            'rbc-header',
            className,
            _dates2.default.eq(date, today, 'day') && 'rbc-today'
          ),
          style: _extends(
            {},
            dayStyles,
            (0, _eventLevels.segStyle)(1, _this7.slots)
          ),
        },
        drilldownView
          ? _react2.default.createElement(
              'a',
              {
                href: '#',
                onClick: function onClick(e) {
                  return _this7.handleHeaderClick(date, drilldownView, e)
                },
              },
              header
            )
          : _react2.default.createElement('span', null, header)
      )
    })
  }

  TimeGrid.prototype.handleHeaderClick = function handleHeaderClick(
    date,
    view,
    e
  ) {
    e.preventDefault()
    ;(0, _helpers.notify)(this.props.onDrillDown, [date, view])
  }

  TimeGrid.prototype.handleSelectEvent = function handleSelectEvent() {
    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    ;(0, _helpers.notify)(this.props.onSelectEvent, args)
  }

  TimeGrid.prototype.handleDoubleClickEvent = function handleDoubleClickEvent() {
    for (
      var _len2 = arguments.length, args = Array(_len2), _key2 = 0;
      _key2 < _len2;
      _key2++
    ) {
      args[_key2] = arguments[_key2]
    }

    ;(0, _helpers.notify)(this.props.onDoubleClickEvent, args)
  }

  TimeGrid.prototype.handleSelectAlldayEvent = function handleSelectAlldayEvent() {
    //cancel any pending selections so only the event click goes through.
    this.clearSelection()

    for (
      var _len3 = arguments.length, args = Array(_len3), _key3 = 0;
      _key3 < _len3;
      _key3++
    ) {
      args[_key3] = arguments[_key3]
    }

    ;(0, _helpers.notify)(this.props.onSelectEvent, args)
  }

  TimeGrid.prototype.clearSelection = function clearSelection() {
    clearTimeout(this._selectTimer)
    this._pendingSelection = []
  }

  TimeGrid.prototype.measureGutter = function measureGutter() {
    var width = this.state.gutterWidth
    var gutterCells = this._gutters

    if (!width) {
      width = Math.max.apply(Math, gutterCells.map(_width2.default))

      if (width) {
        this.setState({ gutterWidth: width })
      }
    }
  }

  TimeGrid.prototype.applyScroll = function applyScroll() {
    if (this._scrollRatio) {
      var content = this.refs.content

      content.scrollTop = content.scrollHeight * this._scrollRatio
      // Only do this once
      this._scrollRatio = null
    }
  }

  TimeGrid.prototype.calculateScroll = function calculateScroll() {
    var props =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : this.props
    var min = props.min,
      max = props.max,
      scrollToTime = props.scrollToTime

    var diffMillis = scrollToTime - _dates2.default.startOf(scrollToTime, 'day')
    var totalMillis = _dates2.default.diff(max, min)

    this._scrollRatio = diffMillis / totalMillis
  }

  TimeGrid.prototype.positionTimeIndicator = function positionTimeIndicator() {
    var _props7 = this.props,
      rtl = _props7.rtl,
      min = _props7.min,
      max = _props7.max,
      getNow = _props7.getNow

    var current = getNow()

    var secondsGrid = _dates2.default.diff(max, min, 'seconds')
    var secondsPassed = _dates2.default.diff(current, min, 'seconds')

    var timeIndicator = this.refs.timeIndicator
    var factor = secondsPassed / secondsGrid
    var timeGutter = this._gutters[this._gutters.length - 1]

    if (timeGutter && current >= min && current <= max) {
      var pixelHeight = timeGutter.offsetHeight
      var offset = Math.floor(factor * pixelHeight)

      timeIndicator.style.display = 'block'
      timeIndicator.style[rtl ? 'left' : 'right'] = 0
      timeIndicator.style[rtl ? 'right' : 'left'] =
        timeGutter.offsetWidth + 'px'
      timeIndicator.style.top = offset + 'px'
    } else {
      timeIndicator.style.display = 'none'
    }
  }

  TimeGrid.prototype.triggerTimeIndicatorUpdate = function triggerTimeIndicatorUpdate() {
    var _this8 = this

    // Update the position of the time indicator every minute
    this._timeIndicatorTimeout = window.setTimeout(function() {
      _this8.positionTimeIndicator()

      _this8.triggerTimeIndicatorUpdate()
    }, 60000)
  }

  return TimeGrid
})(_react.Component)

TimeGrid.propTypes = {
  events: _propTypes2.default.array.isRequired,
  resources: _propTypes2.default.array,

  step: _propTypes2.default.number,
  range: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(Date)),
  min: _propTypes2.default.instanceOf(Date),
  max: _propTypes2.default.instanceOf(Date),
  getNow: _propTypes2.default.func.isRequired,

  scrollToTime: _propTypes2.default.instanceOf(Date),
  eventPropGetter: _propTypes2.default.func,
  dayPropGetter: _propTypes2.default.func,
  dayFormat: _propTypes3.dateFormat,
  showMultiDayTimes: _propTypes2.default.bool,
  culture: _propTypes2.default.string,

  rtl: _propTypes2.default.bool,
  width: _propTypes2.default.number,

  titleAccessor: _propTypes3.accessor.isRequired,
  tooltipAccessor: _propTypes3.accessor.isRequired,
  allDayAccessor: _propTypes3.accessor.isRequired,
  startAccessor: _propTypes3.accessor.isRequired,
  endAccessor: _propTypes3.accessor.isRequired,
  resourceAccessor: _propTypes3.accessor.isRequired,

  resourceIdAccessor: _propTypes3.accessor.isRequired,
  resourceTitleAccessor: _propTypes3.accessor.isRequired,

  selected: _propTypes2.default.object,
  selectable: _propTypes2.default.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: _propTypes2.default.number,

  onNavigate: _propTypes2.default.func,
  onSelectSlot: _propTypes2.default.func,
  onSelectEnd: _propTypes2.default.func,
  onSelectStart: _propTypes2.default.func,
  onSelectEvent: _propTypes2.default.func,
  onDoubleClickEvent: _propTypes2.default.func,
  onDrillDown: _propTypes2.default.func,
  getDrilldownView: _propTypes2.default.func.isRequired,

  messages: _propTypes2.default.object,
  components: _propTypes2.default.object.isRequired,
}
TimeGrid.defaultProps = {
  step: 30,
  min: _dates2.default.startOf(new Date(), 'day'),
  max: _dates2.default.endOf(new Date(), 'day'),
  scrollToTime: _dates2.default.startOf(new Date(), 'day'),
  /* this is needed to satisfy requirements from TimeColumn required props
   * There is a strange bug in React, using ...TimeColumn.defaultProps causes weird crashes
   */
  type: 'gutter',
}
exports.default = TimeGrid
module.exports = exports['default']
