import { ZonedDateTime, nativeJs } from 'js-joda'
export default [
  {
    id: 0,
    title: 'jambori',
    start: ZonedDateTime.from(nativeJs(new Date(2018, 4, 25, 9))),
    end: ZonedDateTime.from(nativeJs(new Date(2018, 4, 25, 12))),
  },
  // {
  //   id: 1,
  //   title: 'Long Event',
  //   start: ZonedDateTime.from(nativeJs(new Date(2015, 3, 7))),
  //   end: ZonedDateTime.from(nativeJs(new Date(2015, 3, 10))),
  // },
]
