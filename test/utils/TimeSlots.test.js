import { getSlotMetrics } from '../../src/utils/TimeSlots'
import dates from '../../src/utils/dates'

describe('getSlotMetrics', () => {
  const min = dates.startOf(new Date(), 'day')
  const max = dates.endOf(new Date(), 'day')
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
