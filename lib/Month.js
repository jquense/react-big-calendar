'use strict'

var _interopRequireDefault =
  require('@babel/runtime/helpers/interopRequireDefault').default
var _interopRequireWildcard =
  require('@babel/runtime/helpers/interopRequireWildcard').default
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _objectWithoutProperties2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutProperties')
)
var _toConsumableArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/toConsumableArray')
)
var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck')
)
var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass')
)
var _callSuper2 = _interopRequireDefault(
  require('@babel/runtime/helpers/callSuper')
)
var _inherits2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inherits')
)
var _react = _interopRequireWildcard(require('react'))
var _clsx = _interopRequireDefault(require('clsx'))
var _chunk = _interopRequireDefault(require('lodash/chunk'))
var _constants = require('./utils/constants')
var _helpers = require('./utils/helpers')
var _position = _interopRequireDefault(require('dom-helpers/position'))
var animationFrame = _interopRequireWildcard(
  require('dom-helpers/animationFrame')
)
var _PopOverlay = _interopRequireDefault(require('./PopOverlay'))
var _DateContentRow = _interopRequireDefault(require('./DateContentRow'))
var _Header = _interopRequireDefault(require('./Header'))
var _DateHeader = _interopRequireDefault(require('./DateHeader'))
var _eventLevels = require('./utils/eventLevels')
var _excluded = ['date', 'className']
/* import Popup from './Popup'
import Overlay from 'react-overlays/Overlay' */
var eventsForWeek = function eventsForWeek(
  evts,
  start,
  end,
  accessors,
  localizer
) {
  return evts.filter(function (e) {
    return (0, _eventLevels.inRange)(e, start, end, accessors, localizer)
  })
}
var MonthView = /*#__PURE__*/ (function (_React$Component) {
  ;(0, _inherits2.default)(MonthView, _React$Component)
  function MonthView() {
    var _this
    ;(0, _classCallCheck2.default)(this, MonthView)
    for (
      var _len = arguments.length, _args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      _args[_key] = arguments[_key]
    }
    _this = (0, _callSuper2.default)(this, MonthView, [].concat(_args))
    _this.getContainer = function () {
      return _this.containerRef.current
    }
    _this.renderWeek = function (week, weekIdx) {
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
        rowLimit = _this$state.rowLimit

      // let's not mutate props
      var weeksEvents = eventsForWeek(
        (0, _toConsumableArray2.default)(events),
        week[0],
        week[week.length - 1],
        accessors,
        localizer
      )
      var sorted = (0, _eventLevels.sortWeekEvents)(
        weeksEvents,
        accessors,
        localizer
      )
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
          events: sorted,
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
    _this.readerDateHeading = function (_ref) {
      var date = _ref.date,
        className = _ref.className,
        props = (0, _objectWithoutProperties2.default)(_ref, _excluded)
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
        Object.assign({}, props, {
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
    _this.handleSelectSlot = function (range, slotInfo) {
      _this._pendingSelection = _this._pendingSelection.concat(range)
      clearTimeout(_this._selectTimer)
      _this._selectTimer = setTimeout(function () {
        return _this.selectDates(slotInfo)
      })
    }
    _this.handleHeadingClick = function (date, view, e) {
      e.preventDefault()
      _this.clearSelection()
      ;(0, _helpers.notify)(_this.props.onDrillDown, [date, view])
    }
    _this.handleSelectEvent = function () {
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
    _this.handleDoubleClickEvent = function () {
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
    _this.handleKeyPressEvent = function () {
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
    _this.handleShowMore = function (events, date, cell, slot, target) {
      var _this$props3 = _this.props,
        popup = _this$props3.popup,
        onDrillDown = _this$props3.onDrillDown,
        onShowMore = _this$props3.onShowMore,
        getDrilldownView = _this$props3.getDrilldownView,
        doShowMoreDrillDown = _this$props3.doShowMoreDrillDown
      //cancel any pending selections so only the event click goes through.
      _this.clearSelection()
      if (popup) {
        var position = (0, _position.default)(cell, _this.containerRef.current)
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
    _this.overlayDisplay = function () {
      _this.setState({
        overlay: null,
      })
    }
    _this.state = {
      rowLimit: 5,
      needLimitMeasure: true,
      date: null,
    }
    _this.containerRef = /*#__PURE__*/ (0, _react.createRef)()
    _this.slotRowRef = /*#__PURE__*/ (0, _react.createRef)()
    _this._bgRows = []
    _this._pendingSelection = []
    return _this
  }
  ;(0, _createClass2.default)(
    MonthView,
    [
      {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this
          var running
          if (this.state.needLimitMeasure) this.measureRowLimit(this.props)
          window.addEventListener(
            'resize',
            (this._resizeListener = function () {
              if (!running) {
                animationFrame.request(function () {
                  running = false
                  _this2.setState({
                    needLimitMeasure: true,
                  }) //eslint-disable-line
                })
              }
            }),
            false
          )
        },
      },
      {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
          if (this.state.needLimitMeasure) this.measureRowLimit(this.props)
        },
      },
      {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          window.removeEventListener('resize', this._resizeListener, false)
        },
      },
      {
        key: 'render',
        value: function render() {
          var _this$props4 = this.props,
            date = _this$props4.date,
            localizer = _this$props4.localizer,
            className = _this$props4.className,
            month = localizer.visibleDays(date, localizer),
            weeks = (0, _chunk.default)(month, 7)
          this._weekCount = weeks.length
          return /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              className: (0, _clsx.default)('rbc-month-view', className),
              role: 'table',
              'aria-label': 'Month View',
              ref: this.containerRef,
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
        },
      },
      {
        key: 'renderHeaders',
        value: function renderHeaders(row) {
          var _this$props5 = this.props,
            localizer = _this$props5.localizer,
            components = _this$props5.components
          var first = row[0]
          var last = row[row.length - 1]
          var HeaderComponent = components.header || _Header.default
          return localizer.range(first, last, 'day').map(function (day, idx) {
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
        },
      },
      {
        key: 'renderOverlay',
        value: function renderOverlay() {
          var _this$state$overlay,
            _this$state2,
            _this3 = this
          var overlay =
            (_this$state$overlay =
              (_this$state2 = this.state) === null || _this$state2 === void 0
                ? void 0
                : _this$state2.overlay) !== null &&
            _this$state$overlay !== void 0
              ? _this$state$overlay
              : {}
          var _this$props6 = this.props,
            accessors = _this$props6.accessors,
            localizer = _this$props6.localizer,
            components = _this$props6.components,
            getters = _this$props6.getters,
            selected = _this$props6.selected,
            popupOffset = _this$props6.popupOffset,
            handleDragStart = _this$props6.handleDragStart
          var onHide = function onHide() {
            return _this3.setState({
              overlay: null,
            })
          }
          return /*#__PURE__*/ _react.default.createElement(
            _PopOverlay.default,
            {
              overlay: overlay,
              accessors: accessors,
              localizer: localizer,
              components: components,
              getters: getters,
              selected: selected,
              popupOffset: popupOffset,
              ref: this.containerRef,
              handleKeyPressEvent: this.handleKeyPressEvent,
              handleSelectEvent: this.handleSelectEvent,
              handleDoubleClickEvent: this.handleDoubleClickEvent,
              handleDragStart: handleDragStart,
              show: !!overlay.position,
              overlayDisplay: this.overlayDisplay,
              onHide: onHide,
            }
          )

          /* return (
        <Overlay
          rootClose
          placement="bottom"
          show={!!overlay.position}
          onHide={() => this.setState({ overlay: null })}
          target={() => overlay.target}
        >
          {({ props }) => (
            <Popup
              {...props}
              popupOffset={popupOffset}
              accessors={accessors}
              getters={getters}
              selected={selected}
              components={components}
              localizer={localizer}
              position={overlay.position}
              show={this.overlayDisplay}
              events={overlay.events}
              slotStart={overlay.date}
              slotEnd={overlay.end}
              onSelect={this.handleSelectEvent}
              onDoubleClick={this.handleDoubleClickEvent}
              onKeyPress={this.handleKeyPressEvent}
              handleDragStart={this.props.handleDragStart}
            />
          )}
        </Overlay>
      ) */
        },
      },
      {
        key: 'measureRowLimit',
        value: function measureRowLimit() {
          this.setState({
            needLimitMeasure: false,
            rowLimit: this.slotRowRef.current.getRowLimit(),
          })
        },
      },
      {
        key: 'selectDates',
        value: function selectDates(slotInfo) {
          var slots = this._pendingSelection.slice()
          this._pendingSelection = []
          slots.sort(function (a, b) {
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
        },
      },
      {
        key: 'clearSelection',
        value: function clearSelection() {
          clearTimeout(this._selectTimer)
          this._pendingSelection = []
        },
      },
    ],
    [
      {
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(_ref2, state) {
          var date = _ref2.date,
            localizer = _ref2.localizer
          return {
            date: date,
            needLimitMeasure: localizer.neq(date, state.date, 'month'),
          }
        },
      },
    ]
  )
  return MonthView
})(_react.default.Component)
MonthView.range = function (date, _ref3) {
  var localizer = _ref3.localizer
  var start = localizer.firstVisibleDay(date, localizer)
  var end = localizer.lastVisibleDay(date, localizer)
  return {
    start: start,
    end: end,
  }
}
MonthView.navigate = function (date, action, _ref4) {
  var localizer = _ref4.localizer
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return localizer.add(date, -1, 'month')
    case _constants.navigate.NEXT:
      return localizer.add(date, 1, 'month')
    default:
      return date
  }
}
MonthView.title = function (date, _ref5) {
  var localizer = _ref5.localizer
  return localizer.format(date, 'monthHeaderFormat')
}
var _default = (exports.default = MonthView)
