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

var _react = _interopRequireDefault(require("react"));

var _EventRow = _interopRequireDefault(require("../../EventRow"));

var _Selection = _interopRequireWildcard(require("../../Selection"));

var _eventLevels = require("../../utils/eventLevels");

var _selection = require("../../utils/selection");

var _common = require("./common");

var _DnDContext = require("./DnDContext");

var WeekWrapper = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(WeekWrapper, _React$Component);

  var _super = (0, _createSuper2.default)(WeekWrapper);

  function WeekWrapper() {
    var _this;

    (0, _classCallCheck2.default)(this, WeekWrapper);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.handleMove = function (point, bounds, draggedEvent) {
      if (!(0, _selection.pointInBox)(bounds, point)) return _this.reset();
      var event = _this.context.draggable.dragAndDropAction.event || draggedEvent;
      var _this$props = _this.props,
          accessors = _this$props.accessors,
          slotMetrics = _this$props.slotMetrics,
          rtl = _this$props.rtl,
          localizer = _this$props.localizer;
      var slot = (0, _selection.getSlotAtX)(bounds, point.x, rtl, slotMetrics.slots);
      var date = slotMetrics.getDateForSlot(slot); // Adjust the dates, but maintain the times when moving

      var _eventTimes = (0, _common.eventTimes)(event, accessors, localizer),
          start = _eventTimes.start,
          duration = _eventTimes.duration;

      start = localizer.merge(date, start);
      var end = localizer.add(start, duration, 'milliseconds'); // LATER: when dragging a multi-row event, only the first row is animating

      _this.update(event, start, end);
    };

    _this.handleDropFromOutside = function (point, bounds) {
      if (!_this.context.draggable.onDropFromOutside) return;
      var _this$props2 = _this.props,
          slotMetrics = _this$props2.slotMetrics,
          rtl = _this$props2.rtl,
          localizer = _this$props2.localizer;
      var slot = (0, _selection.getSlotAtX)(bounds, point.x, rtl, slotMetrics.slots);
      var start = slotMetrics.getDateForSlot(slot);

      _this.context.draggable.onDropFromOutside({
        start: start,
        end: localizer.add(start, 1, 'day'),
        allDay: false
      });
    };

    _this.handleDragOverFromOutside = function (point, node) {
      if (!_this.context.draggable.dragFromOutsideItem) return;

      _this.handleMove(point, node, _this.context.draggable.dragFromOutsideItem());
    };

    _this._selectable = function () {
      var node = _this.ref.current.closest('.rbc-month-row, .rbc-allday-cell');

      var container = node.closest('.rbc-month-view, .rbc-time-view');
      var selector = _this._selector = new _Selection.default(function () {
        return container;
      });
      selector.on('beforeSelect', function (point) {
        var isAllDay = _this.props.isAllDay;
        var action = _this.context.draggable.dragAndDropAction.action;
        var bounds = (0, _Selection.getBoundsForNode)(node);
        var isInBox = (0, _selection.pointInBox)(bounds, point);
        return action === 'move' || action === 'resize' && (!isAllDay || isInBox);
      });
      selector.on('selecting', function (box) {
        var bounds = (0, _Selection.getBoundsForNode)(node);
        var dragAndDropAction = _this.context.draggable.dragAndDropAction;
        if (dragAndDropAction.action === 'move') _this.handleMove(box, bounds);
        if (dragAndDropAction.action === 'resize') _this.handleResize(box, bounds);
      });
      selector.on('selectStart', function () {
        return _this.context.draggable.onStart();
      });
      selector.on('select', function (point) {
        var bounds = (0, _Selection.getBoundsForNode)(node);
        if (!_this.state.segment) return;

        if (!(0, _selection.pointInBox)(bounds, point)) {
          _this.reset();
        } else {
          _this.handleInteractionEnd();
        }
      });
      selector.on('dropFromOutside', function (point) {
        if (!_this.context.draggable.onDropFromOutside) return;
        var bounds = (0, _Selection.getBoundsForNode)(node);
        if (!(0, _selection.pointInBox)(bounds, point)) return;

        _this.handleDropFromOutside(point, bounds);
      });
      selector.on('dragOverFromOutside', function (point) {
        if (!_this.context.draggable.dragFromOutsideItem) return;
        var bounds = (0, _Selection.getBoundsForNode)(node);

        _this.handleDragOverFromOutside(point, bounds);
      });
      selector.on('click', function () {
        return _this.context.draggable.onEnd(null);
      });
      selector.on('reset', function () {
        _this.reset();

        _this.context.draggable.onEnd(null);
      });
    };

    _this.handleInteractionEnd = function () {
      var _this$props3 = _this.props,
          resourceId = _this$props3.resourceId,
          isAllDay = _this$props3.isAllDay;
      var event = _this.state.segment.event;

      _this.reset();

      _this.context.draggable.onEnd({
        start: event.start,
        end: event.end,
        resourceId: resourceId,
        isAllDay: isAllDay
      });
    };

    _this._teardownSelectable = function () {
      if (!_this._selector) return;

      _this._selector.teardown();

      _this._selector = null;
    };

    _this.state = {};
    _this.ref = /*#__PURE__*/_react.default.createRef();
    return _this;
  }

  (0, _createClass2.default)(WeekWrapper, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._selectable();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._teardownSelectable();
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this.state.segment) this.setState({
        segment: null
      });
    }
  }, {
    key: "update",
    value: function update(event, start, end) {
      var segment = (0, _eventLevels.eventSegments)((0, _objectSpread2.default)((0, _objectSpread2.default)({}, event), {}, {
        end: end,
        start: start,
        __isPreview: true
      }), this.props.slotMetrics.range, _common.dragAccessors, this.props.localizer);
      var lastSegment = this.state.segment;

      if (lastSegment && segment.span === lastSegment.span && segment.left === lastSegment.left && segment.right === lastSegment.right) {
        return;
      }

      this.setState({
        segment: segment
      });
    }
  }, {
    key: "handleResize",
    value: function handleResize(point, bounds) {
      var _this$context$draggab = this.context.draggable.dragAndDropAction,
          event = _this$context$draggab.event,
          direction = _this$context$draggab.direction;
      var _this$props4 = this.props,
          accessors = _this$props4.accessors,
          slotMetrics = _this$props4.slotMetrics,
          rtl = _this$props4.rtl,
          localizer = _this$props4.localizer;

      var _eventTimes2 = (0, _common.eventTimes)(event, accessors, localizer),
          start = _eventTimes2.start,
          end = _eventTimes2.end;

      var slot = (0, _selection.getSlotAtX)(bounds, point.x, rtl, slotMetrics.slots);
      var date = slotMetrics.getDateForSlot(slot);
      var cursorInRow = (0, _selection.pointInBox)(bounds, point);

      if (direction === 'RIGHT') {
        if (cursorInRow) {
          if (slotMetrics.last < start) return this.reset();
          if (localizer.eq(localizer.startOf(end, 'day'), end)) end = localizer.add(date, 1, 'day');else end = date;
        } else if (localizer.inRange(start, slotMetrics.first, slotMetrics.last) || bounds.bottom < point.y && +slotMetrics.first > +start) {
          end = localizer.add(slotMetrics.last, 1, 'milliseconds');
        } else {
          this.setState({
            segment: null
          });
          return;
        }

        var originalEnd = accessors.end(event);
        end = localizer.merge(end, originalEnd);

        if (localizer.lt(end, start)) {
          end = originalEnd;
        }
      } else if (direction === 'LEFT') {
        if (cursorInRow) {
          if (slotMetrics.first > end) return this.reset();
          start = date;
        } else if (localizer.inRange(end, slotMetrics.first, slotMetrics.last) || bounds.top > point.y && localizer.lt(slotMetrics.last, end)) {
          start = localizer.add(slotMetrics.first, -1, 'milliseconds');
        } else {
          this.reset();
          return;
        }

        var originalStart = accessors.start(event);
        start = localizer.merge(start, originalStart);

        if (localizer.gt(start, end)) {
          start = originalStart;
        }
      }

      this.update(event, start, end);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          children = _this$props5.children,
          accessors = _this$props5.accessors;
      var segment = this.state.segment;
      return /*#__PURE__*/_react.default.createElement("div", {
        ref: this.ref,
        className: "rbc-addons-dnd-row-body"
      }, children, segment && /*#__PURE__*/_react.default.createElement(_EventRow.default, Object.assign({}, this.props, {
        selected: null,
        className: "rbc-addons-dnd-drag-row",
        segments: [segment],
        accessors: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, accessors), _common.dragAccessors)
      })));
    }
  }]);
  return WeekWrapper;
}(_react.default.Component);

WeekWrapper.contextType = _DnDContext.DnDContext;
var _default = WeekWrapper;
exports.default = _default;