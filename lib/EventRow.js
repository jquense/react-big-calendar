"use strict";

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

var _react = _interopRequireDefault(require("react"));

var _EventRowMixin = _interopRequireDefault(require("./EventRowMixin"));

var EventRow = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(EventRow, _React$Component);

  var _super = (0, _createSuper2.default)(EventRow);

  function EventRow() {
    (0, _classCallCheck2.default)(this, EventRow);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(EventRow, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          segments = _this$props.segments,
          slots = _this$props.slotMetrics.slots,
          className = _this$props.className;
      var lastEnd = 1;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _clsx.default)(className, 'rbc-row')
      }, segments.reduce(function (row, _ref, li) {
        var event = _ref.event,
            left = _ref.left,
            right = _ref.right,
            span = _ref.span;
        var key = '_lvl_' + li;
        var gap = left - lastEnd;

        var content = _EventRowMixin.default.renderEvent(_this.props, event);

        if (gap) row.push(_EventRowMixin.default.renderSpan(slots, gap, "".concat(key, "_gap")));
        row.push(_EventRowMixin.default.renderSpan(slots, span, key, content));
        lastEnd = right + 1;
        return row;
      }, []));
    }
  }]);
  return EventRow;
}(_react.default.Component);

EventRow.defaultProps = (0, _objectSpread2.default)({}, _EventRowMixin.default.defaultProps);
var _default = EventRow;
exports.default = _default;