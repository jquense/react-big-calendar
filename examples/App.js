import React from 'react';
import { render } from 'react-dom';

import Button from 'react-bootstrap/lib/Button';
import { date as localizer } from 'react-widgets-globalize-localizer'

import { set } from 'react-big-calendar/utils/localizer';

set(localizer);

import BigCalendar from 'react-big-calendar';

import 'react-big-calendar/less/styles.less';
import './styles.less';


import events from './events';

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
          <BigCalendar selectable
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
