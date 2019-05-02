'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _EventRowMixin = _interopRequireDefault(require('./EventRowMixin'))

var _eventLevels = require('./utils/eventLevels')

var _range = _interopRequireDefault(require('lodash/range'))

var isSegmentInSlot = function isSegmentInSlot(seg, slot) {
  return seg.left <= slot && seg.right >= slot
}

var eventsInSlot = function eventsInSlot(segments, slot) {
  return segments.filter(function(seg) {
    return isSegmentInSlot(seg, slot)
  }).length
}

var EventEndingRow =
  /*#__PURE__*/
  (function(_React$Component) {
    ;(0, _inheritsLoose2.default)(EventEndingRow, _React$Component)

    function EventEndingRow() {
      return _React$Component.apply(this, arguments) || this
    }

    var _proto = EventEndingRow.prototype

    _proto.render = function render() {
      var _this$props = this.props,
        segments = _this$props.segments,
        slots = _this$props.slotMetrics.slots
      var rowSegments = (0, _eventLevels.eventLevels)(segments).levels[0]
      var current = 1,
        lastEnd = 1,
        row = []

      while (current <= slots) {
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
          var content = _EventRowMixin.default.renderEvent(this.props, event)

          if (gap) {
            row.push(
              _EventRowMixin.default.renderSpan(slots, gap, key + '_gap')
            )
          }

          row.push(_EventRowMixin.default.renderSpan(slots, span, key, content))
          lastEnd = current = right + 1
        } else {
          if (gap) {
            row.push(
              _EventRowMixin.default.renderSpan(slots, gap, key + '_gap')
            )
          }

          row.push(
            _EventRowMixin.default.renderSpan(
              slots,
              1,
              key,
              this.renderShowMore(segments, current)
            )
          )
          lastEnd = current = current + 1
        }
      }

      return _react.default.createElement(
        'div',
        {
          className: 'rbc-row',
        },
        row
      )
    }

    _proto.canRenderSlotEvent = function canRenderSlotEvent(slot, span) {
      var segments = this.props.segments
      return (0, _range.default)(slot, slot + span).every(function(s) {
        var count = eventsInSlot(segments, s)
        return count === 1
      })
    }

    _proto.renderShowMore = function renderShowMore(segments, slot) {
      var _this = this

      var localizer = this.props.localizer
      var count = eventsInSlot(segments, slot)
      return count
        ? _react.default.createElement(
            'a',
            {
              key: 'sm_' + slot,
              href: '#',
              className: 'rbc-show-more',
              onClick: function onClick(e) {
                return _this.showMore(slot, e)
              },
            },
            localizer.messages.showMore(count)
          )
        : false
    }

    _proto.showMore = function showMore(slot, e) {
      e.preventDefault()
      this.props.onShowMore(slot)
    }

    return EventEndingRow
  })(_react.default.Component)

EventEndingRow.propTypes =
  process.env.NODE_ENV !== 'production'
    ? (0, _extends2.default)(
        {
          segments: _propTypes.default.array,
          slots: _propTypes.default.number,
          onShowMore: _propTypes.default.func,
        },
        _EventRowMixin.default.propTypes
      )
    : {}
EventEndingRow.defaultProps = (0, _extends2.default)(
  {},
  _EventRowMixin.default.defaultProps
)
var _default = EventEndingRow
exports.default = _default
module.exports = exports['default']
