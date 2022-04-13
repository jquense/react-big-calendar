th1-calendar
========================

An events calendar component built for React and made for modern browsers (read: IE10+) and uses flexbox over the classic tables-ception approach. This is a fork of [intljusticemission/react-big-calendar](https://github.com/intljusticemission/react-big-calendar) but has built upon exisitng features such as drag and drop.

[__DEMO and Docs__](http://intljusticemission.github.io/react-big-calendar/examples/index.html)

Inspired by [Full Calendar](http://fullcalendar.io/).

## Use and Setup

`npm install th1-calendar --save` 

or

`yarn add th1-calendar`

Include `th1-calendar/lib/css/react-big-calendar.css` for styles.

## Run examples locally

* Clone this repository
* Retrieve dependencies: `npm install`
* Start: `npm run examples`
* Open [localhost:3000/examples/index.html](http://localhost:3000/examples/index.html).

### Localization and Date Formatting

`th1-calendar` includes two options for handling the date formatting and culture localization, depending
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
