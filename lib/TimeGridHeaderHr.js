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

    return _this
  }

  var _proto = TimeGridHeader.prototype

  _proto.renderHeaderCells = function renderHeaderCells(range) {
    var _this2 = this

    var _this$props = this.props,
      localizer = _this$props.localizer,
      getDrilldownView = _this$props.getDrilldownView,
      getNow = _this$props.getNow,
      dayProp = _this$props.getters.dayProp,
      _this$props$component = _this$props.components.header,
      HeaderComponent =
        _this$props$component === void 0
          ? _Header.default
          : _this$props$component
    var today = getNow()
    return range.map(function(date, i) {
      var drilldownView = getDrilldownView(date)
      var label = localizer.format(date, 'dayFormat')

      var _dayProp = dayProp(date),
        className = _dayProp.className,
        style = _dayProp.style

      var header = /*#__PURE__*/ _react.default.createElement(HeaderComponent, {
        date: date,
        label: label,
        localizer: localizer,
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
          : /*#__PURE__*/ _react.default.createElement('span', null, header)
      )
    })
  }

  _proto.render = function render() {
    var _this3 = this

    var _this$props2 = this.props,
      rtl = _this$props2.rtl,
      resources = _this$props2.resources,
      range = _this$props2.range,
      accessors = _this$props2.accessors,
      scrollRef = _this$props2.scrollRef,
      isOverflowing = _this$props2.isOverflowing,
      _this$props2$componen = _this$props2.components.resourceHeader,
      ResourceHeaderComponent =
        _this$props2$componen === void 0
          ? _ResourceHeader.default
          : _this$props2$componen
    var style = {}

    if (isOverflowing) {
      style[rtl ? 'marginLeft' : 'marginRight'] =
        (0, _scrollbarSize.default)() + 'px'
    }

    return /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        style: style,
        ref: scrollRef,
        className: (0, _clsx.default)(
          'rbc-time-header',
          isOverflowing && 'rbc-overflowing',
          'rbc-time-header--hr'
        ),
      },
      resources.map(function(_ref, idx) {
        var id = _ref[0],
          resource = _ref[1]
        return /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            className: 'rbc-time-header-content rbc-time-header-content--hr',
            key: id || idx,
          },
          resource &&
            /*#__PURE__*/ _react.default.createElement(
              'div',
              {
                className: 'rbc-resource rbc-resource--hr',
                key: 'resource_' + idx,
              },
              /*#__PURE__*/ _react.default.createElement(
                'div',
                {
                  className: 'rbc-header',
                },
                /*#__PURE__*/ _react.default.createElement(
                  ResourceHeaderComponent,
                  {
                    index: idx,
                    label: accessors.resourceTitle(resource),
                    resource: resource,
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
            },
            _this3.renderHeaderCells(range)
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
        onKeyPressEvent: _propTypes.default.func,
        onDrillDown: _propTypes.default.func,
        getDrilldownView: _propTypes.default.func.isRequired,
        scrollRef: _propTypes.default.any,
      }
    : {}
var _default = TimeGridHeader
exports.default = _default
module.exports = exports['default']
