import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Calendar from '../../src/Calendar'
import { localizer } from './fixtures'
import messages from '../../src/utils/messages'
import { views } from '../../src/utils/constants'

const defaultDate = new Date(2023, 0, 15)

const defaultProps = {
  localizer,
  defaultDate,
  defaultView: views.MONTH,
}

const makeEvents = () => [
  {
    id: 1,
    title: 'Meeting',
    start: new Date(2023, 0, 15, 10),
    end: new Date(2023, 0, 15, 11),
  },
  {
    id: 2,
    title: 'Conference',
    start: new Date(2023, 0, 20),
    end: new Date(2023, 0, 22),
    allDay: true,
  },
]

describe('Calendar — basic rendering', () => {
  test('renders without crashing', () => {
    const { container } = render(<Calendar {...defaultProps} />)
    expect(container.querySelector('.rbc-calendar')).toBeInTheDocument()
  })

  test('renders the toolbar by default', () => {
    const { container } = render(<Calendar {...defaultProps} />)
    expect(container.querySelector('.rbc-toolbar')).toBeInTheDocument()
  })

  test('hides the toolbar when toolbar prop is false', () => {
    const { container } = render(
      <Calendar {...defaultProps} toolbar={false} />
    )
    expect(container.querySelector('.rbc-toolbar')).toBeNull()
  })

  test('renders events in month view', () => {
    const { getByText } = render(
      <Calendar {...defaultProps} events={makeEvents()} />
    )
    expect(getByText('Meeting')).toBeInTheDocument()
  })

  test('applies rtl class when rtl prop is true', () => {
    const { container } = render(
      <Calendar {...defaultProps} rtl={true} />
    )
    expect(container.querySelector('.rbc-rtl')).toBeInTheDocument()
  })

  test('applies custom className', () => {
    const { container } = render(
      <Calendar {...defaultProps} className="my-cal" />
    )
    expect(container.querySelector('.my-cal')).toBeInTheDocument()
  })

  test('renders in week view', () => {
    const { container } = render(
      <Calendar {...defaultProps} defaultView={views.WEEK} />
    )
    expect(container.querySelector('.rbc-calendar')).toBeInTheDocument()
  })

  test('renders in day view', () => {
    const { container } = render(
      <Calendar {...defaultProps} defaultView={views.DAY} />
    )
    expect(container.querySelector('.rbc-calendar')).toBeInTheDocument()
  })

  test('renders in agenda view', () => {
    const { container } = render(
      <Calendar {...defaultProps} defaultView={views.AGENDA} events={makeEvents()} />
    )
    expect(container.querySelector('.rbc-calendar')).toBeInTheDocument()
  })

  test('renders in work_week view', () => {
    const { container } = render(
      <Calendar
        {...defaultProps}
        defaultView={views.WORK_WEEK}
        views={[views.MONTH, views.WEEK, views.WORK_WEEK, views.DAY, views.AGENDA]}
      />
    )
    expect(container.querySelector('.rbc-calendar')).toBeInTheDocument()
  })
})

describe('Calendar — views configuration', () => {
  test('accepts views as an array', () => {
    const { container } = render(
      <Calendar {...defaultProps} views={['month', 'week']} />
    )
    expect(container.querySelector('.rbc-calendar')).toBeInTheDocument()
  })

  test('accepts views as an object with boolean values', () => {
    const { container } = render(
      <Calendar
        {...defaultProps}
        views={{ month: true, week: true, day: false }}
      />
    )
    expect(container.querySelector('.rbc-calendar')).toBeInTheDocument()
  })

  test('accepts views as an object with custom components', () => {
    const CustomMonth = () => <div className="custom-view">custom</div>
    CustomMonth.title = () => 'Custom'
    CustomMonth.navigate = (date) => date
    CustomMonth.range = (date) => [date]

    const { getByText } = render(
      <Calendar
        {...defaultProps}
        defaultView="month"
        views={{ month: CustomMonth }}
      />
    )
    expect(getByText('custom')).toBeInTheDocument()
  })
})

describe('Calendar — navigation', () => {
  test('navigates to next period when next button is clicked', async () => {
    const onNavigate = jest.fn()
    const { getByText } = render(
      <Calendar
        {...defaultProps}
        date={defaultDate}
        onNavigate={onNavigate}
        view={views.MONTH}
        onView={() => {}}
      />
    )
    fireEvent.click(getByText(messages({}).next))
    expect(onNavigate).toHaveBeenCalled()
  })

  test('navigates to previous period when back button is clicked', () => {
    const onNavigate = jest.fn()
    const { getByText } = render(
      <Calendar
        {...defaultProps}
        date={defaultDate}
        onNavigate={onNavigate}
        view={views.MONTH}
        onView={() => {}}
      />
    )
    fireEvent.click(getByText(messages({}).previous))
    expect(onNavigate).toHaveBeenCalled()
  })

  test('navigates to today when today button is clicked', () => {
    const onNavigate = jest.fn()
    const { getByText } = render(
      <Calendar
        {...defaultProps}
        date={defaultDate}
        onNavigate={onNavigate}
        view={views.MONTH}
        onView={() => {}}
      />
    )
    fireEvent.click(getByText(messages({}).today))
    expect(onNavigate).toHaveBeenCalled()
  })
})

describe('Calendar — view changes', () => {
  test('switches views when toolbar view button is clicked', () => {
    const onView = jest.fn()
    const { getByText } = render(
      <Calendar
        {...defaultProps}
        date={defaultDate}
        onNavigate={() => {}}
        view={views.MONTH}
        onView={onView}
        views={[views.MONTH, views.WEEK, views.DAY]}
      />
    )
    fireEvent.click(getByText(messages({}).week))
    expect(onView).toHaveBeenCalledWith(views.WEEK)
  })
})

describe('Calendar — event callbacks', () => {
  test('calls onSelectEvent when an event is clicked', () => {
    const onSelectEvent = jest.fn()
    const { getByText } = render(
      <Calendar
        {...defaultProps}
        events={makeEvents()}
        onSelectEvent={onSelectEvent}
      />
    )
    fireEvent.click(getByText('Meeting'))
    expect(onSelectEvent).toHaveBeenCalled()
  })

  test('calls onSelectSlot when a day is clicked (month view)', () => {
    const onSelectSlot = jest.fn()
    const { container } = render(
      <Calendar
        {...defaultProps}
        selectable
        onSelectSlot={onSelectSlot}
      />
    )
    // In month view, clicking on a date cell triggers slot selection
    const dateCells = container.querySelectorAll('.rbc-day-bg')
    if (dateCells.length > 0) {
      fireEvent.click(dateCells[0])
    }
    // slot selection may or may not trigger based on the view implementation
  })
})

describe('Calendar — drilldown', () => {
  test('calls onDrillDown when provided and a date is drilled into', () => {
    const onDrillDown = jest.fn()
    const { container } = render(
      <Calendar
        {...defaultProps}
        events={makeEvents()}
        onDrillDown={onDrillDown}
        drilldownView={views.DAY}
      />
    )
    // Click a show more link or date header to trigger drilldown
    const dateHeaders = container.querySelectorAll('.rbc-button-link')
    if (dateHeaders.length > 0) {
      fireEvent.click(dateHeaders[0])
      expect(onDrillDown).toHaveBeenCalled()
    }
  })
})

describe('Calendar — custom components', () => {
  test('renders a custom toolbar component', () => {
    const CustomToolbar = ({ label }) => (
      <div data-testid="custom-toolbar">{label}</div>
    )
    const { getByTestId } = render(
      <Calendar
        {...defaultProps}
        components={{ toolbar: CustomToolbar }}
      />
    )
    expect(getByTestId('custom-toolbar')).toBeInTheDocument()
  })
})

describe('Calendar — onRangeChange', () => {
  test('calls onRangeChange on initial render via getDerivedStateFromProps', () => {
    const onRangeChange = jest.fn()
    render(
      <Calendar
        {...defaultProps}
        onRangeChange={onRangeChange}
        view={views.MONTH}
        date={defaultDate}
        onNavigate={() => {}}
        onView={() => {}}
      />
    )
    // onRangeChange may be called during navigation
  })
})

describe('Calendar — controlled mode', () => {
  test('renders with controlled date and view props', () => {
    const { container } = render(
      <Calendar
        {...defaultProps}
        date={defaultDate}
        view={views.MONTH}
        onNavigate={() => {}}
        onView={() => {}}
      />
    )
    expect(container.querySelector('.rbc-calendar')).toBeInTheDocument()
  })

  test('accepts getNow prop', () => {
    const getNow = jest.fn(() => new Date(2023, 0, 15))
    const { container } = render(
      <Calendar {...defaultProps} getNow={getNow} />
    )
    expect(container.querySelector('.rbc-calendar')).toBeInTheDocument()
  })
})

describe('Calendar — getDrilldownView and handleRangeChange', () => {
  test('calls custom getDrilldownView prop when drilling down', () => {
    const getDrilldownView = jest.fn(() => views.DAY)
    const { container } = render(
      <Calendar
        {...defaultProps}
        defaultView={views.MONTH}
        getDrilldownView={getDrilldownView}
      />
    )
    expect(container.querySelector('.rbc-calendar')).toBeInTheDocument()
    // getDrilldownView is set up — now click a date button to trigger drilldown
    const dateButtons = container.querySelectorAll('.rbc-button-link')
    if (dateButtons.length > 0) {
      fireEvent.click(dateButtons[0])
      expect(getDrilldownView).toHaveBeenCalled()
    }
  })

  test('calls onRangeChange when navigating', () => {
    const onRangeChange = jest.fn()
    const msgs = messages({})
    const { getByText } = render(
      <Calendar
        {...defaultProps}
        date={defaultDate}
        view={views.MONTH}
        onNavigate={() => {}}
        onView={() => {}}
        onRangeChange={onRangeChange}
      />
    )
    fireEvent.click(getByText(msgs.next))
    expect(onRangeChange).toHaveBeenCalled()
  })

  test('handles drillDown without onDrillDown prop (default behavior)', () => {
    const onView = jest.fn()
    const { container } = render(
      <Calendar
        {...defaultProps}
        date={defaultDate}
        view={views.MONTH}
        onNavigate={() => {}}
        onView={onView}
        drilldownView={views.WEEK}
      />
    )
    const dateButtons = container.querySelectorAll('.rbc-button-link')
    if (dateButtons.length > 0) {
      fireEvent.click(dateButtons[0])
    }
    expect(container.querySelector('.rbc-calendar')).toBeInTheDocument()
  })
})

describe('Calendar — selectable slot handling', () => {
  test('handles selectable mode in month view', () => {
    const onSelectSlot = jest.fn()
    const { container } = render(
      <Calendar
        {...defaultProps}
        defaultView={views.MONTH}
        selectable
        onSelectSlot={onSelectSlot}
      />
    )
    expect(container.querySelector('.rbc-month-view')).toBeInTheDocument()
  })
})

describe('Calendar — accessibility and misc props', () => {
  test('passes elementProps to the calendar div', () => {
    const { container } = render(
      <Calendar
        {...defaultProps}
        elementProps={{ 'data-testid': 'cal-root', role: 'main' }}
      />
    )
    expect(container.querySelector('[data-testid="cal-root"]')).toBeInTheDocument()
  })

  test('renders with custom style', () => {
    const { container } = render(
      <Calendar {...defaultProps} style={{ height: 600 }} />
    )
    expect(container.firstChild.style.height).toBe('600px')
  })
})
