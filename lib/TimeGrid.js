"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var animationFrame = _interopRequireWildcard(require("dom-helpers/animationFrame"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _memoizeOne = _interopRequireDefault(require("memoize-one"));

var dates = _interopRequireWildcard(require("./utils/dates"));

var _DayColumn = _interopRequireDefault(require("./DayColumn"));

var _TimeGutter = _interopRequireDefault(require("./TimeGutter"));

var _width = _interopRequireDefault(require("dom-helpers/width"));

var _TimeGridHeader = _interopRequireDefault(require("./TimeGridHeader"));

var _helpers = require("./utils/helpers");

var _eventLevels = require("./utils/eventLevels");

var _Resources = _interopRequireDefault(require("./utils/Resources"));

var _propTypes2 = require("./utils/propTypes");

var TimeGrid =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(TimeGrid, _Component);

  function TimeGrid(props) {
    var _this;

    _this = _Component.call(this, props) || this;

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
      (0, _helpers.notify)(onSelectSlot, {
        slots: slots,
        start: slots[0],
        end: slots[slots.length - 1],
        action: slotInfo.action
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
    _this.scrollRef = _react.default.createRef();
    _this.contentRef = _react.default.createRef();
    _this._scrollRatio = null;
    return _this;
  }

  var _proto = TimeGrid.prototype;

  _proto.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
    this.calculateScroll();
  };

  _proto.componentDidMount = function componentDidMount() {
    this.checkOverflow();

    if (this.props.width == null) {
      this.measureGutter();
    }

    this.applyScroll();
    window.addEventListener('resize', this.handleResize);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    animationFrame.cancel(this.rafHandle);

    if (this.measureGutterAnimationFrameRequest) {
      window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.props.width == null) {
      this.measureGutter();
    }

    this.applyScroll(); //this.checkOverflow()
  };

  _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    var _this$props = this.props,
        range = _this$props.range,
        scrollToTime = _this$props.scrollToTime; // When paginating, reset scroll

    if (!dates.eq(nextProps.range[0], range[0], 'minute') || !dates.eq(nextProps.scrollToTime, scrollToTime, 'minute')) {
      this.calculateScroll(nextProps);
    }
  };

  _proto.renderEvents = function renderEvents(range, events, now) {
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
    return resources.map(function (_ref, i) {
      var id = _ref[0],
          resource = _ref[1];
      return range.map(function (date, jj) {
        var daysEvents = (groupedEvents.get(id) || []).filter(function (event) {
          return dates.inRange(date, accessors.start(event), accessors.end(event), 'day');
        });
        return _react.default.createElement(_DayColumn.default, (0, _extends2.default)({}, _this2.props, {
          localizer: localizer,
          min: dates.merge(date, min),
          max: dates.merge(date, max),
          resource: resource && id,
          components: components,
          isNow: dates.eq(date, now, 'day'),
          key: i + '-' + jj,
          date: date,
          events: daysEvents,
          dayLayoutAlgorithm: dayLayoutAlgorithm
        }));
      });
    });
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        events = _this$props3.events,
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
        longPressThreshold = _this$props3.longPressThreshold;
    width = width || this.state.gutterWidth;
    var start = range[0],
        end = range[range.length - 1];
    this.slots = range.length;
    var allDayEvents = [],
        rangeEvents = [];
    events.forEach(function (event) {
      if ((0, _eventLevels.inRange)(event, start, end, accessors)) {
        var eStart = accessors.start(event),
            eEnd = accessors.end(event);

        if (accessors.allDay(event) || dates.isJustDate(eStart) && dates.isJustDate(eEnd) || !showMultiDayTimes && !dates.eq(eStart, eEnd, 'day')) {
          allDayEvents.push(event);
        } else {
          rangeEvents.push(event);
        }
      }
    });
    allDayEvents.sort(function (a, b) {
      return (0, _eventLevels.sortEvents)(a, b, accessors);
    });
    return _react.default.createElement("div", {
      className: (0, _clsx.default)('rbc-time-view', resources && 'rbc-time-view-resources')
    }, _react.default.createElement(_TimeGridHeader.default, {
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
      onDrillDown: this.props.onDrillDown,
      getDrilldownView: this.props.getDrilldownView
    }), _react.default.createElement("div", {
      ref: this.contentRef,
      className: "rbc-time-content",
      onScroll: this.handleScroll
    }, _react.default.createElement(_TimeGutter.default, {
      date: start,
      ref: this.gutterRef,
      localizer: localizer,
      min: dates.merge(start, min),
      max: dates.merge(start, max),
      step: this.props.step,
      getNow: this.props.getNow,
      timeslots: this.props.timeslots,
      components: components,
      className: "rbc-time-gutter",
      getters: getters
    }), this.renderEvents(range, rangeEvents, getNow())));
  };

  _proto.clearSelection = function clearSelection() {
    clearTimeout(this._selectTimer);
    this._pendingSelection = [];
  };

  _proto.measureGutter = function measureGutter() {
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
  };

  _proto.applyScroll = function applyScroll() {
    if (this._scrollRatio != null) {
      var content = this.contentRef.current;
      content.scrollTop = content.scrollHeight * this._scrollRatio; // Only do this once

      this._scrollRatio = null;
    }
  };

  _proto.calculateScroll = function calculateScroll(props) {
    if (props === void 0) {
      props = this.props;
    }

    var _props = props,
        min = _props.min,
        max = _props.max,
        scrollToTime = _props.scrollToTime;
    var diffMillis = scrollToTime - dates.startOf(scrollToTime, 'day');
    var totalMillis = dates.diff(max, min);
    this._scrollRatio = diffMillis / totalMillis;
  };

  return TimeGrid;
}(_react.Component);

exports.default = TimeGrid;
TimeGrid.propTypes = process.env.NODE_ENV !== "production" ? {
  events: _propTypes.default.array.isRequired,
  resources: _propTypes.default.array,
  step: _propTypes.default.number,
  timeslots: _propTypes.default.number,
  range: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  min: _propTypes.default.instanceOf(Date),
  max: _propTypes.default.instanceOf(Date),
  getNow: _propTypes.default.func.isRequired,
  scrollToTime: _propTypes.default.instanceOf(Date),
  showMultiDayTimes: _propTypes.default.bool,
  rtl: _propTypes.default.bool,
  width: _propTypes.default.number,
  accessors: _propTypes.default.object.isRequired,
  components: _propTypes.default.object.isRequired,
  getters: _propTypes.default.object.isRequired,
  localizer: _propTypes.default.object.isRequired,
  selected: _propTypes.default.object,
  selectable: _propTypes.default.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: _propTypes.default.number,
  onNavigate: _propTypes.default.func,
  onSelectSlot: _propTypes.default.func,
  onSelectEnd: _propTypes.default.func,
  onSelectStart: _propTypes.default.func,
  onSelectEvent: _propTypes.default.func,
  onDoubleClickEvent: _propTypes.default.func,
  onDrillDown: _propTypes.default.func,
  getDrilldownView: _propTypes.default.func.isRequired,
  dayLayoutAlgorithm: _propTypes2.DayLayoutAlgorithmPropType
} : {};
TimeGrid.defaultProps = {
  step: 30,
  timeslots: 2,
  min: dates.startOf(new Date(), 'day'),
  max: dates.endOf(new Date(), 'day'),
  scrollToTime: dates.startOf(new Date(), 'day')
};
module.exports = exports["default"];