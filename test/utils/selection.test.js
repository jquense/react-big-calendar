import {
  isSelected,
  slotWidth,
  getSlotAtX,
  pointInBox,
  dateCellSelection,
} from '../../src/utils/selection'

describe('isSelected', () => {
  test('returns true if the same object by reference', () => {
    const value = { x: { sample: 'value' }, y: 1 }
    expect(isSelected(value, value)).toBeTruthy()
  })

  test('returns true if objects are deeply equal', () => {
    const value = { x: { sample: 'value' }, y: 1 }
    const equivalent = { x: { sample: 'value' }, y: 1 }
    expect(isSelected(value, equivalent)).toBeTruthy()
  })

  test('returns false if objects differ', () => {
    const value = { x: { sample: 'value' }, y: 1 }
    const other = { x: { sample: 'value' }, y: 2 }
    expect(isSelected(value, other)).toBeFalsy()
  })

  test('returns false when event is falsy', () => {
    expect(isSelected(null, {})).toBe(false)
    expect(isSelected(undefined, {})).toBe(false)
  })

  test('returns false when selected is null', () => {
    expect(isSelected({}, null)).toBe(false)
  })

  test('returns false when selected is undefined', () => {
    expect(isSelected({}, undefined)).toBe(false)
  })
})

describe('slotWidth', () => {
  test('divides row width by number of slots', () => {
    const rowBox = { left: 0, right: 700 }
    expect(slotWidth(rowBox, 7)).toBe(100)
  })

  test('works with non-zero left offset', () => {
    const rowBox = { left: 100, right: 800 }
    expect(slotWidth(rowBox, 7)).toBe(100)
  })
})

describe('getSlotAtX', () => {
  const rowBox = { left: 0, right: 700 }
  const slots = 7

  test('returns 0 for x at left edge (ltr)', () => {
    expect(getSlotAtX(rowBox, 0, false, slots)).toBe(0)
  })

  test('returns last slot index for x at right edge (ltr)', () => {
    expect(getSlotAtX(rowBox, 699, false, slots)).toBe(6)
  })

  test('returns reversed slot for rtl', () => {
    // RTL: slot = slots - 1 - Math.floor((x - left) / cellWidth)
    expect(getSlotAtX(rowBox, 0, true, slots)).toBe(6)
  })

  test('returns middle slot for x at center', () => {
    expect(getSlotAtX(rowBox, 350, false, slots)).toBe(3)
  })
})

describe('pointInBox', () => {
  const box = { top: 10, bottom: 90, left: 20, right: 80 }

  test('returns true for a point inside the box', () => {
    expect(pointInBox(box, { x: 50, y: 50 })).toBe(true)
  })

  test('returns false for a point above the box', () => {
    expect(pointInBox(box, { x: 50, y: 5 })).toBe(false)
  })

  test('returns false for a point below the box', () => {
    expect(pointInBox(box, { x: 50, y: 95 })).toBe(false)
  })

  test('returns false for a point to the left', () => {
    expect(pointInBox(box, { x: 10, y: 50 })).toBe(false)
  })

  test('returns false for a point to the right', () => {
    expect(pointInBox(box, { x: 90, y: 50 })).toBe(false)
  })

  test('returns true for a point on the boundary', () => {
    expect(pointInBox(box, { x: 20, y: 10 })).toBe(true)
  })
})

describe('dateCellSelection', () => {
  const rowBox = { top: 0, bottom: 30, left: 0, right: 700 }
  const slots = 7

  test('selects the full row when the drag box entirely contains the row', () => {
    const start = { x: 350, y: -10 } // start point above the row
    // box.top < rowBox.top AND box.bottom > rowBox.bottom triggers isBetween.
    // box.y must be outside the row to avoid isCurrentRow overriding endIdx.
    const box = { x: 350, y: 40, top: -10, bottom: 50 }
    const result = dateCellSelection(start, rowBox, box, slots, false)
    expect(result.startIdx).toBe(0)
    expect(result.endIdx).toBe(slots - 1)
  })

  test('selects from slot 0 to current slot when current row is below start', () => {
    const start = { x: 0, y: -10 } // start row is above this row
    const box = { x: 300, y: 15, top: 0, bottom: 30 } // current mouse in this row
    const result = dateCellSelection(start, rowBox, box, slots, false)
    expect(result.startIdx).toBe(0)
    expect(result.endIdx).toBeGreaterThanOrEqual(0)
  })

  test('selects from current slot to last when current row is above start', () => {
    const start = { x: 350, y: 40 } // start row is below this row
    const box = { x: 100, y: 15, top: 0, bottom: 30 }
    const result = dateCellSelection(start, rowBox, box, slots, false)
    expect(result.startIdx).toBeGreaterThanOrEqual(0)
    expect(result.endIdx).toBe(slots - 1)
  })

  test('handles start row and current row being the same row', () => {
    const start = { x: 100, y: 15 }
    const box = { x: 300, y: 15, top: 0, bottom: 30 }
    const result = dateCellSelection(start, rowBox, box, slots, false)
    expect(result.startIdx).toBeLessThanOrEqual(result.endIdx)
  })

  test('returns -1/-1 when box is outside the row entirely', () => {
    const start = { x: 350, y: 100 } // far below
    const box = { x: 350, y: 150, top: 140, bottom: 180 } // also far below
    const result = dateCellSelection(start, rowBox, box, slots, false)
    // row is not current and not start row; no match => -1/-1 unless isBetween
    expect(result.startIdx).toBe(-1)
    expect(result.endIdx).toBe(-1)
  })

  test('respects rtl flag', () => {
    const start = { x: 100, y: 15 }
    const box = { x: 600, y: 15, top: 0, bottom: 30 }
    const rtlResult = dateCellSelection(start, rowBox, box, slots, true)
    const ltrResult = dateCellSelection(start, rowBox, box, slots, false)
    expect(rtlResult.startIdx).not.toBe(ltrResult.startIdx)
  })
})
