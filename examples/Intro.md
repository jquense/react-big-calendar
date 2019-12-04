# <a id='intro' href='#intro'>Getting Started</a>

You can install `react-big-calendar` via [yarn](https://yarnpkg.com/en/) or [npm](https://www.npmjs.com/):

_yarn:_ `yarn add react-big-calendar`

_npm:_ `npm install --save react-big-calendar`

Styles can be found at: `react-big-calendar/lib/css/react-big-calendar.css`, and should be included on the page
with the calendar component. Alternatively, you can include the styles directly in your SASS build. See the [Custom Styling](https://github.com/intljusticemission/react-big-calendar/blob/master/README.md#custom-styling) section of the README file for more details.

Also make sure that your calendar's container
element has a height, or the calendar won't be visible (see why below).

Date internationalization and localization is **hard** and `react-big-calendar` doesn't even attempt to
solve that problem. Instead you can use one of the many excellent solutions already
out there, via adapters called "localizers". Big Calendar comes with two localizers for use
with [Globalize.js](https://github.com/jquery/globalize) or [Moment.js](http://momentjs.com/).

Choose the localizer that best suits your needs, or write your own. Whatever you do, you'll need to set it up
before you can use the calendar (you only need to set it up once).

```jsx
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const MyCalendar = props => (
  <div>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
)
```

Once you've configured a localizer, the Calendar is ready to accept `dateFormat` props. These props determine
how dates will be displayed throughout the component and are specific to the localizer of your choice. For
instance if you are using the Moment localizer,
then any [Moment format pattern](http://momentjs.com/docs/#/displaying/format/) is valid!
