import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import TimeGridEvent from '../../src/TimeGridEvent'
import { accessors, getters, makeEvent, NoopEventWrapper } from './fixtures'

const defaultStyle = { top: 10, height: 20, width: 80, xOffset: 0 }

const defaultProps = {
  event: makeEvent(),
  label: '10:00 AM',
  style: defaultStyle,
  selected: false,
  continuesPrior: false,
  continuesAfter: false,
  isBackgroundEvent: false,
  rtl: false,
  accessors,
  getters,
  onClick: jest.fn(),
  onDoubleClick: jest.fn(),
  onKeyPress: jest.fn(),
  components: {
    event: null,
    eventWrapper: NoopEventWrapper,
  },
}

describe('TimeGridEvent', () => {
  beforeEach(() => jest.clearAllMocks())

  test('renders without crashing', () => {
    const { container } = render(<TimeGridEvent {...defaultProps} />)
    expect(container.querySelector('.rbc-event')).toBeInTheDocument()
  })

  test('renders the event label', () => {
    const { getByText } = render(<TimeGridEvent {...defaultProps} />)
    expect(getByText('10:00 AM')).toBeInTheDocument()
  })

  test('renders the event title', () => {
    const { getByText } = render(<TimeGridEvent {...defaultProps} />)
    expect(getByText('Test Event')).toBeInTheDocument()
  })

  test('applies rbc-selected class when selected', () => {
    const { container } = render(
      <TimeGridEvent {...defaultProps} selected={true} />
    )
    expect(container.querySelector('.rbc-selected')).toBeInTheDocument()
  })

  test('applies rbc-event-continues-earlier when continuesPrior', () => {
    const { container } = render(
      <TimeGridEvent {...defaultProps} continuesPrior={true} />
    )
    expect(
      container.querySelector('.rbc-event-continues-earlier')
    ).toBeInTheDocument()
  })

  test('applies rbc-event-continues-later when continuesAfter', () => {
    const { container } = render(
      <TimeGridEvent {...defaultProps} continuesAfter={true} />
    )
    expect(
      container.querySelector('.rbc-event-continues-later')
    ).toBeInTheDocument()
  })

  test('renders as background event when isBackgroundEvent is true', () => {
    const { container } = render(
      <TimeGridEvent {...defaultProps} isBackgroundEvent={true} />
    )
    expect(
      container.querySelector('.rbc-background-event')
    ).toBeInTheDocument()
  })

  test('uses right positioning for rtl layout', () => {
    const { container } = render(
      <TimeGridEvent {...defaultProps} rtl={true} />
    )
    const div = container.querySelector('.rbc-event')
    expect(div.style.right).toBeTruthy()
  })

  test('uses left positioning for ltr layout', () => {
    const { container } = render(
      <TimeGridEvent {...defaultProps} rtl={false} />
    )
    const div = container.querySelector('.rbc-event')
    expect(div.style.left).toBeTruthy()
  })

  test('calls onClick when clicked', () => {
    const onClick = jest.fn()
    const { container } = render(
      <TimeGridEvent {...defaultProps} onClick={onClick} />
    )
    fireEvent.click(container.querySelector('.rbc-event'))
    expect(onClick).toHaveBeenCalled()
  })

  test('calls onDoubleClick when double-clicked', () => {
    const onDoubleClick = jest.fn()
    const { container } = render(
      <TimeGridEvent {...defaultProps} onDoubleClick={onDoubleClick} />
    )
    fireEvent.dblClick(container.querySelector('.rbc-event'))
    expect(onDoubleClick).toHaveBeenCalled()
  })

  test('calls onKeyPress on keyDown', () => {
    const onKeyPress = jest.fn()
    const { container } = render(
      <TimeGridEvent {...defaultProps} onKeyPress={onKeyPress} />
    )
    fireEvent.keyDown(container.querySelector('.rbc-event'))
    expect(onKeyPress).toHaveBeenCalled()
  })

  test('renders without title attribute when tooltip is falsy', () => {
    const noTooltipAccessors = {
      ...accessors,
      tooltip: () => null,
    }
    const { container } = render(
      <TimeGridEvent {...defaultProps} accessors={noTooltipAccessors} />
    )
    const el = container.querySelector('.rbc-event')
    expect(el.getAttribute('title')).toBeNull()
  })

  test('renders with non-string label (no label prefix in title)', () => {
    const reactLabel = <span>Label</span>
    const { container } = render(
      <TimeGridEvent {...defaultProps} label={reactLabel} />
    )
    expect(container.querySelector('.rbc-event')).toBeInTheDocument()
  })

  test('renders a custom event component when provided', () => {
    const Custom = ({ title }) => (
      <span data-testid="custom-event">{title}</span>
    )
    const { getByTestId } = render(
      <TimeGridEvent
        {...defaultProps}
        components={{ event: Custom, eventWrapper: NoopEventWrapper }}
      />
    )
    expect(getByTestId('custom-event')).toBeInTheDocument()
  })

  test('applies percent string styles when style values are strings', () => {
    const { container } = render(
      <TimeGridEvent
        {...defaultProps}
        style={{ top: '10%', height: '20%', width: '80%', xOffset: '0%' }}
      />
    )
    const el = container.querySelector('.rbc-event')
    expect(el.style.top).toBe('10%')
  })

  test('converts numeric style values to percent strings', () => {
    const { container } = render(<TimeGridEvent {...defaultProps} />)
    const el = container.querySelector('.rbc-event')
    expect(el.style.top).toBe('10%')
    expect(el.style.height).toBe('20%')
  })
})
