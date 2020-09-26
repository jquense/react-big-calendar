import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import * as dates from './utils/dates'
import noop from './utils/noop'
import { notify } from './utils/helpers'
import { dateCellSelection, getSlotAtX, pointInBox } from './utils/selection'
import Selection, { getBoundsForNode, isEvent } from './Selection'

const BackgroundCells = ({
  range,
  rtl,
  getNow,
  getters,
  date: currentDate,
  components: { dateCellWrapper: Wrapper },
  selectable,
  container,
  longPressThreshold,
  onSelectSlot = noop,
  onSelectStart,
  onSelectEnd,
}) => {
  const [selecting, setSelecting] = useState(false)
  const [selector, setSelector] = useState(null)
  const [startIdx, setStartIdx] = useState()
  const [endIdx, setEndIdx] = useState()
  const rowRef = useRef(null)

  const current = getNow()

  useEffect(() => {
    if (selectable) {
      setupSelectable()
    } else {
      teardownSelectable()
    }
    return () => {
      teardownSelectable()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectable])

  const setupSelectable = () => {
    const node = rowRef.current
    const selector = new Selection(container, {
      longPressThreshold,
    })
    let initial = {}

    const selectorClicksHandler = (point, actionType) => {
      if (!isEvent(node, point)) {
        const rowBox = getBoundsForNode(node)

        if (pointInBox(rowBox, point)) {
          const currentCell = getSlotAtX(rowBox, point.x, rtl, range.length)

          selectSlot({
            startIdx: currentCell,
            endIdx: currentCell,
            action: actionType,
            box: point,
          })
        }
      }

      initial = {}
      setSelecting(false)
    }

    selector.on('selecting', box => {
      let start = -1
      let end = -1

      if (!selecting) {
        notify(onSelectStart, [box])
        initial = { x: box.x, y: box.y }
      }
      if (selector.isSelected(node)) {
        let nodeBox = getBoundsForNode(node)
        let { startIdx: newStart, endIdx: newEnd } = dateCellSelection(
          initial,
          nodeBox,
          box,
          range.length,
          rtl
        )
        start = newStart
        end = newEnd
      }

      setSelecting(true)
      setStartIdx(start)
      setEndIdx(end)
    })

    selector.on('beforeSelect', box => {
      if (selectable !== 'ignoreEvents') return

      return !isEvent(node, box)
    })

    selector.on('click', point => selectorClicksHandler(point, 'click'))

    selector.on('doubleClick', point =>
      selectorClicksHandler(point, 'doubleClick')
    )

    selector.on('select', bounds => {
      selectSlot({ selecting, startIdx, endIdx, action: 'select', bounds })
      initial = {}
      setSelecting(false)
      notify(onSelectEnd, [{ selecting, startIdx, endIdx }])
    })
    setSelector(selector)
  }

  const teardownSelectable = () => {
    if (!selector) return
    selector.teardown()
    setSelector(null)
  }

  const selectSlot = ({
    endIdx: end,
    startIdx: start,
    action,
    bounds,
    box,
  }) => {
    if (end !== -1 && start !== -1) {
      onSelectSlot({
        start,
        end,
        action,
        bounds,
        box,
        resourceId: this.props.resourceId,
      })
    }
  }

  return (
    <div className="rbc-row-bg" ref={rowRef}>
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
                dates.eq(date, current, 'day') && 'rbc-today',
                currentDate &&
                  dates.month(currentDate) !== dates.month(date) &&
                  'rbc-off-range-bg'
              )}
            />
          </Wrapper>
        )
      })}
    </div>
  )
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
}

export default BackgroundCells
