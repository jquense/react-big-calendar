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

var _react = _interopRequireDefault(require("react"));

var _offset = _interopRequireDefault(require("dom-helpers/offset"));

var _scrollTop = _interopRequireDefault(require("dom-helpers/scrollTop"));

var _scrollLeft = _interopRequireDefault(require("dom-helpers/scrollLeft"));

var _EventCell = _interopRequireDefault(require("./EventCell"));

var _selection = require("./utils/selection");

var Popup = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Popup, _React$Component);

  var _super = (0, _createSuper2.default)(Popup);

  function Popup() {
    (0, _classCallCheck2.default)(this, Popup);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Popup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          _this$props$popupOffs = _this$props.popupOffset,
          popupOffset = _this$props$popupOffs === void 0 ? 5 : _this$props$popupOffs,
          popperRef = _this$props.popperRef,
          _getOffset = (0, _offset.default)(popperRef.current),
          top = _getOffset.top,
          left = _getOffset.left,
          width = _getOffset.width,
          height = _getOffset.height,
          viewBottom = window.innerHeight + (0, _scrollTop.default)(window),
          viewRight = window.innerWidth + (0, _scrollLeft.default)(window),
          bottom = top + height,
          right = left + width;

      if (bottom > viewBottom || right > viewRight) {
        var topOffset, leftOffset;
        if (bottom > viewBottom) topOffset = bottom - viewBottom + (popupOffset.y || +popupOffset || 0);
        if (right > viewRight) leftOffset = right - viewRight + (popupOffset.x || +popupOffset || 0);
        this.setState({
          topOffset: topOffset,
          leftOffset: leftOffset
        }); //eslint-disable-line
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props2 = this.props,
          events = _this$props2.events,
          selected = _this$props2.selected,
          getters = _this$props2.getters,
          accessors = _this$props2.accessors,
          components = _this$props2.components,
          onSelect = _this$props2.onSelect,
          onDoubleClick = _this$props2.onDoubleClick,
          onKeyPress = _this$props2.onKeyPress,
          slotStart = _this$props2.slotStart,
          slotEnd = _this$props2.slotEnd,
          localizer = _this$props2.localizer,
          popperRef = _this$props2.popperRef;
      var width = this.props.position.width,
          topOffset = (this.state || {}).topOffset || 0,
          leftOffset = (this.state || {}).leftOffset || 0;
      var style = {
        top: -topOffset,
        left: -leftOffset,
        minWidth: width + width / 2
      };
      return /*#__PURE__*/_react.default.createElement("div", {
        style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, this.props.style), style),
        className: "rbc-overlay",
        ref: popperRef
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "rbc-overlay-header"
      }, localizer.format(slotStart, 'dayHeaderFormat')), events.map(function (event, idx) {
        return /*#__PURE__*/_react.default.createElement(_EventCell.default, {
          key: idx,
          type: "popup",
          localizer: localizer,
          event: event,
          getters: getters,
          onSelect: onSelect,
          accessors: accessors,
          components: components,
          onDoubleClick: onDoubleClick,
          onKeyPress: onKeyPress,
          continuesPrior: localizer.lt(accessors.end(event), slotStart, 'day'),
          continuesAfter: localizer.gte(accessors.start(event), slotEnd, 'day'),
          slotStart: slotStart,
          slotEnd: slotEnd,
          selected: (0, _selection.isSelected)(event, selected),
          draggable: true,
          onDragStart: function onDragStart() {
            return _this.props.handleDragStart(event);
          },
          onDragEnd: function onDragEnd() {
            return _this.props.show();
          }
        });
      }));
    }
  }]);
  return Popup;
}(_react.default.Component);

/**
 * The Overlay component, of react-overlays, creates a ref that is passed to the Popup, and
 * requires proper ref forwarding to be used without error
 */
var _default = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(Popup, Object.assign({
    popperRef: ref
  }, props));
});

exports.default = _default;