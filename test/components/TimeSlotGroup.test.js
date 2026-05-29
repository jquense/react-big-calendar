import React from 'react'
import { render } from '@testing-library/react'
import TimeSlotGroup from '../../src/TimeSlotGroup'
import { getters } from './fixtures'

const group = [
  new Date(2023, 0, 15, 8, 0),
  new Date(2023, 0, 15, 8, 30),
]

describe('TimeSlotGroup', () => {
  test('renders without crashing', () => {
    const { container } = render(
      <TimeSlotGroup group={group} getters={getters} components={{}} />
    )
    expect(container.querySelector('.rbc-timeslot-group')).toBeInTheDocument()
  })

  test('renders a time slot div for each item in the group', () => {
    const { container } = render(
      <TimeSlotGroup group={group} getters={getters} components={{}} />
    )
    expect(container.querySelectorAll('.rbc-time-slot')).toHaveLength(2)
  })

  test('calls renderSlot with value and index', () => {
    const renderSlot = jest.fn((value, idx) => (
      <span data-testid={`slot-${idx}`}>{idx}</span>
    ))
    const { getByTestId } = render(
      <TimeSlotGroup
        group={group}
        getters={getters}
        components={{}}
        renderSlot={renderSlot}
      />
    )
    expect(renderSlot).toHaveBeenCalledTimes(2)
    expect(getByTestId('slot-0')).toBeInTheDocument()
    expect(getByTestId('slot-1')).toBeInTheDocument()
  })

  test('renders without renderSlot prop', () => {
    const { container } = render(
      <TimeSlotGroup group={group} getters={getters} components={{}} />
    )
    expect(container.querySelectorAll('.rbc-time-slot')).toHaveLength(2)
  })

  test('renders with a custom Wrapper component', () => {
    const Wrapper = ({ children }) => (
      <div data-testid="custom-wrapper">{children}</div>
    )
    const { getAllByTestId } = render(
      <TimeSlotGroup
        group={group}
        getters={getters}
        components={{ timeSlotWrapper: Wrapper }}
      />
    )
    expect(getAllByTestId('custom-wrapper')).toHaveLength(2)
  })

  test('renders without getters without crashing', () => {
    const { container } = render(
      <TimeSlotGroup group={group} components={{}} />
    )
    expect(container.querySelector('.rbc-timeslot-group')).toBeInTheDocument()
  })
})
