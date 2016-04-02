react-big-calendar
========================

An events calendar component built for React.

[__DEMO and Docs__](http://intljusticemission.github.io/react-big-calendar/examples/index.html)

`react-big-calendar` is built for modern browsers (read: IE10+) and uses flexbox over the classic tables-ception approach.

To run the examples locally, run `npm install && npm run examples`, and open [localhost:3000/examples/index.html](http://localhost:3000/examples/index.html).

Inspired by [Full Calendar](http://fullcalendar.io/).

## Use and Setup

`npm install react-big-calendar --save`

Include `react-big-calendar/lib/css/react-big-calendar.css` for styles.

### Localization and Date Formatting

`react-big-calendar` includes two options for handling the date formatting and culture localization, depending
on your preference of DateTime libraries. You can use either the [Moment.js](http://momentjs.com/) or [Globalize.js](https://github.com/jquery/globalize) localizers.

Regardless of your choice, you __must__ choose a localizer to use this library:

#### Moment.js

```js
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);
```

#### Globalize.js v0.1.1

```js
import BigCalendar from 'react-big-calendar';
import globalize from 'globalize';

BigCalendar.setLocalizer(
  BigCalendar.globalizeLocalizer(globalize)
);
```
