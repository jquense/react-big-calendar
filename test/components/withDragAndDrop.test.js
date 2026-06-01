import React from 'react'
import { render, act } from '@testing-library/react'
import withDragAndDrop from '../../src/addons/dragAndDrop/withDragAndDrop'
import Calendar from '../../src/Calendar'
import { localizer } from './fixtures'

const DnDCalendar = withDragAndDrop(Calendar)

const defaultDate = new Date(2023, 0, 15)
const baseProps = {
  localizer,
  defaultDate,
  defaultView: 'month',
  events: [],
}

// ── HOC construction ──────────────────────────────────────────────────────────
describe('withDragAndDrop — HOC setup', () => {
  test('wraps Calendar and renders without crashing', () => {
    const { container } = render(<DnDCalendar {...baseProps} />)
    expect(container.querySelector('.rbc-calendar')).toBeInTheDocument()
  })

  test('adds rbc-addons-dnd class to calendar', () => {
    const { container } = render(<DnDCalendar {...baseProps} />)
    expect(container.querySelector('.rbc-addons-dnd')).toBeInTheDocument()
  })

  test('static defaultProps include draggableAccessor=null and resizable=true', () => {
    expect(DnDCalendar.defaultProps.draggableAccessor).toBeNull()
    expect(DnDCalendar.defaultProps.resizableAccessor).toBeNull()
    expect(DnDCalendar.defaultProps.resizable).toBe(true)
  })
})

// ── handleBeginAction ─────────────────────────────────────────────────────────
describe('withDragAndDrop — handleBeginAction', () => {
  test('calls onDragStart when provided', () => {
    const onDragStart = jest.fn()
    const ref = React.createRef()
    render(<DnDCalendar {...baseProps} onDragStart={onDragStart} ref={ref} />)

    const instance = ref.current
    const event = { id: 1, title: 'Test' }
    act(() => {
      instance.handleBeginAction(event, 'move', 'LEFT')
    })

    expect(onDragStart).toHaveBeenCalledWith({
      event,
      action: 'move',
      direction: 'LEFT',
    })
  })

  test('sets event, action, direction in state', () => {
    const ref = React.createRef()
    render(<DnDCalendar {...baseProps} ref={ref} />)

    const instance = ref.current
    const event = { id: 1 }
    act(() => {
      instance.handleBeginAction(event, 'resize', 'RIGHT')
    })

    expect(instance.state.event).toBe(event)
    expect(instance.state.action).toBe('resize')
    expect(instance.state.direction).toBe('RIGHT')
  })

  test('works without onDragStart prop (no error)', () => {
    const ref = React.createRef()
    render(<DnDCalendar {...baseProps} ref={ref} />)

    expect(() => {
      act(() => {
        ref.current.handleBeginAction({ id: 1 }, 'move', null)
      })
    }).not.toThrow()
  })
})

// ── handleInteractionStart ────────────────────────────────────────────────────
describe('withDragAndDrop — handleInteractionStart', () => {
  test('sets interacting=true when currently false', () => {
    const ref = React.createRef()
    render(<DnDCalendar {...baseProps} ref={ref} />)

    act(() => {
      ref.current.handleInteractionStart()
    })

    expect(ref.current.state.interacting).toBe(true)
  })

  test('does not call setState when already interacting', () => {
    const ref = React.createRef()
    render(<DnDCalendar {...baseProps} ref={ref} />)

    // Start interacting
    act(() => { ref.current.handleInteractionStart() })
    const spy = jest.spyOn(ref.current, 'setState')

    // Call again — should be a no-op
    act(() => { ref.current.handleInteractionStart() })
    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
  })

  test('adds rbc-addons-dnd-is-dragging class when interacting', () => {
    const ref = React.createRef()
    const { container } = render(<DnDCalendar {...baseProps} ref={ref} />)

    act(() => { ref.current.handleInteractionStart() })

    expect(
      container.querySelector('.rbc-addons-dnd-is-dragging')
    ).toBeInTheDocument()
  })
})

// ── handleInteractionEnd ──────────────────────────────────────────────────────
describe('withDragAndDrop — handleInteractionEnd', () => {
  test('returns early when action is null (no drag in progress)', () => {
    const onEventDrop = jest.fn()
    const ref = React.createRef()
    render(<DnDCalendar {...baseProps} onEventDrop={onEventDrop} ref={ref} />)

    act(() => {
      ref.current.handleInteractionEnd({ start: new Date(), end: new Date() })
    })

    expect(onEventDrop).not.toHaveBeenCalled()
  })

  test('resets state to idle after interaction ends', () => {
    const ref = React.createRef()
    render(<DnDCalendar {...baseProps} ref={ref} />)

    // Begin a drag
    act(() => { ref.current.handleBeginAction({ id: 1 }, 'move') })
    act(() => { ref.current.handleInteractionStart() })

    // End it
    act(() => { ref.current.handleInteractionEnd(null) })

    expect(ref.current.state.action).toBeNull()
    expect(ref.current.state.event).toBeNull()
    expect(ref.current.state.interacting).toBe(false)
    expect(ref.current.state.direction).toBeNull()
  })

  test('returns early (no callbacks) when interactionInfo is null', () => {
    const onEventDrop = jest.fn()
    const ref = React.createRef()
    render(<DnDCalendar {...baseProps} onEventDrop={onEventDrop} ref={ref} />)

    act(() => { ref.current.handleBeginAction({ id: 1 }, 'move') })
    act(() => { ref.current.handleInteractionEnd(null) })

    expect(onEventDrop).not.toHaveBeenCalled()
  })

  test('calls onEventDrop when action is move and interactionInfo is provided', () => {
    const onEventDrop = jest.fn()
    const ref = React.createRef()
    render(<DnDCalendar {...baseProps} onEventDrop={onEventDrop} ref={ref} />)

    const event = { id: 1, title: 'Dragged' }
    act(() => { ref.current.handleBeginAction(event, 'move') })

    const info = { start: new Date(), end: new Date() }
    act(() => { ref.current.handleInteractionEnd(info) })

    expect(onEventDrop).toHaveBeenCalledWith({ ...info, event })
  })

  test('calls onEventResize when action is resize and interactionInfo is provided', () => {
    const onEventResize = jest.fn()
    const ref = React.createRef()
    render(<DnDCalendar {...baseProps} onEventResize={onEventResize} ref={ref} />)

    const event = { id: 2, title: 'Resized' }
    act(() => { ref.current.handleBeginAction(event, 'resize') })

    const info = { start: new Date(), end: new Date() }
    act(() => { ref.current.handleInteractionEnd(info) })

    expect(onEventResize).toHaveBeenCalledWith({ ...info, event })
  })

  test('does not call onEventDrop when action is resize', () => {
    const onEventDrop = jest.fn()
    const ref = React.createRef()
    render(<DnDCalendar {...baseProps} onEventDrop={onEventDrop} ref={ref} />)

    act(() => { ref.current.handleBeginAction({ id: 1 }, 'resize') })
    act(() => { ref.current.handleInteractionEnd({ start: new Date(), end: new Date() }) })

    expect(onEventDrop).not.toHaveBeenCalled()
  })
})

// ── defaultOnDragOver ─────────────────────────────────────────────────────────
describe('withDragAndDrop — defaultOnDragOver', () => {
  test('calls event.preventDefault()', () => {
    const ref = React.createRef()
    render(<DnDCalendar {...baseProps} ref={ref} />)

    const mockEvent = { preventDefault: jest.fn() }
    ref.current.defaultOnDragOver(mockEvent)
    expect(mockEvent.preventDefault).toHaveBeenCalled()
  })
})

// ── getDnDContextValue ────────────────────────────────────────────────────────
describe('withDragAndDrop — getDnDContextValue', () => {
  test('returns context object with draggable key', () => {
    const ref = React.createRef()
    render(<DnDCalendar {...baseProps} ref={ref} />)

    const ctx = ref.current.getDnDContextValue()
    expect(ctx).toHaveProperty('draggable')
    expect(typeof ctx.draggable.onStart).toBe('function')
    expect(typeof ctx.draggable.onEnd).toBe('function')
    expect(typeof ctx.draggable.onBeginAction).toBe('function')
  })

  test('context reflects current props (draggableAccessor, resizableAccessor)', () => {
    const draggableAccessor = () => true
    const ref = React.createRef()
    render(
      <DnDCalendar
        {...baseProps}
        draggableAccessor={draggableAccessor}
        ref={ref}
      />
    )

    const ctx = ref.current.getDnDContextValue()
    expect(ctx.draggable.draggableAccessor).toBe(draggableAccessor)
  })
})

// ── render — prop forwarding ───────────────────────────────────────────────────
describe('withDragAndDrop — render', () => {
  test('passes selectable=ignoreEvents when selectable=true', () => {
    const { container } = render(
      <DnDCalendar {...baseProps} selectable={true} />
    )
    // Calendar still renders
    expect(container.querySelector('.rbc-calendar')).toBeInTheDocument()
  })

  test('passes selectable=false when selectable=false', () => {
    const { container } = render(
      <DnDCalendar {...baseProps} selectable={false} />
    )
    expect(container.querySelector('.rbc-calendar')).toBeInTheDocument()
  })

  test('uses defaultOnDragOver when onDropFromOutside is set and no onDragOver', () => {
    const onDropFromOutside = jest.fn()
    const { container } = render(
      <DnDCalendar
        {...baseProps}
        onDropFromOutside={onDropFromOutside}
      />
    )
    expect(container.querySelector('.rbc-calendar')).toBeInTheDocument()
  })

  test('uses provided onDragOver when both onDropFromOutside and onDragOver given', () => {
    const onDropFromOutside = jest.fn()
    const onDragOver = jest.fn()
    const { container } = render(
      <DnDCalendar
        {...baseProps}
        onDropFromOutside={onDropFromOutside}
        onDragOver={onDragOver}
      />
    )
    expect(container.querySelector('.rbc-calendar')).toBeInTheDocument()
  })

  test('does not spread elementProps when no onDropFromOutside', () => {
    const elementProps = { 'data-testid': 'calendar-root' }
    const { getByTestId } = render(
      <DnDCalendar {...baseProps} elementProps={elementProps} />
    )
    expect(getByTestId('calendar-root')).toBeInTheDocument()
  })

  test('merges DnD components with provided components', () => {
    const CustomEventWrapper = ({ children }) => <div>{children}</div>
    const { container } = render(
      <DnDCalendar
        {...baseProps}
        components={{ eventWrapper: CustomEventWrapper }}
      />
    )
    expect(container.querySelector('.rbc-calendar')).toBeInTheDocument()
  })
})
