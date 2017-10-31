import PropTypes from 'prop-types';
import React from 'react';
import { DragDropContext } from 'react-dnd';
import cn from 'classnames';

import { accessor } from '../../utils/propTypes';
import DateContentRowWrapper from './DateContentRowWrapper';
import DraggableEventWrapper from './DraggableEventWrapper';
import { DayWrapper, DateCellWrapper } from './backgroundWrapper';

let html5Backend;

try {
  html5Backend = require('react-dnd-html5-backend');
} catch (err) {
  /* optional dep missing */
}

export default function withDragAndDrop(Calendar, { backend = html5Backend } = {}) {
  class DragAndDropCalendar extends React.Component {
    static propTypes = {
      components: PropTypes.object,
      selectable: PropTypes.oneOf([true, false, 'ignoreEvents']).isRequired,
    };

    getChildContext() {
      return {
        endAccessor: this.props.endAccessor,
        onEventDrop: this.props.onEventDrop,
        onEventResize: this.props.onEventResize,
        onEventReorder: this.props.onEventReorder,
        onOutsideEventDrop: this.props.onOutsideEventDrop,
        startAccessor: this.props.startAccessor,
      };
    }

    constructor(...args) {
      super(...args);
      this.state = { isDragging: false, isResizing: false };
    }

    componentWillMount() {
      let monitor = this.context.dragDropManager.getMonitor();
      this.monitor = monitor;
      this.unsubscribeToStateChange = monitor.subscribeToStateChange(this.handleStateChange);
    }

    componentWillUnmount() {
      this.monitor = null;
      this.unsubscribeToStateChange();
    }

    handleStateChange = () => {
      const isDragging = !!this.monitor.getItem();

      const isResizing = this.monitor.getItemType() === 'resize';

      if (isResizing !== this.state.isResizing) {
        setTimeout(() => this.setState({ isResizing }));
      }

      if (isDragging !== this.state.isDragging) {
        setTimeout(() => this.setState({ isDragging }));
      }
    };

    render() {
      const { selectable, components, ...props } = this.props;

      delete props.onEventDrop;
      delete props.onEventResize;
      delete props.onEventReorder;
      delete props.onOutsideEventDrop;

      props.selectable = selectable ? 'ignoreEvents' : false;

      props.className = cn(props.className, 'rbc-addons-dnd', {
        'rbc-addons-dnd-is-dragging': this.state.isDragging,
        'rbc-addons-dnd-is-resizing': this.state.isResizing,
      });

      props.components = {
        ...components,
        dateCellWrapper: DateCellWrapper,
        dayWrapper: DayWrapper,
        eventWrapper: DraggableEventWrapper,
        dateContentRowWrapper: DateContentRowWrapper,
      };

      return <Calendar {...props} />;
    }
  }

  DragAndDropCalendar.propTypes = {
    endAccessor: accessor,
    onEventDrop: PropTypes.func.isRequired,
    onEventResize: PropTypes.func,
    onEventReorder: PropTypes.func,
    onOutsideEventDrop: PropTypes.func,
    startAccessor: accessor,
  };

  DragAndDropCalendar.defaultProps = {
    endAccessor: 'end',
    startAccessor: 'start',
  };

  DragAndDropCalendar.contextTypes = {
    dragDropManager: PropTypes.object,
  };

  DragAndDropCalendar.childContextTypes = {
    endAccessor: accessor,
    onEventDrop: PropTypes.func,
    onEventResize: PropTypes.func,
    onEventReorder: PropTypes.func,
    onOutsideEventDrop: PropTypes.func,
    startAccessor: accessor,
  };

  if (backend === false) {
    return DragAndDropCalendar;
  } else {
    return DragDropContext(backend)(DragAndDropCalendar);
  }
}
