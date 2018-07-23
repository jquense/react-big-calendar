import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'

import { accessor } from '../../utils/propTypes'
import EventWrapper from './EventWrapper'
import EventContainerWrapper from './EventContainerWrapper'
import WeekWrapper from './WeekWrapper'

/**
 * Creates a higher-order component (HOC) supporting drag & drop and optionally resizing
 * of events:
 *
 * ```js
 *    import Calendar from 'react-big-calendar'
 *    import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
 *    export default withDragAndDrop(Calendar)
 * ```
 * (you can optionally pass any dnd backend as an optional second argument to `withDragAndDrop`.
 * It defaults to `react-dnd-html5-backend` which you should probably include in
 * your project if using this default).
 *
 * Set `resizable` to true in your calendar if you want events to be resizable.
 *
 * The HOC adds `onEventDrop` and `onEventResize` callback properties if the events are
 * moved or resized. They are called with these signatures:
 *
 * ```js
 *    function onEventDrop({ event, start, end, allDay }) {...}
 *    function onEventResize(type, { event, start, end, allDay }) {...}  // type is always 'drop'
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
 * @param {*} Calendar
 * @param {*} backend
 */
export default function withDragAndDrop(Calendar) {
  class DragAndDropCalendar extends React.Component {
    static propTypes = {
      onEventDrop: PropTypes.func,
      onEventResize: PropTypes.func,
      startAccessor: accessor,
      endAccessor: accessor,
      allDayAccessor: accessor,
      draggableAccessor: accessor,
      resizableAccessor: accessor,
      selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
      resizable: PropTypes.bool,
      components: PropTypes.object,
      step: PropTypes.number,
    }

    static defaultProps = {
      // TODO: pick these up from Calendar.defaultProps
      components: {},
      startAccessor: 'start',
      endAccessor: 'end',
      allDayAccessor: 'allDay',
      draggableAccessor: null,
      resizableAccessor: null,
      step: 30,
    }

    static contextTypes = {
      dragDropManager: PropTypes.object,
    }

    static childContextTypes = {
      onEventDrop: PropTypes.func,
      onEventResize: PropTypes.func,
      onMove: PropTypes.func,
      onResize: PropTypes.func,
      dragAndDropAction: PropTypes.object,

      components: PropTypes.object,
      draggableAccessor: accessor,
      resizableAccessor: accessor,
      step: PropTypes.number,
    }

    getChildContext() {
      return {
        onEventDrop: this.props.onEventDrop,
        onEventResize: this.props.onEventResize,
        step: this.props.step,
        components: this.props.components,
        draggableAccessor: this.props.draggableAccessor,
        resizableAccessor: this.props.resizableAccessor,

        onResize: (event, direction) =>
          this.setState({
            dragAndDropAction: event
              ? { action: 'resize', event, direction }
              : {},
          }),

        onMove: event =>
          this.setState({
            dragAndDropAction: event ? { action: 'move', event } : {},
          }),

        dragAndDropAction: this.state.dragAndDropAction,
      }
    }

    constructor(...args) {
      super(...args)
      this.state = { isDragging: false, dragAndDropAction: {} }
    }

    render() {
      const { selectable, components, ...props } = this.props
      const { dragAndDropAction } = this.state
      delete props.onEventDrop
      delete props.onEventResize

      props.selectable = selectable ? 'ignoreEvents' : false

      props.className = cn(
        props.className,
        'rbc-addons-dnd',
        dragAndDropAction.action && 'rbc-addons-dnd-is-dragging'
      )

      props.components = {
        ...components,
        eventWrapper: EventWrapper,
        eventContainerWrapper: EventContainerWrapper,
        weekWrapper: WeekWrapper,
      }

      return <Calendar {...props} />
    }
  }

  return DragAndDropCalendar
}
