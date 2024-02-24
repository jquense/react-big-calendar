'use strict'

var _interopRequireWildcard =
  require('@babel/runtime/helpers/interopRequireWildcard').default
var _interopRequireDefault =
  require('@babel/runtime/helpers/interopRequireDefault').default
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
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
var _clsx = _interopRequireDefault(require('clsx'))
var _react = _interopRequireWildcard(require('react'))
var _BackgroundWrapper = _interopRequireDefault(require('./BackgroundWrapper'))
var TimeSlotGroup = (exports.default = /*#__PURE__*/ (function (_Component) {
  ;(0, _inherits2.default)(TimeSlotGroup, _Component)
  function TimeSlotGroup() {
    ;(0, _classCallCheck2.default)(this, TimeSlotGroup)
    return (0, _callSuper2.default)(this, TimeSlotGroup, arguments)
  }
  ;(0, _createClass2.default)(TimeSlotGroup, [
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          renderSlot = _this$props.renderSlot,
          resource = _this$props.resource,
          group = _this$props.group,
          getters = _this$props.getters,
          _this$props$component = _this$props.components,
          _this$props$component2 =
            _this$props$component === void 0 ? {} : _this$props$component,
          _this$props$component3 = _this$props$component2.timeSlotWrapper,
          Wrapper =
            _this$props$component3 === void 0
              ? _BackgroundWrapper.default
              : _this$props$component3
        var groupProps = getters ? getters.slotGroupProp(group) : {}
        return /*#__PURE__*/ _react.default.createElement(
          'div',
          Object.assign(
            {
              className: 'rbc-timeslot-group',
            },
            groupProps
          ),
          group.map(function (value, idx) {
            var slotProps = getters ? getters.slotProp(value, resource) : {}
            return /*#__PURE__*/ _react.default.createElement(
              Wrapper,
              {
                key: idx,
                value: value,
                resource: resource,
              },
              /*#__PURE__*/ _react.default.createElement(
                'div',
                Object.assign({}, slotProps, {
                  className: (0, _clsx.default)(
                    'rbc-time-slot',
                    slotProps.className
                  ),
                }),
                renderSlot && renderSlot(value, idx)
              )
            )
          })
        )
      },
    },
  ])
  return TimeSlotGroup
})(_react.Component))
