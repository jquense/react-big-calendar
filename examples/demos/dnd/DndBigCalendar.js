import React from 'react'
import { merge } from 'lodash'
import BigCalendar from 'react-big-calendar'
import DraggableEventWrapper from './DraggableEventWrapper'
import DroppableBackgroundWrapper from './DroppableBackgroundWrapper'

class DndBigCalendar extends React.Component {

  propTypes: BigCalendar.propTypes

  getChildContext () {
    return {moveEvent: this.props.moveEvent}
  }

  render() {
    const propsCopy = merge({}, this.props);
    propsCopy.components = merge({}, this.props.components, {
      eventWrapper: DraggableEventWrapper,
      backgroundWrapper: DroppableBackgroundWrapper
    })
    return <BigCalendar {...propsCopy} />
  }
}

DndBigCalendar.childContextTypes = {
  moveEvent: React.PropTypes.func
}

export default DndBigCalendar
