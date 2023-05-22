"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _clsx = _interopRequireDefault(require("clsx"));

var _react = _interopRequireWildcard(require("react"));

var TimeSlotUtils = _interopRequireWildcard(require("./utils/TimeSlots"));

var _TimeSlotGroup = _interopRequireDefault(require("./TimeSlotGroup"));

/**
 * Since the TimeGutter only displays the 'times' of slots in a day, and is separate
 * from the Day Columns themselves, we check to see if the range contains an offset difference
 * and, if so, change the beginning and end 'date' by a day to properly display the slots times
 * used.
 */
function adjustForDST(_ref) {
  var min = _ref.min,
      max = _ref.max,
      localizer = _ref.localizer;

  if (localizer.getTimezoneOffset(min) !== localizer.getTimezoneOffset(max)) {
    return {
      start: localizer.add(min, -1, 'day'),
      end: localizer.add(max, -1, 'day')
    };
  }

  return {
    start: min,
    end: max
  };
}

var TimeGutter = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(TimeGutter, _Component);

  var _super = (0, _createSuper2.default)(TimeGutter);

  function TimeGutter() {
    var _this;

    (0, _classCallCheck2.default)(this, TimeGutter);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.renderSlot = function (value, idx) {
      if (idx !== 0) return null;
      var _this$props = _this.props,
          localizer = _this$props.localizer,
          getNow = _this$props.getNow;

      var isNow = _this.slotMetrics.dateIsInGroup(getNow(), idx);

      return /*#__PURE__*/_react.default.createElement("span", {
        className: (0, _clsx.default)('rbc-label', isNow && 'rbc-now')
      }, localizer.format(value, 'timeGutterFormat'));
    };

    var _this$props2 = _this.props,
        min = _this$props2.min,
        max = _this$props2.max,
        timeslots = _this$props2.timeslots,
        step = _this$props2.step,
        _localizer = _this$props2.localizer;

    var _adjustForDST = adjustForDST({
      min: min,
      max: max,
      localizer: _localizer
    }),
        start = _adjustForDST.start,
        end = _adjustForDST.end;

    _this.slotMetrics = TimeSlotUtils.getSlotMetrics({
      min: start,
      max: end,
      timeslots: timeslots,
      step: step,
      localizer: _localizer
    });
    return _this;
  }

  (0, _createClass2.default)(TimeGutter, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var min = nextProps.min,
          max = nextProps.max,
          localizer = nextProps.localizer;

      var _adjustForDST2 = adjustForDST({
        min: min,
        max: max,
        localizer: localizer
      }),
          start = _adjustForDST2.start,
          end = _adjustForDST2.end;

      this.slotMetrics = this.slotMetrics.update((0, _objectSpread2.default)((0, _objectSpread2.default)({}, nextProps), {}, {
        min: start,
        max: end
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          resource = _this$props3.resource,
          components = _this$props3.components,
          getters = _this$props3.getters;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "rbc-time-gutter rbc-time-column"
      }, this.slotMetrics.groups.map(function (grp, idx) {
        return /*#__PURE__*/_react.default.createElement(_TimeSlotGroup.default, {
          key: idx,
          group: grp,
          resource: resource,
          components: components,
          renderSlot: _this2.renderSlot,
          getters: getters
        });
      }));
    }
  }]);
  return TimeGutter;
}(_react.Component);

exports.default = TimeGutter;