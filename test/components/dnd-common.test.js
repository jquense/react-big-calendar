import React from 'react'
import { render } from '@testing-library/react'
import {
  dragAccessors,
  mergeComponents,
  pointInColumn,
  eventTimes,
} from '../../src/addons/dragAndDrop/common'
import { localizer } from './fixtures'

const d = (y, m, day, h = 0, min = 0) => new Date(y, m, day, h, min)

describe('dragAccessors', () => {
  const event = { start: d(2023, 0, 1, 10), end: d(2023, 0, 1, 11) }

  test('start accessor returns event start', () => {
    expect(dragAccessors.start(event)).toEqual(event.start)
  })

  test('end accessor returns event end', () => {
    expect(dragAccessors.end(event)).toEqual(event.end)
  })
})

describe('mergeComponents', () => {
  const Comp1 = () => null
  const Comp2 = () => null

  test('adds addon components when base has no corresponding component', () => {
    const result = mergeComponents({}, { eventWrapper: Comp1 })
    expect(result.eventWrapper).toBe(Comp1)
  })

  test('nests addon with existing component when base has one', () => {
    const result = mergeComponents({ eventWrapper: Comp1 }, { eventWrapper: Comp2 })
    expect(result.eventWrapper).not.toBe(Comp1)
    expect(result.eventWrapper).not.toBe(Comp2)
    expect(typeof result.eventWrapper).toBe('function')
  })

  test('handles empty addons', () => {
    const base = { eventWrapper: Comp1 }
    const result = mergeComponents(base, {})
    expect(result.eventWrapper).toBe(Comp1)
  })

  test('handles undefined base components', () => {
    const result = mergeComponents(undefined, { eventWrapper: Comp1 })
    expect(result.eventWrapper).toBe(Comp1)
  })
})

describe('pointInColumn', () => {
  const bounds = { left: 10, right: 100, top: 20 }

  test('returns true for point within bounds', () => {
    expect(pointInColumn(bounds, { x: 50, y: 50 })).toBe(true)
  })

  test('returns false for point left of left boundary', () => {
    expect(pointInColumn(bounds, { x: 5, y: 50 })).toBe(false)
  })

  test('returns false for point above top boundary', () => {
    expect(pointInColumn(bounds, { x: 50, y: 10 })).toBe(false)
  })

  test('returns true for point slightly past right (within 10px tolerance)', () => {
    expect(pointInColumn(bounds, { x: 105, y: 50 })).toBe(true)
  })

  test('returns false for point far past right boundary', () => {
    expect(pointInColumn(bounds, { x: 200, y: 50 })).toBe(false)
  })
})

describe('eventTimes', () => {
  const accessors = {
    start: (e) => e.start,
    end: (e) => e.end,
  }

  test('returns start and end from event', () => {
    const event = { start: d(2023, 0, 1, 10), end: d(2023, 0, 1, 11) }
    const result = eventTimes(event, accessors, localizer)
    expect(result.start).toEqual(event.start)
    expect(result.end).toEqual(event.end)
  })

  test('returns duration in milliseconds', () => {
    const event = { start: d(2023, 0, 1, 10), end: d(2023, 0, 1, 11) }
    const result = eventTimes(event, accessors, localizer)
    expect(result.duration).toBe(60 * 60 * 1000) // 1 hour
  })

  test('extends zero-duration midnight event by 1 day', () => {
    const midnightEvent = {
      start: d(2023, 0, 1, 0, 0),
      end: d(2023, 0, 1, 0, 0),
    }
    const result = eventTimes(midnightEvent, accessors, localizer)
    expect(result.end.getTime()).toBeGreaterThan(midnightEvent.end.getTime())
  })
})

describe('mergeComponents — nested component rendering', () => {
  test('the Nest component renders children wrapped through both components', () => {
    const Outer = ({ children }) => <div data-testid="outer">{children}</div>
    const Inner = ({ children }) => <span data-testid="inner">{children}</span>
    const merged = mergeComponents({ eventWrapper: Outer }, { eventWrapper: Inner })
    const NestedComponent = merged.eventWrapper
    const { getByTestId } = render(
      <NestedComponent>
        <b>child</b>
      </NestedComponent>
    )
    expect(getByTestId('outer')).toBeInTheDocument()
    expect(getByTestId('inner')).toBeInTheDocument()
  })
})
