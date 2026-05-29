import React from 'react'
import { render } from '@testing-library/react'
import BackgroundCells from '../../src/BackgroundCells'
import { localizer, getters, NoopEventWrapper } from './fixtures'

const range = [
  new Date(2023, 0, 8),
  new Date(2023, 0, 9),
  new Date(2023, 0, 10),
  new Date(2023, 0, 11),
  new Date(2023, 0, 12),
  new Date(2023, 0, 13),
  new Date(2023, 0, 14),
]

const defaultProps = {
  range,
  getNow: () => new Date(2023, 0, 11),
  getters,
  date: new Date(2023, 0, 11),
  components: { dateCellWrapper: NoopEventWrapper },
  localizer,
  selectable: false,
  onSelectSlot: jest.fn(),
  onSelectEnd: jest.fn(),
  onSelectStart: jest.fn(),
  longPressThreshold: 250,
}

describe('BackgroundCells', () => {
  test('renders without crashing', () => {
    const { container } = render(<BackgroundCells {...defaultProps} />)
    expect(container.querySelector('.rbc-row-bg')).toBeInTheDocument()
  })

  test('renders a day-bg div for each date in range', () => {
    const { container } = render(<BackgroundCells {...defaultProps} />)
    expect(container.querySelectorAll('.rbc-day-bg')).toHaveLength(range.length)
  })

  test('marks today with rbc-today class', () => {
    const { container } = render(<BackgroundCells {...defaultProps} />)
    expect(container.querySelector('.rbc-today')).toBeInTheDocument()
  })

  test('renders with selectable=true without crashing', () => {
    const { container } = render(
      <BackgroundCells {...defaultProps} selectable={true} />
    )
    expect(container.querySelector('.rbc-row-bg')).toBeInTheDocument()
  })

  test('accepts a resource prop', () => {
    const { container } = render(
      <BackgroundCells {...defaultProps} resource="r1" />
    )
    expect(container.querySelector('.rbc-row-bg')).toBeInTheDocument()
  })
})
