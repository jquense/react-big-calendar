import React, { createRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import { notify } from './utils/helpers'
import { dateCellSelection, getSlotAtX, pointInBox } from './utils/selection'
import Selection, { getBoundsForNode, isEvent, isShowMore } from './Selection'

class BackgroundCells extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      selecting: false,
    }
    this.containerRef = createRef()
  }

  componentDidMount() {
    this.props.selectable && this._selectable()
  }

  componentWillUnmount() {
    this._teardownSelectable()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.selectable && this.props.selectable) this._selectable()

    if (prevProps.selectable && !this.props.selectable)
      this._teardownSelectable()
  }

  render() {
    let {
      range,
      getNow,
      getters,
      date: currentDate,
      components: { dateCellWrapper: Wrapper },
      localizer,
    } = this.props
    let { selecting, startIdx, endIdx } = this.state
    let current = getNow()

    return (
      <div className="rbc-row-bg" ref={this.containerRef}>
        {range.map((date, index) => {
          let selected = selecting && index >= startIdx && index <= endIdx
          const { className, style } = getters.dayProp(date)

          return (
            <Wrapper key={index} value={date} range={range}>
              <div
                style={style}
                className={clsx(
                  'rbc-day-bg',
                  className,
                  selected && 'rbc-selected-cell',
                  localizer.isSameDate(date, current) && 'rbc-today',
                  currentDate &&
                    localizer.neq(currentDate, date, 'month') &&
                    'rbc-off-range-bg'
                )}
              />
            </Wrapper>
          )
        })}
      </div>
    )
  }

  _selectable() {
    let node = this.containerRef.current
    let selector = (this._selector = new Selection(this.props.container, {
      longPressThreshold: this.props.longPressThreshold,
    }))

    let selectorClicksHandler = (point, actionType) => {
      if (!isEvent(node, point) && !isShowMore(node, point)) {
        let rowBox = getBoundsForNode(node)
        let { range, rtl } = this.props

        if (pointInBox(rowBox, point)) {
          let currentCell = getSlotAtX(rowBox, point.x, rtl, range.length)

          this._selectSlot({
            startIdx: currentCell,
            endIdx: currentCell,
            action: actionType,
            box: point,
          })
        }
      }

      this._initial = {}
      this.setState({ selecting: false })
    }

    selector.on('selecting', (box) => {
      let { range, rtl } = this.props

      let startIdx = -1
      let endIdx = -1

      if (!this.state.selecting) {
        notify(this.props.onSelectStart, [box])
        this._initial = { x: box.x, y: box.y }
      }
      if (selector.isSelected(node)) {
        let nodeBox = getBoundsForNode(node)
        ;({ startIdx, endIdx } = dateCellSelection(
          this._initial,
          nodeBox,
          box,
          range.length,
          rtl
        ))
      }

      this.setState({
        selecting: true,
        startIdx,
        endIdx,
      })
    })

    selector.on('beforeSelect', (box) => {
      if (this.props.selectable !== 'ignoreEvents') return

      return !isEvent(this.containerRef.current, box)
    })

    selector.on('click', (point) => selectorClicksHandler(point, 'click'))

    selector.on('doubleClick', (point) =>
      selectorClicksHandler(point, 'doubleClick')
    )

    selector.on('select', (bounds) => {
      this._selectSlot({ ...this.state, action: 'select', bounds })
      this._initial = {}
      this.setState({ selecting: false })
      notify(this.props.onSelectEnd, [this.state])
    })
  }

  _teardownSelectable() {
    if (!this._selector) return
    this._selector.teardown()
    this._selector = null
  }

  _selectSlot({ endIdx, startIdx, action, bounds, box }) {
    if (endIdx !== -1 && startIdx !== -1)
      this.props.onSelectSlot &&
        this.props.onSelectSlot({
          start: startIdx,
          end: endIdx,
          action,
          bounds,
          box,
          resourceId: this.props.resourceId,
        })
  }
}

BackgroundCells.propTypes = {
  date: PropTypes.instanceOf(Date),
  getNow: PropTypes.func.isRequired,

  getters: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,

  container: PropTypes.func,
  dayPropGetter: PropTypes.func,
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: PropTypes.number,

  onSelectSlot: PropTypes.func.isRequired,
  onSelectEnd: PropTypes.func,
  onSelectStart: PropTypes.func,

  range: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  rtl: PropTypes.bool,
  type: PropTypes.string,
  resourceId: PropTypes.any,

  localizer: PropTypes.any,
}

export default BackgroundCells
