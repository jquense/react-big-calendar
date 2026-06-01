import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Toolbar from '../../src/Toolbar'
import { navigate } from '../../src/utils/constants'
import messages from '../../src/utils/messages'

const msgs = messages({})

const defaultProps = {
  label: 'January 2023',
  view: 'month',
  views: ['month', 'week', 'day', 'agenda'],
  localizer: { messages: msgs },
  onNavigate: jest.fn(),
  onView: jest.fn(),
}

describe('Toolbar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders without crashing', () => {
    const { container } = render(<Toolbar {...defaultProps} />)
    expect(container.querySelector('.rbc-toolbar')).toBeInTheDocument()
  })

  test('renders the label', () => {
    const { getByText } = render(<Toolbar {...defaultProps} />)
    expect(getByText('January 2023')).toBeInTheDocument()
  })

  test('renders today, back, and next buttons', () => {
    const { getByText } = render(<Toolbar {...defaultProps} />)
    expect(getByText(msgs.today)).toBeInTheDocument()
    expect(getByText(msgs.previous)).toBeInTheDocument()
    expect(getByText(msgs.next)).toBeInTheDocument()
  })

  test('calls onNavigate with TODAY when today button is clicked', () => {
    const onNavigate = jest.fn()
    const { getByText } = render(
      <Toolbar {...defaultProps} onNavigate={onNavigate} />
    )
    fireEvent.click(getByText(msgs.today))
    expect(onNavigate).toHaveBeenCalledWith(navigate.TODAY)
  })

  test('calls onNavigate with PREV when back button is clicked', () => {
    const onNavigate = jest.fn()
    const { getByText } = render(
      <Toolbar {...defaultProps} onNavigate={onNavigate} />
    )
    fireEvent.click(getByText(msgs.previous))
    expect(onNavigate).toHaveBeenCalledWith(navigate.PREVIOUS)
  })

  test('calls onNavigate with NEXT when next button is clicked', () => {
    const onNavigate = jest.fn()
    const { getByText } = render(
      <Toolbar {...defaultProps} onNavigate={onNavigate} />
    )
    fireEvent.click(getByText(msgs.next))
    expect(onNavigate).toHaveBeenCalledWith(navigate.NEXT)
  })

  test('renders view name buttons when multiple views are provided', () => {
    const { getByText } = render(<Toolbar {...defaultProps} />)
    expect(getByText(msgs.month)).toBeInTheDocument()
    expect(getByText(msgs.week)).toBeInTheDocument()
  })

  test('calls onView when a view button is clicked', () => {
    const onView = jest.fn()
    const { getByText } = render(
      <Toolbar {...defaultProps} onView={onView} />
    )
    fireEvent.click(getByText(msgs.week))
    expect(onView).toHaveBeenCalledWith('week')
  })

  test('marks the active view button with rbc-active class', () => {
    const { getByText } = render(
      <Toolbar {...defaultProps} view="month" />
    )
    expect(getByText(msgs.month).className).toContain('rbc-active')
    expect(getByText(msgs.week).className).not.toContain('rbc-active')
  })

  test('does not render view buttons when only one view is provided', () => {
    const { queryByText } = render(
      <Toolbar {...defaultProps} views={['month']} />
    )
    expect(queryByText(msgs.month)).toBeNull()
  })
})
