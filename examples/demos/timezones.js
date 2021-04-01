import React from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import tzEvents from '../timezoneEvents'
import { SomeTimezones } from '../allTimezones'
import Layout from 'react-tackle-box/Layout'
import moment from 'moment'
import 'moment-timezone'

import ExampleControlSlot from '../ExampleControlSlot'

const allEvents = [...tzEvents]

const getLocalizer = tz => {
  const localizedMoment = (...args) => moment(...args).tz(tz)
  localizedMoment.localeData = moment.localeData
  return momentLocalizer(localizedMoment, true)
}

const timeAccessor = (m, date) => {
  return new Date(date)
}

class Cultures extends React.Component {
  state = { tz: SomeTimezones[0] }

  render() {
    const localizer = getLocalizer(this.state.tz)

    return (
      <React.Fragment>
        <ExampleControlSlot.Entry waitForOutlet>
          <Layout direction="column" align="center">
            <label>Select a Timezone</label>{' '}
            <select
              className="form-control"
              style={{ width: 200, display: 'inline-block' }}
              defaultValue={'fr'}
              onChange={e => this.setState({ tz: e.target.value })}
            >
              {SomeTimezones.map((c, idx) => (
                <option key={idx} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Layout>
        </ExampleControlSlot.Entry>
        <Calendar
          defaultView={Views.WEEK}
          events={allEvents}
          startAccessor={e => timeAccessor(moment, e.start)}
          showMultiDayTimes
          endAccessor={e => timeAccessor(moment, e.end)}
          defaultDate={
            new Date(
              moment
                .tz('2015-4-13', this.state.tz)
                .startOf('day')
                .format()
            )
          }
          localizer={localizer}
        />
      </React.Fragment>
    )
  }
}

export default Cultures
