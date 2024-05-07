# التقويم الكبير لرياكت

تم بناء مكون تقويم الفعاليات هذا لرياكت وتصميمه للمتصفحات الحديثة (والتي لا تحظى بدعم كامل من قبل المتصفحات القديمة، خصوصًا متصفح الانترنت)، ويستخدم Flexbox بدلاً من الطريقة التقليدية باستخدام الجداول.

<p align="center">
  <img src="../assets/rbc-demo.gif" alt="Big Calendar Demo Image" />
</p>

[**عرض التجربة والمستندات**](https://jquense.github.io/react-big-calendar/examples/index.html)

مستوحى من [Full Calendar](http://fullcalendar.io/).

## الاستخدام والإعداد

`yarn add react-big-calendar` أو `npm install --save react-big-calendar`

قم بتضمين `react-big-calendar/lib/css/react-big-calendar.css` للأنماط، وتأكد من أن عنصر حاوية التقويم لديك
له ارتفاع، أو لن يظهر التقويم. لتوفير تصميم مخصص خاص بك، انظر إلى [التصميم المخصص](#custom-styling).

## البدء

- [react-big-calendar](https://github.com/arecvlohe/rbc-starter)
- [react-big-calendar مع السحب والإفلات](https://github.com/arecvlohe/rbc-with-dnd-starter)
- [react-big-calendar مع TypeScript و React hooks مدمج مع Vite](https://github.com/christopher-caldwell/react-big-calendar-demo)

## تشغيل الأمثلة محلياً

```sh
$ git clone git@github.com:jquense/react-big-calendar.git
$ cd react-big-calendar
$ yarn
$ yarn storybook
```

- افتح [localhost:3000/examples/index.html](http://localhost:3000/examples/index.html).

### التعريب وتنسيق التاريخ

يشمل `react-big-calendar` أربع خيارات لمعالجة تنسيق التاريخ والتعريب الثقافي، اعتمادًا
على تفضيلك لمكتبات DateTime. يمكنك استخدام إما [Moment.js](https://momentjs.com/)، [Globalize.js](https://github.com/jquery/globalize)، [date-fns](https://date-fns.org/)، [Day.js](https://day.js.org) localizers.

بغض النظر عن اختيارك، يجب أن تختار **بالتأكيد** معربًا لاستخدام هذه المكتبة:

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

#### Day.js

يرجى ملاحظة أن dayjsLocalizer يوسع Day.js بالإضافات التالية:

- [IsBetween](https://day.js.org/docs/en/plugin/is-between)
- [IsSameOrAfter](https://day.js.org/docs/en/plugin/is-same-or-after)
- [IsSameOrBefore](https://day.js.org/docs/en/plugin/is-same-or-before)
- [LocaleData](https://day.js.org/docs/en/plugin/locale-data)
- [LocalizedFormat](https://day.js.org/docs/en/plugin/localized-format)
- [MinMax](https://day.js.org/docs/en/plugin/min-max)
- [UTC](https://day.js.org/docs/en/plugin/utc)

```js
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'

const localizer = dayjsLocalizer(dayjs)

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

## التصميم المخصص

بشكل افتراضي، يمكنك تضمين ملفات CSS المترجمة والبدء في العمل. ولكن في بعض الأحيان، قد ترغب في تخصيص
التقويم الكبير ليتناسب مع تصميم التطبيق الخاص بك. لهذا السبب، تم تضمين ملفات SASS مع التقويم الكبير.

```
  @import 'react-big-calendar/lib/sass/styles';
  @import 'react-big-calendar/lib/addons/dragAndDrop/styles'; // if using DnD
```

توفر مكتبة SASS ملف `variables` يحتوي على متغيرات الألوان والأبعاد التي يمكنك تحديثها لتتناسب مع تطبيقك. _ملحوظة:_ يمكن أن يؤدي تغيير و/أو تجاوز الأنماط إلى حدوث مشكلات في التقديم مع تقويمك الكبير. قم بإجراء اختبارات دقيقة لكل تغيير وفقًا لذلك.

## انضم إلى المجتمع

ساعدنا في تحسين التقويم الكبير! انضم إلينا على [Slack](https://join.slack.com/t/bigcalendar/shared_invite/zt-2idl5rs6c-qjCYJxeEWxTpXEf7D8x1Eg).
(تنتهي روابط الدعوة إلى Slack. إذا لم تتمكن من الانضمام، فقط قدم تقريرًا عن المشكلة وسنحصل على رابط جديد.)
