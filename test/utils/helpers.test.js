import { notify, instanceId, isFirstFocusedRender } from '../../src/utils/helpers'

describe('notify', () => {
  test('calls handler with provided args', () => {
    const handler = jest.fn()
    notify(handler, ['a', 'b'])
    expect(handler).toHaveBeenCalledWith('a', 'b')
  })

  test('does nothing when handler is falsy', () => {
    expect(() => notify(null, ['a'])).not.toThrow()
    expect(() => notify(undefined, ['a'])).not.toThrow()
  })

  test('wraps a non-array arg in an array', () => {
    const handler = jest.fn()
    notify(handler, 'single')
    expect(handler).toHaveBeenCalledWith('single')
  })
})

describe('instanceId', () => {
  test('assigns a unique id to component if not present', () => {
    const comp = { props: {} }
    const id = instanceId(comp)
    expect(id).toBeTruthy()
    expect(typeof id).toBe('string')
  })

  test('returns the same id on subsequent calls', () => {
    const comp = { props: {} }
    const id1 = instanceId(comp)
    const id2 = instanceId(comp)
    expect(id1).toBe(id2)
  })

  test('prefers component props.id when available', () => {
    const comp = { props: { id: 'my-id' } }
    comp.__id = 'internal'
    expect(instanceId(comp)).toBe('my-id')
  })

  test('appends suffix when provided', () => {
    const comp = { props: {} }
    const id = instanceId(comp, '-suffix')
    expect(id.endsWith('-suffix')).toBe(true)
  })
})

describe('isFirstFocusedRender', () => {
  test('returns true when component state is focused', () => {
    const comp = { state: { focused: true } }
    expect(isFirstFocusedRender(comp)).toBe(true)
  })

  test('returns falsy when component state is not focused', () => {
    const comp = { state: { focused: false } }
    expect(isFirstFocusedRender(comp)).toBeFalsy()
  })

  test('returns true on subsequent calls once _firstFocus is set', () => {
    const comp = { state: { focused: true } }
    isFirstFocusedRender(comp) // sets _firstFocus
    comp.state.focused = false
    expect(isFirstFocusedRender(comp)).toBe(true)
  })
})
