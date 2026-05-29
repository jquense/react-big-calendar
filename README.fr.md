# react-big-calendar

Un composant de calendrier d'événements construit pour React et conçu pour les navigateurs modernes (lire : pas pour IE) et utilise flexbox au lieu de l'approche classique tables-caption.

<p align="center">
  <img src="./assets/rbc-demo.gif" alt="Image de démonstration de Big Calendar" />
</p>

[**DEMO et Documentation**](https://jquense.github.io/react-big-calendar/examples/index.html)

Inspiré par [Full Calendar](http://fullcalendar.io/).

## Utilisation et Configuration

`yarn add react-big-calendar` ou `npm install --save react-big-calendar`

Incluez `react-big-calendar/lib/css/react-big-calendar.css` pour avoir les styles, et vérifiez que l'élément conteneur de votre calendrier a une hauteur, sinon le calendrier ne sera pas visible. Pour fournir votre propre style personnalisé, consultez le sujet [Custom Styling](#custom-styling)

## Pour commancer

- [react-big-calendar](https://github.com/arecvlohe/rbc-starter)
- [react-big-calendar with drag and drop](https://github.com/arecvlohe/rbc-with-dnd-starter)
- [react-big-calendar with TypeScript and React hooks bundled with Vite](https://github.com/christopher-caldwell/react-big-calendar-demo)

## Exécutez des exemples localement

```sh
$ git clone git@github.com:jquense/react-big-calendar.git
$ cd react-big-calendar
$ yarn
$ yarn storybook
```

- Ouvrez [localhost:3000/examples/index.html](http://localhost:3000/examples/index.html).

### Localisation and formatage des dates

`react-big-calendar` a quatre options pour gérer le formatage des dates et la localisation culturelle, selon votre préférence de bibliothèques DateTime. Vous pouvez utiliser un des localisateurs suivant: [Globalize.js](https://github.com/jquery/globalize), [date-fns](https://date-fns.org/), [Day.js](https://day.js.org).

Quel que soit votre choix, vous **devez** choisir un localisateur pour utiliser cette bibliothèque:

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

Notez que le jour jsLocalizer étend Day.js avec les plugins suivants :

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

## Styling personalisé

Dès le départ, vous pouvez inclure les fichiers CSS compilés et avoir un project opérationnel. Mais, parfois, vous voudrez peut-être styliser Big Calendar pour l'assortir au style de votre application. Pour cette raison, les fichiers SASS sont inclus avec Big Calendar.

```
  @import 'react-big-calendar/lib/sass/styles';
  @import 'react-big-calendar/lib/addons/dragAndDrop/styles'; // if using DnD
```

L'implémentation SASS fournit un fichier variables contenant des variables de couleur et de taille que vous pouvez
mettre à jour pour correspondre à votre application. Note : Modifier et/ou remplacer des styles peut causer des problèmes d'affichage avec votre
Big Calendar. Testez soigneusement chaque changement en conséquence.

## Rejoinez notre Communauté

Aidez-nous à améliorer Big Calendar ! Rejoignez-nous sur Slack.
(Les liens d'invitation Slack expirent. Si vous ne pouvez pas entrer, déposez simplement un problème et nous obtiendrons un nouveau lien.)
