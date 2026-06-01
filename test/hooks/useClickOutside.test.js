import React, { useRef } from 'react'
import { render, fireEvent } from '@testing-library/react'
import useClickOutside from '../../src/hooks/useClickOutside'

function TestComponent({ onOutsideClick }) {
  const ref = useRef(null)
  useClickOutside({ ref, callback: onOutsideClick })
  return <div ref={ref} data-testid="inside">inside element</div>
}

describe('useClickOutside', () => {
  test('calls callback when clicking outside the ref element', () => {
    const callback = jest.fn()
    render(<TestComponent onOutsideClick={callback} />)

    fireEvent.mouseDown(document.body)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('does not call callback when clicking inside the ref element', () => {
    const callback = jest.fn()
    const { getByTestId } = render(<TestComponent onOutsideClick={callback} />)

    fireEvent.mouseDown(getByTestId('inside'))
    expect(callback).not.toHaveBeenCalled()
  })

  test('removes the event listener on unmount', () => {
    const callback = jest.fn()
    const { unmount } = render(<TestComponent onOutsideClick={callback} />)

    unmount()
    fireEvent.mouseDown(document.body)
    expect(callback).not.toHaveBeenCalled()
  })

  test('does not call callback when ref.current is null', () => {
    const callback = jest.fn()

    function NullRefComponent({ onOutsideClick }) {
      const ref = useRef(null)
      // Don't attach ref to any element — ref.current stays null
      useClickOutside({ ref, callback: onOutsideClick })
      return <div data-testid="no-ref">no ref attached</div>
    }

    render(<NullRefComponent onOutsideClick={callback} />)
    fireEvent.mouseDown(document.body)
    expect(callback).not.toHaveBeenCalled()
  })
})
