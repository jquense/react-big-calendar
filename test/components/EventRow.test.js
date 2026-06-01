import React from 'react'
import { render } from '@testing-library/react'
import EventRow from '../../src/EventRow'
import EventRowMixin from '../../src/EventRowMixin'
import { getSlotMetrics } from '../../src/utils/DateSlotMetrics'
import { accessors, getters, localizer, components, makeEvent, NoopEventWrapper } from './fixtures'

const range = [
  new Date(2023, 0, 8),
  new Date(2023, 0, 9),
  new Date(2023, 0, 10),
  new Date(2023, 0, 11),
  new Date(2023, 0, 12),
  new Date(2023, 0, 13),
  new Date(2023, 0, 14),
]

const events = [makeEvent({ start: new Date(2023, 0, 9), end: new Date(2023, 0, 11) })]

function buildSlotMetrics() {
  return getSlotMetrics()({
    range,
    events,
    maxRows: 5,
    minRows: 0,
    accessors,
    localizer,
  })
}

const slotMetrics = buildSlotMetrics()

const segment = {
  event: events[0],
  left: 2,
  right: 4,
  span: 3,
}

const baseRowProps = {
  segments: [segment],
  slotMetrics,
  accessors,
  getters,
  localizer,
  components: { ...components, eventWrapper: NoopEventWrapper },
}

describe('EventRow', () => {
  test('renders without crashing', () => {
    const { container } = render(<EventRow {...baseRowProps} />)
    expect(container.querySelector('.rbc-row')).toBeInTheDocument()
  })

  test('renders rbc-row-segment elements', () => {
    const { container } = render(<EventRow {...baseRowProps} />)
    expect(
      container.querySelectorAll('.rbc-row-segment').length
    ).toBeGreaterThan(0)
  })

  test('renders a gap segment when event does not start at slot 1', () => {
    const { container } = render(<EventRow {...baseRowProps} />)
    // The event starts at left=2, so there should be a gap at slot 1
    const segments = container.querySelectorAll('.rbc-row-segment')
    expect(segments.length).toBeGreaterThanOrEqual(2) // gap + event
  })

  test('renders with no segments without crashing', () => {
    const { container } = render(
      <EventRow {...baseRowProps} segments={[]} />
    )
    expect(container.querySelector('.rbc-row')).toBeInTheDocument()
  })
})

describe('EventRowMixin', () => {
  test('renderSpan returns a div with correct flex-basis', () => {
    const span = EventRowMixin.renderSpan(7, 2, 'key1')
    expect(span.props.style.flexBasis).toMatch(/^28\.57/)
  })

  test('renderSpan includes content when provided', () => {
    const content = <span>content</span>
    const span = EventRowMixin.renderSpan(7, 1, 'key2', content)
    expect(span.props.children).toBe(content)
  })

  test('renderEvent returns an EventCell element', () => {
    const slotMetrics = buildSlotMetrics()
    const result = EventRowMixin.renderEvent(
      {
        ...baseRowProps,
        slotMetrics,
        selected: null,
        isAllDay: false,
        resizable: false,
      },
      events[0]
    )
    expect(result).not.toBeNull()
    expect(result.type.name).toBe('EventCell')
  })
})
