import PropTypes from 'prop-types';
import React from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import compose from './compose';
import styled from 'styled-components';

const Title = styled.div`
  padding: 2px 5px;
`;

class ResizableMonthEvent extends React.Component {
  componentDidMount() {
    this.props.connectLeftDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
    this.props.connectRightDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  render() {
    const { title, connectLeftDragSource, connectRightDragSource } = this.props;
    const [Left, Right] = [connectLeftDragSource, connectRightDragSource].map(connectDragSource => {
      return connectDragSource(<div className="rbc-addons-dnd-resize-month-event-anchor"> </div>);
    });
    return (
      <div className="rbc-addons-dnd-resizable-month-event">
        {Left}
        <Title>{title}</Title>
        {Right}
      </div>
    );
  }
}

const eventSourceLeft = {
  beginDrag: ({ event }) => ({ ...event, type: 'resizeL' }),
};

const eventSourceRight = {
  beginDrag: ({ event }) => ({ ...event, type: 'resizeR' }),
};

export default compose(
  DragSource('resize', eventSourceLeft, (connect, monitor) => ({
    connectLeftDragSource: connect.dragSource(),
    connectLeftDragPreview: connect.dragPreview(),
  })),
  DragSource('resize', eventSourceRight, (connect, monitor) => ({
    connectRightDragSource: connect.dragSource(),
    connectRightDragPreview: connect.dragPreview(),
  })),
)(ResizableMonthEvent);
