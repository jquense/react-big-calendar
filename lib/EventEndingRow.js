'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _EventRowMixin = _interopRequireDefault(require('./EventRowMixin'))

var _eventLevels = require('./utils/eventLevels')

var _range = _interopRequireDefault(require('lodash/range'))

var _jsxFileName =
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\EventEndingRow.js'

var isSegmentInSlot = (seg, slot) => seg.left <= slot && seg.right >= slot

var eventsInSlot = (segments, slot) =>
  segments.filter(seg => isSegmentInSlot(seg, slot)).length

class EventEndingRow extends _react.default.Component {
  render() {
    var {
      segments,
      slotMetrics: { slots },
    } = this.props
    var rowSegments = (0, _eventLevels.eventLevels)(segments).levels[0]
    var current = 1,
      lastEnd = 1,
      row = []

    while (current <= slots) {
      var key = '_lvl_' + current
      var { event, left, right, span } =
        rowSegments.filter(seg => isSegmentInSlot(seg, current))[0] || {} //eslint-disable-line

      if (!event) {
        current++
        continue
      }

      var gap = Math.max(0, left - lastEnd)

      if (this.canRenderSlotEvent(left, span)) {
        var content = _EventRowMixin.default.renderEvent(this.props, event)

        if (gap) {
          row.push(_EventRowMixin.default.renderSpan(slots, gap, key + '_gap'))
        }

        row.push(_EventRowMixin.default.renderSpan(slots, span, key, content))
        lastEnd = current = right + 1
      } else {
        if (gap) {
          row.push(_EventRowMixin.default.renderSpan(slots, gap, key + '_gap'))
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
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63,
          columnNumber: 12,
        },
      },
      row
    )
  }

  canRenderSlotEvent(slot, span) {
    var { segments } = this.props
    return (0, _range.default)(slot, slot + span).every(s => {
      var count = eventsInSlot(segments, s)
      return count === 1
    })
  }

  renderShowMore(segments, slot) {
    var { localizer, range } = this.props
    var count = eventsInSlot(segments, slot)
    var date = range[slot - 1]
    return count
      ? /*#__PURE__*/ _react.default.createElement(
          'a',
          {
            key: 'sm_' + slot,
            href: '#',
            className: 'rbc-show-more',
            onClick: e => this.showMore(slot, e),
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 81,
              columnNumber: 7,
            },
          },
          localizer.messages.showMore(count, date)
        )
      : false
  }

  showMore(slot, e) {
    e.preventDefault()
    this.props.onShowMore(slot, e.target)
  }
}

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
module.exports = exports.default
