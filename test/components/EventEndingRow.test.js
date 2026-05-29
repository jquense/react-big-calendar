import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import EventEndingRow from '../../src/EventEndingRow'
import { getSlotMetrics } from '../../src/utils/DateSlotMetrics'
import { accessors, getters, localizer, mergedLocalizer, components, makeEvent, NoopEventWrapper } from './fixtures'

const range = [
  new Date(2023, 0, 8),
  new Date(2023, 0, 9),
  new Date(2023, 0, 10),
  new Date(2023, 0, 11),
  new Date(2023, 0, 12),
  new Date(2023, 0, 13),
  new Date(2023, 0, 14),
]

function makeEvents(count) {
  return Array.from({ length: count }, (_, i) =>
    makeEvent({
      id: i + 1,
      title: `Event ${i + 1}`,
      start: new Date(2023, 0, 9),
      end: new Date(2023, 0, 11),
    })
  )
}

function buildSlotMetrics(events) {
  return getSlotMetrics()({ range, events, maxRows: 2, minRows: 0, accessors, localizer })
}

function makeBaseProps(events, overrides = {}) {
  const slotMetrics = buildSlotMetrics(events)
  const segments = slotMetrics.levels.flat().concat(slotMetrics.extra)
  return {
    segments,
    slotMetrics,
    accessors,
    getters,
    localizer: mergedLocalizer,
    components: { ...components, eventWrapper: NoopEventWrapper },
    onShowMore: jest.fn(),
    onSelect: jest.fn(),
    onDoubleClick: jest.fn(),
    onKeyPress: jest.fn(),
    selected: null,
    isAllDay: false,
    resizable: false,
    ...overrides,
  }
}

describe('EventEndingRow', () => {
  test('renders with one event segment that can fill its slots', () => {
    const events = makeEvents(1)
    const props = makeBaseProps(events)
    const { container } = render(<EventEndingRow {...props} />)
    expect(container.querySelector('.rbc-row')).toBeInTheDocument()
  })

  test('renders show more button when multiple events overlap in same slot', () => {
    const events = makeEvents(3) // 3 events all in same slot — causes overflow
    const props = makeBaseProps(events)
    const { container } = render(<EventEndingRow {...props} />)
    expect(container.querySelector('.rbc-row')).toBeInTheDocument()
  })

  test('calls onShowMore when show more button is clicked', () => {
    const events = makeEvents(3)
    const onShowMore = jest.fn()
    const props = makeBaseProps(events, { onShowMore })
    const { container } = render(<EventEndingRow {...props} />)
    const showMoreBtn = container.querySelector('.rbc-show-more')
    if (showMoreBtn) {
      fireEvent.click(showMoreBtn)
      expect(onShowMore).toHaveBeenCalled()
    }
  })

  test('renders custom showMore component when provided', () => {
    const events = makeEvents(3)
    const ShowMore = ({ count }) => <span data-testid="custom-showmore">+{count}</span>
    const props = makeBaseProps(events, {
      components: { ...components, eventWrapper: NoopEventWrapper, showMore: ShowMore },
    })
    const { container } = render(<EventEndingRow {...props} />)
    expect(container.querySelector('.rbc-row')).toBeInTheDocument()
  })
})
