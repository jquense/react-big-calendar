'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = withDragAndDrop

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutPropertiesLoose')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _clsx = _interopRequireDefault(require('clsx'))

var _propTypes2 = require('../../utils/propTypes')

var _EventWrapper = _interopRequireDefault(require('./EventWrapper'))

var _EventContainerWrapper = _interopRequireDefault(
  require('./EventContainerWrapper')
)

var _WeekWrapper = _interopRequireDefault(require('./WeekWrapper'))

var _common = require('./common')

var _jsxFileName =
  'C:\\Users\\Pavel Ruzankin\\Desktop\\app\\calendarik\\src\\addons\\dragAndDrop\\withDragAndDrop.js'

/**
 * Creates a higher-order component (HOC) supporting drag & drop and optionally resizing
 * of events:
 *
 * ```js
 *    import Calendar from 'react-big-calendar'
 *    import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
 *    export default withDragAndDrop(Calendar)
 * ```
 *
 * Set `resizable` to false in your calendar if you don't want events to be resizable.
 * `resizable` is set to true by default.
 *
 * The HOC adds `onEventDrop`, `onEventResize`, and `onDragStart` callback properties if the events are
 * moved or resized. These callbacks are called with these signatures:
 *
 * ```js
 *    function onEventDrop({ event, start, end, allDay }) {...}
 *    function onEventResize(type, { event, start, end, allDay }) {...}  // type is always 'drop'
 *    function onDragStart({ event, action, direction }) {...}
 * ```
 *
 * Moving and resizing of events has some subtlety which one should be aware of.
 *
 * In some situations, non-allDay events are displayed in "row" format where they
 * are rendered horizontally. This is the case for ALL events in a month view. It
 * is also occurs with multi-day events in a day or week view (unless `showMultiDayTimes`
 * is set).
 *
 * When dropping or resizing non-allDay events into a the header area or when
 * resizing them horizontally because they are displayed in row format, their
 * times are preserved, only their date is changed.
 *
 * If you care about these corner cases, you can examine the `allDay` param suppled
 * in the callback to determine how the user dropped or resized the event.
 *
 * Additionally, this HOC adds the callback props `onDropFromOutside` and `onDragOver`.
 * By default, the calendar will not respond to outside draggable items being dropped
 * onto it. However, if `onDropFromOutside` callback is passed, then when draggable
 * DOM elements are dropped on the calendar, the callback will fire, receiving an
 * object with start and end times, and an allDay boolean.
 *
 * If `onDropFromOutside` is passed, but `onDragOver` is not, any draggable event will be
 * droppable  onto the calendar by default. On the other hand, if an `onDragOver` callback
 * *is* passed, then it can discriminate as to whether a draggable item is droppable on the
 * calendar. To designate a draggable item as droppable, call `event.preventDefault`
 * inside `onDragOver`. If `event.preventDefault` is not called in the `onDragOver`
 * callback, then the draggable item will not be droppable on the calendar.
 *
 * * ```js
 *    function onDropFromOutside({ start, end, allDay }) {...}
 *    function onDragOver(DragEvent: event) {...}
 * ```
 * @param {*} Calendar
 * @param {*} backend
 */
function withDragAndDrop(Calendar) {
  class DragAndDropCalendar extends _react.default.Component {
    constructor() {
      super(...arguments)

      this.defaultOnDragOver = event => {
        event.preventDefault()
      }

      this.handleBeginAction = (event, action, direction) => {
        var { onDragStart } = this.props
        this.setState({
          event,
          action,
          direction,
        })

        if (onDragStart) {
          onDragStart({
            event,
            action,
            direction,
          })
        }
      }

      this.handleInteractionStart = () => {
        if (this.state.interacting === false)
          this.setState({
            interacting: true,
          })
      }

      this.handleInteractionEnd = interactionInfo => {
        var { action, event } = this.state
        if (!action) return
        this.setState({
          action: null,
          event: null,
          interacting: false,
          direction: null,
        })
        if (interactionInfo == null) return
        interactionInfo.event = event
        if (action === 'move') this.props.onEventDrop(interactionInfo)
        if (action === 'resize') this.props.onEventResize(interactionInfo)
      }

      var { components } = this.props
      this.components = (0, _common.mergeComponents)(components, {
        eventWrapper: _EventWrapper.default,
        eventContainerWrapper: _EventContainerWrapper.default,
        weekWrapper: _WeekWrapper.default,
      })
      this.state = {
        interacting: false,
      }
    }

    getChildContext() {
      return {
        draggable: {
          onStart: this.handleInteractionStart,
          onEnd: this.handleInteractionEnd,
          onBeginAction: this.handleBeginAction,
          onDropFromOutside: this.props.onDropFromOutside,
          dragFromOutsideItem: this.props.dragFromOutsideItem,
          draggableAccessor: this.props.draggableAccessor,
          resizableAccessor: this.props.resizableAccessor,
          dragAndDropAction: this.state,
        },
      }
    }

    render() {
      var _this$props = this.props,
        { selectable, elementProps } = _this$props,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, [
          'selectable',
          'elementProps',
        ])
      var { interacting } = this.state
      delete props.onEventDrop
      delete props.onEventResize
      props.selectable = selectable ? 'ignoreEvents' : false
      var elementPropsWithDropFromOutside = this.props.onDropFromOutside
        ? (0, _extends2.default)({}, elementProps, {
            onDragOver: this.props.onDragOver || this.defaultOnDragOver,
          })
        : elementProps
      props.className = (0, _clsx.default)(
        props.className,
        'rbc-addons-dnd',
        !!interacting && 'rbc-addons-dnd-is-dragging'
      )
      return /*#__PURE__*/ _react.default.createElement(
        Calendar,
        (0, _extends2.default)({}, props, {
          elementProps: elementPropsWithDropFromOutside,
          components: this.components,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 200,
            columnNumber: 9,
          },
        })
      )
    }
  }

  DragAndDropCalendar.defaultProps = {
    // TODO: pick these up from Calendar.defaultProps
    components: {},
    draggableAccessor: null,
    resizableAccessor: null,
    resizable: true,
    step: 30,
  }
  DragAndDropCalendar.contextTypes = {
    dragDropManager: _propTypes.default.object,
  }
  DragAndDropCalendar.childContextTypes = {
    draggable: _propTypes.default.shape({
      onStart: _propTypes.default.func,
      onEnd: _propTypes.default.func,
      onBeginAction: _propTypes.default.func,
      onDropFromOutside: _propTypes.default.func,
      dragFromOutsideItem: _propTypes.default.func,
      draggableAccessor: _propTypes2.accessor,
      resizableAccessor: _propTypes2.accessor,
      dragAndDropAction: _propTypes.default.object,
    }),
  }
  DragAndDropCalendar.propTypes =
    process.env.NODE_ENV !== 'production'
      ? {
          onEventDrop: _propTypes.default.func,
          onEventResize: _propTypes.default.func,
          onDragStart: _propTypes.default.func,
          onDragOver: _propTypes.default.func,
          onDropFromOutside: _propTypes.default.func,
          dragFromOutsideItem: _propTypes.default.func,
          draggableAccessor: _propTypes2.accessor,
          resizableAccessor: _propTypes2.accessor,
          selectable: _propTypes.default.oneOf([true, false, 'ignoreEvents']),
          resizable: _propTypes.default.bool,
          components: _propTypes.default.object,
          elementProps: _propTypes.default.object,
          step: _propTypes.default.number,
        }
      : {}
  return DragAndDropCalendar
}

module.exports = exports.default
