"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _react = _interopRequireDefault(require("react"));

var _uncontrollable = require("uncontrollable");

var _clsx = _interopRequireDefault(require("clsx"));

var _propTypes = require("./utils/propTypes");

var _helpers = require("./utils/helpers");

var _constants = require("./utils/constants");

var _localizer = require("./localizer");

var _messages = _interopRequireDefault(require("./utils/messages"));

var _move = _interopRequireDefault(require("./utils/move"));

var _Views = _interopRequireDefault(require("./Views"));

var _Toolbar = _interopRequireDefault(require("./Toolbar"));

var _NoopWrapper = _interopRequireDefault(require("./NoopWrapper"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _defaults = _interopRequireDefault(require("lodash/defaults"));

var _transform = _interopRequireDefault(require("lodash/transform"));

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _accessors = require("./utils/accessors");

var _excluded = ["view", "date", "getNow", "onNavigate"],
    _excluded2 = ["view", "toolbar", "events", "backgroundEvents", "style", "className", "elementProps", "date", "getNow", "length", "showMultiDayTimes", "onShowMore", "doShowMoreDrillDown", "components", "formats", "messages", "culture"];

function viewNames(_views) {
  return !Array.isArray(_views) ? Object.keys(_views) : _views;
}

function isValidView(view, _ref) {
  var _views = _ref.views;
  var names = viewNames(_views);
  return names.indexOf(view) !== -1;
}

var Calendar = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Calendar, _React$Component);

  var _super = (0, _createSuper2.default)(Calendar);

  function Calendar() {
    var _this;

    (0, _classCallCheck2.default)(this, Calendar);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(_args));

    _this.getViews = function () {
      var views = _this.props.views;

      if (Array.isArray(views)) {
        return (0, _transform.default)(views, function (obj, name) {
          return obj[name] = _Views.default[name];
        }, {});
      }

      if ((0, _typeof2.default)(views) === 'object') {
        return (0, _mapValues.default)(views, function (value, key) {
          if (value === true) {
            return _Views.default[key];
          }

          return value;
        });
      }

      return _Views.default;
    };

    _this.getView = function () {
      var views = _this.getViews();

      return views[_this.props.view];
    };

    _this.getDrilldownView = function (date) {
      var _this$props = _this.props,
          view = _this$props.view,
          drilldownView = _this$props.drilldownView,
          getDrilldownView = _this$props.getDrilldownView;
      if (!getDrilldownView) return drilldownView;
      return getDrilldownView(date, view, Object.keys(_this.getViews()));
    };

    _this.handleRangeChange = function (date, viewComponent, view) {
      var _this$props2 = _this.props,
          onRangeChange = _this$props2.onRangeChange,
          localizer = _this$props2.localizer;

      if (onRangeChange) {
        if (viewComponent.range) {
          onRangeChange(viewComponent.range(date, {
            localizer: localizer
          }), view);
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.error('onRangeChange prop not supported for this view');
          }
        }
      }
    };

    _this.handleNavigate = function (action, newDate) {
      var _this$props3 = _this.props,
          view = _this$props3.view,
          date = _this$props3.date,
          getNow = _this$props3.getNow,
          onNavigate = _this$props3.onNavigate,
          props = (0, _objectWithoutProperties2.default)(_this$props3, _excluded);

      var ViewComponent = _this.getView();

      var today = getNow();
      date = (0, _move.default)(ViewComponent, (0, _objectSpread2.default)((0, _objectSpread2.default)({}, props), {}, {
        action: action,
        date: newDate || date || today,
        today: today
      }));
      onNavigate(date, view, action);

      _this.handleRangeChange(date, ViewComponent);
    };

    _this.handleViewChange = function (view) {
      if (view !== _this.props.view && isValidView(view, _this.props)) {
        _this.props.onView(view);
      }

      var views = _this.getViews();

      _this.handleRangeChange(_this.props.date || _this.props.getNow(), views[view], view);
    };

    _this.handleSelectEvent = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      (0, _helpers.notify)(_this.props.onSelectEvent, args);
    };

    _this.handleDoubleClickEvent = function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      (0, _helpers.notify)(_this.props.onDoubleClickEvent, args);
    };

    _this.handleKeyPressEvent = function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      (0, _helpers.notify)(_this.props.onKeyPressEvent, args);
    };

    _this.handleSelectSlot = function (slotInfo) {
      (0, _helpers.notify)(_this.props.onSelectSlot, slotInfo);
    };

    _this.handleDrillDown = function (date, view) {
      var onDrillDown = _this.props.onDrillDown;

      if (onDrillDown) {
        onDrillDown(date, view, _this.drilldownView);
        return;
      }

      if (view) _this.handleViewChange(view);

      _this.handleNavigate(_constants.navigate.DATE, date);
    };

    _this.state = {
      context: _this.getContext(_this.props)
    };
    return _this;
  }

  (0, _createClass2.default)(Calendar, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      this.setState({
        context: this.getContext(nextProps)
      });
    }
  }, {
    key: "getContext",
    value: function getContext(_ref2) {
      var startAccessor = _ref2.startAccessor,
          endAccessor = _ref2.endAccessor,
          allDayAccessor = _ref2.allDayAccessor,
          tooltipAccessor = _ref2.tooltipAccessor,
          titleAccessor = _ref2.titleAccessor,
          resourceAccessor = _ref2.resourceAccessor,
          resourceIdAccessor = _ref2.resourceIdAccessor,
          resourceTitleAccessor = _ref2.resourceTitleAccessor,
          eventPropGetter = _ref2.eventPropGetter,
          backgroundEventPropGetter = _ref2.backgroundEventPropGetter,
          slotPropGetter = _ref2.slotPropGetter,
          slotGroupPropGetter = _ref2.slotGroupPropGetter,
          dayPropGetter = _ref2.dayPropGetter,
          view = _ref2.view,
          views = _ref2.views,
          localizer = _ref2.localizer,
          culture = _ref2.culture,
          _ref2$messages = _ref2.messages,
          messages = _ref2$messages === void 0 ? {} : _ref2$messages,
          _ref2$components = _ref2.components,
          components = _ref2$components === void 0 ? {} : _ref2$components,
          _ref2$formats = _ref2.formats,
          formats = _ref2$formats === void 0 ? {} : _ref2$formats;
      var names = viewNames(views);
      var msgs = (0, _messages.default)(messages);
      return {
        viewNames: names,
        localizer: (0, _localizer.mergeWithDefaults)(localizer, culture, formats, msgs),
        getters: {
          eventProp: function eventProp() {
            return eventPropGetter && eventPropGetter.apply(void 0, arguments) || {};
          },
          backgroundEventProp: function backgroundEventProp() {
            return backgroundEventPropGetter && backgroundEventPropGetter.apply(void 0, arguments) || {};
          },
          slotProp: function slotProp() {
            return slotPropGetter && slotPropGetter.apply(void 0, arguments) || {};
          },
          slotGroupProp: function slotGroupProp() {
            return slotGroupPropGetter && slotGroupPropGetter.apply(void 0, arguments) || {};
          },
          dayProp: function dayProp() {
            return dayPropGetter && dayPropGetter.apply(void 0, arguments) || {};
          }
        },
        components: (0, _defaults.default)(components[view] || {}, (0, _omit.default)(components, names), {
          eventWrapper: _NoopWrapper.default,
          backgroundEventWrapper: _NoopWrapper.default,
          eventContainerWrapper: _NoopWrapper.default,
          dateCellWrapper: _NoopWrapper.default,
          weekWrapper: _NoopWrapper.default,
          timeSlotWrapper: _NoopWrapper.default
        }),
        accessors: {
          start: (0, _accessors.wrapAccessor)(startAccessor),
          end: (0, _accessors.wrapAccessor)(endAccessor),
          allDay: (0, _accessors.wrapAccessor)(allDayAccessor),
          tooltip: (0, _accessors.wrapAccessor)(tooltipAccessor),
          title: (0, _accessors.wrapAccessor)(titleAccessor),
          resource: (0, _accessors.wrapAccessor)(resourceAccessor),
          resourceId: (0, _accessors.wrapAccessor)(resourceIdAccessor),
          resourceTitle: (0, _accessors.wrapAccessor)(resourceTitleAccessor)
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          view = _this$props4.view,
          toolbar = _this$props4.toolbar,
          events = _this$props4.events,
          backgroundEvents = _this$props4.backgroundEvents,
          style = _this$props4.style,
          className = _this$props4.className,
          elementProps = _this$props4.elementProps,
          current = _this$props4.date,
          getNow = _this$props4.getNow,
          length = _this$props4.length,
          showMultiDayTimes = _this$props4.showMultiDayTimes,
          onShowMore = _this$props4.onShowMore,
          doShowMoreDrillDown = _this$props4.doShowMoreDrillDown,
          _0 = _this$props4.components,
          _1 = _this$props4.formats,
          _2 = _this$props4.messages,
          _3 = _this$props4.culture,
          props = (0, _objectWithoutProperties2.default)(_this$props4, _excluded2);
      current = current || getNow();
      var View = this.getView();
      var _this$state$context = this.state.context,
          accessors = _this$state$context.accessors,
          components = _this$state$context.components,
          getters = _this$state$context.getters,
          localizer = _this$state$context.localizer,
          viewNames = _this$state$context.viewNames;
      var CalToolbar = components.toolbar || _Toolbar.default;
      var label = View.title(current, {
        localizer: localizer,
        length: length
      });
      return /*#__PURE__*/_react.default.createElement("div", Object.assign({}, elementProps, {
        className: (0, _clsx.default)(className, 'rbc-calendar', props.rtl && 'rbc-rtl'),
        style: style
      }), toolbar && /*#__PURE__*/_react.default.createElement(CalToolbar, {
        date: current,
        view: view,
        views: viewNames,
        label: label,
        onView: this.handleViewChange,
        onNavigate: this.handleNavigate,
        localizer: localizer
      }), /*#__PURE__*/_react.default.createElement(View, Object.assign({}, props, {
        events: events,
        backgroundEvents: backgroundEvents,
        date: current,
        getNow: getNow,
        length: length,
        localizer: localizer,
        getters: getters,
        components: components,
        accessors: accessors,
        showMultiDayTimes: showMultiDayTimes,
        getDrilldownView: this.getDrilldownView,
        onNavigate: this.handleNavigate,
        onDrillDown: this.handleDrillDown,
        onSelectEvent: this.handleSelectEvent,
        onDoubleClickEvent: this.handleDoubleClickEvent,
        onKeyPressEvent: this.handleKeyPressEvent,
        onSelectSlot: this.handleSelectSlot,
        onShowMore: onShowMore,
        doShowMoreDrillDown: doShowMoreDrillDown
      })));
    }
    /**
     *
     * @param date
     * @param viewComponent
     * @param {'month'|'week'|'work_week'|'day'|'agenda'} [view] - optional
     * parameter. It appears when range change on view changing. It could be handy
     * when you need to have both: range and view type at once, i.e. for manage rbc
     * state via url
     */

  }]);
  return Calendar;
}(_react.default.Component);

Calendar.defaultProps = {
  events: [],
  backgroundEvents: [],
  elementProps: {},
  popup: false,
  toolbar: true,
  view: _constants.views.MONTH,
  views: [_constants.views.MONTH, _constants.views.WEEK, _constants.views.DAY, _constants.views.AGENDA],
  step: 30,
  length: 30,
  doShowMoreDrillDown: true,
  drilldownView: _constants.views.DAY,
  titleAccessor: 'title',
  tooltipAccessor: 'title',
  allDayAccessor: 'allDay',
  startAccessor: 'start',
  endAccessor: 'end',
  resourceAccessor: 'resourceId',
  resourceIdAccessor: 'id',
  resourceTitleAccessor: 'title',
  longPressThreshold: 250,
  getNow: function getNow() {
    return new Date();
  },
  dayLayoutAlgorithm: 'overlap'
};

var _default = (0, _uncontrollable.uncontrollable)(Calendar, {
  view: 'onView',
  date: 'onNavigate',
  selected: 'onSelectEvent'
});

exports.default = _default;