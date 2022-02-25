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

var _clsx = _interopRequireDefault(require('clsx'))

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireWildcard(require('react'))

var TimeSlotUtils = _interopRequireWildcard(require('./utils/TimeSlots'))

var _TimeSlotGroup = _interopRequireDefault(require('./TimeSlotGroup'))

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null
  var cacheBabelInterop = new WeakMap()
  var cacheNodeInterop = new WeakMap()
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop
  })(nodeInterop)
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return { default: obj }
  }
  var cache = _getRequireWildcardCache(nodeInterop)
  if (cache && cache.has(obj)) {
    return cache.get(obj)
  }
  var newObj = {}
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc)
      } else {
        newObj[key] = obj[key]
      }
    }
  }
  newObj.default = obj
  if (cache) {
    cache.set(obj, newObj)
  }
  return newObj
}

/**
 * Since the TimeGutter only displays the 'times' of slots in a day, and is separate
 * from the Day Columns themselves, we check to see if the range contains an offset difference
 * and, if so, change the beginning and end 'date' by a day to properly display the slots times
 * used.
 */
function adjustForDST(_ref) {
  var min = _ref.min,
    max = _ref.max,
    localizer = _ref.localizer

  if (localizer.getTimezoneOffset(min) !== localizer.getTimezoneOffset(max)) {
    return {
      start: localizer.add(min, -1, 'day'),
      end: localizer.add(max, -1, 'day'),
    }
  }

  return {
    start: min,
    end: max,
  }
}

var TimeGutter = /*#__PURE__*/ (function(_Component) {
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

      return /*#__PURE__*/ _react.default.createElement(
        'span',
        {
          className: (0, _clsx.default)('rbc-label', isNow && 'rbc-now'),
        },
        localizer.format(value, 'timeGutterFormat')
      )
    }

    var _this$props2 = _this.props,
      min = _this$props2.min,
      max = _this$props2.max,
      timeslots = _this$props2.timeslots,
      step = _this$props2.step,
      _localizer = _this$props2.localizer

    var _adjustForDST = adjustForDST({
        min: min,
        max: max,
        localizer: _localizer,
      }),
      start = _adjustForDST.start,
      end = _adjustForDST.end

    _this.slotMetrics = TimeSlotUtils.getSlotMetrics({
      min: start,
      max: end,
      timeslots: timeslots,
      step: step,
      localizer: _localizer,
    })
    return _this
  }

  var _proto = TimeGutter.prototype

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(
    nextProps
  ) {
    var min = nextProps.min,
      max = nextProps.max,
      localizer = nextProps.localizer

    var _adjustForDST2 = adjustForDST({
        min: min,
        max: max,
        localizer: localizer,
      }),
      start = _adjustForDST2.start,
      end = _adjustForDST2.end

    this.slotMetrics = this.slotMetrics.update(
      (0, _extends2.default)({}, nextProps, {
        min: start,
        max: end,
      })
    )
  }

  _proto.render = function render() {
    var _this2 = this

    var _this$props3 = this.props,
      resource = _this$props3.resource,
      components = _this$props3.components,
      getters = _this$props3.getters
    return /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        className: 'rbc-time-gutter rbc-time-column',
      },
      this.slotMetrics.groups.map(function(grp, idx) {
        return /*#__PURE__*/ _react.default.createElement(
          _TimeSlotGroup.default,
          {
            key: idx,
            group: grp,
            resource: resource,
            components: components,
            renderSlot: _this2.renderSlot,
            getters: getters,
          }
        )
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
        getters: _propTypes.default.object,
        localizer: _propTypes.default.object.isRequired,
        resource: _propTypes.default.string,
      }
    : {}
module.exports = exports.default
