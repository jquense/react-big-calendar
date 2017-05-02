import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events';

class Basic extends React.Component {
    render() {
        return (
            <BigCalendar {...this.props}
                         defaultDate={new Date(2015, 3, 1)}
                         events={events}/>
        );
    }
}

export default Basic;
