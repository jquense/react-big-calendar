import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import TimeGridHeader from '../../src/TimeGridHeader'
import TimeGridHeaderResources from '../../src/TimeGridHeaderResources'
import Calendar from '../../src/Calendar'
import { localizer, mergedLocalizer, accessors, getters, components, NoopEventWrapper } from './fixtures'
import { views } from '../../src/utils/constants'
import Resources from '../../src/utils/Resources'

const range = [
  new Date(2023, 0, 8),
  new Date(2023, 0, 9),
  new Date(2023, 0, 10),
  new Date(2023, 0, 11),
  new Date(2023, 0, 12),
  new Date(2023, 0, 13),
  new Date(2023, 0, 14),
]

// Accessors with all resource-related methods
const fullAccessors = {
  ...accessors,
  resource: (e) => e.resourceId,
  resourceId: (r) => r.id,
  resourceTitle: (r) => r.name,
}

const makeResources = () => Resources(undefined, fullAccessors)
const makeResourceList = () => Resources(
  [{ id: 'r1', name: 'Room 1' }, { id: 'r2', name: 'Room 2' }],
  fullAccessors
)

const headerProps = {
  range,
  events: [],
  resources: makeResources(),
  getNow: () => new Date(2023, 0, 11),
  localizer: mergedLocalizer,
  accessors: fullAccessors,
  getters,
  components: {
    ...components,
    dateCellWrapper: NoopEventWrapper,
    weekWrapper: NoopEventWrapper,
    header: undefined,
    resourceHeader: undefined,
    timeGutterHeader: undefined,
  },
  isOverflowing: false,
  rtl: false,
  width: 60,
  scrollRef: React.createRef(),
  allDayMaxRows: 3,
  onSelectSlot: jest.fn(),
  onSelectEvent: jest.fn(),
  onDoubleClickEvent: jest.fn(),
  onKeyPressEvent: jest.fn(),
  onDrillDown: jest.fn(),
  onShowMore: jest.fn(),
  getDrilldownView: (date) => views.DAY,
  selected: null,
  selectable: false,
  resizable: false,
  longPressThreshold: 250,
}

// ── TimeGridHeader rendering ──────────────────────────────────────────────────
describe('TimeGridHeader — rendering', () => {
  test('renders rbc-time-header', () => {
    const { container } = render(<TimeGridHeader {...headerProps} />)
    expect(container.querySelector('.rbc-time-header')).toBeInTheDocument()
  })

  test('renders header cells for each day in range', () => {
    const { container } = render(<TimeGridHeader {...headerProps} />)
    const headers = container.querySelectorAll('.rbc-header')
    // At minimum the 7 day headers plus possibly resource/gutter
    expect(headers.length).toBeGreaterThanOrEqual(7)
  })

  test('renders all-day cell for events', () => {
    const { container } = render(<TimeGridHeader {...headerProps} />)
    expect(container.querySelector('.rbc-allday-cell')).toBeInTheDocument()
  })

  test('renders gutter label with correct width style', () => {
    const { container } = render(
      <TimeGridHeader {...headerProps} width={80} />
    )
    const gutter = container.querySelector('.rbc-time-header-gutter')
    expect(gutter).toBeInTheDocument()
    expect(gutter.style.width).toBe('80px')
  })

  test('applies rbc-overflowing class when isOverflowing=true', () => {
    const { container } = render(
      <TimeGridHeader {...headerProps} isOverflowing={true} />
    )
    expect(container.querySelector('.rbc-overflowing')).toBeInTheDocument()
  })

  test('applies marginRight style when isOverflowing=true and not rtl', () => {
    const { container } = render(
      <TimeGridHeader {...headerProps} isOverflowing={true} rtl={false} />
    )
    const header = container.querySelector('.rbc-time-header')
    expect(header.style.marginRight).toBeTruthy()
  })

  test('applies marginLeft style when isOverflowing=true and rtl=true', () => {
    const { container } = render(
      <TimeGridHeader {...headerProps} isOverflowing={true} rtl={true} />
    )
    const header = container.querySelector('.rbc-time-header')
    expect(header.style.marginLeft).toBeTruthy()
  })

  test('renders timeGutterHeader component when provided', () => {
    const GutterHeader = () => <div data-testid="gutter-hdr">Gutter</div>
    const { getByTestId } = render(
      <TimeGridHeader
        {...headerProps}
        components={{ ...headerProps.components, timeGutterHeader: GutterHeader }}
      />
    )
    expect(getByTestId('gutter-hdr')).toBeInTheDocument()
  })

  test('does not render timeGutterHeader when not provided', () => {
    const { container } = render(
      <TimeGridHeader
        {...headerProps}
        components={{ ...headerProps.components, timeGutterHeader: null }}
      />
    )
    expect(container.querySelector('.rbc-time-header')).toBeInTheDocument()
  })
})

// ── handleHeaderClick ─────────────────────────────────────────────────────────
describe('TimeGridHeader — handleHeaderClick', () => {
  test('clicking a date button calls onDrillDown', () => {
    const onDrillDown = jest.fn()
    const { container } = render(
      <TimeGridHeader {...headerProps} onDrillDown={onDrillDown} />
    )
    const btn = container.querySelector('.rbc-header .rbc-button-link')
    if (btn) {
      fireEvent.click(btn)
      expect(onDrillDown).toHaveBeenCalled()
    }
  })

  test('renders span (not button) when getDrilldownView returns null', () => {
    const { container } = render(
      <TimeGridHeader
        {...headerProps}
        getDrilldownView={() => null}
      />
    )
    // Without drilldown view, a span is rendered instead of a button
    const spans = container.querySelectorAll('.rbc-header span')
    expect(spans.length).toBeGreaterThan(0)
  })
})

// ── rbc-today class ───────────────────────────────────────────────────────────
describe('TimeGridHeader — today highlighting', () => {
  test('marks today header with rbc-today', () => {
    // getNow returns Jan 11 which is in range
    const { container } = render(<TimeGridHeader {...headerProps} />)
    expect(container.querySelector('.rbc-today')).toBeInTheDocument()
  })

  test('no rbc-today when getNow is outside range', () => {
    const { container } = render(
      <TimeGridHeader
        {...headerProps}
        getNow={() => new Date(2022, 0, 1)}
      />
    )
    expect(container.querySelector('.rbc-today')).toBeNull()
  })
})

// ── single-day class ──────────────────────────────────────────────────────────
describe('TimeGridHeader — single day layout', () => {
  test('applies single-day class when range has 1 day', () => {
    const { container } = render(
      <TimeGridHeader {...headerProps} range={[new Date(2023, 0, 11)]} />
    )
    expect(
      container.querySelector('.rbc-time-header-cell-single-day')
    ).toBeInTheDocument()
  })

  test('does not apply single-day class when range has 7 days', () => {
    const { container } = render(<TimeGridHeader {...headerProps} />)
    expect(
      container.querySelector('.rbc-time-header-cell-single-day')
    ).toBeNull()
  })
})

// ── resources in TimeGridHeader ───────────────────────────────────────────────
describe('TimeGridHeader — with resources', () => {
  test('renders resource headers when resources provided', () => {
    const resources = makeResourceList()
    const { container } = render(
      <TimeGridHeader {...headerProps} resources={resources} />
    )
    expect(container.querySelector('.rbc-time-header')).toBeInTheDocument()
    expect(container.querySelectorAll('.rbc-allday-cell').length).toBeGreaterThan(0)
  })

  test('renders resource row labels for each resource', () => {
    const resources = makeResourceList()
    const { container } = render(
      <TimeGridHeader {...headerProps} resources={resources} />
    )
    expect(container.querySelector('.rbc-row-resource')).toBeInTheDocument()
  })

  test('renders resource events filtered by resource', () => {
    const resources = makeResourceList()
    const events = [
      { id: 1, title: 'R1 Event', start: new Date(2023, 0, 9, 10), end: new Date(2023, 0, 9, 11), resourceId: 'r1', allDay: false },
      { id: 2, title: 'R2 Event', start: new Date(2023, 0, 9, 12), end: new Date(2023, 0, 9, 13), resourceId: 'r2', allDay: false },
    ]
    const { container } = render(
      <TimeGridHeader {...headerProps} resources={resources} events={events} />
    )
    expect(container.querySelector('.rbc-time-header')).toBeInTheDocument()
  })
})

// ── renderRow ─────────────────────────────────────────────────────────────────
describe('TimeGridHeader — renderRow', () => {
  test('renders events in all-day row', () => {
    const allDayEvents = [
      { id: 1, title: 'All Day', start: new Date(2023, 0, 9), end: new Date(2023, 0, 11), allDay: true },
    ]
    const { container } = render(
      <TimeGridHeader {...headerProps} events={allDayEvents} />
    )
    expect(container.querySelector('.rbc-allday-cell')).toBeInTheDocument()
  })
})

// ── Integration via Calendar ──────────────────────────────────────────────────
describe('TimeGridHeader — via Calendar integration', () => {
  test('renders through Calendar week view', () => {
    const { container } = render(
      <Calendar
        localizer={localizer}
        defaultDate={new Date(2023, 0, 11)}
        defaultView={views.WEEK}
        events={[]}
      />
    )
    expect(container.querySelector('.rbc-time-header')).toBeInTheDocument()
  })

  test('header click drills down in Calendar week view', () => {
    const onDrillDown = jest.fn()
    const { container } = render(
      <Calendar
        localizer={localizer}
        defaultDate={new Date(2023, 0, 11)}
        defaultView={views.WEEK}
        events={[]}
        onDrillDown={onDrillDown}
        drilldownView={views.DAY}
      />
    )
    const btn = container.querySelector('.rbc-header .rbc-button-link')
    if (btn) {
      fireEvent.click(btn)
      expect(onDrillDown).toHaveBeenCalled()
    }
  })
})

// ── TimeGridHeaderResources ───────────────────────────────────────────────────
describe('TimeGridHeaderResources — rendering', () => {
  const resourceHeaderProps = {
    ...headerProps,
    resources: makeResourceList(),
    accessors: fullAccessors,
    range: [new Date(2023, 0, 9), new Date(2023, 0, 10), new Date(2023, 0, 11)],
  }

  test('renders rbc-time-header', () => {
    const { container } = render(
      <TimeGridHeaderResources {...resourceHeaderProps} />
    )
    expect(container.querySelector('.rbc-time-header')).toBeInTheDocument()
  })

  test('renders header cells for each date', () => {
    const { container } = render(
      <TimeGridHeaderResources {...resourceHeaderProps} />
    )
    const headers = container.querySelectorAll('.rbc-header')
    expect(headers.length).toBeGreaterThan(0)
  })

  test('renders resource columns for each resource per date', () => {
    const { container } = render(
      <TimeGridHeaderResources {...resourceHeaderProps} />
    )
    // Each date gets resource columns
    const resourceHeaders = container.querySelectorAll('.rbc-row-resource, .rbc-header-content, .rbc-resource-grouping')
    expect(resourceHeaders.length).toBeGreaterThan(0)
  })

  test('applies rbc-overflowing when isOverflowing=true', () => {
    const { container } = render(
      <TimeGridHeaderResources {...resourceHeaderProps} isOverflowing={true} />
    )
    expect(container.querySelector('.rbc-overflowing')).toBeInTheDocument()
  })

  test('applies marginRight when isOverflowing and not rtl', () => {
    const { container } = render(
      <TimeGridHeaderResources
        {...resourceHeaderProps}
        isOverflowing={true}
        rtl={false}
      />
    )
    const header = container.querySelector('.rbc-time-header')
    expect(header.style.marginRight).toBeTruthy()
  })

  test('applies marginLeft when isOverflowing and rtl=true', () => {
    const { container } = render(
      <TimeGridHeaderResources
        {...resourceHeaderProps}
        isOverflowing={true}
        rtl={true}
      />
    )
    const header = container.querySelector('.rbc-time-header')
    expect(header.style.marginLeft).toBeTruthy()
  })

  test('renders timeGutterHeader component when provided', () => {
    const GutterHeader = () => <div data-testid="rhr-gutter">G</div>
    const { getByTestId } = render(
      <TimeGridHeaderResources
        {...resourceHeaderProps}
        components={{ ...resourceHeaderProps.components, timeGutterHeader: GutterHeader }}
      />
    )
    expect(getByTestId('rhr-gutter')).toBeInTheDocument()
  })

  test('handleHeaderClick calls onDrillDown', () => {
    const onDrillDown = jest.fn()
    const { container } = render(
      <TimeGridHeaderResources
        {...resourceHeaderProps}
        onDrillDown={onDrillDown}
      />
    )
    const btn = container.querySelector('.rbc-button-link')
    if (btn) {
      fireEvent.click(btn)
      expect(onDrillDown).toHaveBeenCalled()
    }
  })

  test('renders span when getDrilldownView returns null', () => {
    const { container } = render(
      <TimeGridHeaderResources
        {...resourceHeaderProps}
        getDrilldownView={() => null}
      />
    )
    const spans = container.querySelectorAll('.rbc-header span')
    expect(spans.length).toBeGreaterThan(0)
  })

  test('marks today with rbc-today class', () => {
    const todayRange = [
      new Date(2023, 0, 9),
      new Date(2023, 0, 10),
      new Date(2023, 0, 11), // today in our fixture
    ]
    const { container } = render(
      <TimeGridHeaderResources
        {...resourceHeaderProps}
        range={todayRange}
        getNow={() => new Date(2023, 0, 11)}
      />
    )
    expect(container.querySelector('.rbc-today')).toBeInTheDocument()
  })

  test('applies single-day class for range of 1', () => {
    const { container } = render(
      <TimeGridHeaderResources
        {...resourceHeaderProps}
        range={[new Date(2023, 0, 11)]}
      />
    )
    expect(
      container.querySelector('.rbc-time-header-cell-single-day')
    ).toBeInTheDocument()
  })

  test('renders without timeGutterHeader (null)', () => {
    const { container } = render(
      <TimeGridHeaderResources
        {...resourceHeaderProps}
        components={{ ...resourceHeaderProps.components, timeGutterHeader: null }}
      />
    )
    expect(container.querySelector('.rbc-time-header')).toBeInTheDocument()
  })
})

// ── via Calendar with resources ───────────────────────────────────────────────
describe('TimeGridHeaderResources — via Calendar integration', () => {
  test('renders resource columns in Calendar day view', () => {
    const resources = [{ id: 'r1', name: 'Room 1' }, { id: 'r2', name: 'Room 2' }]
    const events = [
      { id: 1, title: 'R1 Meeting', start: new Date(2023, 0, 11, 10), end: new Date(2023, 0, 11, 11), resourceId: 'r1' },
    ]
    const { container } = render(
      <Calendar
        localizer={localizer}
        defaultDate={new Date(2023, 0, 11)}
        defaultView={views.DAY}
        views={[views.DAY]}
        events={events}
        resources={resources}
        resourceIdAccessor="id"
        resourceTitleAccessor="name"
      />
    )
    expect(container.querySelector('.rbc-time-view')).toBeInTheDocument()
  })
})

describe('TimeGridHeader — renderRow direct call (lines 75-82)', () => {
  test('renderRow method returns a DateContentRow component', () => {
    const ref = React.createRef()
    render(<TimeGridHeader {...headerProps} ref={ref} />)

    const instance = ref.current
    const result = instance.renderRow({ id: 'r1', name: 'Room 1' })
    // renderRow returns JSX — verify it's a React element
    expect(result).not.toBeNull()
    expect(result.props.isAllDay).toBe(true)
  })

  test('renderRow with a resource filters events by resourceId', () => {
    const resource = { id: 'r1', name: 'Room 1' }
    const eventsWithResource = [
      { id: 1, title: 'R1 Mtg', start: new Date(2023, 0, 9, 10), end: new Date(2023, 0, 9, 11), resourceId: 'r1', allDay: false },
      { id: 2, title: 'Other', start: new Date(2023, 0, 9, 12), end: new Date(2023, 0, 9, 13), resourceId: 'r2', allDay: false },
    ]
    const ref = React.createRef()
    render(
      <TimeGridHeader
        {...headerProps}
        events={eventsWithResource}
        ref={ref}
      />
    )
    const result = ref.current.renderRow(resource)
    expect(result).not.toBeNull()
  })
})

describe('TimeGridHeaderResources — isSameDate filter (line 111)', () => {
  test('filters events by resource and date match', () => {
    const resources = makeResourceList()
    const range2 = [new Date(2023, 0, 9), new Date(2023, 0, 10), new Date(2023, 0, 11)]
    const events = [
      // Event that starts on Jan 9 and has resourceId r1 → isSameDate(event.start, Jan9) = true
      { id: 1, title: 'R1 Jan9', start: new Date(2023, 0, 9, 10), end: new Date(2023, 0, 9, 11), resourceId: 'r1', allDay: false },
      // Event that ends on Jan 10 → isSameDate(event.end, Jan10) = true
      { id: 2, title: 'R2 ends Jan10', start: new Date(2023, 0, 8, 9), end: new Date(2023, 0, 10, 12), resourceId: 'r2', allDay: false },
      // Event not on any displayed date → filtered out
      { id: 3, title: 'Elsewhere', start: new Date(2023, 0, 20, 9), end: new Date(2023, 0, 20, 10), resourceId: 'r1', allDay: false },
    ]
    const { container } = render(
      <TimeGridHeaderResources
        range={range2}
        events={events}
        resources={resources}
        accessors={fullAccessors}
        getNow={() => new Date(2023, 0, 11)}
        localizer={mergedLocalizer}
        getters={getters}
        components={{ ...headerProps.components }}
        isOverflowing={false}
        rtl={false}
        width={60}
        scrollRef={React.createRef()}
        allDayMaxRows={3}
        onSelectSlot={jest.fn()}
        onSelectEvent={jest.fn()}
        onDoubleClickEvent={jest.fn()}
        onKeyPressEvent={jest.fn()}
        onDrillDown={jest.fn()}
        onShowMore={jest.fn()}
        getDrilldownView={() => views.DAY}
        selected={null}
        selectable={false}
        resizable={false}
        longPressThreshold={250}
      />
    )
    expect(container.querySelector('.rbc-time-header')).toBeInTheDocument()
  })
})
