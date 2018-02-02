citrusbyte-calendar
========================

An events calendar component built for React and made for modern browsers (read: IE10+) and uses flexbox over the classic tables-ception approach. This is a fork of [intljusticemission/react-big-calendar](https://github.com/intljusticemission/react-big-calendar) but has built upon exisitng features such as drag and drop.

[__DEMO and Docs__](http://intljusticemission.github.io/react-big-calendar/examples/index.html)

Inspired by [Full Calendar](http://fullcalendar.io/).

## Use and Setup

`npm install citrusbyte-calendar --save` 

or

`yarn add citrusbyte-calendar`

Include `citrusbyte-calendar/lib/css/react-big-calendar.css` for styles.

## Run examples locally

* Clone this repository
* Retrieve dependencies: `npm install`
* Start: `npm run examples`
* Open [localhost:3000/examples/index.html](http://localhost:3000/examples/index.html).

### Localization and Date Formatting

`citrusbyte-calendar` includes two options for handling the date formatting and culture localization, depending
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

## About Citrusbyte

![Citrusbyte](http://i.imgur.com/W6eISI3.png)

This software is lovingly maintained and funded by Citrusbyte.
At Citrusbyte, we specialize in solving difficult computer science problems for startups and the enterprise.

At Citrusbyte we believe in and support open source software.
* Check out more of our open source software at Citrusbyte Labs.
* Learn more about [our work](https://citrusbyte.com/portfolio).
* [Hire us](https://citrusbyte.com/contact) to work on your project.
* [Want to join the team?](http://careers.citrusbyte.com)

*Citrusbyte and the Citrusbyte logo are trademarks or registered trademarks of Citrusbyte, LLC.*

