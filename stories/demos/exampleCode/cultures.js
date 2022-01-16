import React, { Fragment, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Calendar, DateLocalizer } from '../../../src'
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

  return (
    <Fragment>
      <div style={{ marginBottom: 10 }}>
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
      </div>
      <Calendar
        rtl={rightToLeft}
        events={events}
        culture={culture}
        defaultDate={new Date(2015, 3, 1)}
        localizer={localizer}
      />
    </Fragment>
  )
}
CulturesDemo.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}
