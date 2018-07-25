import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from '../events'

require('globalize/lib/cultures/globalize.culture.en-GB')
require('globalize/lib/cultures/globalize.culture.es')
require('globalize/lib/cultures/globalize.culture.fr')
require('globalize/lib/cultures/globalize.culture.ar-AE')

class Cultures extends React.Component {
  state = { culture: 'fr' }

  render() {
    const { localizer } = this.props
    let cultures = ['en', 'en-GB', 'es', 'fr', 'ar-AE']
    let rtl = this.state.culture === 'ar-AE'

    return (
      <React.Fragment>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <label>Select a Culture</label>{' '}
          <select
            className="form-control"
            style={{ width: 200, display: 'inline-block' }}
            defaultValue={'fr'}
            onChange={e => this.setState({ culture: e.target.value })}
          >
            {cultures.map((c, idx) => (
              <option key={idx} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <BigCalendar
          rtl={rtl}
          events={events}
          culture={this.state.culture}
          defaultDate={new Date(2015, 3, 1)}
          localizer={localizer}
        />
      </React.Fragment>
    )
  }
}

export default Cultures
