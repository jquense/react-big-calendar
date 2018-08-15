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

var _classnames = require('classnames')

var _classnames2 = _interopRequireDefault(_classnames)

var _height = require('dom-helpers/query/height')

var _height2 = _interopRequireDefault(_height)

var _querySelectorAll = require('dom-helpers/query/querySelectorAll')

var _querySelectorAll2 = _interopRequireDefault(_querySelectorAll)

var _propTypes = require('prop-types')

var _propTypes2 = _interopRequireDefault(_propTypes)

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _reactDom = require('react-dom')

var _dates = require('./utils/dates')

var _dates2 = _interopRequireDefault(_dates)

var _BackgroundCells = require('./BackgroundCells')

var _BackgroundCells2 = _interopRequireDefault(_BackgroundCells)

var _EventRow = require('./EventRow')

var _EventRow2 = _interopRequireDefault(_EventRow)

var _EventEndingRow = require('./EventEndingRow')

var _EventEndingRow2 = _interopRequireDefault(_EventEndingRow)

var _DateSlotMetrics = require('./utils/DateSlotMetrics')

var DateSlotMetrics = _interopRequireWildcard(_DateSlotMetrics)

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj
  } else {
    var newObj = {}
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key]
      }
    }
    newObj.default = obj
    return newObj
  }
}

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

var propTypes = {
  date: _propTypes2.default.instanceOf(Date),
  events: _propTypes2.default.array.isRequired,
  range: _propTypes2.default.array.isRequired,

  rtl: _propTypes2.default.bool,
  resourceId: _propTypes2.default.any,
  renderForMeasure: _propTypes2.default.bool,
  renderHeader: _propTypes2.default.func,

  container: _propTypes2.default.func,
  selected: _propTypes2.default.object,
  selectable: _propTypes2.default.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: _propTypes2.default.number,

  onShowMore: _propTypes2.default.func,
  onSelectSlot: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  onSelectEnd: _propTypes2.default.func,
  onSelectStart: _propTypes2.default.func,
  onDoubleClick: _propTypes2.default.func,
  dayPropGetter: _propTypes2.default.func,

  getNow: _propTypes2.default.func.isRequired,
  isAllDay: _propTypes2.default.bool,

  accessors: _propTypes2.default.object.isRequired,
  components: _propTypes2.default.object.isRequired,
  getters: _propTypes2.default.object.isRequired,
  localizer: _propTypes2.default.object.isRequired,

  minRows: _propTypes2.default.number.isRequired,
  maxRows: _propTypes2.default.number.isRequired,
}

var defaultProps = {
  minRows: 0,
  maxRows: Infinity,
}

var DateContentRow = (function(_React$Component) {
  _inherits(DateContentRow, _React$Component)

  function DateContentRow() {
    _classCallCheck(this, DateContentRow)

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

    _this.handleSelectSlot = function(slot) {
      var _this$props = _this.props,
        range = _this$props.range,
        onSelectSlot = _this$props.onSelectSlot

      onSelectSlot(range.slice(slot.start, slot.end + 1), slot)
    }

    _this.handleShowMore = function(slot) {
      var _this$props2 = _this.props,
        range = _this$props2.range,
        onShowMore = _this$props2.onShowMore

      var metrics = _this.slotMetrics(_this.props)
      var row = (0, _querySelectorAll2.default)(
        (0, _reactDom.findDOMNode)(_this),
        '.rbc-row-bg'
      )[0]

      var cell = void 0
      if (row) cell = row.children[slot - 1]

      var events = metrics.getEventsForSlot(slot)
      onShowMore(events, range[slot - 1], cell, slot)
    }

    _this.createHeadingRef = function(r) {
      _this.headingRow = r
    }

    _this.createEventRef = function(r) {
      _this.eventRow = r
    }

    _this.getContainer = function() {
      var container = _this.props.container

      return container ? container() : (0, _reactDom.findDOMNode)(_this)
    }

    _this.renderHeadingCell = function(date, index) {
      var _this$props3 = _this.props,
        renderHeader = _this$props3.renderHeader,
        getNow = _this$props3.getNow

      return renderHeader({
        date: date,
        key: 'header_' + index,
        className: (0, _classnames2.default)(
          'rbc-date-cell',
          _dates2.default.eq(date, getNow(), 'day') && 'rbc-now'
        ),
      })
    }

    _this.renderDummy = function() {
      var _this$props4 = _this.props,
        className = _this$props4.className,
        range = _this$props4.range,
        renderHeader = _this$props4.renderHeader

      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(
          'div',
          { className: 'rbc-row-content' },
          renderHeader &&
            _react2.default.createElement(
              'div',
              { className: 'rbc-row', ref: _this.createHeadingRef },
              range.map(_this.renderHeadingCell)
            ),
          _react2.default.createElement(
            'div',
            { className: 'rbc-row', ref: _this.createEventRef },
            _react2.default.createElement(
              'div',
              { className: 'rbc-row-segment' },
              _react2.default.createElement(
                'div',
                { className: 'rbc-event' },
                _react2.default.createElement(
                  'div',
                  { className: 'rbc-event-content' },
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

  DateContentRow.prototype.getRowLimit = function getRowLimit() {
    var eventHeight = (0, _height2.default)(this.eventRow)
    var headingHeight = this.headingRow
      ? (0, _height2.default)(this.headingRow)
      : 0
    var eventSpace =
      (0, _height2.default)((0, _reactDom.findDOMNode)(this)) - headingHeight

    return Math.max(Math.floor(eventSpace / eventHeight), 1)
  }

  DateContentRow.prototype.render = function render() {
    var _props = this.props,
      date = _props.date,
      rtl = _props.rtl,
      range = _props.range,
      className = _props.className,
      selected = _props.selected,
      selectable = _props.selectable,
      renderForMeasure = _props.renderForMeasure,
      accessors = _props.accessors,
      getters = _props.getters,
      components = _props.components,
      getNow = _props.getNow,
      renderHeader = _props.renderHeader,
      onSelect = _props.onSelect,
      localizer = _props.localizer,
      onSelectStart = _props.onSelectStart,
      onSelectEnd = _props.onSelectEnd,
      onDoubleClick = _props.onDoubleClick,
      resourceId = _props.resourceId,
      longPressThreshold = _props.longPressThreshold,
      isAllDay = _props.isAllDay

    if (renderForMeasure) return this.renderDummy()

    var metrics = this.slotMetrics(this.props)
    var levels = metrics.levels,
      extra = metrics.extra

    var WeekWrapper = components.weekWrapper

    var eventRowProps = {
      selected: selected,
      accessors: accessors,
      getters: getters,
      localizer: localizer,
      components: components,
      onSelect: onSelect,
      onDoubleClick: onDoubleClick,
      resourceId: resourceId,
      slotMetrics: metrics,
    }

    return _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(_BackgroundCells2.default, {
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
      }),
      _react2.default.createElement(
        'div',
        { className: 'rbc-row-content' },
        renderHeader &&
          _react2.default.createElement(
            'div',
            { className: 'rbc-row ', ref: this.createHeadingRef },
            range.map(this.renderHeadingCell)
          ),
        _react2.default.createElement(
          WeekWrapper,
          _extends({ isAllDay: isAllDay }, eventRowProps),
          levels.map(function(segs, idx) {
            return _react2.default.createElement(
              _EventRow2.default,
              _extends({ key: idx, segments: segs }, eventRowProps)
            )
          }),
          !!extra.length &&
            _react2.default.createElement(
              _EventEndingRow2.default,
              _extends(
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
  }

  return DateContentRow
})(_react2.default.Component)

DateContentRow.propTypes = propTypes
DateContentRow.defaultProps = defaultProps

exports.default = DateContentRow
module.exports = exports['default']
