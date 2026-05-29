import React from 'react'
import { render } from '@testing-library/react'
import TimeGutter from '../../src/TimeGutter'
import { localizer, getters } from './fixtures'
import * as dates from '../../src/utils/dates'

const min = dates.startOf(new Date(2023, 0, 15), 'day')
const max = dates.endOf(new Date(2023, 0, 15), 'day')

const NoopWrapper = ({ children }) => children

const defaultProps = {
  min,
  max,
  step: 60,
  timeslots: 1,
  localizer,
  getNow: () => new Date(2023, 0, 15, 9, 0),
  resource: null,
  getters,
  gutterRef: null,
  components: {
    timeGutterWrapper: NoopWrapper,
  },
}

describe('TimeGutter', () => {
  test('renders without crashing', () => {
    const { container } = render(<TimeGutter {...defaultProps} />)
    expect(container.querySelector('.rbc-time-gutter')).toBeInTheDocument()
  })

  test('renders time slot groups', () => {
    const { container } = render(<TimeGutter {...defaultProps} />)
    expect(
      container.querySelectorAll('.rbc-timeslot-group').length
    ).toBeGreaterThan(0)
  })

  test('renders time labels', () => {
    const { container } = render(<TimeGutter {...defaultProps} />)
    expect(container.querySelectorAll('.rbc-label').length).toBeGreaterThan(0)
  })

  test('renders with 30 minute step', () => {
    const { container } = render(
      <TimeGutter {...defaultProps} step={30} timeslots={2} />
    )
    expect(
      container.querySelectorAll('.rbc-timeslot-group').length
    ).toBeGreaterThan(0)
  })
})
