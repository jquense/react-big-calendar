import React, { Fragment, useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { Calendar, DateLocalizer } from 'react-big-calendar'
import DemoLink from '../../DemoLink.component'
import events from '../../resources/events'
import Layout from 'react-tackle-box/Layout'

require('globalize/lib/cultures/globalize.culture.en-GB')
require('globalize/lib/cultures/globalize.culture.es')
require('globalize/lib/cultures/globalize.culture.fr')
require('globalize/lib/cultures/globalize.culture.ar-AE')

const cultures = ['en', 'en-GB', 'es', 'fr', 'ar-AE']
const lang = {
  en: null,
  'en-GB': null,
  es: {
    week: 'Semana',
    work_week: 'Semana de trabajo',
    day: 'Día',
    month: 'Mes',
    previous: 'Atrás',
    next: 'Después',
    today: 'Hoy',
    agenda: 'El Diario',

    showMore: (total) => `+${total} más`,
  },
  fr: {
    week: 'La semaine',
    work_week: 'Semaine de travail',
    day: 'Jour',
    month: 'Mois',
    previous: 'Antérieur',
    next: 'Prochain',
    today: `Aujourd'hui`,
    agenda: 'Ordre du jour',

    showMore: (total) => `+${total} plus`,
  },
  'ar-AE': {
    week: 'أسبوع',
    work_week: 'أسبوع العمل',
    day: 'يوم',
    month: 'شهر',
    previous: 'سابق',
    next: 'التالي',
    today: 'اليوم',
    agenda: 'جدول أعمال',

    showMore: (total) => `+${total} إضافي`,
  },
}

export default function CulturesDemo({ localizer }) {
  const [culture, setCulture] = useState('fr')
  const [rightToLeft, setRightToLeft] = useState(false)

  const cultureOnClick = useCallback(
    ({ target: { value } }) => {
      // really better to useReducer for simultaneously setting multiple state values
      setCulture(value)
      setRightToLeft(value === 'ar-AE')
    },
    [setCulture]
  )

  const { defaultDate, messages } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 1),
      messages: lang[culture],
    }),
    [culture]
  )

  return (
    <Fragment>
      <DemoLink fileName="cultures">
        <Layout direction="column" align="center">
          <label>Select a Culture</label>{' '}
          <select
            className="form-control"
            style={{ width: 200, display: 'inline-block' }}
            defaultValue={'fr'}
            onChange={cultureOnClick}
          >
            {cultures.map((c, idx) => (
              <option key={idx} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Layout>
      </DemoLink>
      <div className="height600">
        <Calendar
          culture={culture}
          defaultDate={defaultDate}
          events={events}
          localizer={localizer}
          messages={messages}
          rtl={rightToLeft}
        />
      </div>
    </Fragment>
  )
}
CulturesDemo.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}
