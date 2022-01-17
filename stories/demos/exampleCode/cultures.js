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

  const defaultDate = useMemo(() => new Date(2015, 3, 1), [])

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
      <Calendar
        culture={culture}
        defaultDate={defaultDate}
        events={events}
        localizer={localizer}
        rtl={rightToLeft}
      />
    </Fragment>
  )
}
CulturesDemo.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}
