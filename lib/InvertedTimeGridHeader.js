'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

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

var TimeGridHeader = /*#__PURE__*/ (function(_React$Component) {
  ;(0, _inheritsLoose2.default)(TimeGridHeader, _React$Component)

  function TimeGridHeader() {
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

    _this.handleHeaderClick = function(date, view, e) {
      e.preventDefault()
      ;(0, _helpers.notify)(_this.props.onDrillDown, [date, view])
    }

    _this.renderRow = function(resource) {
      var _this$props = _this.props,
        events = _this$props.events,
        rtl = _this$props.rtl,
        selectable = _this$props.selectable,
        getNow = _this$props.getNow,
        range = _this$props.range,
        getters = _this$props.getters,
        localizer = _this$props.localizer,
        accessors = _this$props.accessors,
        components = _this$props.components
      var resourceId = accessors.resourceId(resource)
      var eventsToDisplay = resource
        ? events.filter(function(event) {
            return accessors.resource(event) === resourceId
          })
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
          selected: _this.props.selected,
          components: components,
          accessors: accessors,
          getters: getters,
          localizer: localizer,
          onSelect: _this.props.onSelectEvent,
          onDoubleClick: _this.props.onDoubleClickEvent,
          onSelectSlot: _this.props.onSelectSlot,
          longPressThreshold: _this.props.longPressThreshold,
        }
      )
    }

    return _this
  }

  var _proto = TimeGridHeader.prototype

  _proto.renderHeaderCells = function renderHeaderCells() {
    var _this$props2 = this.props,
      resources = _this$props2.resources,
      date = _this$props2.date,
      accessors = _this$props2.accessors,
      _this$props2$componen = _this$props2.components.resourceHeader,
      ResourceHeaderComponent =
        _this$props2$componen === void 0
          ? _ResourceHeader.default
          : _this$props2$componen
    return /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: 'rbc-header inverted',
      },
      resources.map(function(_ref, idx) {
        var id = _ref[0],
          resource = _ref[1]
        if (resource.isPartTime) return false
        return /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            className: 'rbc-row-resource inverted',
            key: 'resource_' + (id || idx),
          },
          /*#__PURE__*/ _react.default.createElement(ResourceHeaderComponent, {
            index: idx,
            title: accessors.resourceTitle(resource),
            mins: resource.minsByDate[date],
            resource: resource,
          })
        )
      }),
      /*#__PURE__*/ _react.default.createElement(
        'div',
        {
          className: 'rbc-row-resource inverted',
          key: 'resource_other',
        },
        /*#__PURE__*/ _react.default.createElement(ResourceHeaderComponent, {
          index: 1000,
          title: 'other',
          mins: 0,
          resource: resources[0],
        })
      )
    )
  }

  _proto.render = function render() {
    var _this2 = this

    var _this$props3 = this.props,
      getNow = _this$props3.getNow,
      localizer = _this$props3.localizer,
      getDrilldownView = _this$props3.getDrilldownView,
      resources = _this$props3.resources,
      width = _this$props3.width,
      rtl = _this$props3.rtl,
      range = _this$props3.range,
      scrollRef = _this$props3.scrollRef,
      isOverflowing = _this$props3.isOverflowing,
      dayProp = _this$props3.getters.dayProp,
      _this$props3$componen = _this$props3.components,
      TimeGutterHeader = _this$props3$componen.timeGutterHeader,
      _this$props3$componen2 = _this$props3$componen.header,
      HeaderComponent =
        _this$props3$componen2 === void 0
          ? _Header.default
          : _this$props3$componen2
    var style = {}

    if (isOverflowing) {
      style[rtl ? 'marginLeft' : 'marginRight'] =
        (0, _scrollbarSize.default)() + 'px'
    }

    var today = getNow()
    return /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        style: style,
        ref: scrollRef,
        className: (0, _clsx.default)(
          'rbc-time-header',
          isOverflowing && 'rbc-overflowing'
        ),
      },
      /*#__PURE__*/ _react.default.createElement(
        'div',
        {
          className: 'rbc-label rbc-time-header-gutter',
          style: {
            width: width,
            minWidth: width,
            maxWidth: width,
          },
        },
        TimeGutterHeader &&
          /*#__PURE__*/ _react.default.createElement(TimeGutterHeader, null)
      ),
      range.map(function(date, i) {
        var _dayProp = dayProp(date),
          className = _dayProp.className,
          style = _dayProp.style

        var drilldownView = getDrilldownView(date)
        var label = localizer.format(date, 'dayFormat')

        var header = /*#__PURE__*/ _react.default.createElement(
          HeaderComponent,
          {
            date: date,
            label: label,
            localizer: localizer,
          }
        )

        return /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            className: 'rbc-time-header-content inverted',
            key: date || i,
          },
          /*#__PURE__*/ _react.default.createElement(
            'div',
            {
              className:
                'rbc-row rbc-time-header-cell inverted' +
                (range.length <= 1 && resources.length <= 1
                  ? ' rbc-time-header-cell-single-day'
                  : ''),
            },
            /*#__PURE__*/ _react.default.createElement(
              'div',
              {
                key: i,
                style: style,
                className: (0, _clsx.default)(
                  range.length <= 1 // Check for day view and hide the drilldown date if present
                    ? 'rbc-header-date-single-day inverted'
                    : 'rbc-header-date',
                  className,
                  dates.eq(date, today, 'day') && 'rbc-today'
                ),
              },
              drilldownView
                ? /*#__PURE__*/ _react.default.createElement(
                    'a',
                    {
                      href: '#',
                      onClick: function onClick(e) {
                        return _this2.handleHeaderClick(date, drilldownView, e)
                      },
                    },
                    header
                  )
                : /*#__PURE__*/ _react.default.createElement(
                    'span',
                    null,
                    header
                  )
            ),
            _this2.renderHeaderCells(resources, date)
          )
        )
      })
    )
  }

  return TimeGridHeader
})(_react.default.Component)

TimeGridHeader.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        range: _propTypes.default.array.isRequired,
        events: _propTypes.default.array.isRequired,
        resources: _propTypes.default.object,
        getNow: _propTypes.default.func.isRequired,
        isOverflowing: _propTypes.default.bool,
        invertResourcesAndDates: _propTypes.default.bool,
        date: _propTypes.default.object,
        rtl: _propTypes.default.bool,
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
        onDrillDown: _propTypes.default.func,
        getDrilldownView: _propTypes.default.func.isRequired,
        scrollRef: _propTypes.default.any,
      }
    : {}
var _default = TimeGridHeader
exports.default = _default
module.exports = exports.default
