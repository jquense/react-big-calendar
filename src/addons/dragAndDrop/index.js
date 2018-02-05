import PropTypes from 'prop-types'
import React from 'react'
import { DragDropContext } from 'react-dnd'
import cn from 'classnames'

import { accessor } from '../../utils/propTypes'
import DraggableEventWrapper from './DraggableEventWrapper'
import { DayWrapper, DateCellWrapper } from './backgroundWrapper'
import TitleComponent from './TitleComponent'
import withEventResizability from './withEventResizability'

let html5Backend

try {
  html5Backend = require('react-dnd-html5-backend')
} catch (err) {
  /* optional dep missing */
}

/**
 * Creates a HOC component supporting drag & drop and optionally resizing
 * of events:
 *
 *    import BigCalendar from 'react-big-calendar'
 *    import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
 *    export default withDragAndDrop(BigCalendar)
 *
 * The HOC adds `onEventDrop` and `onEventResize` callback properties if the
 * events are moved or resized. This component supports custom `event` components,
 * but not view-specific ones:
 *
 * ```js
 * <Calendar components={{event: MyEvent}} />          // okay
 * <Calendar components={{week: {event: MyEvent}}} />  // bad
 * ```
 *
 * @param {*} Calendar
 * @param {*} backend
 */
export default function withDragAndDrop(
  Calendar,
  { backend = html5Backend } = {}
) {
  class DragAndDropCalendar extends React.Component {
    static propTypes = {
      onEventDrop: PropTypes.func.isRequired,
      onEventResize: PropTypes.func.isRequired,
      startAccessor: accessor,
      endAccessor: accessor,
      selectable: PropTypes.oneOf([true, false, 'ignoreEvents']).isRequired,
      resizable: PropTypes.bool,
      components: PropTypes.object,
      view: PropTypes.string.isRequired,
    }

    static defaultProps = {
      view: 'month',
      startAccessor: 'start',
      endAccessor: 'end',
    }

    static contextTypes = {
      dragDropManager: PropTypes.object,
    }

    static childContextTypes = {
      onEventDrop: PropTypes.func,
      onEventResize: PropTypes.func,
      startAccessor: accessor,
      endAccessor: accessor,
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
      const {
        selectable,
        resizable,
        components = {},
        view,
        ...props
      } = this.props

      delete props.onEventDrop
      delete props.onEventResize

      props.selectable = selectable ? 'ignoreEvents' : false

      props.className = cn(
        props.className,
        'rbc-addons-dnd',
        this.state.isDragging && 'rbc-addons-dnd-is-dragging'
      )

      let EventComponent = components.event || TitleComponent
      if (resizable) {
        EventComponent = withEventResizability(
          EventComponent,
          view === 'month' ? 'horizontal' : 'vertical'
        )
      }

      props.components = {
        ...components,
        event: EventComponent,
        dateCellWrapper: DateCellWrapper,
        dayWrapper: DayWrapper,
        eventWrapper: DraggableEventWrapper,
      }

      return <Calendar {...props} />
    }
  }

  if (backend === false) {
    return DragAndDropCalendar
  } else {
    return DragDropContext(backend)(DragAndDropCalendar)
  }
}
