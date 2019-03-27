# react-big-calendar

An events calendar component built for React and made for modern browsers (read: IE10+) and uses flexbox over the classic tables-ception approach.

[**DEMO and Docs**](http://intljusticemission.github.io/react-big-calendar/examples/index.html)

Inspired by [Full Calendar](http://fullcalendar.io/).

## Use and Setup

`npm install react-big-calendar --save`

Include `react-big-calendar/lib/css/react-big-calendar.css` for styles, and make sure your calendar's container
element has a height, or the calendar won't be visible.

## Starters

- [react-big-calendar](https://github.com/arecvlohe/rbc-starter)
- [react-big-calendar with drag and drop](https://github.com/arecvlohe/rbc-with-dnd-starter)

## Run examples locally

```
$ git clone git@github.com:intljusticemission/react-big-calendar.git
$ cd react-big-calendar
$ npm install
$ npm run examples
```

- Open [localhost:3000/examples/index.html](http://localhost:3000/examples/index.html).

### Localization and Date Formatting

`react-big-calendar` includes two options for handling the date formatting and culture localization, depending
on your preference of DateTime libraries. You can use either the [Moment.js](http://momentjs.com/) or [Globalize.js](https://github.com/jquery/globalize) localizers.

Regardless of your choice, you **must** choose a localizer to use this library:

#### Moment.js

```js
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

const localizer = BigCalendar.momentLocalizer(moment)

const MyCalendar = props => (
  <div>
    <BigCalendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
)
```

#### Globalize.js v0.1.1

```js
import BigCalendar from 'react-big-calendar'
import globalize from 'globalize'

const localizer = BigCalendar.globalizeLocalizer(globalize)

const MyCalendar = props => (
  <div>
    <BigCalendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
)
```

## Join us on Reactiflux Discord

Join us on [Reactiflux Discord](https://discord.gg/uJsgpkC) community under the channel #react-big-calendar if you have any questions.

##Updates

- Added source prop to TimeSlotGroup to findout where it is being used.
- Updated eventLevels.js to position events to top if any event has positionTop flag set to true.
- Header was hidden by default in day view, updated it to be visible in day view.
- Popup.js; Updated proptype of slotStart to object from number, as it's expecting date object.; Added localizer prop to EventCell component used in Popup.

- Updated overlay logic in month view to fix https://jira.directi.com/browse/CWDC-80 .
  Adding a variable called `isDeleted` to each event and filtering overlay events based on that, as
  it's not getting updated on just rerendering monthView.
