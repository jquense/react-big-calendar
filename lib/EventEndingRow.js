'use strict'

var _interopRequireDefault =
  require('@babel/runtime/helpers/interopRequireDefault').default
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _objectSpread2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectSpread2')
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
var _react = _interopRequireDefault(require('react'))
var _clsx = _interopRequireDefault(require('clsx'))
var _EventRowMixin = _interopRequireDefault(require('./EventRowMixin'))
var _eventLevels = require('./utils/eventLevels')
var _range = _interopRequireDefault(require('lodash/range'))
var isSegmentInSlot = function isSegmentInSlot(seg, slot) {
  return seg.left <= slot && seg.right >= slot
}
var eventsInSlot = function eventsInSlot(segments, slot) {
  return segments
    .filter(function (seg) {
      return isSegmentInSlot(seg, slot)
    })
    .map(function (seg) {
      return seg.event
    })
}
var EventEndingRow = /*#__PURE__*/ (function (_React$Component) {
  ;(0, _inherits2.default)(EventEndingRow, _React$Component)
  function EventEndingRow() {
    ;(0, _classCallCheck2.default)(this, EventEndingRow)
    return (0, _callSuper2.default)(this, EventEndingRow, arguments)
  }
  ;(0, _createClass2.default)(EventEndingRow, [
    {
      key: 'render',
      value: function render() {
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
              rowSegments.filter(function (seg) {
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
            row.push(
              _EventRowMixin.default.renderSpan(slots, span, key, content)
            )
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
        return /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            className: 'rbc-row',
          },
          row
        )
      },
    },
    {
      key: 'canRenderSlotEvent',
      value: function canRenderSlotEvent(slot, span) {
        var segments = this.props.segments
        return (0, _range.default)(slot, slot + span).every(function (s) {
          var count = eventsInSlot(segments, s).length
          return count === 1
        })
      },
    },
    {
      key: 'renderShowMore',
      value: function renderShowMore(segments, slot) {
        var _this = this
        var _this$props2 = this.props,
          localizer = _this$props2.localizer,
          slotMetrics = _this$props2.slotMetrics
        var events = slotMetrics.getEventsForSlot(slot)
        var remainingEvents = eventsInSlot(segments, slot)
        var count = remainingEvents.length
        return count
          ? /*#__PURE__*/ _react.default.createElement(
              'button',
              {
                type: 'button',
                key: 'sm_' + slot,
                className: (0, _clsx.default)(
                  'rbc-button-link',
                  'rbc-show-more'
                ),
                onClick: function onClick(e) {
                  return _this.showMore(slot, e)
                },
              },
              localizer.messages.showMore(count, remainingEvents, events)
            )
          : false
      },
    },
    {
      key: 'showMore',
      value: function showMore(slot, e) {
        e.preventDefault()
        e.stopPropagation()
        this.props.onShowMore(slot, e.target)
      },
    },
  ])
  return EventEndingRow
})(_react.default.Component)
EventEndingRow.defaultProps = (0, _objectSpread2.default)(
  {},
  _EventRowMixin.default.defaultProps
)
var _default = (exports.default = EventEndingRow)
