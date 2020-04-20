"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var dates = _interopRequireWildcard(require("../../utils/dates"));

var _selection = require("../../utils/selection");

var _reactDom = require("react-dom");

var _eventLevels = require("../../utils/eventLevels");

var _Selection = _interopRequireWildcard(require("../../Selection"));

var _EventRow = _interopRequireDefault(require("../../EventRow"));

var _common = require("./common");

var propTypes = process.env.NODE_ENV !== "production" ? {} : {};

var eventTimes = function eventTimes(event, accessors) {
  var start = accessors.start(event);
  var end = accessors.end(event);
  var isZeroDuration = dates.eq(start, end, 'minutes') && start.getMinutes() === 0; // make zero duration midnight events at least one day long

  if (isZeroDuration) end = dates.add(end, 1, 'day');
  return {
    start: start,
    end: end
  };
};

var WeekWrapper =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2.default)(WeekWrapper, _React$Component);

  function WeekWrapper() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handleMove = function (_ref, node, draggedEvent) {
      var x = _ref.x,
          y = _ref.y;
      var _this$context$draggab = _this.context.draggable.dragAndDropAction.event,
          event = _this$context$draggab === void 0 ? draggedEvent : _this$context$draggab;
      var metrics = _this.props.slotMetrics;
      var accessors = _this.props.accessors;
      if (!event) return;
      var rowBox = (0, _Selection.getBoundsForNode)(node);

      if (!(0, _selection.pointInBox)(rowBox, {
        x: x,
        y: y
      })) {
        _this.reset();

        return;
      } // Make sure to maintain the time of the start date while moving it to the new slot


      var start = dates.merge(metrics.getDateForSlot((0, _selection.getSlotAtX)(rowBox, x, false, metrics.slots)), accessors.start(event));
      var end = dates.add(start, dates.diff(accessors.start(event), accessors.end(event), 'minutes'), 'minutes');

      _this.update(event, start, end);
    };

    _this.handleDropFromOutside = function (point, rowBox) {
      if (!_this.context.draggable.onDropFromOutside) return;
      var metrics = _this.props.slotMetrics;
      var start = metrics.getDateForSlot((0, _selection.getSlotAtX)(rowBox, point.x, false, metrics.slots));

      _this.context.draggable.onDropFromOutside({
        start: start,
        end: dates.add(start, 1, 'day'),
        allDay: false
      });
    };

    _this.handleDragOverFromOutside = function (_ref2, node) {
      var x = _ref2.x,
          y = _ref2.y;
      if (!_this.context.draggable.dragFromOutsideItem) return;

      _this.handleMove({
        x: x,
        y: y
      }, node, _this.context.draggable.dragFromOutsideItem());
    };

    _this._selectable = function () {
      var node = (0, _reactDom.findDOMNode)((0, _assertThisInitialized2.default)(_this)).closest('.rbc-month-row, .rbc-allday-cell');
      var container = node.closest('.rbc-month-view, .rbc-time-view');
      var selector = _this._selector = new _Selection.default(function () {
        return container;
      });
      selector.on('beforeSelect', function (point) {
        var isAllDay = _this.props.isAllDay;
        var action = _this.context.draggable.dragAndDropAction.action;
        return action === 'move' || action === 'resize' && (!isAllDay || (0, _selection.pointInBox)((0, _Selection.getBoundsForNode)(node), point));
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
        if (!_this.state.segment || !(0, _selection.pointInBox)(bounds, point)) return;

        _this.handleInteractionEnd();
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
      var _this$props = _this.props,
          resourceId = _this$props.resourceId,
          isAllDay = _this$props.isAllDay;
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
    return _this;
  }

  var _proto = WeekWrapper.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this._selectable();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this._teardownSelectable();
  };

  _proto.reset = function reset() {
    if (this.state.segment) this.setState({
      segment: null
    });
  };

  _proto.update = function update(event, start, end) {
    var segment = (0, _eventLevels.eventSegments)((0, _extends2.default)({}, event, {
      end: end,
      start: start,
      __isPreview: true
    }), this.props.slotMetrics.range, _common.dragAccessors);
    var lastSegment = this.state.segment;

    if (lastSegment && segment.span === lastSegment.span && segment.left === lastSegment.left && segment.right === lastSegment.right) {
      return;
    }

    this.setState({
      segment: segment
    });
  };

  _proto.handleResize = function handleResize(point, node) {
    var _this$context$draggab2 = this.context.draggable.dragAndDropAction,
        event = _this$context$draggab2.event,
        direction = _this$context$draggab2.direction;
    var _this$props2 = this.props,
        accessors = _this$props2.accessors,
        metrics = _this$props2.slotMetrics;

    var _eventTimes = eventTimes(event, accessors),
        start = _eventTimes.start,
        end = _eventTimes.end;

    var rowBox = (0, _Selection.getBoundsForNode)(node);
    var cursorInRow = (0, _selection.pointInBox)(rowBox, point);

    if (direction === 'RIGHT') {
      if (cursorInRow) {
        if (metrics.last < start) return this.reset(); // add min

        end = dates.add(metrics.getDateForSlot((0, _selection.getSlotAtX)(rowBox, point.x, false, metrics.slots)), 1, 'day');
      } else if (dates.inRange(start, metrics.first, metrics.last) || rowBox.bottom < point.y && +metrics.first > +start) {
        end = dates.add(metrics.last, 1, 'milliseconds');
      } else {
        this.setState({
          segment: null
        });
        return;
      }

      end = dates.max(end, dates.add(start, 1, 'day'));
    } else if (direction === 'LEFT') {
      // inbetween Row
      if (cursorInRow) {
        if (metrics.first > end) return this.reset();
        start = metrics.getDateForSlot((0, _selection.getSlotAtX)(rowBox, point.x, false, metrics.slots));
      } else if (dates.inRange(end, metrics.first, metrics.last) || rowBox.top > point.y && +metrics.last < +end) {
        start = dates.add(metrics.first, -1, 'milliseconds');
      } else {
        this.reset();
        return;
      }

      start = dates.min(dates.add(end, -1, 'day'), start);
    }

    this.update(event, start, end);
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        children = _this$props3.children,
        accessors = _this$props3.accessors;
    var segment = this.state.segment;
    return _react.default.createElement("div", {
      className: "rbc-addons-dnd-row-body"
    }, children, segment && _react.default.createElement(_EventRow.default, (0, _extends2.default)({}, this.props, {
      selected: null,
      className: "rbc-addons-dnd-drag-row",
      segments: [segment],
      accessors: (0, _extends2.default)({}, accessors, _common.dragAccessors)
    })));
  };

  return WeekWrapper;
}(_react.default.Component);

WeekWrapper.contextTypes = {
  draggable: _propTypes.default.shape({
    onStart: _propTypes.default.func,
    onEnd: _propTypes.default.func,
    dragAndDropAction: _propTypes.default.object,
    onDropFromOutside: _propTypes.default.func,
    onBeginAction: _propTypes.default.func,
    dragFromOutsideItem: _propTypes.default.func
  })
};
WeekWrapper.propTypes = process.env.NODE_ENV !== "production" ? {
  isAllDay: _propTypes.default.bool,
  slotMetrics: _propTypes.default.object.isRequired,
  accessors: _propTypes.default.object.isRequired,
  getters: _propTypes.default.object.isRequired,
  components: _propTypes.default.object.isRequired,
  resourceId: _propTypes.default.any
} : {};
WeekWrapper.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
var _default = WeekWrapper;
exports.default = _default;
module.exports = exports["default"];