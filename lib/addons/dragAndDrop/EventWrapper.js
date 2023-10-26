'use strict'

var _interopRequireDefault =
  require('@babel/runtime/helpers/interopRequireDefault').default
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck')
)
var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass')
)
var _inherits2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inherits')
)
var _createSuper2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createSuper')
)
var _react = _interopRequireDefault(require('react'))
var _clsx = _interopRequireDefault(require('clsx'))
var _accessors = require('../../utils/accessors')
var _DnDContext = require('./DnDContext')
var EventWrapper = /*#__PURE__*/ (function (_React$Component) {
  ;(0, _inherits2.default)(EventWrapper, _React$Component)
  var _super = (0, _createSuper2.default)(EventWrapper)
  function EventWrapper() {
    var _this
    ;(0, _classCallCheck2.default)(this, EventWrapper)
    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }
    _this = _super.call.apply(_super, [this].concat(args))
    _this.handleResizeUp = function (e) {
      if (e.button !== 0) return
      _this.context.draggable.onBeginAction(_this.props.event, 'resize', 'UP')
    }
    _this.handleResizeDown = function (e) {
      if (e.button !== 0) return
      _this.context.draggable.onBeginAction(_this.props.event, 'resize', 'DOWN')
    }
    _this.handleResizeLeft = function (e) {
      if (e.button !== 0) return
      _this.context.draggable.onBeginAction(_this.props.event, 'resize', 'LEFT')
    }
    _this.handleResizeRight = function (e) {
      if (e.button !== 0) return
      _this.context.draggable.onBeginAction(
        _this.props.event,
        'resize',
        'RIGHT'
      )
    }
    _this.handleStartDragging = function (e) {
      var _e$target$getAttribut
      if (e.button !== 0) return
      // hack: because of the way the anchors are arranged in the DOM, resize
      // anchor events will bubble up to the move anchor listener. Don't start
      // move operations when we're on a resize anchor.
      var isResizeHandle =
        (_e$target$getAttribut = e.target.getAttribute('class')) === null ||
        _e$target$getAttribut === void 0
          ? void 0
          : _e$target$getAttribut.includes('rbc-addons-dnd-resize')
      if (!isResizeHandle) {
        var extendedEvent = _this.props.event
        extendedEvent.sourceResource = _this.props.resource
        _this.context.draggable.onBeginAction(_this.props.event, 'move')
      }
    }
    return _this
  }
  ;(0, _createClass2.default)(EventWrapper, [
    {
      key: 'renderAnchor',
      value: function renderAnchor(direction) {
        var cls = direction === 'Up' || direction === 'Down' ? 'ns' : 'ew'
        return /*#__PURE__*/ _react.default.createElement(
          'div',
          {
            className: 'rbc-addons-dnd-resize-'.concat(cls, '-anchor'),
            onMouseDown: this['handleResize'.concat(direction)],
          },
          /*#__PURE__*/ _react.default.createElement('div', {
            className: 'rbc-addons-dnd-resize-'.concat(cls, '-icon'),
          })
        )
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this$props = this.props,
          event = _this$props.event,
          type = _this$props.type,
          continuesPrior = _this$props.continuesPrior,
          continuesAfter = _this$props.continuesAfter,
          resizable = _this$props.resizable
        var children = this.props.children
        if (event.__isPreview)
          return /*#__PURE__*/ _react.default.cloneElement(children, {
            className: (0, _clsx.default)(
              children.props.className,
              'rbc-addons-dnd-drag-preview'
            ),
          })
        var draggable = this.context.draggable
        var draggableAccessor = draggable.draggableAccessor,
          resizableAccessor = draggable.resizableAccessor
        var isDraggable = draggableAccessor
          ? !!(0, _accessors.accessor)(event, draggableAccessor)
          : true

        /* Event is not draggable, no need to wrap it */
        if (!isDraggable) {
          return children
        }

        /*
         * The resizability of events depends on whether they are
         * allDay events and how they are displayed.
         *
         * 1. If the event is being shown in an event row (because
         * it is an allDay event shown in the header row or because as
         * in month view the view is showing all events as rows) then we
         * allow east-west resizing.
         *
         * 2. Otherwise the event is being displayed
         * normally, we can drag it north-south to resize the times.
         *
         * See `DropWrappers` for handling of the drop of such events.
         *
         * Notwithstanding the above, we never show drag anchors for
         * events which continue beyond current component. This happens
         * in the middle of events when showMultiDay is true, and to
         * events at the edges of the calendar's min/max location.
         */
        var isResizable =
          resizable &&
          (resizableAccessor
            ? !!(0, _accessors.accessor)(event, resizableAccessor)
            : true)
        if (isResizable || isDraggable) {
          /*
           * props.children is the singular <Event> component.
           * BigCalendar positions the Event abolutely and we
           * need the anchors to be part of that positioning.
           * So we insert the anchors inside the Event's children
           * rather than wrap the Event here as the latter approach
           * would lose the positioning.
           */
          var newProps = {
            onMouseDown: this.handleStartDragging,
            onTouchStart: this.handleStartDragging,
          }
          if (isResizable) {
            // replace original event child with anchor-embellished child
            var StartAnchor = null
            var EndAnchor = null
            if (type === 'date') {
              StartAnchor = !continuesPrior && this.renderAnchor('Left')
              EndAnchor = !continuesAfter && this.renderAnchor('Right')
            } else {
              StartAnchor = !continuesPrior && this.renderAnchor('Up')
              EndAnchor = !continuesAfter && this.renderAnchor('Down')
            }
            newProps.children = /*#__PURE__*/ _react.default.createElement(
              'div',
              {
                className: 'rbc-addons-dnd-resizable',
              },
              StartAnchor,
              children.props.children,
              EndAnchor
            )
          }
          if (
            draggable.dragAndDropAction.interacting &&
            // if an event is being dragged right now
            draggable.dragAndDropAction.event === event // and it's the current event
          ) {
            // add a new class to it
            newProps.className = (0, _clsx.default)(
              children.props.className,
              'rbc-addons-dnd-dragged-event'
            )
          }
          children = /*#__PURE__*/ _react.default.cloneElement(
            children,
            newProps
          )
        }
        return children
      },
    },
  ])
  return EventWrapper
})(_react.default.Component)
EventWrapper.contextType = _DnDContext.DnDContext
var _default = EventWrapper
exports.default = _default
