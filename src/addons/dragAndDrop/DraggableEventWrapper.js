import PropTypes from 'prop-types'
import React from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import cn from 'classnames'
import compose from './compose'

import BigCalendar from '../../index'
const EventWrapper = BigCalendar.components.eventWrapper

class DraggableEventWrapper extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,

    connectDragSource: PropTypes.func.isRequired,
    connectTopDragPreview: PropTypes.func.isRequired,
    connectTopDragSource: PropTypes.func.isRequired,
    connectBottomDragPreview: PropTypes.func.isRequired,
    connectBottomDragSource: PropTypes.func.isRequired,
    connectLeftDragPreview: PropTypes.func.isRequired,
    connectLeftDragSource: PropTypes.func.isRequired,
    connectRightDragPreview: PropTypes.func.isRequired,
    connectRightDragSource: PropTypes.func.isRequired,

    allDay: PropTypes.bool,
    isRow: PropTypes.bool,
    continuesPrior: PropTypes.bool,
    continuesAfter: PropTypes.bool,
    isDragging: PropTypes.bool,
    isResizing: PropTypes.bool,
  }

  componentDidMount() {
    // this is needed to prevent the backend from
    // screenshot'ing the event during a resize which
    // would be very confusing visually
    const emptyImage = getEmptyImage()
    const previewOptions = { captureDraggingState: true }
    this.props.connectTopDragPreview(emptyImage, previewOptions)
    this.props.connectBottomDragPreview(emptyImage, previewOptions)
    this.props.connectLeftDragPreview(emptyImage, previewOptions)
    this.props.connectRightDragPreview(emptyImage, previewOptions)
  }

  render() {
    let {
      connectDragSource,
      connectTopDragSource,
      connectBottomDragSource,
      connectLeftDragSource,
      connectRightDragSource,
      isDragging,
      isResizing,
      children,
      event,
      allDay,
      isRow,
      continuesPrior,
      continuesAfter,
    } = this.props

    let StartAnchor = null,
      EndAnchor = null

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
    if (isRow || allDay) {
      const anchor = (
        <div className="rbc-addons-dnd-resize-ew-anchor">
          <div className="rbc-addons-dnd-resize-ew-icon" />
        </div>
      )
      StartAnchor = !continuesPrior && connectLeftDragSource(anchor)
      EndAnchor = !continuesAfter && connectRightDragSource(anchor)
    } else {
      const anchor = (
        <div className="rbc-addons-dnd-resize-ns-anchor">
          <div className="rbc-addons-dnd-resize-ns-icon" />
        </div>
      )
      StartAnchor = !continuesPrior && connectTopDragSource(anchor)
      EndAnchor = !continuesAfter && connectBottomDragSource(anchor)
    }

    /*
     * props.children is the singular <Event> component.
     * BigCalendar positions the Event abolutely and we
     * need the anchors to be part of that positioning.
     * So we insert the anchors inside the Event's children
     * rather than wrap the Event here as the latter approach
     * would lose the positioning.
     */
    const childrenWithAnchors = (
      <div className="rbc-addons-dnd-resizable">
        {StartAnchor}
        {children.props.children}
        {EndAnchor}
      </div>
    )

    children = React.cloneElement(children, {
      className: cn(
        children.props.className,
        isDragging && 'rbc-addons-dnd-dragging',
        isResizing && 'rbc-addons-dnd-resizing'
      ),
      children: childrenWithAnchors, // replace original event child with anchor-embellished child
    })

    return (
      <EventWrapper event={event} allDay={allDay}>
        {connectDragSource(children)}
      </EventWrapper>
    )
  }
}

/* drag sources */
const makeEventSource = anchor => ({
  beginDrag: ({ event }) => ({ event, anchor }),
  // canDrag: ({ event }) => event.draggable === undefined || event.draggable - e.g. support per-event dragability/sizability
})

export default compose(
  DragSource('event', makeEventSource('drop'), (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DragSource('event', makeEventSource('resizeTop'), (connect, monitor) => ({
    connectTopDragSource: connect.dragSource(),
    connectTopDragPreview: connect.dragPreview(),
    isResizing: monitor.isDragging(),
  })),
  DragSource('event', makeEventSource('resizeBottom'), (connect, monitor) => ({
    connectBottomDragSource: connect.dragSource(),
    connectBottomDragPreview: connect.dragPreview(),
    isResizing: monitor.isDragging(),
  })),
  DragSource('event', makeEventSource('resizeLeft'), (connect, monitor) => ({
    connectLeftDragSource: connect.dragSource(),
    connectLeftDragPreview: connect.dragPreview(),
    isResizing: monitor.isDragging(),
  })),
  DragSource('event', makeEventSource('resizeRight'), (connect, monitor) => ({
    connectRightDragSource: connect.dragSource(),
    connectRightDragPreview: connect.dragPreview(),
    isResizing: monitor.isDragging(),
  }))
)(DraggableEventWrapper)
