import React from 'react';
import { render } from 'react-dom';

import globalizeLocalizer from 'react-big-calendar/globalize-localizer';
import momentLocalizer from 'react-big-calendar/moment-localizer';

import { set as setLocalizer } from 'react-big-calendar/localizer';

import moment from 'moment';
import globalize from 'globalize';

import BigCalendar from 'react-big-calendar';

import 'react-big-calendar/less/styles.less';
import './styles.less';

import events from './events';

setLocalizer(
  globalizeLocalizer(globalize)
);

class EventWeek {
  render(){
    return <strong>{this.props.event.title}</strong>
  }
}

class EventAgenda {
  render(){
    return <em>{this.props.event.title}</em>
  }
}

const Example = React.createClass({

  render() {

    return (
      <div className='app'>
        <main className=''>
          <BigCalendar
            selectable
            popup
            events={events}
            defaultDate={new Date(2015, 1, 1)}
            components={{
              event: EventWeek,
              agenda: {
                event: EventAgenda
              }
            }}
          />
        </main>
      </div>
    );
  }
});

render(<Example/>, document.body);
