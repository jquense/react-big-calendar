import { getSlotMetrics } from '../../src/utils/TimeSlots'
import * as dates from '../../src/utils/dates'

describe('getSlotMetrics', () => {
  const min = dates.startOf(new Date(2018, 0, 29, 0, 0, 0), 'day')
  const max = dates.endOf(new Date(2018, 0, 29, 59, 59, 59), 'day')
  const slotMetrics = getSlotMetrics({ min, max, step: 60, timeslots: 1 })
  test('getSlotMetrics.closestSlotToPosition: always returns timeslot if valid percentage is given', () => {
    expect(slotMetrics.closestSlotToPosition(0)).toBeDefined()
    expect(slotMetrics.closestSlotToPosition(1)).toBeDefined()
    expect(slotMetrics.closestSlotToPosition(100)).toBeDefined()
    expect(slotMetrics.closestSlotToPosition(-100)).toBeDefined()
    expect(slotMetrics.closestSlotToPosition()).toBeUndefined()
    expect(slotMetrics.closestSlotToPosition('asd')).toBeUndefined()
  })

  test('getSlotMetrics.closestSlotToPosition: returns last timeslot with correct time', () => {
    const secondLastSlot = slotMetrics.groups[slotMetrics.groups.length - 1][0]
    const shouldBeLast = slotMetrics.closestSlotToPosition(1)
    const diff = dates.diff(secondLastSlot, shouldBeLast, 'minutes')

    expect(diff).toBe(60)
  })
})

describe('getRange', () => {
  const min = dates.startOf(new Date(2018, 0, 29, 0, 0, 0), 'day')
  const max = dates.endOf(new Date(2018, 0, 29, 59, 59, 59), 'day')
  const slotMetrics = getSlotMetrics({ min, max, step: 60, timeslots: 1 })

  test('getRange: 15 minute start of day appointment stays within calendar', () => {
    let range = slotMetrics.getRange(
      new Date(2018, 0, 29, 0, 0, 0),
      new Date(2018, 0, 29, 0, 15, 0)
    )
    expect(range.top + range.height).toBeLessThan(100)
    expect(range.height).toBeGreaterThan(0)
  })

  test('getRange: 1 hour start of day appointment stays within calendar', () => {
    let range = slotMetrics.getRange(
      new Date(2018, 0, 29, 0, 0, 0),
      new Date(2018, 0, 29, 1, 0, 0)
    )
    expect(range.top + range.height).toBeLessThan(100)
    expect(range.height).toBeGreaterThan(0)
  })

  test('getRange: 1 hour mid range appointment stays within calendar', () => {
    let range = slotMetrics.getRange(
      new Date(2018, 0, 29, 14, 0, 0),
      new Date(2018, 0, 29, 15, 0, 0)
    )
    expect(range.top + range.height).toBeLessThan(100)
    expect(range.height).toBeGreaterThan(0)
  })

  test('getRange: 3 hour mid range appointment stays within calendar', () => {
    let range = slotMetrics.getRange(
      new Date(2018, 0, 29, 14, 0, 0),
      new Date(2018, 0, 29, 17, 0, 0)
    )
    expect(range.top + range.height).toBeLessThan(100)
    expect(range.height).toBeGreaterThan(0)
  })

  test('getRange: full day appointment stays within calendar', () => {
    let range = slotMetrics.getRange(
      new Date(2018, 0, 29, 0, 0, 0),
      new Date(2018, 0, 29, 23, 59, 0)
    )
    expect(range.top + range.height).toBeLessThan(100)
    expect(range.height).toBeGreaterThan(0)
  })

  test('getRange: 1 hour end of day appointment stays within calendar', () => {
    let range = slotMetrics.getRange(
      new Date(2018, 0, 29, 23, 0, 0),
      new Date(2018, 0, 29, 23, 59, 0)
    )
    expect(range.top + range.height).toBeLessThan(100)
    expect(range.height).toBeGreaterThan(0)
  })

  test('getRange: 15 minute end of day appointment stays within calendar', () => {
    let range = slotMetrics.getRange(
      new Date(2018, 0, 29, 23, 45, 0),
      new Date(2018, 0, 29, 23, 59, 0)
    )
    expect(range.top + range.height).toBeLessThan(100)
    expect(range.height).toBeGreaterThan(0)
  })

  test('getRange: multi day appointment stays within calendar', () => {
    let range = slotMetrics.getRange(
      new Date(2018, 0, 29, 0, 0, 0),
      new Date(2018, 0, 30, 4, 0, 0)
    )
    expect(range.top + range.height).toBeLessThan(100)
    expect(range.height).toBeGreaterThan(0)
  })
})
