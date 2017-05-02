import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events';

require('globalize/lib/cultures/globalize.culture.en-GB');
require('globalize/lib/cultures/globalize.culture.es');
require('globalize/lib/cultures/globalize.culture.fr');
require('globalize/lib/cultures/globalize.culture.ar-AE');

class Cultures extends React.Component {
    constructor() {
        super();

        this.state = {
            culture: 'fr',
        };
    }

    render() {
        const {culture} = this.state;
        const cultures = ['en', 'en-GB', 'es', 'fr', 'ar-AE'];
        const rtl = culture === 'ar-AE';

        return (
            <div {...this.props}>
                <h3 className="callout">
                    <label>Select a Culture</label>
                    {' '}
                    <select className='form-control'
                            defaultValue={'fr'}
                            onChange={e => this.setState({culture: e.target.value})}
                            style={{width: 200, display: 'inline-block'}}>
                        {
                            cultures.map((c, idx) =>
                                <option key={idx} value={c}>{c}</option>
                            )
                        }
                    </select>
                </h3>

                <BigCalendar culture={culture}
                             defaultDate={new Date(2015, 3, 1)}
                             events={events}
                             rtl={rtl}/>
            </div>
        )
    }
}

export default Cultures;
