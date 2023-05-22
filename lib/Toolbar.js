"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _react = _interopRequireDefault(require("react"));

var _clsx = _interopRequireDefault(require("clsx"));

var _constants = require("./utils/constants");

var Toolbar = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Toolbar, _React$Component);

  var _super = (0, _createSuper2.default)(Toolbar);

  function Toolbar() {
    var _this;

    (0, _classCallCheck2.default)(this, Toolbar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.navigate = function (action) {
      _this.props.onNavigate(action);
    };

    _this.view = function (view) {
      _this.props.onView(view);
    };

    return _this;
  }

  (0, _createClass2.default)(Toolbar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          messages = _this$props.localizer.messages,
          label = _this$props.label;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "rbc-toolbar"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "rbc-btn-group"
      }, /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        onClick: this.navigate.bind(null, _constants.navigate.TODAY)
      }, messages.today), /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        onClick: this.navigate.bind(null, _constants.navigate.PREVIOUS)
      }, messages.previous), /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        onClick: this.navigate.bind(null, _constants.navigate.NEXT)
      }, messages.next)), /*#__PURE__*/_react.default.createElement("span", {
        className: "rbc-toolbar-label"
      }, label), /*#__PURE__*/_react.default.createElement("span", {
        className: "rbc-btn-group"
      }, this.viewNamesGroup(messages)));
    }
  }, {
    key: "viewNamesGroup",
    value: function viewNamesGroup(messages) {
      var _this2 = this;

      var viewNames = this.props.views;
      var view = this.props.view;

      if (viewNames.length > 1) {
        return viewNames.map(function (name) {
          return /*#__PURE__*/_react.default.createElement("button", {
            type: "button",
            key: name,
            className: (0, _clsx.default)({
              'rbc-active': view === name
            }),
            onClick: _this2.view.bind(null, name)
          }, messages[name]);
        });
      }
    }
  }]);
  return Toolbar;
}(_react.default.Component);

var _default = Toolbar;
exports.default = _default;