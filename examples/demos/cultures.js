import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events';

require('globalize/lib/cultures/globalize.culture.en-GB');
require('globalize/lib/cultures/globalize.culture.es');
require('globalize/lib/cultures/globalize.culture.fr');
require('globalize/lib/cultures/globalize.culture.ar-AE');

let Cultures = React.createClass({

  getInitialState(){
    return { culture: 'fr' }
  },

  render(){
    let cultures = ['en', 'en-GB', 'es', 'fr', 'ar-AE']

    return (
      <div>
        <h3 style={{ marginBottom: 20 }}>
          <label>Select a Culture</label>
          {' '}
          <select
            defaultValue={'fr'}
            onChange={e => this.setState({ culture: e.target.value })}
          >
          {
            cultures.map((c, idx) =>
              <option key={idx} value={c}>{c}</option>
            )
          }
          </select>
        </h3>
        <BigCalendar
          events={events}
          culture={this.state.culture}
          defaultDate={new Date(2015, 3, 1)}
        />
      </div>
    )
  }
})

export default Cultures;
