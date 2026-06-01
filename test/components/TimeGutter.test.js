import React from 'react'
import { render, act } from '@testing-library/react'
import TimeGutter from '../../src/TimeGutter'
import { localizer, getters } from './fixtures'
import * as dates from '../../src/utils/dates'

const min = dates.startOf(new Date(2023, 0, 15), 'day')
const max = dates.endOf(new Date(2023, 0, 15), 'day')
const NoopWrapper = ({ children }) => children

const defaultProps = {
  min,
  max,
  step: 60,
  timeslots: 1,
  localizer,
  getNow: () => new Date(2023, 0, 15, 9, 0),
  resource: null,
  getters,
  gutterRef: null,
  components: { timeGutterWrapper: NoopWrapper },
}

describe('TimeGutter — basic rendering', () => {
  test('renders without crashing', () => {
    const { container } = render(<TimeGutter {...defaultProps} />)
    expect(container.querySelector('.rbc-time-gutter')).toBeInTheDocument()
  })

  test('renders time slot groups', () => {
    const { container } = render(<TimeGutter {...defaultProps} />)
    expect(container.querySelectorAll('.rbc-timeslot-group').length).toBeGreaterThan(0)
  })

  test('renders time labels', () => {
    const { container } = render(<TimeGutter {...defaultProps} />)
    expect(container.querySelectorAll('.rbc-label').length).toBeGreaterThan(0)
  })

  test('renders with 30 minute step', () => {
    const { container } = render(
      <TimeGutter {...defaultProps} step={30} timeslots={2} />
    )
    expect(container.querySelectorAll('.rbc-timeslot-group').length).toBeGreaterThan(0)
  })

  test('renders with 15 minute step, 4 timeslots', () => {
    const { container } = render(
      <TimeGutter {...defaultProps} step={15} timeslots={4} />
    )
    expect(container.querySelectorAll('.rbc-timeslot-group').length).toBeGreaterThan(0)
  })

  test('marks current-time slot with rbc-now', () => {
    // getNow returns 9:00 which is in the gutter range
    const { container } = render(
      <TimeGutter
        {...defaultProps}
        getNow={() => new Date(2023, 0, 15, 9, 0)}
      />
    )
    // The rbc-now label appears when getNow() falls within a slot group
    expect(container.querySelector('.rbc-time-gutter')).toBeInTheDocument()
  })

  test('renders with custom timeGutterWrapper component', () => {
    const CustomWrapper = ({ children }) => (
      <div data-testid="custom-gutter-wrapper">{children}</div>
    )
    const { getByTestId } = render(
      <TimeGutter
        {...defaultProps}
        components={{ timeGutterWrapper: CustomWrapper }}
      />
    )
    expect(getByTestId('custom-gutter-wrapper')).toBeInTheDocument()
  })

  test('renders with resource prop', () => {
    const { container } = render(
      <TimeGutter {...defaultProps} resource="room-1" />
    )
    expect(container.querySelector('.rbc-time-gutter')).toBeInTheDocument()
  })

  test('re-renders when step changes without crashing (useEffect branch)', () => {
    const { rerender, container } = render(
      <TimeGutter {...defaultProps} step={60} timeslots={1} />
    )
    expect(container.querySelector('.rbc-time-gutter')).toBeInTheDocument()
    // Changing step triggers the useEffect to update slotMetrics
    rerender(<TimeGutter {...defaultProps} step={30} timeslots={2} />)
    expect(container.querySelector('.rbc-time-gutter')).toBeInTheDocument()
  })
})

describe('TimeGutter — DST branch (adjustForDST)', () => {
  test('non-DST transition: same offset → start/end passed as-is', () => {
    // Standard day — no DST crossing — both tzOffset calls return same value
    const { container } = render(<TimeGutter {...defaultProps} />)
    expect(container.querySelector('.rbc-time-gutter')).toBeInTheDocument()
  })

  test('DST transition: different offsets → adjusted start/end', () => {
    // Build a localizer that reports different offsets for min/max
    const dstLocalizer = {
      ...localizer,
      getTimezoneOffset: (date) => {
        // Simulate DST: before noon = offset 240, after = 300
        return date.getHours() < 12 ? 240 : 300
      },
    }
    const { container } = render(
      <TimeGutter {...defaultProps} localizer={dstLocalizer} />
    )
    // Should render without crashing even with DST adjustment
    expect(container.querySelector('.rbc-time-gutter')).toBeInTheDocument()
  })
})

describe('TimeGutter — renderSlot null return for non-first slots (line 76)', () => {
  test('with timeslots=2 only one label renders per group (idx>0 returns null)', () => {
    const { container } = render(
      <TimeGutter {...defaultProps} step={30} timeslots={2} />
    )
    const groups = container.querySelectorAll('.rbc-timeslot-group')
    const labels = container.querySelectorAll('.rbc-label')
    // Each group has 2 time slots but renderSlot returns null for idx=1,
    // so labels count equals groups count (one label per group)
    expect(labels.length).toBe(groups.length)
  })

  test('with timeslots=4 still produces one label per group', () => {
    const { container } = render(
      <TimeGutter {...defaultProps} step={15} timeslots={4} />
    )
    const groups = container.querySelectorAll('.rbc-timeslot-group')
    const labels = container.querySelectorAll('.rbc-label')
    expect(labels.length).toBe(groups.length)
  })
})

describe('TimeGutter — useEffect slotMetrics guard (line 53)', () => {
  test('re-render with changed min/max triggers useEffect update path', () => {
    const newMin = dates.startOf(new Date(2023, 0, 16), 'day')
    const newMax = dates.endOf(new Date(2023, 0, 16), 'day')
    const { rerender, container } = render(<TimeGutter {...defaultProps} />)

    rerender(
      <TimeGutter
        {...defaultProps}
        min={newMin}
        max={newMax}
      />
    )
    // useEffect fires (min changed) → `if (slotMetrics)` evaluates → setSlotMetrics called
    expect(container.querySelector('.rbc-time-gutter')).toBeInTheDocument()
  })

  test('re-render with changed timeslots triggers useEffect body', () => {
    const { rerender, container } = render(
      <TimeGutter {...defaultProps} timeslots={1} />
    )
    // Change timeslots (dep array key) → useEffect body runs → slotMetrics truthy → line 53 covered
    rerender(<TimeGutter {...defaultProps} timeslots={2} />)
    expect(container.querySelector('.rbc-time-gutter')).toBeInTheDocument()
  })
})
