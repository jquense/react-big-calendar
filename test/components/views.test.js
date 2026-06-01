import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Week from '../../src/Week'
import Day from '../../src/Day'
import WorkWeek from '../../src/WorkWeek'
import Month from '../../src/Month'
import Agenda from '../../src/Agenda'
import { navigate } from '../../src/utils/constants'
import { localizer, mergedLocalizer, accessors, getters, makeEvent, NoopEventWrapper } from './fixtures'

const date = new Date(2023, 0, 15)

// ─── Week static methods ─────────────────────────────────────────────────────
describe('Week — static methods', () => {
  test('navigate PREVIOUS subtracts one week', () => {
    const prev = Week.navigate(date, navigate.PREVIOUS, { localizer })
    expect(localizer.diff(prev, date, 'day')).toBe(7)
  })

  test('navigate NEXT adds one week', () => {
    const next = Week.navigate(date, navigate.NEXT, { localizer })
    expect(localizer.diff(date, next, 'day')).toBe(7)
  })

  test('navigate default returns the same date', () => {
    const same = Week.navigate(date, navigate.TODAY, { localizer })
    expect(same.getTime()).toBe(date.getTime())
  })

  test('range returns 7 dates', () => {
    const range = Week.range(date, { localizer })
    expect(range).toHaveLength(7)
  })

  test('title returns a string', () => {
    const title = Week.title(date, { localizer })
    expect(typeof title).toBe('string')
  })
})

// ─── WorkWeek static methods ──────────────────────────────────────────────────
describe('WorkWeek — static methods', () => {
  test('range returns only weekdays (Mon-Fri)', () => {
    const range = WorkWeek.range(date, { localizer })
    range.forEach((d) => {
      expect(d.getDay()).not.toBe(0) // not Sunday
      expect(d.getDay()).not.toBe(6) // not Saturday
    })
  })

  test('navigate delegates to Week.navigate', () => {
    const next = WorkWeek.navigate(date, navigate.NEXT, { localizer })
    expect(next).toBeInstanceOf(Date)
  })

  test('title returns a string', () => {
    expect(typeof WorkWeek.title(date, { localizer })).toBe('string')
  })
})

// ─── Day static methods ───────────────────────────────────────────────────────
describe('Day — static methods', () => {
  test('navigate PREVIOUS subtracts one day', () => {
    const prev = Day.navigate(date, navigate.PREVIOUS, { localizer })
    expect(localizer.diff(prev, date, 'day')).toBe(1)
  })

  test('navigate NEXT adds one day', () => {
    const next = Day.navigate(date, navigate.NEXT, { localizer })
    expect(localizer.diff(date, next, 'day')).toBe(1)
  })

  test('navigate default returns the same date', () => {
    expect(Day.navigate(date, navigate.TODAY, { localizer }).getTime()).toBe(date.getTime())
  })

  test('range returns a single date array', () => {
    const range = Day.range(date, { localizer })
    expect(range).toHaveLength(1)
    expect(range[0].toDateString()).toBe(date.toDateString())
  })

  test('title returns a string', () => {
    expect(typeof Day.title(date, { localizer })).toBe('string')
  })
})

// ─── Month static methods ─────────────────────────────────────────────────────
describe('Month — static methods', () => {
  test('navigate PREVIOUS goes back one month', () => {
    const marchDate = new Date(2023, 2, 15) // March — avoid January wrap
    const prev = Month.navigate(marchDate, navigate.PREVIOUS, { localizer })
    expect(prev.getMonth()).toBe(1) // February
  })

  test('navigate NEXT adds one month', () => {
    const next = Month.navigate(date, navigate.NEXT, { localizer })
    expect(next.getMonth()).toBe(1) // February
  })

  test('navigate default returns the same date', () => {
    expect(Month.navigate(date, navigate.TODAY, { localizer }).getTime()).toBe(date.getTime())
  })

  test('range returns an object with start and end', () => {
    const range = Month.range(date, { localizer })
    expect(range.start).toBeInstanceOf(Date)
    expect(range.end).toBeInstanceOf(Date)
    expect(range.start.getTime()).toBeLessThanOrEqual(new Date(2023, 0, 1).getTime())
    expect(range.end.getTime()).toBeGreaterThanOrEqual(new Date(2023, 0, 31).getTime())
  })

  test('title returns a string', () => {
    expect(typeof Month.title(date, { localizer })).toBe('string')
  })
})

// ─── Agenda static methods ────────────────────────────────────────────────────
describe('Agenda — static methods', () => {
  test('navigate PREVIOUS subtracts length days', () => {
    const prev = Agenda.navigate(date, navigate.PREVIOUS, { length: 30, localizer })
    expect(localizer.diff(prev, date, 'day')).toBe(30)
  })

  test('navigate NEXT adds length days', () => {
    const next = Agenda.navigate(date, navigate.NEXT, { length: 30, localizer })
    expect(localizer.diff(date, next, 'day')).toBe(30)
  })

  test('navigate default returns the same date', () => {
    expect(Agenda.navigate(date, navigate.TODAY, { length: 30, localizer }).getTime()).toBe(date.getTime())
  })

  test('range returns start and end dates', () => {
    const range = Agenda.range(date, { length: 30, localizer })
    expect(range.start).toBeInstanceOf(Date)
    expect(range.end).toBeInstanceOf(Date)
  })

  test('title returns a string', () => {
    expect(typeof Agenda.title(date, { length: 30, localizer })).toBe('string')
  })
})

// ─── Agenda rendering ─────────────────────────────────────────────────────────
describe('Agenda — rendering', () => {
  const agendaComponents = {
    event: null,
    date: null,
    time: null,
    eventWrapper: NoopEventWrapper,
  }

  function renderAgenda(events, extra = {}) {
    return render(
      <Agenda
        date={date}
        events={events}
        length={30}
        localizer={mergedLocalizer}
        accessors={accessors}
        getters={getters}
        components={agendaComponents}
        selected={null}
        onSelectEvent={extra.onSelectEvent || (() => {})}
        onDoubleClickEvent={extra.onDoubleClickEvent || (() => {})}
      />
    )
  }

  test('renders without crashing with no events', () => {
    const { container } = renderAgenda([])
    expect(container.querySelector('.rbc-agenda-view')).toBeInTheDocument()
  })

  test('shows "no events" message when no events in range', () => {
    const { getByText } = renderAgenda([])
    expect(getByText(/no events/i)).toBeInTheDocument()
  })

  test('renders events in range', () => {
    const inRangeEvent = makeEvent({
      title: 'Agenda Event',
      start: new Date(2023, 0, 16, 10),
      end: new Date(2023, 0, 16, 11),
    })
    const { getByText } = renderAgenda([inRangeEvent])
    expect(getByText('Agenda Event')).toBeInTheDocument()
  })

  test('calls onSelectEvent when event cell is clicked', () => {
    const onSelectEvent = jest.fn()
    const inRangeEvent = makeEvent({
      title: 'Click Me',
      start: new Date(2023, 0, 16, 10),
      end: new Date(2023, 0, 16, 11),
    })
    const { getByText } = renderAgenda([inRangeEvent], { onSelectEvent })
    fireEvent.click(getByText('Click Me'))
    expect(onSelectEvent).toHaveBeenCalled()
  })

  test('calls onDoubleClickEvent when event cell is double-clicked', () => {
    const onDoubleClickEvent = jest.fn()
    const inRangeEvent = makeEvent({
      title: 'Double Me',
      start: new Date(2023, 0, 16, 10),
      end: new Date(2023, 0, 16, 11),
    })
    const { getByText } = renderAgenda([inRangeEvent], { onDoubleClickEvent })
    fireEvent.dblClick(getByText('Double Me'))
    expect(onDoubleClickEvent).toHaveBeenCalled()
  })

  test('renders multi-day event with continues labels', () => {
    const multiDayEvent = makeEvent({
      title: 'Multi Day',
      start: new Date(2023, 0, 15),
      end: new Date(2023, 0, 18),
      allDay: false,
    })
    const { getAllByText } = renderAgenda([multiDayEvent])
    expect(getAllByText('Multi Day').length).toBeGreaterThan(0)
  })

  test('renders all-day event', () => {
    const allDayEvent = makeEvent({
      title: 'All Day Event',
      start: new Date(2023, 0, 16),
      end: new Date(2023, 0, 17),
      allDay: true,
    })
    const { getByText } = renderAgenda([allDayEvent])
    expect(getByText('All Day Event')).toBeInTheDocument()
  })

  test('renders zero-duration event (start equals end)', () => {
    const zeroDuration = makeEvent({
      title: 'Instant Event',
      start: new Date(2023, 0, 16, 10),
      end: new Date(2023, 0, 16, 10),
    })
    const { getByText } = renderAgenda([zeroDuration])
    expect(getByText('Instant Event')).toBeInTheDocument()
  })

  test('renders custom event component when provided', () => {
    const CustomEvent = ({ title }) => <span data-testid="custom">{title}</span>
    const inRangeEvent = makeEvent({
      title: 'Custom',
      start: new Date(2023, 0, 16, 10),
      end: new Date(2023, 0, 16, 11),
    })
    const { getByTestId } = render(
      <Agenda
        date={date}
        events={[inRangeEvent]}
        length={30}
        localizer={mergedLocalizer}
        accessors={accessors}
        getters={getters}
        components={{ ...agendaComponents, event: CustomEvent }}
        selected={null}
        onSelectEvent={() => {}}
        onDoubleClickEvent={() => {}}
      />
    )
    expect(getByTestId('custom')).toBeInTheDocument()
  })
})
