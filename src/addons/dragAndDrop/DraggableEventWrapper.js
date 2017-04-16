import React from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';
import cn from 'classnames';

import BigCalendar from '../../index';

/* drag sources */

const eventSource = {
    beginDrag(props) {
        return props.event;
    }
};

function collectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

class DraggableEventWrapper extends React.Component {
    render() {
        let {connectDragSource, isDragging, children, event} = this.props;
        let EventWrapper = BigCalendar.components.eventWrapper;

        children = React.cloneElement(children, {className: cn(children.props.className, isDragging && 'rbc-addons-dnd-dragging')});

        return (
            <EventWrapper event={event}>
                {connectDragSource(children)}
            </EventWrapper>
        );
    }
}

DraggableEventWrapper.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
    isDragging: PropTypes.bool.isRequired,
};

export default DragSource('event', eventSource, collectSource)(DraggableEventWrapper);
