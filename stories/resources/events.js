const now = new Date()

export default [
  {
    id: 1,
    title: 'Shift',
    start: new Date(2022, 9, 14,  13, 0, 0),
    end: new Date(2022, 9, 14, 14, 0, 0),
  },
  {
    id: 1,
    title: 'Fixed shift',
    start: new Date(2022, 9, 14,  17, 0, 0),
    end: new Date(2022, 9, 14, 19, 0, 0),
  },
  {
    id: 1,
    title: 'Passing midnight',
    start: new Date(2022, 9, 14,  23, 0, 0),
    end: new Date(2022, 9, 15, 1, 0, 0),
  },
  {
    id: 1,
    title: 'Midnight event',
    start: new Date(2022, 9, 15,  1, 0, 0),
    end: new Date(2022, 9, 15, 2, 0, 0),
  },
]
