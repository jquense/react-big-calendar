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

var _react = require('react')

var _react2 = _interopRequireDefault(_react)

var _EventRowMixin = require('./EventRowMixin')

var _EventRowMixin2 = _interopRequireDefault(_EventRowMixin)

var _eventLevels = require('./utils/eventLevels')

var _messages = require('./utils/messages')

var _messages2 = _interopRequireDefault(_messages)

var _range = require('lodash/range')

var _range2 = _interopRequireDefault(_range)

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

var isSegmentInSlot = function isSegmentInSlot(seg, slot) {
  return seg.left <= slot && seg.right >= slot
}
var eventsInSlot = function eventsInSlot(segments, slot) {
  return segments.filter(function(seg) {
    return isSegmentInSlot(seg, slot)
  }).length
}

var EventEndingRow = (function(_React$Component) {
  _inherits(EventEndingRow, _React$Component)

  function EventEndingRow() {
    _classCallCheck(this, EventEndingRow)

    return _possibleConstructorReturn(
      this,
      _React$Component.apply(this, arguments)
    )
  }

  EventEndingRow.prototype.render = function render() {
    var _props = this.props,
      segments = _props.segments,
      slotCount = _props.slots

    var rowSegments = (0, _eventLevels.eventLevels)(segments).levels[0]

    var current = 1,
      lastEnd = 1,
      row = []

    while (current <= slotCount) {
      var key = '_lvl_' + current

      var _ref =
          rowSegments.filter(function(seg) {
            return isSegmentInSlot(seg, current)
          })[0] || {},
        event = _ref.event,
        left = _ref.left,
        right = _ref.right,
        span = _ref.span //eslint-disable-line

      if (!event) {
        current++
        continue
      }

      var gap = Math.max(0, left - lastEnd)

      if (this.canRenderSlotEvent(left, span)) {
        var content = _EventRowMixin2.default.renderEvent(this.props, event)

        if (gap) {
          row.push(
            _EventRowMixin2.default.renderSpan(this.props, gap, key + '_gap')
          )
        }

        row.push(
          _EventRowMixin2.default.renderSpan(this.props, span, key, content)
        )

        lastEnd = current = right + 1
      } else {
        if (gap) {
          row.push(
            _EventRowMixin2.default.renderSpan(this.props, gap, key + '_gap')
          )
        }

        row.push(
          _EventRowMixin2.default.renderSpan(
            this.props,
            1,
            key,
            this.renderShowMore(segments, current)
          )
        )
        lastEnd = current = current + 1
      }
    }

    return _react2.default.createElement('div', { className: 'rbc-row' }, row)
  }

  EventEndingRow.prototype.canRenderSlotEvent = function canRenderSlotEvent(
    slot,
    span
  ) {
    var segments = this.props.segments

    return (0, _range2.default)(slot, slot + span).every(function(s) {
      var count = eventsInSlot(segments, s)

      return count === 1
    })
  }

  EventEndingRow.prototype.renderShowMore = function renderShowMore(
    segments,
    slot
  ) {
    var _this2 = this

    var messages = (0, _messages2.default)(this.props.messages)
    var count = eventsInSlot(segments, slot)

    return count
      ? _react2.default.createElement(
          'a',
          {
            key: 'sm_' + slot,
            href: '#',
            className: 'rbc-show-more',
            onClick: function onClick(e) {
              return _this2.showMore(slot, e)
            },
          },
          messages.showMore(count)
        )
      : false
  }

  EventEndingRow.prototype.showMore = function showMore(slot, e) {
    e.preventDefault()
    this.props.onShowMore(slot)
  }

  return EventEndingRow
})(_react2.default.Component)

EventEndingRow.propTypes = _extends(
  {
    segments: _propTypes2.default.array,
    slots: _propTypes2.default.number,
    messages: _propTypes2.default.object,
    onShowMore: _propTypes2.default.func,
  },
  _EventRowMixin2.default.propTypes
)
EventEndingRow.defaultProps = _extends({}, _EventRowMixin2.default.defaultProps)
exports.default = EventEndingRow
module.exports = exports['default']
