'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _clsx = _interopRequireDefault(require('clsx'))

var animationFrame = _interopRequireWildcard(
  require('dom-helpers/animationFrame')
)

var _react = _interopRequireWildcard(require('react'))

var _reactDom = require('react-dom')

var _memoizeOne = _interopRequireDefault(require('memoize-one'))

var dates = _interopRequireWildcard(require('./utils/dates'))

var _DayColumn = _interopRequireDefault(require('./DayColumn'))

var _TimeGutter = _interopRequireDefault(require('./TimeGutter'))

var _width = _interopRequireDefault(require('dom-helpers/width'))

var _TimeGridHeader = _interopRequireDefault(require('./TimeGridHeader'))

var _helpers = require('./utils/helpers')

var _eventLevels = require('./utils/eventLevels')

var _Resources = _interopRequireDefault(require('./utils/Resources'))

var _propTypes2 = require('./utils/propTypes')

var _jsxFileName =
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\TimeGrid.js'

class TimeGrid extends _react.Component {
  constructor(props) {
    var _this

    super(props)
    _this = this

    this.handleScroll = e => {
      if (this.scrollRef.current) {
        this.scrollRef.current.scrollLeft = e.target.scrollLeft
      }
    }

    this.handleResize = () => {
      animationFrame.cancel(this.rafHandle)
      this.rafHandle = animationFrame.request(this.checkOverflow)
    }

    this.gutterRef = ref => {
      this.gutter = ref && (0, _reactDom.findDOMNode)(ref)
    }

    this.handleSelectAlldayEvent = function() {
      //cancel any pending selections so only the event click goes through.
      _this.clearSelection()

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key]
      }

      ;(0, _helpers.notify)(_this.props.onSelectEvent, args)
    }

    this.handleSelectAllDaySlot = (slots, slotInfo) => {
      var { onSelectSlot } = this.props
      ;(0, _helpers.notify)(onSelectSlot, {
        slots,
        start: slots[0],
        end: slots[slots.length - 1],
        action: slotInfo.action,
        resourceId: slotInfo.resourceId,
      })
    }

    this.checkOverflow = () => {
      if (this._updatingOverflow) return
      var content = this.contentRef.current
      var isOverflowing = content.scrollHeight > content.clientHeight

      if (this.state.isOverflowing !== isOverflowing) {
        this._updatingOverflow = true
        this.setState(
          {
            isOverflowing,
          },
          () => {
            this._updatingOverflow = false
          }
        )
      }
    }

    this.memoizedResources = (0, _memoizeOne.default)((resources, accessors) =>
      (0, _Resources.default)(resources, accessors)
    )
    this.state = {
      gutterWidth: undefined,
      isOverflowing: null,
    }
    this.scrollRef = /*#__PURE__*/ _react.default.createRef()
    this.contentRef = /*#__PURE__*/ _react.default.createRef()
    this._scrollRatio = null
  }

  UNSAFE_componentWillMount() {
    this.calculateScroll()
  }

  componentDidMount() {
    this.checkOverflow()

    if (this.props.width == null) {
      this.measureGutter()
    }

    this.applyScroll()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    animationFrame.cancel(this.rafHandle)

    if (this.measureGutterAnimationFrameRequest) {
      window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest)
    }
  }

  componentDidUpdate() {
    if (this.props.width == null) {
      this.measureGutter()
    }

    this.applyScroll() //this.checkOverflow()
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    var { range, scrollToTime } = this.props // When paginating, reset scroll

    if (
      !dates.eq(nextProps.range[0], range[0], 'minute') ||
      !dates.eq(nextProps.scrollToTime, scrollToTime, 'minute')
    ) {
      this.calculateScroll(nextProps)
    }
  }

  renderEvents(range, events, backgroundEvents, now) {
    var {
      min,
      max,
      components,
      accessors,
      localizer,
      dayLayoutAlgorithm,
    } = this.props
    var resources = this.memoizedResources(this.props.resources, accessors)
    var groupedEvents = resources.groupEvents(events)
    var groupedBackgroundEvents = resources.groupEvents(backgroundEvents)
    return resources.map((_ref, i) => {
      var [id, resource] = _ref
      return range.map((date, jj) => {
        var daysEvents = (groupedEvents.get(id) || []).filter(event =>
          dates.inRange(
            date,
            accessors.start(event),
            accessors.end(event),
            'day'
          )
        )
        var daysBackgroundEvents = (
          groupedBackgroundEvents.get(id) || []
        ).filter(event =>
          dates.inRange(
            date,
            accessors.start(event),
            accessors.end(event),
            'day'
          )
        )
        return /*#__PURE__*/ _react.default.createElement(
          _DayColumn.default,
          (0, _extends2.default)({}, this.props, {
            localizer: localizer,
            min: dates.merge(date, min),
            max: dates.merge(date, max),
            resource: resource && id,
            components: components,
            isNow: dates.eq(date, now, 'day'),
            key: i + '-' + jj,
            date: date,
            events: daysEvents,
            backgroundEvents: daysBackgroundEvents,
            dayLayoutAlgorithm: dayLayoutAlgorithm,
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 145,
              columnNumber: 11,
            },
          })
        )
      })
    })
  }

  render() {
    var {
      events,
      backgroundEvents,
      range,
      width,
      rtl,
      selected,
      getNow,
      resources,
      components,
      accessors,
      getters,
      localizer,
      min,
      max,
      showMultiDayTimes,
      longPressThreshold,
      resizable,
    } = this.props
    width = width || this.state.gutterWidth
    var start = range[0],
      end = range[range.length - 1]
    this.slots = range.length
    var allDayEvents = [],
      rangeEvents = [],
      rangeBackgroundEvents = []
    events.forEach(event => {
      if ((0, _eventLevels.inRange)(event, start, end, accessors)) {
        var eStart = accessors.start(event),
          eEnd = accessors.end(event)

        if (
          accessors.allDay(event) ||
          (dates.isJustDate(eStart) && dates.isJustDate(eEnd)) ||
          (!showMultiDayTimes && !dates.eq(eStart, eEnd, 'day'))
        ) {
          allDayEvents.push(event)
        } else {
          rangeEvents.push(event)
        }
      }
    })
    backgroundEvents.forEach(event => {
      if ((0, _eventLevels.inRange)(event, start, end, accessors)) {
        rangeBackgroundEvents.push(event)
      }
    })
    allDayEvents.sort((a, b) => (0, _eventLevels.sortEvents)(a, b, accessors))
    return /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: (0, _clsx.default)(
          'rbc-time-view',
          resources && 'rbc-time-view-resources'
        ),
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 222,
          columnNumber: 7,
        },
      },
      /*#__PURE__*/ _react.default.createElement(_TimeGridHeader.default, {
        range: range,
        events: allDayEvents,
        width: width,
        rtl: rtl,
        getNow: getNow,
        localizer: localizer,
        selected: selected,
        resources: this.memoizedResources(resources, accessors),
        selectable: this.props.selectable,
        accessors: accessors,
        getters: getters,
        components: components,
        scrollRef: this.scrollRef,
        isOverflowing: this.state.isOverflowing,
        longPressThreshold: longPressThreshold,
        onSelectSlot: this.handleSelectAllDaySlot,
        onSelectEvent: this.handleSelectAlldayEvent,
        onDoubleClickEvent: this.props.onDoubleClickEvent,
        onKeyPressEvent: this.props.onKeyPressEvent,
        onDrillDown: this.props.onDrillDown,
        getDrilldownView: this.props.getDrilldownView,
        resizable: resizable,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 228,
          columnNumber: 9,
        },
      }),
      /*#__PURE__*/ _react.default.createElement(
        'div',
        {
          ref: this.contentRef,
          className: 'rbc-time-content',
          onScroll: this.handleScroll,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 252,
            columnNumber: 9,
          },
        },
        /*#__PURE__*/ _react.default.createElement(_TimeGutter.default, {
          date: start,
          ref: this.gutterRef,
          localizer: localizer,
          min: dates.merge(start, min),
          max: dates.merge(start, max),
          step: this.props.step,
          getNow: this.props.getNow,
          timeslots: this.props.timeslots,
          components: components,
          className: 'rbc-time-gutter',
          getters: getters,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 257,
            columnNumber: 11,
          },
        }),
        this.renderEvents(range, rangeEvents, rangeBackgroundEvents, getNow())
      )
    )
  }

  clearSelection() {
    clearTimeout(this._selectTimer)
    this._pendingSelection = []
  }

  measureGutter() {
    if (this.measureGutterAnimationFrameRequest) {
      window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest)
    }

    this.measureGutterAnimationFrameRequest = window.requestAnimationFrame(
      () => {
        var width = (0, _width.default)(this.gutter)

        if (width && this.state.gutterWidth !== width) {
          this.setState({
            gutterWidth: width,
          })
        }
      }
    )
  }

  applyScroll() {
    if (this._scrollRatio != null) {
      var content = this.contentRef.current
      content.scrollTop = content.scrollHeight * this._scrollRatio // Only do this once

      this._scrollRatio = null
    }
  }

  calculateScroll(props) {
    if (props === void 0) {
      props = this.props
    }

    var { min, max, scrollToTime } = props
    var diffMillis = scrollToTime - dates.startOf(scrollToTime, 'day')
    var totalMillis = dates.diff(max, min)
    this._scrollRatio = diffMillis / totalMillis
  }
}

exports.default = TimeGrid
TimeGrid.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        events: _propTypes.default.array.isRequired,
        backgroundEvents: _propTypes.default.array.isRequired,
        resources: _propTypes.default.array,
        step: _propTypes.default.number,
        timeslots: _propTypes.default.number,
        range: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
        min: _propTypes.default.instanceOf(Date),
        max: _propTypes.default.instanceOf(Date),
        getNow: _propTypes.default.func.isRequired,
        scrollToTime: _propTypes.default.instanceOf(Date),
        showMultiDayTimes: _propTypes.default.bool,
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
        onSelectEnd: _propTypes.default.func,
        onSelectStart: _propTypes.default.func,
        onSelectEvent: _propTypes.default.func,
        onDoubleClickEvent: _propTypes.default.func,
        onKeyPressEvent: _propTypes.default.func,
        onDrillDown: _propTypes.default.func,
        getDrilldownView: _propTypes.default.func.isRequired,
        dayLayoutAlgorithm: _propTypes2.DayLayoutAlgorithmPropType,
      }
    : {}
TimeGrid.defaultProps = {
  step: 30,
  timeslots: 2,
  min: dates.startOf(new Date(), 'day'),
  max: dates.endOf(new Date(), 'day'),
  scrollToTime: dates.startOf(new Date(), 'day'),
}
module.exports = exports.default
