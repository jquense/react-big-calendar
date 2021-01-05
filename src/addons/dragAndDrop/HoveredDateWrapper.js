import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { inRange } from '../../utils/dates'
import { accessor } from '../../utils/propTypes'

class DateCellWrapper extends React.Component {
  static propTypes = {
    value: PropTypes.instanceOf(Date),
  }

  static contextTypes = {
    draggable: PropTypes.shape({
      onStart: PropTypes.func,
      onEnd: PropTypes.func,
      onBeginAction: PropTypes.func,
      draggableAccessor: accessor,
      resizableAccessor: accessor,
      dragAndDropAction: PropTypes.object,
      onEventChange: PropTypes.func,
    }),
  }

  render() {
    const { children, value } = this.props
    const { hoveredDateRange } = this.context.draggable.dragAndDropAction

    const newProps = {}
    if (hoveredDateRange) {
      if (inRange(value, hoveredDateRange.start, hoveredDateRange.end)) {
        newProps.className = clsx(
          children.props.className,
          'rbc-addons-dnd-over'
        )
      }
    }

    return React.cloneElement(children, newProps)
  }
}

export default DateCellWrapper
