'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _clsx = _interopRequireDefault(require('clsx'))

var _height = _interopRequireDefault(require('dom-helpers/height'))

var _querySelectorAll = _interopRequireDefault(
  require('dom-helpers/querySelectorAll')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _reactDom = require('react-dom')

var dates = _interopRequireWildcard(require('./utils/dates'))

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

var _jsxFileName =
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\DateContentRow.js'

class DateContentRow extends _react.default.Component {
  constructor() {
    super(...arguments)

    this.handleSelectSlot = slot => {
      var { range, onSelectSlot } = this.props
      onSelectSlot(range.slice(slot.start, slot.end + 1), slot)
    }

    this.handleShowMore = (slot, target) => {
      var { range, onShowMore } = this.props
      var metrics = this.slotMetrics(this.props)
      var row = (0, _querySelectorAll.default)(
        (0, _reactDom.findDOMNode)(this),
        '.rbc-row-bg'
      )[0]
      var cell
      if (row) cell = row.children[slot - 1]
      var events = metrics.getEventsForSlot(slot)
      onShowMore(events, range[slot - 1], cell, slot, target)
    }

    this.createHeadingRef = r => {
      this.headingRow = r
    }

    this.createEventRef = r => {
      this.eventRow = r
    }

    this.getContainer = () => {
      var { container } = this.props
      return container ? container() : (0, _reactDom.findDOMNode)(this)
    }

    this.renderHeadingCell = (date, index) => {
      var { renderHeader, getNow } = this.props
      return renderHeader({
        date,
        key: 'header_' + index,
        className: (0, _clsx.default)(
          'rbc-date-cell',
          dates.eq(date, getNow(), 'day') && 'rbc-now'
        ),
      })
    }

    this.renderDummy = () => {
      var { className, range, renderHeader, showAllEvents } = this.props
      return /*#__PURE__*/ _react.default.createElement(
        'div',
        {
          className: className,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 78,
            columnNumber: 7,
          },
        },
        /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            className: (0, _clsx.default)(
              'rbc-row-content',
              showAllEvents && 'rbc-row-content-scrollable'
            ),
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 79,
              columnNumber: 9,
            },
          },
          renderHeader &&
            /*#__PURE__*/ _react.default.createElement(
              'div',
              {
                className: 'rbc-row',
                ref: this.createHeadingRef,
                __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 86,
                  columnNumber: 13,
                },
              },
              range.map(this.renderHeadingCell)
            ),
          /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              className: 'rbc-row',
              ref: this.createEventRef,
              __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 90,
                columnNumber: 11,
              },
            },
            /*#__PURE__*/ _react.default.createElement(
              'div',
              {
                className: 'rbc-row-segment',
                __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 91,
                  columnNumber: 13,
                },
              },
              /*#__PURE__*/ _react.default.createElement(
                'div',
                {
                  className: 'rbc-event',
                  __self: this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 92,
                    columnNumber: 15,
                  },
                },
                /*#__PURE__*/ _react.default.createElement(
                  'div',
                  {
                    className: 'rbc-event-content',
                    __self: this,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 93,
                      columnNumber: 17,
                    },
                  },
                  '\xA0'
                )
              )
            )
          )
        )
      )
    }

    this.slotMetrics = DateSlotMetrics.getSlotMetrics()
  }

  getRowLimit() {
    var eventHeight = (0, _height.default)(this.eventRow)
    var headingHeight = this.headingRow
      ? (0, _height.default)(this.headingRow)
      : 0
    var eventSpace =
      (0, _height.default)((0, _reactDom.findDOMNode)(this)) - headingHeight
    return Math.max(Math.floor(eventSpace / eventHeight), 1)
  }

  render() {
    var {
      date,
      rtl,
      range,
      className,
      selected,
      selectable,
      renderForMeasure,
      accessors,
      getters,
      components,
      getNow,
      renderHeader,
      onSelect,
      localizer,
      onSelectStart,
      onSelectEnd,
      onDoubleClick,
      onKeyPress,
      resourceId,
      longPressThreshold,
      isAllDay,
      resizable,
      showAllEvents,
    } = this.props
    if (renderForMeasure) return this.renderDummy()
    var metrics = this.slotMetrics(this.props)
    var { levels, extra } = metrics
    var ScrollableWeekComponent = showAllEvents
      ? _ScrollableWeekWrapper.default
      : _NoopWrapper.default
    var WeekWrapper = components.weekWrapper
    var eventRowProps = {
      selected,
      accessors,
      getters,
      localizer,
      components,
      onSelect,
      onDoubleClick,
      onKeyPress,
      resourceId,
      slotMetrics: metrics,
      resizable,
    }
    return /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: className,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 156,
          columnNumber: 7,
        },
      },
      /*#__PURE__*/ _react.default.createElement(_BackgroundCells.default, {
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
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 157,
          columnNumber: 9,
        },
      }),
      /*#__PURE__*/ _react.default.createElement(
        'div',
        {
          className: (0, _clsx.default)(
            'rbc-row-content',
            showAllEvents && 'rbc-row-content-scrollable'
          ),
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 173,
            columnNumber: 9,
          },
        },
        renderHeader &&
          /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              className: 'rbc-row ',
              ref: this.createHeadingRef,
              __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 180,
                columnNumber: 13,
              },
            },
            range.map(this.renderHeadingCell)
          ),
        /*#__PURE__*/ _react.default.createElement(
          ScrollableWeekComponent,
          {
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 184,
              columnNumber: 11,
            },
          },
          /*#__PURE__*/ _react.default.createElement(
            WeekWrapper,
            (0, _extends2.default)(
              {
                isAllDay: isAllDay,
              },
              eventRowProps,
              {
                __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 185,
                  columnNumber: 13,
                },
              }
            ),
            levels.map((segs, idx) =>
              /*#__PURE__*/ _react.default.createElement(
                _EventRow.default,
                (0, _extends2.default)(
                  {
                    key: idx,
                    segments: segs,
                  },
                  eventRowProps,
                  {
                    __self: this,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 187,
                      columnNumber: 17,
                    },
                  }
                )
              )
            ),
            !!extra.length &&
              /*#__PURE__*/ _react.default.createElement(
                _EventEndingRow.default,
                (0, _extends2.default)(
                  {
                    range: range,
                    segments: extra,
                    onShowMore: this.handleShowMore,
                  },
                  eventRowProps,
                  {
                    __self: this,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 190,
                      columnNumber: 17,
                    },
                  }
                )
              )
          )
        )
      )
    )
  }
}

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
