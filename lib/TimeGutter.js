'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

exports.__esModule = true
exports.default = void 0

var _clsx = _interopRequireDefault(require('clsx'))

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireWildcard(require('react'))

var TimeSlotUtils = _interopRequireWildcard(require('./utils/TimeSlots'))

var _TimeSlotGroup = _interopRequireDefault(require('./TimeSlotGroup'))

var _jsxFileName =
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\TimeGutter.js'

class TimeGutter extends _react.Component {
  constructor() {
    super(...arguments)

    this.renderSlot = (value, idx) => {
      if (idx !== 0) return null
      var { localizer, getNow } = this.props
      var isNow = this.slotMetrics.dateIsInGroup(getNow(), idx)
      return /*#__PURE__*/ _react.default.createElement(
        'span',
        {
          className: (0, _clsx.default)('rbc-label', isNow && 'rbc-now'),
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 32,
            columnNumber: 7,
          },
        },
        localizer.format(value, 'timeGutterFormat')
      )
    }

    var { min, max, timeslots, step } = this.props
    this.slotMetrics = TimeSlotUtils.getSlotMetrics({
      min,
      max,
      timeslots,
      step,
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    var { min, max, timeslots, step } = nextProps
    this.slotMetrics = this.slotMetrics.update({
      min,
      max,
      timeslots,
      step,
    })
  }

  render() {
    var { resource, components, getters } = this.props
    return /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: 'rbc-time-gutter rbc-time-column',
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42,
          columnNumber: 7,
        },
      },
      this.slotMetrics.groups.map((grp, idx) => {
        return /*#__PURE__*/ _react.default.createElement(
          _TimeSlotGroup.default,
          {
            key: idx,
            group: grp,
            resource: resource,
            components: components,
            renderSlot: this.renderSlot,
            getters: getters,
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 45,
              columnNumber: 13,
            },
          }
        )
      })
    )
  }
}

exports.default = TimeGutter
TimeGutter.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        min: _propTypes.default.instanceOf(Date).isRequired,
        max: _propTypes.default.instanceOf(Date).isRequired,
        timeslots: _propTypes.default.number.isRequired,
        step: _propTypes.default.number.isRequired,
        getNow: _propTypes.default.func.isRequired,
        components: _propTypes.default.object.isRequired,
        getters: _propTypes.default.object,
        localizer: _propTypes.default.object.isRequired,
        resource: _propTypes.default.string,
      }
    : {}
module.exports = exports.default
