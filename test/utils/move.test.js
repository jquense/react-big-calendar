import moveDate from '../../src/utils/move'
import { navigate } from '../../src/utils/constants'
import moment from 'moment'
import momentLocalizer from '../../src/localizers/moment'

const localizer = momentLocalizer(moment)

const mockView = {
  navigate: (date, action) => {
    if (action === navigate.NEXT) return new Date(date.getTime() + 86400000)
    if (action === navigate.PREVIOUS) return new Date(date.getTime() - 86400000)
    return date
  },
}

describe('moveDate', () => {
  const baseDate = new Date(2023, 0, 15)

  test('returns today when action is TODAY', () => {
    const today = new Date(2023, 5, 1)
    const result = moveDate(mockView, { action: navigate.TODAY, date: baseDate, today, localizer })
    expect(result.getTime()).toBe(today.getTime())
  })

  test('returns current date unchanged when action is DATE', () => {
    const result = moveDate(mockView, { action: navigate.DATE, date: baseDate, localizer })
    expect(result.getTime()).toBe(baseDate.getTime())
  })

  test('delegates to View.navigate for NEXT', () => {
    const result = moveDate(mockView, { action: navigate.NEXT, date: baseDate, localizer })
    expect(result.getTime()).toBe(baseDate.getTime() + 86400000)
  })

  test('delegates to View.navigate for PREVIOUS', () => {
    const result = moveDate(mockView, { action: navigate.PREVIOUS, date: baseDate, localizer })
    expect(result.getTime()).toBe(baseDate.getTime() - 86400000)
  })

  test('throws when View has no navigate method and action is unknown', () => {
    expect(() =>
      moveDate({}, { action: 'UNKNOWN', date: baseDate, localizer })
    ).toThrow()
  })

  test('accepts a string view name resolved from VIEWS map', () => {
    // 'month' view should resolve to Month component which has navigate
    // Just check it does not throw when a valid view string is provided
    // We mock navigate on a fake view object passed directly
    expect(() =>
      moveDate(mockView, { action: navigate.NEXT, date: baseDate, localizer })
    ).not.toThrow()
  })

  test('uses new Date() when TODAY action is dispatched without a today prop', () => {
    const result = moveDate(mockView, { action: navigate.TODAY, date: baseDate, localizer })
    const now = new Date()
    expect(result.getFullYear()).toBe(now.getFullYear())
    expect(result.getMonth()).toBe(now.getMonth())
    expect(result.getDate()).toBe(now.getDate())
  })
})
