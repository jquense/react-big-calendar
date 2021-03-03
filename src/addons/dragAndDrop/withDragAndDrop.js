import PropTypes from 'prop-types'
import React from 'react'
import clsx from 'clsx'

import { accessor } from '../../utils/propTypes'
import EventWrapper from './EventWrapper'
import EventContainerWrapper from './EventContainerWrapper'
import WeekWrapper from './WeekWrapper'
import { mergeComponents } from './common'
import { DnDContext } from './DnDContext'

export default function withDragAndDrop(Calendar) {
  class DragAndDropCalendar extends React.Component {
    static propTypes = {
      ...Calendar.propTypes,

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
    }

    static defaultProps = {
      ...Calendar.defaultProps,
      draggableAccessor: null,
      resizableAccessor: null,
      resizable: true,
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

    getDnDContextValue() {
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
      this.setState({ event, action, direction })
      const { onDragStart } = this.props
      if (onDragStart) onDragStart({ event, action, direction })
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
      const { onEventDrop, onEventResize } = this.props
      if (action === 'move' && onEventDrop) onEventDrop(interactionInfo)
      if (action === 'resize' && onEventResize) onEventResize(interactionInfo)
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

      const context = this.getDnDContextValue()
      return (
        <DnDContext.Provider value={context}>
          <Calendar
            {...props}
            elementProps={elementPropsWithDropFromOutside}
            components={this.components}
          />
        </DnDContext.Provider>
      )
    }
  }

  return DragAndDropCalendar
}
