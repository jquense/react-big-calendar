# react-big-calendar

Un componente per calendari di eventi progettato per React e browser moderni (eccetto Internet Explorer) utilizzando flexbox invece del classico approccio basato su tabelle e didascalie.

<p align="center">
  <img src="./assets/rbc-demo.gif" alt="Big Calendar Demo Image" />
</p>

[**DEMO e documentazione**](https://jquense.github.io/react-big-calendar/examples/index.html)

Ispirato a [Full Calendar](http://fullcalendar.io/).

## Utilizzo e configurazione

`yarn add react-big-calendar` oppure `npm install --save react-big-calendar`

Dovresti includere `react-big-calendar/lib/css/react-big-calendar.css` per lo stile della pagina e assicurarti che l'elemento contenitore del tuo calendario abbia un'altezza, altrimenti il calendario non sarà visibile. Per fornire il tuo stile personalizzato, consulta la sezione Stile personalizzato. [Custom Styling](#custom-styling).

## Starter 

- [react-big-calendar](https://github.com/arecvlohe/rbc-starter)
- [react-big-calendar with drag and drop](https://github.com/arecvlohe/rbc-with-dnd-starter)
- [react-big-calendar with TypeScript and React hooks bundled with Vite](https://github.com/christopher-caldwell/react-big-calendar-demo)

## Eseguire esempi localmente

```sh
$ git clone git@github.com:jquense/react-big-calendar.git
$ cd react-big-calendar
$ yarn
$ yarn storybook
```

- Quindi apri [localhost:3000/examples/index.html](http://localhost:3000/examples/index.html).

### Localizzazione e formattazione della data:

`react-big-calendar` offre quattro opzioni per gestire la formattazione della data e la localizzazione della cultura, a seconda delle tue preferenze per le librerie DateTime. Puoi utilizzare i seguenti localizzatori: [Moment.js](https://momentjs.com/), [Globalize.js](https://github.com/jquery/globalize), [date-fns](https://date-fns.org/), [Day.js](https://day.js.org).


Indipendentemente dalla tua scelta, devi scegliere un localizzatore per utilizzare questa libreria:

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

Nota che dayjsLocalizer estende Day.js con i seguenti moduli:

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

## Stile personalizzato

Per impostazione predefinita, puoi includere i file CSS compilati ed essere subito operativo. Ma, a volte, potresti voler adattare lo stile di Big Calendar allo stile della tua applicazione. Per questo motivo, i file SASS sono inclusi con Big Calendar.

```
  @import 'react-big-calendar/lib/sass/styles';
  @import 'react-big-calendar/lib/addons/dragAndDrop/styles'; // Si vous utilisez DnD
```

L'implementazione SASS fornisce un file variables contenente variabili di colore e dimensionamento che puoi aggiornare per adattarle alla tua applicazione. Nota: La modifica e/o la sostituzione degli stili predefiniti possono causare problemi di rendering con il tuo Big Calendar. Testa attentamente ogni modifica.


## Unisciti alla comunità

Aiutaci a migliorare Big Calendar! Unisciti a noi su [Slack](https://join.slack.com/t/bigcalendar/shared_invite/zt-2fapdf4pj-oEF51KD2XgHKudkXEhk2lQ).
(I link di invito Slack scadono. Se non riesci a entrare, segnala semplicemente un problema e ti forniremo un nuovo link.)




