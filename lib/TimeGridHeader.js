"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _clsx = _interopRequireDefault(require("clsx"));

var _scrollbarSize = _interopRequireDefault(require("dom-helpers/scrollbarSize"));

var _react = _interopRequireDefault(require("react"));

var _DateContentRow = _interopRequireDefault(require("./DateContentRow"));

var _Header = _interopRequireDefault(require("./Header"));

var _ResourceHeader = _interopRequireDefault(require("./ResourceHeader"));

var _helpers = require("./utils/helpers");

var TimeGridHeader = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(TimeGridHeader, _React$Component);

  var _super = (0, _createSuper2.default)(TimeGridHeader);

  function TimeGridHeader() {
    var _this;

    (0, _classCallCheck2.default)(this, TimeGridHeader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.handleHeaderClick = function (date, view, e) {
      e.preventDefault();
      (0, _helpers.notify)(_this.props.onDrillDown, [date, view]);
    };

    _this.renderRow = function (resource) {
      var _this$props = _this.props,
          events = _this$props.events,
          rtl = _this$props.rtl,
          selectable = _this$props.selectable,
          getNow = _this$props.getNow,
          range = _this$props.range,
          getters = _this$props.getters,
          localizer = _this$props.localizer,
          accessors = _this$props.accessors,
          components = _this$props.components,
          resizable = _this$props.resizable;
      var resourceId = accessors.resourceId(resource);
      var eventsToDisplay = resource ? events.filter(function (event) {
        return accessors.resource(event) === resourceId;
      }) : events;
      return /*#__PURE__*/_react.default.createElement(_DateContentRow.default, {
        isAllDay: true,
        rtl: rtl,
        getNow: getNow,
        minRows: 2,
        range: range,
        events: eventsToDisplay,
        resourceId: resourceId,
        className: "rbc-allday-cell",
        selectable: selectable,
        selected: _this.props.selected,
        components: components,
        accessors: accessors,
        getters: getters,
        localizer: localizer,
        onSelect: _this.props.onSelectEvent,
        onDoubleClick: _this.props.onDoubleClickEvent,
        onKeyPress: _this.props.onKeyPressEvent,
        onSelectSlot: _this.props.onSelectSlot,
        longPressThreshold: _this.props.longPressThreshold,
        resizable: resizable
      });
    };

    return _this;
  }

  (0, _createClass2.default)(TimeGridHeader, [{
    key: "renderHeaderCells",
    value: function renderHeaderCells(range) {
      var _this2 = this;

      var _this$props2 = this.props,
          localizer = _this$props2.localizer,
          getDrilldownView = _this$props2.getDrilldownView,
          getNow = _this$props2.getNow,
          dayProp = _this$props2.getters.dayProp,
          _this$props2$componen = _this$props2.components.header,
          HeaderComponent = _this$props2$componen === void 0 ? _Header.default : _this$props2$componen;
      var today = getNow();
      return range.map(function (date, i) {
        var drilldownView = getDrilldownView(date);
        var label = localizer.format(date, 'dayFormat');

        var _dayProp = dayProp(date),
            className = _dayProp.className,
            style = _dayProp.style;

        var header = /*#__PURE__*/_react.default.createElement(HeaderComponent, {
          date: date,
          label: label,
          localizer: localizer
        });

        return /*#__PURE__*/_react.default.createElement("div", {
          key: i,
          style: style,
          className: (0, _clsx.default)('rbc-header', className, localizer.isSameDate(date, today) && 'rbc-today')
        }, drilldownView ? /*#__PURE__*/_react.default.createElement("button", {
          type: "button",
          className: "rbc-button-link",
          onClick: function onClick(e) {
            return _this2.handleHeaderClick(date, drilldownView, e);
          }
        }, header) : /*#__PURE__*/_react.default.createElement("span", null, header));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props3 = this.props,
          width = _this$props3.width,
          rtl = _this$props3.rtl,
          resources = _this$props3.resources,
          range = _this$props3.range,
          events = _this$props3.events,
          getNow = _this$props3.getNow,
          accessors = _this$props3.accessors,
          selectable = _this$props3.selectable,
          components = _this$props3.components,
          getters = _this$props3.getters,
          scrollRef = _this$props3.scrollRef,
          localizer = _this$props3.localizer,
          isOverflowing = _this$props3.isOverflowing,
          _this$props3$componen = _this$props3.components,
          TimeGutterHeader = _this$props3$componen.timeGutterHeader,
          _this$props3$componen2 = _this$props3$componen.resourceHeader,
          ResourceHeaderComponent = _this$props3$componen2 === void 0 ? _ResourceHeader.default : _this$props3$componen2,
          resizable = _this$props3.resizable;
      var style = {};

      if (isOverflowing) {
        style[rtl ? 'marginLeft' : 'marginRight'] = "".concat((0, _scrollbarSize.default)(), "px");
      }

      var groupedEvents = resources.groupEvents(events);
      return /*#__PURE__*/_react.default.createElement("div", {
        style: style,
        ref: scrollRef,
        className: (0, _clsx.default)('rbc-time-header', isOverflowing && 'rbc-overflowing')
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "rbc-label rbc-time-header-gutter",
        style: {
          width: width,
          minWidth: width,
          maxWidth: width
        }
      }, TimeGutterHeader && /*#__PURE__*/_react.default.createElement(TimeGutterHeader, null)), resources.map(function (_ref, idx) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            id = _ref2[0],
            resource = _ref2[1];

        return /*#__PURE__*/_react.default.createElement("div", {
          className: "rbc-time-header-content",
          key: id || idx
        }, resource && /*#__PURE__*/_react.default.createElement("div", {
          className: "rbc-row rbc-row-resource",
          key: "resource_".concat(idx)
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "rbc-header"
        }, /*#__PURE__*/_react.default.createElement(ResourceHeaderComponent, {
          index: idx,
          label: accessors.resourceTitle(resource),
          resource: resource
        }))), /*#__PURE__*/_react.default.createElement("div", {
          className: "rbc-row rbc-time-header-cell".concat(range.length <= 1 ? ' rbc-time-header-cell-single-day' : '')
        }, _this3.renderHeaderCells(range)), /*#__PURE__*/_react.default.createElement(_DateContentRow.default, {
          isAllDay: true,
          rtl: rtl,
          getNow: getNow,
          minRows: 2,
          range: range,
          events: groupedEvents.get(id) || [],
          resourceId: resource && id,
          className: "rbc-allday-cell",
          selectable: selectable,
          selected: _this3.props.selected,
          components: components,
          accessors: accessors,
          getters: getters,
          localizer: localizer,
          onSelect: _this3.props.onSelectEvent,
          onDoubleClick: _this3.props.onDoubleClickEvent,
          onKeyPress: _this3.props.onKeyPressEvent,
          onSelectSlot: _this3.props.onSelectSlot,
          longPressThreshold: _this3.props.longPressThreshold,
          resizable: resizable
        }));
      }));
    }
  }]);
  return TimeGridHeader;
}(_react.default.Component);

var _default = TimeGridHeader;
exports.default = _default;