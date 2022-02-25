'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _assertThisInitialized2 = _interopRequireDefault(
  require('@babel/runtime/helpers/assertThisInitialized')
)

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _clsx = _interopRequireDefault(require('clsx'))

var _height = _interopRequireDefault(require('dom-helpers/height'))

var _querySelectorAll = _interopRequireDefault(
  require('dom-helpers/querySelectorAll')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _reactDom = require('react-dom')

var _BackgroundCells = _interopRequireDefault(require('./BackgroundCells'))

var _EventRow = _interopRequireDefault(require('./EventRow'))

var _EventEndingRow = _interopRequireDefault(require('./EventEndingRow'))

var _NoopWrapper = _interopRequireDefault(require('./NoopWrapper'))

var _ScrollableWeekWrapper = _interopRequireDefault(
  require('./ScrollableWeekWrapper')
)

var DateSlotMetrics = _interopRequireWildcard(
  require('./utils/DateSlotMetrics')
)

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

var DateContentRow = /*#__PURE__*/ (function(_React$Component) {
  ;(0, _inheritsLoose2.default)(DateContentRow, _React$Component)

  function DateContentRow() {
    var _this

    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    _this =
      _React$Component.call.apply(_React$Component, [this].concat(args)) || this

    _this.handleSelectSlot = function(slot) {
      var _this$props = _this.props,
        range = _this$props.range,
        onSelectSlot = _this$props.onSelectSlot
      onSelectSlot(range.slice(slot.start, slot.end + 1), slot)
    }

    _this.handleShowMore = function(slot, target) {
      var _this$props2 = _this.props,
        range = _this$props2.range,
        onShowMore = _this$props2.onShowMore

      var metrics = _this.slotMetrics(_this.props)

      var row = (0, _querySelectorAll.default)(
        (0, _reactDom.findDOMNode)((0, _assertThisInitialized2.default)(_this)),
        '.rbc-row-bg'
      )[0]
      var cell
      if (row) cell = row.children[slot - 1]
      var events = metrics.getEventsForSlot(slot)
      onShowMore(events, range[slot - 1], cell, slot, target)
    }

    _this.createHeadingRef = function(r) {
      _this.headingRow = r
    }

    _this.createEventRef = function(r) {
      _this.eventRow = r
    }

    _this.getContainer = function() {
      var container = _this.props.container
      return container
        ? container()
        : (0, _reactDom.findDOMNode)(
            (0, _assertThisInitialized2.default)(_this)
          )
    }

    _this.renderHeadingCell = function(date, index) {
      var _this$props3 = _this.props,
        renderHeader = _this$props3.renderHeader,
        getNow = _this$props3.getNow,
        localizer = _this$props3.localizer
      return renderHeader({
        date: date,
        key: 'header_' + index,
        className: (0, _clsx.default)(
          'rbc-date-cell',
          localizer.isSameDate(date, getNow()) && 'rbc-now'
        ),
      })
    }

    _this.renderDummy = function() {
      var _this$props4 = _this.props,
        className = _this$props4.className,
        range = _this$props4.range,
        renderHeader = _this$props4.renderHeader,
        showAllEvents = _this$props4.showAllEvents
      return /*#__PURE__*/ _react.default.createElement(
        'div',
        {
          className: className,
        },
        /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            className: (0, _clsx.default)(
              'rbc-row-content',
              showAllEvents && 'rbc-row-content-scrollable'
            ),
          },
          renderHeader &&
            /*#__PURE__*/ _react.default.createElement(
              'div',
              {
                className: 'rbc-row',
                ref: _this.createHeadingRef,
              },
              range.map(_this.renderHeadingCell)
            ),
          /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              className: 'rbc-row',
              ref: _this.createEventRef,
            },
            /*#__PURE__*/ _react.default.createElement(
              'div',
              {
                className: 'rbc-row-segment',
              },
              /*#__PURE__*/ _react.default.createElement(
                'div',
                {
                  className: 'rbc-event',
                },
                /*#__PURE__*/ _react.default.createElement(
                  'div',
                  {
                    className: 'rbc-event-content',
                  },
                  '\xA0'
                )
              )
            )
          )
        )
      )
    }

    _this.slotMetrics = DateSlotMetrics.getSlotMetrics()
    return _this
  }

  var _proto = DateContentRow.prototype

  _proto.getRowLimit = function getRowLimit() {
    var eventHeight = (0, _height.default)(this.eventRow)
    var headingHeight = this.headingRow
      ? (0, _height.default)(this.headingRow)
      : 0
    var eventSpace =
      (0, _height.default)((0, _reactDom.findDOMNode)(this)) - headingHeight
    return Math.max(Math.floor(eventSpace / eventHeight), 1)
  }

  _proto.render = function render() {
    var _this$props5 = this.props,
      date = _this$props5.date,
      rtl = _this$props5.rtl,
      range = _this$props5.range,
      className = _this$props5.className,
      selected = _this$props5.selected,
      selectable = _this$props5.selectable,
      renderForMeasure = _this$props5.renderForMeasure,
      accessors = _this$props5.accessors,
      getters = _this$props5.getters,
      components = _this$props5.components,
      getNow = _this$props5.getNow,
      renderHeader = _this$props5.renderHeader,
      onSelect = _this$props5.onSelect,
      localizer = _this$props5.localizer,
      onSelectStart = _this$props5.onSelectStart,
      onSelectEnd = _this$props5.onSelectEnd,
      onDoubleClick = _this$props5.onDoubleClick,
      onKeyPress = _this$props5.onKeyPress,
      resourceId = _this$props5.resourceId,
      longPressThreshold = _this$props5.longPressThreshold,
      isAllDay = _this$props5.isAllDay,
      resizable = _this$props5.resizable,
      showAllEvents = _this$props5.showAllEvents
    if (renderForMeasure) return this.renderDummy()
    var metrics = this.slotMetrics(this.props)
    var levels = metrics.levels,
      extra = metrics.extra
    var ScrollableWeekComponent = showAllEvents
      ? _ScrollableWeekWrapper.default
      : _NoopWrapper.default
    var WeekWrapper = components.weekWrapper
    var eventRowProps = {
      selected: selected,
      accessors: accessors,
      getters: getters,
      localizer: localizer,
      components: components,
      onSelect: onSelect,
      onDoubleClick: onDoubleClick,
      onKeyPress: onKeyPress,
      resourceId: resourceId,
      slotMetrics: metrics,
      resizable: resizable,
    }
    return /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: className,
        role: 'rowgroup',
      },
      /*#__PURE__*/ _react.default.createElement(_BackgroundCells.default, {
        localizer: localizer,
        date: date,
        getNow: getNow,
        rtl: rtl,
        range: range,
        selectable: selectable,
        container: this.getContainer,
        getters: getters,
        onSelectStart: onSelectStart,
        onSelectEnd: onSelectEnd,
        onSelectSlot: this.handleSelectSlot,
        components: components,
        longPressThreshold: longPressThreshold,
        resourceId: resourceId,
      }),
      /*#__PURE__*/ _react.default.createElement(
        'div',
        {
          className: (0, _clsx.default)(
            'rbc-row-content',
            showAllEvents && 'rbc-row-content-scrollable'
          ),
          role: 'row',
        },
        renderHeader &&
          /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              className: 'rbc-row ',
              ref: this.createHeadingRef,
            },
            range.map(this.renderHeadingCell)
          ),
        /*#__PURE__*/ _react.default.createElement(
          ScrollableWeekComponent,
          null,
          /*#__PURE__*/ _react.default.createElement(
            WeekWrapper,
            (0, _extends2.default)(
              {
                isAllDay: isAllDay,
              },
              eventRowProps
            ),
            levels.map(function(segs, idx) {
              return /*#__PURE__*/ _react.default.createElement(
                _EventRow.default,
                (0, _extends2.default)(
                  {
                    key: idx,
                    segments: segs,
                  },
                  eventRowProps
                )
              )
            }),
            !!extra.length &&
              /*#__PURE__*/ _react.default.createElement(
                _EventEndingRow.default,
                (0, _extends2.default)(
                  {
                    segments: extra,
                    onShowMore: this.handleShowMore,
                  },
                  eventRowProps
                )
              )
          )
        )
      )
    )
  }

  return DateContentRow
})(_react.default.Component)

DateContentRow.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        date: _propTypes.default.instanceOf(Date),
        events: _propTypes.default.array.isRequired,
        range: _propTypes.default.array.isRequired,
        rtl: _propTypes.default.bool,
        resizable: _propTypes.default.bool,
        resourceId: _propTypes.default.any,
        renderForMeasure: _propTypes.default.bool,
        renderHeader: _propTypes.default.func,
        container: _propTypes.default.func,
        selected: _propTypes.default.object,
        selectable: _propTypes.default.oneOf([true, false, 'ignoreEvents']),
        longPressThreshold: _propTypes.default.number,
        onShowMore: _propTypes.default.func,
        showAllEvents: _propTypes.default.bool,
        onSelectSlot: _propTypes.default.func,
        onSelect: _propTypes.default.func,
        onSelectEnd: _propTypes.default.func,
        onSelectStart: _propTypes.default.func,
        onDoubleClick: _propTypes.default.func,
        onKeyPress: _propTypes.default.func,
        dayPropGetter: _propTypes.default.func,
        getNow: _propTypes.default.func.isRequired,
        isAllDay: _propTypes.default.bool,
        accessors: _propTypes.default.object.isRequired,
        components: _propTypes.default.object.isRequired,
        getters: _propTypes.default.object.isRequired,
        localizer: _propTypes.default.object.isRequired,
        minRows: _propTypes.default.number.isRequired,
        maxRows: _propTypes.default.number.isRequired,
      }
    : {}
DateContentRow.defaultProps = {
  minRows: 0,
  maxRows: Infinity,
}
var _default = DateContentRow
exports.default = _default
module.exports = exports.default
