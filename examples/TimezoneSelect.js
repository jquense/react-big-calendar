import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'react-tackle-box/Layout'
import moment from 'moment'
import 'moment-timezone'

import ExampleControlSlot from './ExampleControlSlot'

const allZones = moment.tz.names()
allZones.unshift('clear')

export default function TimezoneSelect({
  title,
  defaultTZ = moment.tz.guess(),
  timezone,
  setTimezone,
}) {
  const onChange = ({ target: { value } }) =>
    setTimezone(value ? value : defaultTZ)

  return (
    <ExampleControlSlot.Entry waitForOutlet>
      <Layout direction="column" align="center">
        {title ? <h4>{title}</h4> : null}
        <label>Select a Timezone</label>{' '}
        <select
          className="form-control"
          style={{ width: 200, display: 'inline-block' }}
          value={timezone}
          onChange={onChange}
        >
          {allZones.map((c, idx) => (
            <option key={idx} value={c !== 'clear' ? c : ''}>
              {c}
            </option>
          ))}
        </select>
      </Layout>
    </ExampleControlSlot.Entry>
  )
}

TimezoneSelect.propTypes = {
  title: PropTypes.string,
  defaultTZ: PropTypes.string,
  timezone: PropTypes.string,
  setTimezone: PropTypes.func,
}
