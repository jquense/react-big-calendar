import PropTypes from 'prop-types';
import React from 'react';
import { DragSource } from 'react-dnd';

class ExpandableEventComponent extends React.Component {
  render () {
    const { title, connectDragSource } = this.props;
    return (
      <div className="rbc-addons-dnd-expandable-event">
        {title}
        {
          connectDragSource(
            <div className="rbc-addons-dnd-expand-anchor">
              <div className="rbc-addons-dnd-expand-icon" />
            </div>
          )
        }
      </div>
    );
  }
}

const eventSource = {
  beginDrag: (props) => props.event
}

const collectSource = (connect, monitor) =>
  ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })

export default DragSource('resize', eventSource, collectSource)(ExpandableEventComponent);
