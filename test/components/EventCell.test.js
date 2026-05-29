import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import EventCell from '../../src/EventCell'
import { accessors, getters, localizer, makeEvent, NoopEventWrapper } from './fixtures'

const defaultProps = {
  event: makeEvent(),
  selected: false,
  isAllDay: false,
  continuesPrior: false,
  continuesAfter: false,
  localizer,
  accessors,
  getters,
  components: {
    event: null,
    eventWrapper: NoopEventWrapper,
  },
  slotStart: new Date(2023, 0, 15),
  slotEnd: new Date(2023, 0, 15, 23, 59),
  onSelect: jest.fn(),
  onDoubleClick: jest.fn(),
  onKeyPress: jest.fn(),
}

describe('EventCell', () => {
  beforeEach(() => jest.clearAllMocks())

  test('renders without crashing', () => {
    const { container } = render(<EventCell {...defaultProps} />)
    expect(container.querySelector('.rbc-event')).toBeInTheDocument()
  })

  test('renders the event title', () => {
    const { getByText } = render(<EventCell {...defaultProps} />)
    expect(getByText('Test Event')).toBeInTheDocument()
  })

  test('applies rbc-selected class when selected', () => {
    const { container } = render(
      <EventCell {...defaultProps} selected={true} />
    )
    expect(container.querySelector('.rbc-selected')).toBeInTheDocument()
  })

  test('does not apply rbc-selected when not selected', () => {
    const { container } = render(
      <EventCell {...defaultProps} selected={false} />
    )
    expect(container.querySelector('.rbc-selected')).toBeNull()
  })

  test('applies rbc-event-continues-prior class when continuesPrior', () => {
    const { container } = render(
      <EventCell {...defaultProps} continuesPrior={true} />
    )
    expect(
      container.querySelector('.rbc-event-continues-prior')
    ).toBeInTheDocument()
  })

  test('applies rbc-event-continues-after class when continuesAfter', () => {
    const { container } = render(
      <EventCell {...defaultProps} continuesAfter={true} />
    )
    expect(
      container.querySelector('.rbc-event-continues-after')
    ).toBeInTheDocument()
  })

  test('calls onSelect when clicked', () => {
    const onSelect = jest.fn()
    const { container } = render(
      <EventCell {...defaultProps} onSelect={onSelect} />
    )
    fireEvent.click(container.querySelector('.rbc-event'))
    expect(onSelect).toHaveBeenCalledWith(defaultProps.event, expect.any(Object))
  })

  test('calls onDoubleClick when double-clicked', () => {
    const onDoubleClick = jest.fn()
    const { container } = render(
      <EventCell {...defaultProps} onDoubleClick={onDoubleClick} />
    )
    fireEvent.dblClick(container.querySelector('.rbc-event'))
    expect(onDoubleClick).toHaveBeenCalledWith(
      defaultProps.event,
      expect.any(Object)
    )
  })

  test('calls onKeyPress on keyDown', () => {
    const onKeyPress = jest.fn()
    const { container } = render(
      <EventCell {...defaultProps} onKeyPress={onKeyPress} />
    )
    fireEvent.keyDown(container.querySelector('.rbc-event'), { key: 'Enter' })
    expect(onKeyPress).toHaveBeenCalled()
  })

  test('renders allDay style when isAllDay is true', () => {
    const { container } = render(
      <EventCell {...defaultProps} isAllDay={true} />
    )
    expect(container.querySelector('.rbc-event-allday')).toBeInTheDocument()
  })

  test('renders allDay style when event.allDay is true', () => {
    const { container } = render(
      <EventCell {...defaultProps} event={makeEvent({ allDay: true })} />
    )
    expect(container.querySelector('.rbc-event-allday')).toBeInTheDocument()
  })

  test('renders a custom event component when provided', () => {
    const CustomEvent = ({ title }) => <span data-testid="custom">{title}</span>
    const { getByTestId } = render(
      <EventCell
        {...defaultProps}
        components={{ event: CustomEvent, eventWrapper: NoopEventWrapper }}
      />
    )
    expect(getByTestId('custom')).toBeInTheDocument()
  })

  test('renders children function result when children is a function', () => {
    render(
      <EventCell {...defaultProps}>
        {(content) => <div data-testid="child-fn">{content}</div>}
      </EventCell>
    )
    expect(document.querySelector('[data-testid="child-fn"]')).toBeInTheDocument()
  })

  test('does not call onSelect when handler is not provided', () => {
    const { container } = render(
      <EventCell {...defaultProps} onSelect={undefined} />
    )
    expect(() =>
      fireEvent.click(container.querySelector('.rbc-event'))
    ).not.toThrow()
  })
})
