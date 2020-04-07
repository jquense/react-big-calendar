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

var _DayRow = _interopRequireDefault(require("./DayRow"));

var _TimeGutterRow = _interopRequireDefault(require("./TimeGutterRow"));

var _width = _interopRequireDefault(require("dom-helpers/width"));

var _TimeGridRowHeader = _interopRequireDefault(require("./TimeGridRowHeader"));

var _helpers = require("./utils/helpers");

var _eventLevels = require("./utils/eventLevels");

var _Resources = _interopRequireDefault(require("./utils/Resources"));

var _ResourceHeader = _interopRequireDefault(require("./ResourceHeader"));

var TimeGridRow =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(TimeGridRow, _Component);

  function TimeGridRow(props) {
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
    return _this;
  }

  var _proto = TimeGridRow.prototype;

  _proto.componentWillMount = function componentWillMount() {
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

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
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
        accessors = _this$props2.accessors,
        components = _this$props2.components,
        localizer = _this$props2.localizer;
    var resources = this.memoizedResources(this.props.resources, accessors);
    var groupedEvents = resources.groupEvents(events);
    return resources.map(function (_ref, i) {
      var id = _ref[0],
          resource = _ref[1];
      return _react.default.createElement("div", {
        key: "resource_" + i,
        className: "rbc-time-row-resource"
      }, _this2.renderDay(range, groupedEvents, id, accessors, localizer, min, max, resource, components, now, i));
    }); // return this.renderDay(range, groupedEvents, id, accessors, localizer, min, max, resource, components, now, i)})
  };

  _proto.renderDay = function renderDay(range, groupedEvents, id, accessors, localizer, min, max, resource, components, now, i) {
    var _this3 = this;

    return range.map(function (date, jj) {
      var daysEvents = (groupedEvents.get(id) || []).filter(function (event) {
        return dates.inRange(date, accessors.start(event), accessors.end(event), 'day');
      });
      return _react.default.createElement(_DayRow.default, (0, _extends2.default)({}, _this3.props, {
        localizer: localizer,
        min: dates.merge(date, min),
        max: dates.merge(date, max),
        resource: resource && id,
        components: components,
        isNow: dates.eq(date, now, 'day'),
        key: i + '-' + jj,
        date: date,
        events: daysEvents
      }));
    });
  };

  _proto.render = function render() {
    var _this4 = this;

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
        longPressThreshold = _this$props3.longPressThreshold,
        _this$props3$componen = _this$props3.components,
        TimeGutterHeader = _this$props3$componen.timeGutterHeader,
        _this$props3$componen2 = _this$props3$componen.resourceHeader,
        ResourceHeaderComponent = _this$props3$componen2 === void 0 ? _ResourceHeader.default : _this$props3$componen2;
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
      className: (0, _clsx.default)('rbc-time-view-row', 'rbc-time-view-resources')
    }, _react.default.createElement("div", {
      ref: this.scrollRef,
      className: (0, _clsx.default)('rbc-time-header')
    }, _react.default.createElement("div", {
      className: "rbc-time-header-gutter",
      style: {
        width: width,
        minWidth: width,
        maxWidth: width
      }
    }, TimeGutterHeader && _react.default.createElement(TimeGutterHeader, null)), range.map(function (date, jj) {
      return _react.default.createElement(_TimeGridRowHeader.default, (0, _extends2.default)({
        key: jj
      }, _this4.props, {
        localizer: localizer,
        min: dates.merge(date, min),
        max: dates.merge(date, max),
        components: components,
        key: '-' + jj,
        date: date
      }));
    })), _react.default.createElement("div", {
      ref: this.contentRef,
      className: (0, _clsx.default)("rbc-time-content-row-xx"),
      onScroll: this.handleScroll
    }, resources && _react.default.createElement("div", {
      className: (0, _clsx.default)('rbc-time-column', 'rbc-time-gutter'),
      ref: this.gutterRef
    }, this.memoizedResources(resources, accessors).map(function (_ref2, i) {
      var id = _ref2[0],
          resource = _ref2[1];
      return resource && _react.default.createElement("div", {
        className: "rbc-row rbc-time-row",
        key: "resource_" + i
      }, _react.default.createElement("div", {
        className: "rbc-header"
      }, _react.default.createElement(ResourceHeaderComponent, {
        index: i,
        label: accessors.resourceTitle(resource),
        resource: resource
      })));
    })), _react.default.createElement("div", {
      className: "rbc-time-column-resource-xx"
    }, this.renderEvents(range, rangeEvents, getNow()))));
  };

  _proto.clearSelection = function clearSelection() {
    clearTimeout(this._selectTimer);
    this._pendingSelection = [];
  };

  _proto.measureGutter = function measureGutter() {
    var _this5 = this;

    if (this.measureGutterAnimationFrameRequest) {
      window.cancelAnimationFrame(this.measureGutterAnimationFrameRequest);
    }

    this.measureGutterAnimationFrameRequest = window.requestAnimationFrame(function () {
      if (_this5.gutter) {
        var width = (0, _width.default)(_this5.gutter);

        if (width && _this5.state.gutterWidth !== width) {
          _this5.setState({
            gutterWidth: width
          });
        }
      }
    });
  };

  _proto.applyScroll = function applyScroll() {
    if (this._scrollRatio) {
      var content = this.contentRef.current;
      content.scrollLeft = content.scrollWidth * this._scrollRatio; // Only do this once

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
    var newMin = dates.add(min, 30, 'minutes');
    var beginingOfWeek = dates.startOf(scrollToTime, 'week');
    var scrollToWeekDay = dates.diff(scrollToTime, beginingOfWeek, 'day');
    var diffMillis = dates.diff(max, newMin) * scrollToWeekDay;
    var totalMillis = dates.diff(max, min) * 7;
    this._scrollRatio = diffMillis / totalMillis;
  };

  return TimeGridRow;
}(_react.Component);

exports.default = TimeGridRow;
TimeGridRow.propTypes = process.env.NODE_ENV !== "production" ? {
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
  getDrilldownView: _propTypes.default.func.isRequired
} : {};
TimeGridRow.defaultProps = {
  step: 30,
  timeslots: 2,
  min: dates.startOf(new Date(), 'day'),
  max: dates.endOf(new Date(), 'day'),
  scrollToTime: dates.startOf(new Date(), 'day')
};
module.exports = exports["default"];