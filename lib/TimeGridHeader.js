'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

exports.__esModule = true
exports.default = void 0

var _propTypes = _interopRequireDefault(require('prop-types'))

var _clsx = _interopRequireDefault(require('clsx'))

var _scrollbarSize = _interopRequireDefault(
  require('dom-helpers/scrollbarSize')
)

var _react = _interopRequireDefault(require('react'))

var dates = _interopRequireWildcard(require('./utils/dates'))

var _DateContentRow = _interopRequireDefault(require('./DateContentRow'))

var _Header = _interopRequireDefault(require('./Header'))

var _ResourceHeader = _interopRequireDefault(require('./ResourceHeader'))

var _helpers = require('./utils/helpers')

var _jsxFileName =
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\TimeGridHeader.js'

class TimeGridHeader extends _react.default.Component {
  constructor() {
    super(...arguments)

    this.handleHeaderClick = (date, view, e) => {
      e.preventDefault()
      ;(0, _helpers.notify)(this.props.onDrillDown, [date, view])
    }

    this.renderRow = resource => {
      var {
        events,
        rtl,
        selectable,
        getNow,
        range,
        getters,
        localizer,
        accessors,
        components,
        resizable,
      } = this.props
      var resourceId = accessors.resourceId(resource)
      var eventsToDisplay = resource
        ? events.filter(event => accessors.resource(event) === resourceId)
        : events
      return /*#__PURE__*/ _react.default.createElement(
        _DateContentRow.default,
        {
          isAllDay: true,
          rtl: rtl,
          getNow: getNow,
          minRows: 2,
          range: range,
          events: eventsToDisplay,
          resourceId: resourceId,
          className: 'rbc-allday-cell',
          selectable: selectable,
          selected: this.props.selected,
          components: components,
          accessors: accessors,
          getters: getters,
          localizer: localizer,
          onSelect: this.props.onSelectEvent,
          onDoubleClick: this.props.onDoubleClickEvent,
          onKeyPress: this.props.onKeyPressEvent,
          onSelectSlot: this.props.onSelectSlot,
          longPressThreshold: this.props.longPressThreshold,
          resizable: resizable,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 83,
            columnNumber: 7,
          },
        }
      )
    }
  }

  renderHeaderCells(range) {
    var {
      localizer,
      getDrilldownView,
      getNow,
      getters: { dayProp },
      components: { header: HeaderComponent = _Header.default },
    } = this.props
    var today = getNow()
    return range.map((date, i) => {
      var drilldownView = getDrilldownView(date)
      var label = localizer.format(date, 'dayFormat')
      var { className, style } = dayProp(date)

      var header = /*#__PURE__*/ _react.default.createElement(HeaderComponent, {
        date: date,
        label: label,
        localizer: localizer,
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 36,
          columnNumber: 9,
        },
      })

      return /*#__PURE__*/ _react.default.createElement(
        'div',
        {
          key: i,
          style: style,
          className: (0, _clsx.default)(
            'rbc-header',
            className,
            dates.eq(date, today, 'day') && 'rbc-today'
          ),
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 40,
            columnNumber: 9,
          },
        },
        drilldownView
          ? /*#__PURE__*/ _react.default.createElement(
              'a',
              {
                href: '#',
                onClick: e => this.handleHeaderClick(date, drilldownView, e),
                __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 50,
                  columnNumber: 13,
                },
              },
              header
            )
          : /*#__PURE__*/ _react.default.createElement(
              'span',
              {
                __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 57,
                  columnNumber: 13,
                },
              },
              header
            )
      )
    })
  }

  render() {
    var {
      width,
      rtl,
      resources,
      range,
      events,
      getNow,
      accessors,
      selectable,
      components,
      getters,
      scrollRef,
      localizer,
      isOverflowing,
      components: {
        timeGutterHeader: TimeGutterHeader,
        resourceHeader: ResourceHeaderComponent = _ResourceHeader.default,
      },
      resizable,
    } = this.props
    var style = {}

    if (isOverflowing) {
      style[rtl ? 'marginLeft' : 'marginRight'] =
        (0, _scrollbarSize.default)() + 'px'
    }

    var groupedEvents = resources.groupEvents(events)
    return /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        style: style,
        ref: scrollRef,
        className: (0, _clsx.default)(
          'rbc-time-header',
          isOverflowing && 'rbc-overflowing'
        ),
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 138,
          columnNumber: 7,
        },
      },
      /*#__PURE__*/ _react.default.createElement(
        'div',
        {
          className: 'rbc-label rbc-time-header-gutter',
          style: {
            width,
            minWidth: width,
            maxWidth: width,
          },
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 143,
            columnNumber: 9,
          },
        },
        TimeGutterHeader &&
          /*#__PURE__*/ _react.default.createElement(TimeGutterHeader, {
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 147,
              columnNumber: 32,
            },
          })
      ),
      resources.map((_ref, idx) => {
        var [id, resource] = _ref
        return /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            className: 'rbc-time-header-content',
            key: id || idx,
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 151,
              columnNumber: 11,
            },
          },
          resource &&
            /*#__PURE__*/ _react.default.createElement(
              'div',
              {
                className: 'rbc-row rbc-row-resource',
                key: 'resource_' + idx,
                __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 153,
                  columnNumber: 15,
                },
              },
              /*#__PURE__*/ _react.default.createElement(
                'div',
                {
                  className: 'rbc-header',
                  __self: this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 154,
                    columnNumber: 17,
                  },
                },
                /*#__PURE__*/ _react.default.createElement(
                  ResourceHeaderComponent,
                  {
                    index: idx,
                    label: accessors.resourceTitle(resource),
                    resource: resource,
                    __self: this,
                    __source: {
                      fileName: _jsxFileName,
                      lineNumber: 155,
                      columnNumber: 19,
                    },
                  }
                )
              )
            ),
          /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              className:
                'rbc-row rbc-time-header-cell' +
                (range.length <= 1 ? ' rbc-time-header-cell-single-day' : ''),
              __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 163,
                columnNumber: 13,
              },
            },
            this.renderHeaderCells(range)
          ),
          /*#__PURE__*/ _react.default.createElement(_DateContentRow.default, {
            isAllDay: true,
            rtl: rtl,
            getNow: getNow,
            minRows: 2,
            range: range,
            events: groupedEvents.get(id) || [],
            resourceId: resource && id,
            className: 'rbc-allday-cell',
            selectable: selectable,
            selected: this.props.selected,
            components: components,
            accessors: accessors,
            getters: getters,
            localizer: localizer,
            onSelect: this.props.onSelectEvent,
            onDoubleClick: this.props.onDoubleClickEvent,
            onKeyPress: this.props.onKeyPressEvent,
            onSelectSlot: this.props.onSelectSlot,
            longPressThreshold: this.props.longPressThreshold,
            resizable: resizable,
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 170,
              columnNumber: 13,
            },
          })
        )
      })
    )
  }
}

TimeGridHeader.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        range: _propTypes.default.array.isRequired,
        events: _propTypes.default.array.isRequired,
        resources: _propTypes.default.object,
        getNow: _propTypes.default.func.isRequired,
        isOverflowing: _propTypes.default.bool,
        rtl: _propTypes.default.bool,
        resizable: _propTypes.default.bool,
        width: _propTypes.default.number,
        localizer: _propTypes.default.object.isRequired,
        accessors: _propTypes.default.object.isRequired,
        components: _propTypes.default.object.isRequired,
        getters: _propTypes.default.object.isRequired,
        selected: _propTypes.default.object,
        selectable: _propTypes.default.oneOf([true, false, 'ignoreEvents']),
        longPressThreshold: _propTypes.default.number,
        onSelectSlot: _propTypes.default.func,
        onSelectEvent: _propTypes.default.func,
        onDoubleClickEvent: _propTypes.default.func,
        onKeyPressEvent: _propTypes.default.func,
        onDrillDown: _propTypes.default.func,
        getDrilldownView: _propTypes.default.func.isRequired,
        scrollRef: _propTypes.default.any,
      }
    : {}
var _default = TimeGridHeader
exports.default = _default
module.exports = exports.default
