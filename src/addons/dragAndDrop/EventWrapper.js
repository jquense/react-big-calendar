import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
import { accessor } from '../../utils/propTypes'
import { accessor as get } from '../../utils/accessors'

import BigCalendar from '../../index'

class EventWrapper extends React.Component {
  static contextTypes = {
    components: PropTypes.object,
    draggableAccessor: accessor,
    resizableAccessor: accessor,
    onMove: PropTypes.func.isRequired,
    onResize: PropTypes.func.isRequired,
    dragAndDropAction: PropTypes.object,
  }

  static propTypes = {
    type: PropTypes.oneOf(['date', 'time']),
    event: PropTypes.object.isRequired,

    draggable: PropTypes.bool,
    allDay: PropTypes.bool,
    isRow: PropTypes.bool,
    continuesPrior: PropTypes.bool,
    continuesAfter: PropTypes.bool,
    isDragging: PropTypes.bool,
    isResizing: PropTypes.bool,
  }

  handleResizeUp = e => {
    if (e.button !== 0) return
    e.stopPropagation()
    this.context.onResize(this.props.event, 'UP')
  }
  handleResizeDown = e => {
    if (e.button !== 0) return
    e.stopPropagation()
    this.context.onResize(this.props.event, 'DOWN')
  }
  handleResizeLeft = e => {
    if (e.button !== 0) return
    e.stopPropagation()
    this.context.onResize(this.props.event, 'LEFT')
  }
  handleResizeRight = e => {
    if (e.button !== 0) return
    e.stopPropagation()
    this.context.onResize(this.props.event, 'RIGHT')
  }
  handleStartDragging = e => {
    if (e.button === 0) this.context.onMove(this.props.event)
  }

  renderAnchor(direction) {
    const cls = direction === 'Up' || direction === 'Down' ? 'ns' : 'ew'
    return (
      <div
        className={`rbc-addons-dnd-resize-${cls}-anchor`}
        onMouseDown={this[`handleResize${direction}`]}
      >
        <div className={`rbc-addons-dnd-resize-${cls}-icon`} />
      </div>
    )
  }

  render() {
    const { components } = this.context
    const EventWrapper =
      components.eventWrapper || BigCalendar.components.eventWrapper

    let {
      isResizing,
      children,
      event,
      allDay,
      type,
      continuesPrior,
      continuesAfter,
    } = this.props

    if (event.__isPreview)
      return React.cloneElement(children, {
        className: cn(children.props.className, 'rbc-addons-dnd-drag-preview'),
      })

    let { draggableAccessor, resizableAccessor } = this.context

    let isDraggable = draggableAccessor ? !!get(event, draggableAccessor) : true

    /* Event is not draggable, no need to wrap it */
    if (!isDraggable) {
      return children
    }

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

    let isResizable = resizableAccessor ? !!get(event, resizableAccessor) : true

    if (isResizable) {
      if (type === 'date') {
        StartAnchor = !continuesPrior && this.renderAnchor('Left')
        EndAnchor = !continuesAfter && this.renderAnchor('Right')
      } else {
        StartAnchor = !continuesPrior && this.renderAnchor('Up')
        EndAnchor = !continuesAfter && this.renderAnchor('Down')
      }

      const isDragging = this.context.dragAndDropAction.event === event

      /*
      * props.children is the singular <Event> component.
      * BigCalendar positions the Event abolutely and we
      * need the anchors to be part of that positioning.
      * So we insert the anchors inside the Event's children
      * rather than wrap the Event here as the latter approach
      * would lose the positioning.
      */
      children = React.cloneElement(children, {
        onMouseDown: this.handleStartDragging,
        onTouchStart: this.handleStartDragging,
        className: cn(
          children.props.className,
          isDragging && 'rbc-addons-dnd-dragging',
          isResizing && 'rbc-addons-dnd-resizing'
        ),
        // replace original event child with anchor-embellished child
        children: (
          <div className="rbc-addons-dnd-resizable">
            {StartAnchor}
            {children.props.children}
            {EndAnchor}
          </div>
        ),
      })
    }

    return (
      <EventWrapper event={event} allDay={allDay}>
        {children}
      </EventWrapper>
    )
  }
}

export default EventWrapper
