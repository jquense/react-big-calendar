"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

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

var animationFrame = _interopRequireWildcard(require("dom-helpers/animationFrame"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var _DayColumn = _interopRequireDefault(require("./DayColumn"));

var _TimeGutter = _interopRequireDefault(require("./TimeGutter"));

var _width = _interopRequireDefault(require("dom-helpers/width"));

var _TimeGridHeader = _interopRequireDefault(require("./TimeGridHeader"));

var _helpers = require("./utils/helpers");

var _eventLevels = require("./utils/eventLevels");

var _Resources = _interopRequireDefault(require("./utils/Resources"));

var _propTypes = require("./utils/propTypes");

var TimeGrid = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(TimeGrid, _Component);

  var _super = (0, _createSuper2.default)(TimeGrid);

  function TimeGrid(props) {
    var _this;

    (0, _classCallCheck2.default)(this, TimeGrid);
    _this = _super.call(this, props);

    _this.handleScroll = function (e) {
      if (_this.scrollRef.current) {
        _this.scrollRef.current.scrollLeft = e.target.scrollLeft;
      }
    };

    _this.handleResize = function () {
      animationFrame.cancel(_this.rafHandle);
      _this.rafHandle = animationFrame.request(_this.checkOverflow);
    };

    _this.gutterRef = function (ref) {
      _this.gutter = ref && (0, _reactDom.findDOMNode)(ref);
    };

    _this.handleSelectAlldayEvent = function () {
      //cancel any pending selections so only the event click goes through.
      _this.clearSelection();

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (0, _helpers.notify)(_this.props.onSelectEvent, args);
    };

    _this.handleSelectAllDaySlot = function (slots, slotInfo) {
      var onSelectSlot = _this.props.onSelectSlot;
      var start = new Date(slots[0]);
      var end = new Date(slots[slots.length - 1]);
      end.setDate(slots[slots.length - 1].getDate() + 1);
      (0, _helpers.notify)(onSelectSlot, {
        slots: slots,
        start: start,
        end: end,
        action: slotInfo.action,
        resourceId: slotInfo.resourceId
      });
    };

    _this.checkOverflow = function () {
      if (_this._updatingOverflow) return;
      var content = _this.contentRef.current;
      var isOverflowing = content.scrollHeight > content.clientHeight;

      if (_this.state.isOverflowing !== isOverflowing) {
        _this._updatingOverflow = true;

        _this.setState({
          isOverflowing: isOverflowing
        }, function () {
          _this._updatingOverflow = false;
        });
      }
    };

    _this.memoizedResources = (0, _memoizeOne.default)(function (resources, accessors) {
      return (0, _Resources.default)(resources, accessors);
    });
    _this.state = {
      gutterWidth: undefined,
      isOverflowing: null
    };
    _this.scrollRef = /*#__PURE__*/_react.default.createRef();
    _this.contentRef = /*#__PURE__*/_react.default.createRef();
    _this._scrollRatio = null;
    return _this;
  }

  (0, _createClass2.default)(TimeGrid, [{
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      this.calculateScroll();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.checkOverflow();

      if (this.props.width == null) {
        this.measureGutter();
      }

      this.applyScroll();
      window.addEventListener('resize', this.handleResize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
      animationFrame.cancel(this.rafHandle);

      if (this.measureGutterAnimationFrameRequest) {
        window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.props.width == null) {
        this.measureGutter();
      }

      this.applyScroll(); //this.checkOverflow()
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
          range = _this$props.range,
          scrollToTime = _this$props.scrollToTime,
          localizer = _this$props.localizer; // When paginating, reset scroll

      if (localizer.neq(nextProps.range[0], range[0], 'minutes') || localizer.neq(nextProps.scrollToTime, scrollToTime, 'minutes')) {
        this.calculateScroll(nextProps);
      }
    }
  }, {
    key: "renderEvents",
    value: function renderEvents(range, events, backgroundEvents, now) {
      var _this2 = this;

      var _this$props2 = this.props,
          min = _this$props2.min,
          max = _this$props2.max,
          components = _this$props2.components,
          accessors = _this$props2.accessors,
          localizer = _this$props2.localizer,
          dayLayoutAlgorithm = _this$props2.dayLayoutAlgorithm;
      var resources = this.memoizedResources(this.props.resources, accessors);
      var groupedEvents = resources.groupEvents(events);
      var groupedBackgroundEvents = resources.groupEvents(backgroundEvents);
      return resources.map(function (_ref, i) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            id = _ref2[0],
            resource = _ref2[1];

        return range.map(function (date, jj) {
          var daysEvents = (groupedEvents.get(id) || []).filter(function (event) {
            return localizer.inRange(date, accessors.start(event), accessors.end(event), 'day');
          });
          var daysBackgroundEvents = (groupedBackgroundEvents.get(id) || []).filter(function (event) {
            return localizer.inRange(date, accessors.start(event), accessors.end(event), 'day');
          });
          return /*#__PURE__*/_react.default.createElement(_DayColumn.default, Object.assign({}, _this2.props, {
            localizer: localizer,
            min: localizer.merge(date, min),
            max: localizer.merge(date, max),
            resource: resource && id,
            components: components,
            isNow: localizer.isSameDate(date, now),
            key: i + '-' + jj,
            date: date,
            events: daysEvents,
            backgroundEvents: daysBackgroundEvents,
            dayLayoutAlgorithm: dayLayoutAlgorithm
          }));
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          events = _this$props3.events,
          backgroundEvents = _this$props3.backgroundEvents,
          range = _this$props3.range,
          width = _this$props3.width,
          rtl = _this$props3.rtl,
          selected = _this$props3.selected,
          getNow = _this$props3.getNow,
          resources = _this$props3.resources,
          components = _this$props3.components,
          accessors = _this$props3.accessors,
          getters = _this$props3.getters,
          localizer = _this$props3.localizer,
          min = _this$props3.min,
          max = _this$props3.max,
          showMultiDayTimes = _this$props3.showMultiDayTimes,
          longPressThreshold = _this$props3.longPressThreshold,
          resizable = _this$props3.resizable;
      width = width || this.state.gutterWidth;
      var start = range[0],
          end = range[range.length - 1];
      this.slots = range.length;
      var allDayEvents = [],
          rangeEvents = [],
          rangeBackgroundEvents = [];
      events.forEach(function (event) {
        if ((0, _eventLevels.inRange)(event, start, end, accessors, localizer)) {
          var eStart = accessors.start(event),
              eEnd = accessors.end(event);

          if (accessors.allDay(event) || localizer.startAndEndAreDateOnly(eStart, eEnd) || !showMultiDayTimes && !localizer.isSameDate(eStart, eEnd)) {
            allDayEvents.push(event);
          } else {
            rangeEvents.push(event);
          }
        }
      });
      backgroundEvents.forEach(function (event) {
        if ((0, _eventLevels.inRange)(event, start, end, accessors, localizer)) {
          rangeBackgroundEvents.push(event);
        }
      });
      allDayEvents.sort(function (a, b) {
        return (0, _eventLevels.sortEvents)(a, b, accessors, localizer);
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _clsx.default)('rbc-time-view', resources && 'rbc-time-view-resources')
      }, /*#__PURE__*/_react.default.createElement(_TimeGridHeader.default, {
        range: range,
        events: allDayEvents,
        width: width,
        rtl: rtl,
        getNow: getNow,
        localizer: localizer,
        selected: selected,
        resources: this.memoizedResources(resources, accessors),
        selectable: this.props.selectable,
        accessors: accessors,
        getters: getters,
        components: components,
        scrollRef: this.scrollRef,
        isOverflowing: this.state.isOverflowing,
        longPressThreshold: longPressThreshold,
        onSelectSlot: this.handleSelectAllDaySlot,
        onSelectEvent: this.handleSelectAlldayEvent,
        onDoubleClickEvent: this.props.onDoubleClickEvent,
        onKeyPressEvent: this.props.onKeyPressEvent,
        onDrillDown: this.props.onDrillDown,
        getDrilldownView: this.props.getDrilldownView,
        resizable: resizable
      }), /*#__PURE__*/_react.default.createElement("div", {
        ref: this.contentRef,
        className: "rbc-time-content",
        onScroll: this.handleScroll
      }, /*#__PURE__*/_react.default.createElement(_TimeGutter.default, {
        date: start,
        ref: this.gutterRef,
        localizer: localizer,
        min: localizer.merge(start, min),
        max: localizer.merge(start, max),
        step: this.props.step,
        getNow: this.props.getNow,
        timeslots: this.props.timeslots,
        components: components,
        className: "rbc-time-gutter",
        getters: getters
      }), this.renderEvents(range, rangeEvents, rangeBackgroundEvents, getNow())));
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      clearTimeout(this._selectTimer);
      this._pendingSelection = [];
    }
  }, {
    key: "measureGutter",
    value: function measureGutter() {
      var _this3 = this;

      if (this.measureGutterAnimationFrameRequest) {
        window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest);
      }

      this.measureGutterAnimationFrameRequest = window.requestAnimationFrame(function () {
        var width = (0, _width.default)(_this3.gutter);

        if (width && _this3.state.gutterWidth !== width) {
          _this3.setState({
            gutterWidth: width
          });
        }
      });
    }
  }, {
    key: "applyScroll",
    value: function applyScroll() {
      // If auto-scroll is disabled, we don't actually apply the scroll
      if (this._scrollRatio != null && this.props.enableAutoScroll === true) {
        var content = this.contentRef.current;
        content.scrollTop = content.scrollHeight * this._scrollRatio; // Only do this once

        this._scrollRatio = null;
      }
    }
  }, {
    key: "calculateScroll",
    value: function calculateScroll() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var min = props.min,
          max = props.max,
          scrollToTime = props.scrollToTime,
          localizer = props.localizer;
      var diffMillis = scrollToTime - localizer.startOf(scrollToTime, 'day');
      var totalMillis = localizer.diff(min, max, 'milliseconds');
      this._scrollRatio = diffMillis / totalMillis;
    }
  }]);
  return TimeGrid;
}(_react.Component);

exports.default = TimeGrid;
TimeGrid.defaultProps = {
  step: 30,
  timeslots: 2
};