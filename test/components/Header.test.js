import React from 'react'
import { render } from '@testing-library/react'
import Header from '../../src/Header'
import ResourceHeader from '../../src/ResourceHeader'
import DateHeader from '../../src/DateHeader'

describe('Header', () => {
  test('renders a span with columnheader role', () => {
    const { getByRole } = render(<Header label="Monday" />)
    expect(getByRole('columnheader')).toBeInTheDocument()
  })

  test('renders the label text', () => {
    const { getByText } = render(<Header label="Wednesday" />)
    expect(getByText('Wednesday')).toBeInTheDocument()
  })

  test('renders without crashing when label is omitted', () => {
    const { getByRole } = render(<Header />)
    expect(getByRole('columnheader')).toBeInTheDocument()
  })
})

describe('ResourceHeader', () => {
  test('renders its label', () => {
    const { getByText } = render(
      <ResourceHeader label="Room A" index={0} resource={{ id: 'r1' }} />
    )
    expect(getByText('Room A')).toBeInTheDocument()
  })

  test('renders without crashing when only label is provided', () => {
    const { getByText } = render(<ResourceHeader label="My Resource" />)
    expect(getByText('My Resource')).toBeInTheDocument()
  })
})

describe('DateHeader', () => {
  test('renders a span when drilldownView is not provided', () => {
    const { container } = render(<DateHeader label="15" />)
    expect(container.querySelector('span')).toBeInTheDocument()
    expect(container.querySelector('button')).toBeNull()
  })

  test('renders a button when drilldownView is provided', () => {
    const { getByRole } = render(
      <DateHeader label="15" drilldownView="day" onDrillDown={() => {}} />
    )
    expect(getByRole('button')).toBeInTheDocument()
  })

  test('calls onDrillDown when the button is clicked', () => {
    const onDrillDown = jest.fn()
    const { getByRole } = render(
      <DateHeader label="15" drilldownView="day" onDrillDown={onDrillDown} />
    )
    getByRole('button').click()
    expect(onDrillDown).toHaveBeenCalledTimes(1)
  })

  test('renders the label in the button', () => {
    const { getByRole } = render(
      <DateHeader label="Jan 15" drilldownView="day" onDrillDown={() => {}} />
    )
    expect(getByRole('button')).toHaveTextContent('Jan 15')
  })
})
