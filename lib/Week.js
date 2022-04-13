"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _react = _interopRequireDefault(require("react"));

var _constants = require("./utils/constants");

var _TimeGrid = _interopRequireDefault(require("./TimeGrid"));

var _excluded = ["date", "localizer", "min", "max", "scrollToTime", "enableAutoScroll"];

var Week = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Week, _React$Component);

  var _super = (0, _createSuper2.default)(Week);

  function Week() {
    (0, _classCallCheck2.default)(this, Week);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Week, [{
    key: "render",
    value: function render() {
      /**
       * This allows us to default min, max, and scrollToTime
       * using our localizer. This is necessary until such time
       * as TimeGrid is converted to a functional component.
       */
      var _this$props = this.props,
          date = _this$props.date,
          localizer = _this$props.localizer,
          _this$props$min = _this$props.min,
          min = _this$props$min === void 0 ? localizer.startOf(new Date(), 'day') : _this$props$min,
          _this$props$max = _this$props.max,
          max = _this$props$max === void 0 ? localizer.endOf(new Date(), 'day') : _this$props$max,
          _this$props$scrollToT = _this$props.scrollToTime,
          scrollToTime = _this$props$scrollToT === void 0 ? localizer.startOf(new Date(), 'day') : _this$props$scrollToT,
          _this$props$enableAut = _this$props.enableAutoScroll,
          enableAutoScroll = _this$props$enableAut === void 0 ? true : _this$props$enableAut,
          props = (0, _objectWithoutProperties2.default)(_this$props, _excluded);
      var range = Week.range(date, this.props);
      return /*#__PURE__*/_react.default.createElement(_TimeGrid.default, Object.assign({}, props, {
        range: range,
        eventOffset: 15,
        localizer: localizer,
        min: min,
        max: max,
        scrollToTime: scrollToTime,
        enableAutoScroll: enableAutoScroll
      }));
    }
  }]);
  return Week;
}(_react.default.Component);

Week.defaultProps = _TimeGrid.default.defaultProps;

Week.navigate = function (date, action, _ref) {
  var localizer = _ref.localizer;

  switch (action) {
    case _constants.navigate.PREVIOUS:
      return localizer.add(date, -1, 'week');

    case _constants.navigate.NEXT:
      return localizer.add(date, 1, 'week');

    default:
      return date;
  }
};

Week.range = function (date, _ref2) {
  var localizer = _ref2.localizer;
  var firstOfWeek = localizer.startOfWeek();
  var start = localizer.startOf(date, 'week', firstOfWeek);
  var end = localizer.endOf(date, 'week', firstOfWeek);
  return localizer.range(start, end);
};

Week.title = function (date, _ref3) {
  var localizer = _ref3.localizer;

  var _Week$range = Week.range(date, {
    localizer: localizer
  }),
      _Week$range2 = (0, _toArray2.default)(_Week$range),
      start = _Week$range2[0],
      rest = _Week$range2.slice(1);

  return localizer.format({
    start: start,
    end: rest.pop()
  }, 'dayRangeHeaderFormat');
};

var _default = Week;
exports.default = _default;