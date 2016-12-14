import React from 'react'
import { DragDropContext } from 'react-dnd'
import cn from 'classnames';

import DraggableEventWrapper from './DraggableEventWrapper'
import { DayWrapper, DateCellWrapper } from './backgroundWrapper'

let html5Backend;

try {
  html5Backend = require('react-dnd-html5-backend')
} catch (err) { /* optional dep missing */}


export default function withDragAndDrop(Calendar, {
  backend = html5Backend,
} = {}) {

  class DragAndDropCalendar extends React.Component {
    getChildContext () {
      return { onEventDrop: this.props.onEventDrop }
    }

    constructor(...args) {
      super(...args);
      this.state = { isDragging: false };
    }

    componentWillMount() {
      let monitor = this.context.dragDropManager.getMonitor()
      this.monitor = monitor
      this.unsubscribeToStateChange = monitor
        .subscribeToStateChange(this.handleStateChange)
    }

    componentWillUnmount() {
      this.monitor = null
      this.unsubscribeToStateChange()
    }

    handleStateChange = () => {
      const isDragging = !!this.monitor.getItem();

      if (isDragging !== this.state.isDragging) {
        setTimeout(() => this.setState({ isDragging }));
      }
    }

    render() {
      const { selectable, components, ...props } = this.props;

      delete props.onEventDrop;

      props.selectable = selectable
        ? 'ignoreEvents' : false;

      props.className = cn(
        props.className,
        this.state.isDragging && 'rbc-dnd-is-dragging'
      )

      props.components = {
        ...components,
        eventWrapper: DraggableEventWrapper,
        dateCellWrapper: DateCellWrapper,
        dayWrapper: DayWrapper,
      }

      return <Calendar {...props} />
    }
  }

  DragAndDropCalendar.propTypes = {
    onEventDrop: React.PropTypes.func.isRequired
  }

  DragAndDropCalendar.contextTypes = {
    dragDropManager: React.PropTypes.object
  }

  DragAndDropCalendar.childContextTypes = {
    onEventDrop: React.PropTypes.func
  }

  return DragDropContext(backend)(DragAndDropCalendar);
}
