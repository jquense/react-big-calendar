# react-big-calendar

An events calendar component built for React and made for modern browsers (read: not IE) and uses flexbox over the classic tables-caption approach.

<p align="center">
  <img src="./assets/rbc-demo.gif" alt="Big Calendar Demo Image" />
</p>

[**DEMO and Docs**](https://jquense.github.io/react-big-calendar/examples/index.html)

Inspired by [Full Calendar](http://fullcalendar.io/).

## Use and Setup

`yarn add react-big-calendar` or `npm install --save react-big-calendar`

Include `react-big-calendar/lib/css/react-big-calendar.css` for styles, and make sure your calendar's container
element has a height, or the calendar won't be visible. To provide your own custom styling, see the [Custom Styling](#custom-styling) topic.

## Starters

- [react-big-calendar](https://github.com/arecvlohe/rbc-starter)
- [react-big-calendar with drag and drop](https://github.com/arecvlohe/rbc-with-dnd-starter)
- [react-big-calendar with TypeScript and React hooks bundled with Vite](https://github.com/christopher-caldwell/react-big-calendar-demo)

## Run examples locally

```sh
$ git clone git@github.com:jquense/react-big-calendar.git
$ cd react-big-calendar
$ yarn
$ yarn examples
```

- Open [localhost:3000/examples/index.html](http://localhost:3000/examples/index.html).

### Localization and Date Formatting

`react-big-calendar` includes three options for handling the date formatting and culture localization, depending
on your preference of DateTime libraries. You can use either the [Moment.js](https://momentjs.com/), [Globalize.js](https://github.com/jquery/globalize) or [date-fns](https://date-fns.org/) localizers.

Regardless of your choice, you **must** choose a localizer to use this library:

#### Moment.js

```js
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

const MyCalendar = (props) => (
  <div>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
)
```

#### Globalize.js v0.1.1

```js
import { Calendar, globalizeLocalizer } from 'react-big-calendar'
import globalize from 'globalize'

const localizer = globalizeLocalizer(globalize)

const MyCalendar = (props) => (
  <div>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
)
```

#### date-fns v2

```js
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const MyCalendar = (props) => (
  <div>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
)
```

## Custom Styling

Out of the box, you can include the compiled CSS files and be up and running. But, sometimes, you may want to style
Big Calendar to match your application styling. For this reason, SASS files are included with Big Calendar.

```
  @import 'react-big-calendar/lib/sass/styles';
  @import 'react-big-calendar/lib/addons/dragAndDrop/styles'; // if using DnD
```

SASS implementation provides a `variables` file containing color and sizing variables that you can
update to fit your application. _Note:_ Changing and/or overriding styles can cause rendering issues with your
Big Calendar. Carefully test each change accordingly.

## Join us on Reactiflux Discord

Join us on [Reactiflux Discord](https://discord.gg/reactiflux) community under the channel #libraries if you have any questions.
