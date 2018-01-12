import PropTypes from 'prop-types'
import React from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import compose from './compose'

class ResizableMonthEvent extends React.Component {
  componentDidMount() {
    this.props.connectLeftDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    })
    this.props.connectRightDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    })
  }

  render() {
    const { title, connectLeftDragSource, connectRightDragSource } = this.props
    const [Left, Right] = [connectLeftDragSource, connectRightDragSource].map(
      connectDragSource => {
        return connectDragSource(
          <div className="rbc-addons-dnd-resize-month-event-anchor"> </div>
        )
      }
    )
    return (
      <div className="rbc-addons-dnd-resizable-month-event">
        {Left}
        {title}
        {Right}
      </div>
    )
  }
}

const eventSourceLeft = {
  beginDrag: ({ event }) => ({ ...event, type: 'resizeLeft' }),
}

const eventSourceRight = {
  beginDrag: ({ event }) => ({ ...event, type: 'resizeRight' }),
}

ResizableMonthEvent.propTypes = {
  connectLeftDragPreview: PropTypes.func,
  connectLeftDragSource: PropTypes.func,
  connectRightDragPreview: PropTypes.func,
  connectRightDragSource: PropTypes.func,
  title: PropTypes.string,
}

export default compose(
  DragSource('resize', eventSourceLeft, connect => ({
    connectLeftDragSource: connect.dragSource(),
    connectLeftDragPreview: connect.dragPreview(),
  })),
  DragSource('resize', eventSourceRight, connect => ({
    connectRightDragSource: connect.dragSource(),
    connectRightDragPreview: connect.dragPreview(),
  }))
)(ResizableMonthEvent)
