'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _classnames = _interopRequireDefault(require('classnames'))

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireWildcard(require('react'))

var TimeSlotUtils = _interopRequireWildcard(require('./utils/TimeSlots'))

var _TimeSlotGroup = _interopRequireDefault(require('./TimeSlotGroup'))

var TimeGutter =
  /*#__PURE__*/
  (function(_Component) {
    ;(0, _inheritsLoose2.default)(TimeGutter, _Component)

    function TimeGutter() {
      var _this

      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key]
      }

      _this = _Component.call.apply(_Component, [this].concat(args)) || this

      _this.renderSlot = function(value, idx) {
        if (idx !== 0) return null
        var _this$props = _this.props,
          localizer = _this$props.localizer,
          getNow = _this$props.getNow

        var isNow = _this.slotMetrics.dateIsInGroup(getNow(), idx)

        return _react.default.createElement(
          'span',
          {
            className: (0, _classnames.default)(
              'rbc-label',
              isNow && 'rbc-now'
            ),
          },
          localizer.format(value, 'timeGutterFormat')
        )
      }

      var _this$props2 = _this.props,
        min = _this$props2.min,
        max = _this$props2.max,
        timeslots = _this$props2.timeslots,
        step = _this$props2.step
      _this.slotMetrics = TimeSlotUtils.getSlotMetrics({
        min: min,
        max: max,
        timeslots: timeslots,
        step: step,
      })
      return _this
    }

    var _proto = TimeGutter.prototype

    _proto.componentWillReceiveProps = function componentWillReceiveProps(
      nextProps
    ) {
      var min = nextProps.min,
        max = nextProps.max,
        timeslots = nextProps.timeslots,
        step = nextProps.step
      this.slotMetrics = this.slotMetrics.update({
        min: min,
        max: max,
        timeslots: timeslots,
        step: step,
      })
    }

    _proto.render = function render() {
      var _this2 = this

      var _this$props3 = this.props,
        resource = _this$props3.resource,
        components = _this$props3.components
      return _react.default.createElement(
        'div',
        {
          className: 'rbc-time-gutter rbc-time-column',
        },
        this.slotMetrics.groups.map(function(grp, idx) {
          return _react.default.createElement(_TimeSlotGroup.default, {
            key: idx,
            group: grp,
            resource: resource,
            components: components,
            renderSlot: _this2.renderSlot,
          })
        })
      )
    }

    return TimeGutter
  })(_react.Component)

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
        localizer: _propTypes.default.object.isRequired,
        resource: _propTypes.default.string,
      }
    : {}
module.exports = exports['default']
