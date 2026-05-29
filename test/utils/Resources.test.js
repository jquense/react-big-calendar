import Resources, { NONE } from '../../src/utils/Resources'

const accessors = {
  resourceId: (r) => r.id,
  resource: (e) => e.resourceId,
}

const resources = [
  { id: 'r1', title: 'Room A' },
  { id: 'r2', title: 'Room B' },
]

const events = [
  { id: 1, title: 'Meeting', resourceId: 'r1' },
  { id: 2, title: 'Standup', resourceId: 'r2' },
  { id: 3, title: 'Lunch', resourceId: 'r1' },
]

describe('Resources.map', () => {
  test('maps over each resource with its id and resource object', () => {
    const result = Resources(resources, accessors).map(([id, resource]) => ({
      id,
      resource,
    }))
    expect(result).toHaveLength(2)
    expect(result[0].id).toBe('r1')
    expect(result[1].id).toBe('r2')
  })

  test('returns single NONE entry when resources is falsy', () => {
    const result = Resources(null, accessors).map(([id, resource]) => ({
      id,
      resource,
    }))
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(NONE)
    expect(result[0].resource).toBeNull()
  })
})

describe('Resources.groupEvents', () => {
  test('groups events by resource id', () => {
    const map = Resources(resources, accessors).groupEvents(events)
    expect(map.get('r1')).toHaveLength(2)
    expect(map.get('r2')).toHaveLength(1)
  })

  test('puts all events under NONE when resources is falsy', () => {
    const map = Resources(null, accessors).groupEvents(events)
    expect(map.get(NONE)).toHaveLength(3)
  })

  test('handles events with array resource ids', () => {
    const multiEvents = [
      { id: 1, title: 'Both', resourceId: ['r1', 'r2'] },
    ]
    const map = Resources(resources, accessors).groupEvents(multiEvents)
    expect(map.get('r1')).toHaveLength(1)
    expect(map.get('r2')).toHaveLength(1)
  })

  test('groups events with NONE key when event has no resourceId', () => {
    const noResourceEvents = [{ id: 5, title: 'No resource' }]
    const map = Resources(resources, accessors).groupEvents(noResourceEvents)
    expect(map.get(NONE)).toHaveLength(1)
  })
})

describe('NONE sentinel', () => {
  test('is a unique object', () => {
    expect(NONE).toBeDefined()
    expect(typeof NONE).toBe('object')
  })
})
