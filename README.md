# react-big-calendar

Un composant de calendrier d'événements conçu pour React et les navigateurs modernes (sauf pour Internet Explorer) en utilisant flexbox au lieu de l'approche classique des tableaux et des légendes.

<p align="center">
  <img src="./assets/rbc-demo.gif" alt="Big Calendar Demo Image" />
</p>

[**DÉMO et documentation**](https://jquense.github.io/react-big-calendar/examples/index.html)

Inspiré par [Full Calendar](http://fullcalendar.io/).

## Utilisation et configuration

`yarn add react-big-calendar` ou `npm install --save react-big-calendar`

Faites inclure `react-big-calendar/lib/css/react-big-calendar.css` pour la mise en forme de la page, a et assurez-vous que l'élément conteneur de votre calendrier 
a une hauteur, sinon le calendrier ne sera pas visible. Pour fournir votre propre mise en forme personnalisé, consultez la rubrique [Custom Styling](#custom-styling).

## Démarrages 

- [react-big-calendar](https://github.com/arecvlohe/rbc-starter)
- [react-big-calendar with drag and drop](https://github.com/arecvlohe/rbc-with-dnd-starter)
- [react-big-calendar with TypeScript and React hooks bundled with Vite](https://github.com/christopher-caldwell/react-big-calendar-demo)

## Exécuter des exemples localement

```sh
$ git clone git@github.com:jquense/react-big-calendar.git
$ cd react-big-calendar
$ yarn
$ yarn storybook
```

- Puis ouvrir [localhost:3000/examples/index.html](http://localhost:3000/examples/index.html).

### Localisation et formatage de la date:

`react-big-calendar` propose quatre options pour gérer le formatage de la date et la localisation de la culture, en fonction de votre préférence pour les bibliothèques DateTime. Vous pouvez utiliser les localisateurs suivants: [Moment.js](https://momentjs.com/), [Globalize.js](https://github.com/jquery/globalize), [date-fns](https://date-fns.org/), [Day.js](https://day.js.org).


Quel que soit votre choix, vous **devez** choisir un localisateur pour utiliser cette bibliothèque :

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

Notez bien que dayjsLocalizer étend Day.js avec les modules suivants:

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

## Mise en forme personnalisée

Par défaut, vous pouvez inclure les fichiers CSS compilés et être opérationnel. Mais, parfois, vous souhaiterez peut-être adapter le style de Big Calendar au style de votre application. Pour cette raison, des fichiers SASS sont inclus avec Big Calendar.

```
  @import 'react-big-calendar/lib/sass/styles';
  @import 'react-big-calendar/lib/addons/dragAndDrop/styles'; // Si vous utilisez DnD
```

L'implémentation SASS fournit un fichier `variables` contenant des variables de couleur et de dimensionnement que vous pouvez mettre à jour pour les adapter à votre application.  _Remarque:_ La modification et/ou le remplacement des styles prédéfnis peuvent entraîner des problèmes de rendu avec votre
Big Calendar. Testez soigneusement chaque modification.


## Rejoignez la communauté

Aidez-nous à améliorer Big Calendar ! Rejoignez-nous sur [Slack](https://join.slack.com/t/bigcalendar/shared_invite/zt-2fapdf4pj-oEF51KD2XgHKudkXEhk2lQ).
(Les liens d'invitation Slack expirent. Si vous ne pouvez pas entrer, signalez simplement un problème et nous vous fournirons un nouveau lien.)
