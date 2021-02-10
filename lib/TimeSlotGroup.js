'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _clsx = _interopRequireDefault(require('clsx'))

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireWildcard(require('react'))

var _BackgroundWrapper = _interopRequireDefault(require('./BackgroundWrapper'))

var _jsxFileName =
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\TimeSlotGroup.js'

class TimeSlotGroup extends _react.Component {
  render() {
    var {
      renderSlot,
      resource,
      group,
      getters,
      components: {
        timeSlotWrapper: Wrapper = _BackgroundWrapper.default,
      } = {},
    } = this.props
    var groupProps = getters ? getters.slotGroupProp() : {}
    return /*#__PURE__*/ _react.default.createElement(
      'div',
      (0, _extends2.default)(
        {
          className: 'rbc-timeslot-group',
        },
        groupProps,
        {
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 19,
            columnNumber: 7,
          },
        }
      ),
      group.map((value, idx) => {
        var slotProps = getters ? getters.slotProp(value, resource) : {}
        return /*#__PURE__*/ _react.default.createElement(
          Wrapper,
          {
            key: idx,
            value: value,
            resource: resource,
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 23,
              columnNumber: 13,
            },
          },
          /*#__PURE__*/ _react.default.createElement(
            'div',
            (0, _extends2.default)({}, slotProps, {
              className: (0, _clsx.default)(
                'rbc-time-slot',
                slotProps.className
              ),
              __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 24,
                columnNumber: 15,
              },
            }),
            renderSlot && renderSlot(value, idx)
          )
        )
      })
    )
  }
}

exports.default = TimeSlotGroup
TimeSlotGroup.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        renderSlot: _propTypes.default.func,
        group: _propTypes.default.array.isRequired,
        resource: _propTypes.default.any,
        components: _propTypes.default.object,
        getters: _propTypes.default.object,
      }
    : {}
module.exports = exports.default
