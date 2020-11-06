import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'

import { accessor } from '../../utils/propTypes'
import EventWrapper from './EventWrapper'
import EventContainerWrapper from './EventContainerWrapper'
import WeekWrapper from './WeekWrapper'
import { mergeComponents } from './common'

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
export default function withDragAndDrop(Calendar) {
  class DragAndDropCalendar extends React.Component {
    static propTypes = {
      onEventDrop: PropTypes.func,
      onEventResize: PropTypes.func,
      onDragStart: PropTypes.func,
      onDragOver: PropTypes.func,
      onDropFromOutside: PropTypes.func,

      dragFromOutsideItem: PropTypes.func,

      draggableAccessor: accessor,
      resizableAccessor: accessor,

      selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
      resizable: PropTypes.bool,
      components: PropTypes.object,
      elementProps: PropTypes.object,
      step: PropTypes.number,
    }

    static defaultProps = {
      // TODO: pick these up from Calendar.defaultProps
      components: {},
      draggableAccessor: null,
      resizableAccessor: null,
      resizable: true,
      step: 30,
    }

    static contextTypes = {
      dragDropManager: PropTypes.object,
    }

    static childContextTypes = {
      draggable: PropTypes.shape({
        onStart: PropTypes.func,
        onEnd: PropTypes.func,
        onBeginAction: PropTypes.func,
        onDropFromOutside: PropTypes.func,
        dragFromOutsideItem: PropTypes.func,
        draggableAccessor: accessor,
        resizableAccessor: accessor,
        dragAndDropAction: PropTypes.object,
      }),
    }

    constructor(...args) {
      super(...args)

      const { components } = this.props

      this.components = mergeComponents(components, {
        eventWrapper: EventWrapper,
        eventContainerWrapper: EventContainerWrapper,
        weekWrapper: WeekWrapper,
      })

      this.state = { interacting: false }
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

    defaultOnDragOver = event => {
      event.preventDefault()
    }

    handleBeginAction = (event, action, direction) => {
      const { onDragStart } = this.props
      this.setState({ event, action, direction })
      if (onDragStart) {
        onDragStart({ event, action, direction })
      }
    }

    handleInteractionStart = () => {
      if (this.state.interacting === false) this.setState({ interacting: true })
    }

    handleInteractionEnd = interactionInfo => {
      const { action, event } = this.state

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

    render() {
      const { selectable, elementProps, ...props } = this.props
      const { interacting } = this.state
      delete props.onEventDrop
      delete props.onEventResize

      props.selectable = selectable ? 'ignoreEvents' : false

      const elementPropsWithDropFromOutside = this.props.onDropFromOutside
        ? {
            ...elementProps,
            onDragOver: this.props.onDragOver || this.defaultOnDragOver,
          }
        : elementProps

      props.className = clsx(
        props.className,
        'rbc-addons-dnd',
        !!interacting && 'rbc-addons-dnd-is-dragging'
      )

      return (
        <Calendar
          {...props}
          elementProps={elementPropsWithDropFromOutside}
          components={this.components}
        />
      )
    }
  }

  return DragAndDropCalendar
}
