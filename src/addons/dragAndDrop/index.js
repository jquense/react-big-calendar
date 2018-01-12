import PropTypes from 'prop-types'
import React from 'react'
import { DragDropContext } from 'react-dnd'
import cn from 'classnames'

import { accessor } from '../../utils/propTypes'
import DraggableEventWrapper from './DraggableEventWrapper'
import ResizableEvent from './ResizableEvent'
import ResizableMonthEvent from './ResizableMonthEvent'
import { DayWrapper, DateCellWrapper } from './backgroundWrapper'

let html5Backend

try {
  html5Backend = require('react-dnd-html5-backend')
} catch (err) {
  /* optional dep missing */
}

export default function withDragAndDrop(
  Calendar,
  { backend = html5Backend } = {}
) {
  class DragAndDropCalendar extends React.Component {
    static propTypes = {
      selectable: PropTypes.oneOf([true, false, 'ignoreEvents']).isRequired,
      components: PropTypes.object,
    }
    getChildContext() {
      return {
        onEventDrop: this.props.onEventDrop,
        onEventResize: this.props.onEventResize,
        startAccessor: this.props.startAccessor,
        endAccessor: this.props.endAccessor,
      }
    }

    constructor(...args) {
      super(...args)
      this.state = { isDragging: false }
    }

    componentWillMount() {
      let monitor = this.context.dragDropManager.getMonitor()
      this.monitor = monitor
      this.unsubscribeToStateChange = monitor.subscribeToStateChange(
        this.handleStateChange
      )
    }

    componentWillUnmount() {
      this.monitor = null
      this.unsubscribeToStateChange()
    }

    handleStateChange = () => {
      const isDragging = !!this.monitor.getItem()

      if (isDragging !== this.state.isDragging) {
        setTimeout(() => this.setState({ isDragging }))
      }
    }

    render() {
      const { selectable, components, resizable, ...props } = this.props

      delete props.onEventDrop
      delete props.onEventResize

      props.selectable = selectable ? 'ignoreEvents' : false

      props.className = cn(
        props.className,
        'rbc-addons-dnd',
        this.state.isDragging && 'rbc-addons-dnd-is-dragging'
      )

      props.components = {
        ...components,
        dateCellWrapper: DateCellWrapper,
        day: { event: resizable && ResizableEvent },
        dayWrapper: DayWrapper,
        eventWrapper: DraggableEventWrapper,
        month: { event: resizable && ResizableMonthEvent },
        week: { event: resizable && ResizableEvent },
      }

      return <Calendar {...props} />
    }
  }

  DragAndDropCalendar.propTypes = {
    onEventDrop: PropTypes.func.isRequired,
    resizable: PropTypes.bool,
    onEventResize: PropTypes.func,
    startAccessor: accessor,
    endAccessor: accessor,
  }

  DragAndDropCalendar.defaultProps = {
    startAccessor: 'start',
    endAccessor: 'end',
  }

  DragAndDropCalendar.contextTypes = {
    dragDropManager: PropTypes.object,
  }

  DragAndDropCalendar.childContextTypes = {
    onEventDrop: PropTypes.func,
    onEventResize: PropTypes.func,
    startAccessor: accessor,
    endAccessor: accessor,
  }

  if (backend === false) {
    return DragAndDropCalendar
  } else {
    return DragDropContext(backend)(DragAndDropCalendar)
  }
}
