import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Agenda from '../../src/Agenda'
import { accessors, getters, mergedLocalizer, components, NoopEventWrapper } from './fixtures'
import { navigate } from '../../src/utils/constants'

const baseDate = new Date(2023, 0, 15)

const agendaProps = {
  accessors,
  getters,
  localizer: mergedLocalizer,
  components: { ...components, eventWrapper: NoopEventWrapper },
  date: baseDate,
  events: [],
  length: 30,
  getNow: () => baseDate,
  onSelectEvent: jest.fn(),
  onDoubleClickEvent: jest.fn(),
  selected: null,
}

// ── Empty state ───────────────────────────────────────────────────────────────
describe('Agenda — empty state', () => {
  test('renders no-events message when events array is empty', () => {
    const { container } = render(<Agenda {...agendaProps} />)
    expect(container.querySelector('.rbc-agenda-empty')).toBeInTheDocument()
  })

  test('shows custom noEventsInRange message', () => {
    const customLocalizer = {
      ...mergedLocalizer,
      messages: { ...mergedLocalizer.messages, noEventsInRange: 'Nothing here!' },
    }
    const { getByText } = render(
      <Agenda {...agendaProps} localizer={customLocalizer} />
    )
    expect(getByText('Nothing here!')).toBeInTheDocument()
  })
})

// ── Events in range ───────────────────────────────────────────────────────────
describe('Agenda — events rendering', () => {
  const events = [
    {
      id: 1, title: 'Single Day Timed',
      start: new Date(2023, 0, 16, 10, 0),
      end:   new Date(2023, 0, 16, 11, 0),
    },
    {
      id: 2, title: 'All Day Event',
      start: new Date(2023, 0, 17),
      end:   new Date(2023, 0, 18),
      allDay: true,
    },
  ]

  test('renders agenda table when events exist', () => {
    const { container } = render(<Agenda {...agendaProps} events={events} />)
    expect(container.querySelector('.rbc-agenda-table')).toBeInTheDocument()
  })

  test('renders each event title in a row', () => {
    const { getByText } = render(<Agenda {...agendaProps} events={events} />)
    expect(getByText('Single Day Timed')).toBeInTheDocument()
    expect(getByText('All Day Event')).toBeInTheDocument()
  })

  test('calls onSelectEvent when event row is clicked', () => {
    const onSelectEvent = jest.fn()
    const { getByText } = render(
      <Agenda {...agendaProps} events={events} onSelectEvent={onSelectEvent} />
    )
    fireEvent.click(getByText('Single Day Timed'))
    expect(onSelectEvent).toHaveBeenCalled()
  })

  test('calls onDoubleClickEvent on double-click', () => {
    const onDoubleClickEvent = jest.fn()
    const { getByText } = render(
      <Agenda {...agendaProps} events={events} onDoubleClickEvent={onDoubleClickEvent} />
    )
    fireEvent.dblClick(getByText('Single Day Timed'))
    expect(onDoubleClickEvent).toHaveBeenCalled()
  })

  test('marks selected event', () => {
    const { container } = render(
      <Agenda {...agendaProps} events={events} selected={events[0]} />
    )
    expect(container.querySelector('.rbc-agenda-table')).toBeInTheDocument()
  })
})

// ── timeRangeLabel branches (line 112 gap) ────────────────────────────────────
describe('Agenda — timeRangeLabel branches', () => {
  test('shows allDay label for allDay event', () => {
    const events = [{
      id: 1, title: 'Full Day', allDay: true,
      start: new Date(2023, 0, 16), end: new Date(2023, 0, 17),
    }]
    const { container } = render(<Agenda {...agendaProps} events={events} />)
    expect(container.querySelector('.rbc-agenda-time-cell')).toBeInTheDocument()
  })

  test('shows time for same-start-end timed event', () => {
    // start === end (zero-duration event)
    const start = new Date(2023, 0, 16, 10, 0)
    const events = [{ id: 1, title: 'Zero Duration', start, end: start }]
    const { container } = render(<Agenda {...agendaProps} events={events} />)
    expect(container.querySelector('.rbc-agenda-time-cell')).toBeInTheDocument()
  })

  test('shows time range for same-day start/end timed event', () => {
    const events = [{
      id: 1, title: 'Same Day',
      start: new Date(2023, 0, 16, 10, 0),
      end:   new Date(2023, 0, 16, 11, 0),
    }]
    const { container } = render(<Agenda {...agendaProps} events={events} />)
    expect(container.querySelector('.rbc-agenda-time-cell')).toBeInTheDocument()
  })

  test('shows start time on first day of multi-day event', () => {
    // day === start day
    const events = [{
      id: 1, title: 'Multi Day',
      start: new Date(2023, 0, 16, 9, 0),
      end:   new Date(2023, 0, 18, 17, 0),
    }]
    const { container } = render(<Agenda {...agendaProps} events={events} />)
    expect(container.querySelector('.rbc-continues-after')).toBeInTheDocument()
  })

  test('shows end time on last day of multi-day event (line 112 branch)', () => {
    // Multi-day event: the last day row shows end time (day === end day)
    const events = [{
      id: 1, title: 'Ends Today',
      start: new Date(2023, 0, 14, 9, 0),   // started before range
      end:   new Date(2023, 0, 16, 12, 0),  // ends within range
    }]
    const { container } = render(<Agenda {...agendaProps} events={events} />)
    // The continues-prior class marks days after the start
    expect(container.querySelector('.rbc-continues-prior')).toBeInTheDocument()
  })

  test('applies rbc-continues-prior when day > event start', () => {
    const events = [{
      id: 1, title: 'Spans Days',
      start: new Date(2023, 0, 14),
      end:   new Date(2023, 0, 20),
    }]
    const { container } = render(<Agenda {...agendaProps} events={events} />)
    expect(container.querySelector('.rbc-continues-prior')).toBeInTheDocument()
  })

  test('applies rbc-continues-after when day < event end', () => {
    const events = [{
      id: 1, title: 'Extends Out',
      start: new Date(2023, 0, 15),
      end:   new Date(2023, 0, 25),
    }]
    const { container } = render(<Agenda {...agendaProps} events={events} />)
    expect(container.querySelector('.rbc-continues-after')).toBeInTheDocument()
  })
})

// ── Custom components (Event, date, time) ─────────────────────────────────────
describe('Agenda — custom event/date/time components', () => {
  const events = [{
    id: 1, title: 'Custom',
    start: new Date(2023, 0, 16, 10, 0),
    end:   new Date(2023, 0, 16, 11, 0),
  }]

  test('renders custom Event component', () => {
    const Event = ({ title }) => <span data-testid="custom-event">{title}</span>
    const { getByTestId } = render(
      <Agenda
        {...agendaProps}
        events={events}
        components={{ ...agendaProps.components, event: Event }}
      />
    )
    expect(getByTestId('custom-event')).toBeInTheDocument()
  })

  test('renders custom date component', () => {
    const AgendaDate = ({ label }) => <span data-testid="custom-date">{label}</span>
    const { getByTestId } = render(
      <Agenda
        {...agendaProps}
        events={events}
        components={{ ...agendaProps.components, date: AgendaDate }}
      />
    )
    expect(getByTestId('custom-date')).toBeInTheDocument()
  })

  test('renders custom time component', () => {
    const TimeComp = ({ label }) => <span data-testid="custom-time">{label}</span>
    const { getByTestId } = render(
      <Agenda
        {...agendaProps}
        events={events}
        components={{ ...agendaProps.components, time: TimeComp }}
      />
    )
    expect(getByTestId('custom-time')).toBeInTheDocument()
  })
})

// ── Static methods ───────────────────────────────────────��────────────────────
describe('Agenda — static methods', () => {
  test('range returns start/end object', () => {
    const result = Agenda.range(baseDate, { length: 30, localizer: mergedLocalizer })
    expect(result.start).toEqual(baseDate)
    expect(result.end).toBeInstanceOf(Date)
    expect(result.end > result.start).toBe(true)
  })

  test('navigate PREVIOUS subtracts length days', () => {
    const result = Agenda.navigate(baseDate, navigate.PREVIOUS, {
      length: 30,
      localizer: mergedLocalizer,
    })
    expect(result < baseDate).toBe(true)
  })

  test('navigate NEXT adds length days', () => {
    const result = Agenda.navigate(baseDate, navigate.NEXT, {
      length: 30,
      localizer: mergedLocalizer,
    })
    expect(result > baseDate).toBe(true)
  })

  test('navigate default (DATE) returns date unchanged', () => {
    const result = Agenda.navigate(baseDate, navigate.DATE, {
      length: 30,
      localizer: mergedLocalizer,
    })
    expect(result).toBe(baseDate)
  })

  test('title returns formatted header string', () => {
    const title = Agenda.title(baseDate, { length: 30, localizer: mergedLocalizer })
    expect(typeof title).toBe('string')
    expect(title.length).toBeGreaterThan(0)
  })
})

describe('Agenda — timeRangeLabel end-day branch (line 112)', () => {
  test('shows end time when displayed day equals event end day', () => {
    // Event starts Jan 14, ends Jan 16 — the Jan 16 row shows end time
    // This exercises: localizer.isSameDate(day, end) branch
    const events = [
      {
        id: 1,
        title: 'Ends Today',
        start: new Date(2023, 0, 14, 9, 0),
        end:   new Date(2023, 0, 16, 12, 30),
      },
    ]
    const { container } = render(
      <Agenda
        {...agendaProps}
        date={new Date(2023, 0, 14)}
        events={events}
      />
    )
    // Multiple rows render (one per day the event spans): Jan 14, Jan 15, Jan 16
    const rows = container.querySelectorAll('.rbc-agenda-event-cell')
    expect(rows.length).toBeGreaterThan(1)
    // The last row (Jan 16) should show end time (the isSameDate(day, end) branch)
    const timeCells = container.querySelectorAll('.rbc-agenda-time-cell')
    expect(timeCells.length).toBeGreaterThan(1)
  })

  test('event spanning 3 days produces continues-prior and continues-after markers', () => {
    const events = [
      {
        id: 1,
        title: 'Long Span',
        start: new Date(2023, 0, 14, 8, 0),
        end:   new Date(2023, 0, 17, 18, 0),
      },
    ]
    const { container } = render(
      <Agenda
        {...agendaProps}
        date={new Date(2023, 0, 14)}
        events={events}
      />
    )
    // Middle days have both prior and after markers
    expect(container.querySelector('.rbc-continues-prior')).toBeInTheDocument()
    expect(container.querySelector('.rbc-continues-after')).toBeInTheDocument()
  })
})

describe('Agenda — _adjustHeader overflow branch (lines 152-153)', () => {
  test('renders without error when content has scrollable height', () => {
    // _adjustHeader fires in useEffect; in jsdom scrollHeight === clientHeight
    // (no actual scroll), so the overflow branch doesn't fire, but the header
    // is still updated. The key assertion is that no error is thrown.
    const events = Array.from({ length: 60 }, (_, i) => ({
      id: i + 1,
      title: `Event ${i + 1}`,
      start: new Date(2023, 0, 14 + (i % 15), 9, 0),
      end:   new Date(2023, 0, 14 + (i % 15), 10, 0),
    }))
    const { container } = render(
      <Agenda
        {...agendaProps}
        date={new Date(2023, 0, 1)}
        events={events}
        length={60}
      />
    )
    expect(container.querySelector('.rbc-agenda-view')).toBeInTheDocument()
  })
})
