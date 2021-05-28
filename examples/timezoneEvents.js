let userOffset = -1 * (new Date().getTimezoneOffset() / 60)
if (userOffset > 0) userOffset = `+${userOffset}`
export default [
  {
    id: 24,
    title: `2015-4-14 6 PM - 8 PM (Local - UTC${userOffset})`,
    start: new Date(2015, 3, 14, 18, 0, 0),
    end: new Date(2015, 3, 14, 19, 59, 0),
  },
  {
    id: 25,
    title: `2015-4-14 2 PM - 4 PM (Local - UTC${userOffset})`,
    start: new Date(2015, 3, 14, 14, 0, 0),
    end: new Date(2015, 3, 14, 16, 0, 0),
  },
  {
    id: 26,
    title: `2015-4-14 10 AM - 12 PM (Local - UTC${userOffset})`,
    start: new Date(2015, 3, 14, 10, 0, 0),
    end: new Date(2015, 3, 14, 12, 0, 0),
  },
  {
    id: 27,
    title: `2015-4-14 9 PM - 11 PM (Local - UTC${userOffset})`,
    start: new Date(2015, 3, 14, 21, 0, 0),
    end: new Date(2015, 3, 14, 23, 0, 0),
  },
  {
    id: 28,
    title: `2015-4-15 9 PM - 11:59 PM (Local - UTC${userOffset})`,
    start: new Date(2015, 3, 15, 21, 0, 0),
    end: new Date(2015, 3, 15, 23, 59, 59),
  },
  {
    id: 29,
    title: `2015-4-16 9 PM - 1:30 AM (Local - UTC${userOffset})`,
    start: new Date(2015, 3, 16, 21, 0, 0),
    end: new Date(2015, 3, 17, 1, 30, 0),
  },
]
