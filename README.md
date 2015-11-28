react-big-calendar
========================

An event Calendar component built for React.

[__DEMO and Docs__](http://intljusticemission.github.io/react-big-calendar/examples/index.html).
big calendar is built for modern browsers (read: ie10+) and uses flexbox over the classic tables-ception approach.

To run the example locally, `git clone`, `npm install` and `npm run examples`, hosted at localhost:3000.

Inspired by [Full Calendar](http://fullcalendar.io/).

## Use and Setup

`npm install react-big-calendar --save`

Include `react-big-calendar/lib/css/react-big-calendar.css` for styles.

### Localization and Date Formatting

`react-big-calendar` includes two options for handling the date formatting and culture localization, depending
on your preference of DateTime libraries. You can use either the Moment.js or Globalize.js localizers.

Regardless of your choice you __must__ choose a localizer to use react-big-calendar.

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
