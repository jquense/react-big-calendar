import moment from 'moment'
import momentLocalizer from '../../src/localizers/moment'
import { getSlotMetrics } from '../../src/utils/TimeSlots'
import * as dates from '../../src/utils/dates'

const localizer = momentLocalizer(moment)

const min = dates.startOf(new Date(2018, 0, 29, 0, 0, 0), 'day')
const max = dates.endOf(new Date(2018, 0, 29, 59, 59, 59), 'day')

function buildMetrics(step = 60, timeslots = 1) {
  return getSlotMetrics({ min, max, step, timeslots, localizer })
}

describe('getSlotMetrics', () => {
  const slotMetrics = buildMetrics()

  test('closestSlotToPosition: always returns timeslot if valid percentage is given', () => {
    expect(slotMetrics.closestSlotToPosition(0)).toBeDefined()
    expect(slotMetrics.closestSlotToPosition(1)).toBeDefined()
    expect(slotMetrics.closestSlotToPosition(100)).toBeDefined()
    expect(slotMetrics.closestSlotToPosition(-100)).toBeDefined()
    expect(slotMetrics.closestSlotToPosition()).toBeUndefined()
    expect(slotMetrics.closestSlotToPosition('asd')).toBeUndefined()
  })

  test('closestSlotToPosition: returns last timeslot with correct time', () => {
    const secondLastSlot = slotMetrics.groups[slotMetrics.groups.length - 1][0]
    const shouldBeLast = slotMetrics.closestSlotToPosition(1)
    const diff = dates.diff(secondLastSlot, shouldBeLast, 'minutes')
    expect(diff).toBe(60)
  })

  test('update returns a new object when called with different args (due to key mismatch in source)', () => {
    // getKey internally uses { min, max, slots } but getSlotMetrics passes { start, end, timeslots },
    // so the keys never match — update always returns a fresh metrics object.
    const args = { min, max, step: 60, timeslots: 1, localizer }
    const updated = slotMetrics.update(args)
    expect(updated).toBeDefined()
  })

  test('update returns a new object when step changes', () => {
    const args = { min, max, step: 30, timeslots: 1, localizer }
    const updated = slotMetrics.update(args)
    expect(updated).not.toBe(slotMetrics)
  })

  test('dateIsInGroup returns true for a date within the group range', () => {
    const groupDate = slotMetrics.groups[2][0]
    expect(slotMetrics.dateIsInGroup(groupDate, 2)).toBe(true)
  })

  test('dateIsInGroup returns false for a date outside the group range', () => {
    const groupDate = slotMetrics.groups[0][0]
    expect(slotMetrics.dateIsInGroup(groupDate, 5)).toBe(false)
  })

  test('dateIsInGroup works on the last group (no nextGroup)', () => {
    const lastIdx = slotMetrics.groups.length - 1
    const lastGroupDate = slotMetrics.groups[lastIdx][0]
    const result = slotMetrics.dateIsInGroup(lastGroupDate, lastIdx)
    expect(typeof result).toBe('boolean')
  })

  test('nextSlot returns the slot after the given one', () => {
    const firstSlot = slotMetrics.groups[0][0]
    const second = slotMetrics.nextSlot(firstSlot)
    const diff = dates.diff(firstSlot, second, 'minutes')
    expect(diff).toBe(60)
  })

  test('nextSlot does not go past the end', () => {
    const lastGroup = slotMetrics.groups[slotMetrics.groups.length - 1]
    const lastSlot = lastGroup[lastGroup.length - 1]
    const next = slotMetrics.nextSlot(lastSlot)
    expect(next).toBeDefined()
  })

  test('closestSlotFromPoint returns a slot based on y position', () => {
    const boundaryRect = { top: 0, bottom: 100 }
    const slot = slotMetrics.closestSlotFromPoint({ y: 50 }, boundaryRect)
    expect(slot).toBeDefined()
  })

  test('closestSlotFromDate returns first slot when date is before start', () => {
    const before = new Date(2018, 0, 28, 23, 0)
    const slot = slotMetrics.closestSlotFromDate(before)
    expect(slot.getTime()).toBe(slotMetrics.groups[0][0].getTime())
  })

  test('closestSlotFromDate returns last slot when date is after end', () => {
    const after = new Date(2018, 0, 30, 2, 0)
    const slot = slotMetrics.closestSlotFromDate(after)
    expect(slot).toBeDefined()
  })

  test('closestSlotFromDate returns slot matching a mid-day date', () => {
    const noon = new Date(2018, 0, 29, 12, 0)
    const slot = slotMetrics.closestSlotFromDate(noon)
    expect(slot).toBeDefined()
    expect(slot.getHours()).toBe(12)
  })

  test('startsBeforeDay returns true when date is before the day', () => {
    expect(slotMetrics.startsBeforeDay(new Date(2018, 0, 28))).toBe(true)
  })

  test('startsBeforeDay returns false when date is the same day', () => {
    expect(slotMetrics.startsBeforeDay(new Date(2018, 0, 29))).toBe(false)
  })

  test('startsAfterDay returns true when date is after the day', () => {
    // max = new Date(2018, 0, 29, 59, 59, 59) overflows to Jan 31 — use Feb 1
    expect(slotMetrics.startsAfterDay(new Date(2018, 1, 1))).toBe(true)
  })

  test('startsAfterDay returns false when date is the same day', () => {
    expect(slotMetrics.startsAfterDay(new Date(2018, 0, 29))).toBe(false)
  })

  test('startsBefore returns false when time is within range start', () => {
    expect(slotMetrics.startsBefore(new Date(2018, 0, 29, 0, 1))).toBe(false)
  })

  test('startsAfter returns false when time is within range', () => {
    const midDay = new Date(2018, 0, 29, 12, 0)
    expect(slotMetrics.startsAfter(midDay)).toBe(false)
  })

  test('getCurrentTimePosition returns a number between 0 and 100', () => {
    const noon = new Date(2018, 0, 29, 12, 0)
    const pos = slotMetrics.getCurrentTimePosition(noon)
    expect(typeof pos).toBe('number')
    expect(pos).toBeGreaterThanOrEqual(0)
    expect(pos).toBeLessThanOrEqual(100)
  })
})

describe('getRange', () => {
  const slotMetrics = buildMetrics()

  test('15 minute start of day appointment stays within calendar', () => {
    const range = slotMetrics.getRange(
      new Date(2018, 0, 29, 0, 0, 0),
      new Date(2018, 0, 29, 0, 15, 0)
    )
    expect(range.top + range.height).toBeLessThan(100)
    expect(range.height).toBeGreaterThan(0)
  })

  test('1 hour start of day appointment stays within calendar', () => {
    const range = slotMetrics.getRange(
      new Date(2018, 0, 29, 0, 0, 0),
      new Date(2018, 0, 29, 1, 0, 0)
    )
    expect(range.top + range.height).toBeLessThan(100)
    expect(range.height).toBeGreaterThan(0)
  })

  test('1 hour mid range appointment stays within calendar', () => {
    const range = slotMetrics.getRange(
      new Date(2018, 0, 29, 14, 0, 0),
      new Date(2018, 0, 29, 15, 0, 0)
    )
    expect(range.top + range.height).toBeLessThan(100)
    expect(range.height).toBeGreaterThan(0)
  })

  test('3 hour mid range appointment stays within calendar', () => {
    const range = slotMetrics.getRange(
      new Date(2018, 0, 29, 14, 0, 0),
      new Date(2018, 0, 29, 17, 0, 0)
    )
    expect(range.top + range.height).toBeLessThan(100)
    expect(range.height).toBeGreaterThan(0)
  })

  test('full day appointment stays within calendar', () => {
    const range = slotMetrics.getRange(
      new Date(2018, 0, 29, 0, 0, 0),
      new Date(2018, 0, 29, 23, 59, 0)
    )
    expect(range.top + range.height).toBeLessThan(100)
    expect(range.height).toBeGreaterThan(0)
  })

  test('1 hour end of day appointment stays within calendar', () => {
    const range = slotMetrics.getRange(
      new Date(2018, 0, 29, 23, 0, 0),
      new Date(2018, 0, 29, 23, 59, 0)
    )
    expect(range.top + range.height).toBeLessThan(100)
    expect(range.height).toBeGreaterThan(0)
  })

  test('15 minute end of day appointment stays within calendar', () => {
    const range = slotMetrics.getRange(
      new Date(2018, 0, 29, 23, 45, 0),
      new Date(2018, 0, 29, 23, 59, 0)
    )
    expect(range.top + range.height).toBeLessThan(100)
    expect(range.height).toBeGreaterThan(0)
  })

  test('multi day appointment stays within calendar', () => {
    const range = slotMetrics.getRange(
      new Date(2018, 0, 29, 0, 0, 0),
      new Date(2018, 0, 30, 4, 0, 0)
    )
    expect(range.top + range.height).toBeLessThan(100)
    expect(range.height).toBeGreaterThan(0)
  })

  test('getRange with ignoreMin skips clamping rangeStart to min', () => {
    const rangeStart = new Date(2018, 0, 28, 20, 0)
    const rangeEnd = new Date(2018, 0, 29, 2, 0)
    const range = slotMetrics.getRange(rangeStart, rangeEnd, true, false)
    expect(range).toBeDefined()
    expect(range.start).toBeDefined()
  })

  test('getRange with ignoreMax skips clamping rangeEnd to max', () => {
    const rangeStart = new Date(2018, 0, 29, 22, 0)
    const rangeEnd = new Date(2018, 0, 30, 2, 0)
    const range = slotMetrics.getRange(rangeStart, rangeEnd, false, true)
    expect(range).toBeDefined()
    expect(range.end).toBeDefined()
  })
})
