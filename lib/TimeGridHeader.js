'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _classnames = _interopRequireDefault(require('classnames'))

var _scrollbarSize = _interopRequireDefault(
  require('dom-helpers/util/scrollbarSize')
)

var _react = _interopRequireDefault(require('react'))

var _dates = _interopRequireDefault(require('./utils/dates'))

var _DateContentRow = _interopRequireDefault(require('./DateContentRow'))

var _Header = _interopRequireDefault(require('./Header'))

var _helpers = require('./utils/helpers')

var TimeGridHeader =
  /*#__PURE__*/
  (function(_React$Component) {
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
        _React$Component.call.apply(_React$Component, [this].concat(args)) ||
        this

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
        return _react.default.createElement(_DateContentRow.default, {
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
        })
      }

      return _this
    }

    var _proto = TimeGridHeader.prototype

    _proto.renderHeaderCells = function renderHeaderCells(range) {
      var _this2 = this

      var _this$props2 = this.props,
        localizer = _this$props2.localizer,
        getDrilldownView = _this$props2.getDrilldownView,
        getNow = _this$props2.getNow,
        dayProp = _this$props2.getters.dayProp,
        _this$props2$componen = _this$props2.components.header,
        HeaderComponent =
          _this$props2$componen === void 0
            ? _Header.default
            : _this$props2$componen
      var today = getNow()
      return range.map(function(date, i) {
        var drilldownView = getDrilldownView(date)
        var label = localizer.format(date, 'dayFormat')

        var _dayProp = dayProp(date),
          className = _dayProp.className,
          style = _dayProp.style

        var header = _react.default.createElement(HeaderComponent, {
          date: date,
          label: label,
          localizer: localizer,
        })

        return _react.default.createElement(
          'div',
          {
            key: i,
            style: style,
            className: (0, _classnames.default)(
              'rbc-header',
              className,
              _dates.default.eq(date, today, 'day') && 'rbc-today'
            ),
          },
          drilldownView
            ? _react.default.createElement(
                'a',
                {
                  href: '#',
                  onClick: function onClick(e) {
                    return _this2.handleHeaderClick(date, drilldownView, e)
                  },
                },
                header
              )
            : _react.default.createElement('span', null, header)
        )
      })
    }

    _proto.render = function render() {
      var _this3 = this

      var _this$props3 = this.props,
        width = _this$props3.width,
        rtl = _this$props3.rtl,
        resources = _this$props3.resources,
        range = _this$props3.range,
        events = _this$props3.events,
        getNow = _this$props3.getNow,
        accessors = _this$props3.accessors,
        selectable = _this$props3.selectable,
        components = _this$props3.components,
        getters = _this$props3.getters,
        scrollRef = _this$props3.scrollRef,
        localizer = _this$props3.localizer,
        isOverflowing = _this$props3.isOverflowing,
        TimeGutterHeader = _this$props3.components.timeGutterHeader
      var style = {}

      if (isOverflowing) {
        style[rtl ? 'marginLeft' : 'marginRight'] =
          (0, _scrollbarSize.default)() + 'px'
      }

      var groupedEvents = resources.groupEvents(events)
      return _react.default.createElement(
        'div',
        {
          style: style,
          ref: scrollRef,
          className: (0, _classnames.default)(
            'rbc-time-header',
            isOverflowing && 'rbc-overflowing'
          ),
        },
        _react.default.createElement(
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
            _react.default.createElement(TimeGutterHeader, null)
        ),
        resources.map(function(_ref, idx) {
          var id = _ref[0],
            resource = _ref[1]
          return _react.default.createElement(
            'div',
            {
              className: 'rbc-time-header-content',
              key: id || idx,
            },
            resource &&
              _react.default.createElement(
                'div',
                {
                  className: 'rbc-row rbc-row-resource',
                },
                _react.default.createElement(
                  'div',
                  {
                    key: 'resource_' + idx,
                    className: 'rbc-header',
                  },
                  accessors.resourceTitle(resource)
                )
              ),
            range.length > 1 &&
              _react.default.createElement(
                'div',
                {
                  className: 'rbc-row rbc-time-header-cell',
                },
                _this3.renderHeaderCells(range)
              ),
            _react.default.createElement(_DateContentRow.default, {
              isAllDay: true,
              rtl: rtl,
              getNow: getNow,
              minRows: 2,
              range: range,
              events: groupedEvents.get(id) || [],
              resourceId: resource && id,
              className: 'rbc-allday-cell',
              selectable: selectable,
              selected: _this3.props.selected,
              components: components,
              accessors: accessors,
              getters: getters,
              localizer: localizer,
              onSelect: _this3.props.onSelectEvent,
              onDoubleClick: _this3.props.onDoubleClickEvent,
              onSelectSlot: _this3.props.onSelectSlot,
              longPressThreshold: _this3.props.longPressThreshold,
            })
          )
        })
      )
    }

    return TimeGridHeader
  })(_react.default.Component)

TimeGridHeader.propTypes = {
  range: _propTypes.default.array.isRequired,
  events: _propTypes.default.array.isRequired,
  resources: _propTypes.default.object,
  getNow: _propTypes.default.func.isRequired,
  isOverflowing: _propTypes.default.bool,
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
var _default = TimeGridHeader
exports.default = _default
module.exports = exports['default']
