import { accessor, wrapAccessor } from '../../src/utils/accessors'

describe('accessor', () => {
  const obj = { name: 'Alice', age: 30 }

  test('retrieves a value by string key', () => {
    expect(accessor(obj, 'name')).toBe('Alice')
  })

  test('retrieves a value using a function', () => {
    expect(accessor(obj, (d) => d.age)).toBe(30)
  })

  test('returns null for an unknown string key', () => {
    expect(accessor(obj, 'missing')).toBeNull()
  })

  test('returns null when field is null', () => {
    expect(accessor(obj, null)).toBeNull()
  })

  test('returns null when data is null and field is a string', () => {
    expect(accessor(null, 'name')).toBeNull()
  })

  test('returns null when data is undefined and field is a string', () => {
    expect(accessor(undefined, 'name')).toBeNull()
  })

  test('calls function field with data as argument', () => {
    const fn = jest.fn(() => 42)
    accessor(obj, fn)
    expect(fn).toHaveBeenCalledWith(obj)
  })
})

describe('wrapAccessor', () => {
  test('wraps a string accessor into a function', () => {
    const fn = wrapAccessor('name')
    expect(fn({ name: 'Bob' })).toBe('Bob')
  })

  test('wraps a function accessor into a function', () => {
    const fn = wrapAccessor((d) => d.value)
    expect(fn({ value: 99 })).toBe(99)
  })
})
