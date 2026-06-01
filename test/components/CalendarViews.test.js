/**
 * These tests render Calendar in week/day/work_week views to exercise
 * TimeGrid, DayColumn, TimeGridHeader, and related components
 * via integration rather than direct unit tests.
 */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Calendar from '../../src/Calendar'
import { localizer } from './fixtures'
import { views } from '../../src/utils/constants'
import messages from '../../src/utils/messages'

const msgs = messages({})
const defaultDate = new Date(2023, 0, 15) // Sunday Jan 15 2023

const events = [
  {
    id: 1,
    title: 'Morning Meeting',
    start: new Date(2023, 0, 15, 9, 0),
    end: new Date(2023, 0, 15, 10, 0),
  },
  {
    id: 2,
    title: 'All Day Event',
    start: new Date(2023, 0, 15),
    end: new Date(2023, 0, 17),
    allDay: true,
  },
]

describe('Calendar — Week view integration', () => {
  test('renders week view with events', () => {
    const { container } = render(
      <Calendar
        localizer={localizer}
        defaultDate={defaultDate}
        defaultView={views.WEEK}
        events={events}
      />
    )
    expect(container.querySelector('.rbc-time-view')).toBeInTheDocument()
  })

  test('renders time slot groups in week view', () => {
    const { container } = render(
      <Calendar
        localizer={localizer}
        defaultDate={defaultDate}
        defaultView={views.WEEK}
        events={[]}
      />
    )
    expect(
      container.querySelectorAll('.rbc-timeslot-group').length
    ).toBeGreaterThan(0)
  })

  test('renders header cells for each day of the week', () => {
    const { container } = render(
      <Calendar
        localizer={localizer}
        defaultDate={defaultDate}
        defaultView={views.WEEK}
        events={[]}
      />
    )
    expect(container.querySelectorAll('.rbc-header').length).toBeGreaterThanOrEqual(7)
  })

  test('renders events in time grid', () => {
    const { getByText } = render(
      <Calendar
        localizer={localizer}
        defaultDate={defaultDate}
        defaultView={views.WEEK}
        events={events}
      />
    )
    expect(getByText('Morning Meeting')).toBeInTheDocument()
  })

  test('navigates to next week', () => {
    const onNavigate = jest.fn()
    const { getByText } = render(
      <Calendar
        localizer={localizer}
        date={defaultDate}
        view={views.WEEK}
        onNavigate={onNavigate}
        onView={() => {}}
        events={[]}
      />
    )
    fireEvent.click(getByText(msgs.next))
    expect(onNavigate).toHaveBeenCalled()
  })

  test('shows all-day events in header row', () => {
    const { getByText } = render(
      <Calendar
        localizer={localizer}
        defaultDate={defaultDate}
        defaultView={views.WEEK}
        events={[events[1]]} // allDay event
      />
    )
    expect(getByText('All Day Event')).toBeInTheDocument()
  })
})

describe('Calendar — Day view integration', () => {
  test('renders day view', () => {
    const { container } = render(
      <Calendar
        localizer={localizer}
        defaultDate={defaultDate}
        defaultView={views.DAY}
        events={events}
      />
    )
    expect(container.querySelector('.rbc-time-view')).toBeInTheDocument()
  })

  test('renders events in day view', () => {
    const { getByText } = render(
      <Calendar
        localizer={localizer}
        defaultDate={defaultDate}
        defaultView={views.DAY}
        events={events}
      />
    )
    expect(getByText('Morning Meeting')).toBeInTheDocument()
  })
})

describe('Calendar — Month view integration', () => {
  test('renders month grid', () => {
    const { container } = render(
      <Calendar
        localizer={localizer}
        defaultDate={defaultDate}
        defaultView={views.MONTH}
        events={events}
      />
    )
    expect(container.querySelector('.rbc-month-view')).toBeInTheDocument()
  })

  test('renders date cells', () => {
    const { container } = render(
      <Calendar
        localizer={localizer}
        defaultDate={defaultDate}
        defaultView={views.MONTH}
        events={[]}
      />
    )
    expect(container.querySelectorAll('.rbc-date-cell').length).toBeGreaterThan(0)
  })

  test('event selection calls onSelectEvent', () => {
    const onSelectEvent = jest.fn()
    const { getByText } = render(
      <Calendar
        localizer={localizer}
        defaultDate={defaultDate}
        defaultView={views.MONTH}
        events={[events[0]]}
        onSelectEvent={onSelectEvent}
      />
    )
    fireEvent.click(getByText('Morning Meeting'))
    expect(onSelectEvent).toHaveBeenCalled()
  })

  test('renders with custom event prop getter', () => {
    const { container } = render(
      <Calendar
        localizer={localizer}
        defaultDate={defaultDate}
        defaultView={views.MONTH}
        events={events}
        eventPropGetter={() => ({ style: { backgroundColor: 'red' } })}
      />
    )
    expect(container.querySelector('.rbc-month-view')).toBeInTheDocument()
  })

  test('renders with custom day prop getter', () => {
    const { container } = render(
      <Calendar
        localizer={localizer}
        defaultDate={defaultDate}
        defaultView={views.MONTH}
        events={[]}
        dayPropGetter={() => ({ className: 'custom-day' })}
      />
    )
    expect(container.querySelector('.rbc-month-view')).toBeInTheDocument()
  })
})

describe('Calendar — Work week view integration', () => {
  test('renders work week view', () => {
    const { container } = render(
      <Calendar
        localizer={localizer}
        defaultDate={defaultDate}
        defaultView={views.WORK_WEEK}
        views={[views.MONTH, views.WEEK, views.WORK_WEEK, views.DAY]}
        events={[]}
      />
    )
    expect(container.querySelector('.rbc-time-view')).toBeInTheDocument()
  })

  test('does not show weekend columns in work week view', () => {
    const { container } = render(
      <Calendar
        localizer={localizer}
        defaultDate={defaultDate}
        defaultView={views.WORK_WEEK}
        views={[views.MONTH, views.WEEK, views.WORK_WEEK, views.DAY]}
        events={[]}
      />
    )
    // Work week has 5 day columns, not 7
    const dayColumns = container.querySelectorAll('.rbc-day-slot')
    expect(dayColumns.length).toBe(5)
  })
})

describe('Calendar — double click and key press events', () => {
  test('calls onDoubleClickEvent when event is double-clicked', () => {
    const onDoubleClickEvent = jest.fn()
    const { getByText } = render(
      <Calendar
        localizer={localizer}
        defaultDate={defaultDate}
        defaultView={views.MONTH}
        events={[events[0]]}
        onDoubleClickEvent={onDoubleClickEvent}
      />
    )
    fireEvent.dblClick(getByText('Morning Meeting'))
    expect(onDoubleClickEvent).toHaveBeenCalled()
  })
})
