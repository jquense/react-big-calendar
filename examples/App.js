import React from 'react';
import Modal from 'react-overlays/lib/Modal';

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

function EventWeek(props) {
  return <strong>{props.event.title}</strong>
}

function EventAgenda(props) {
  return <em>{props.event.title}</em>
}


const Example = React.createClass({
  getInitialState(){
    return { showModal: false };
  },
  render() {

    return (
      <div className='app'>
        <main className=''>
          <BigCalendar
            selectable
            popup
            events={events}
            onSelectEvent={this.open}
            defaultDate={new Date(2015, 3, 1)}
            eventPropGetter={e => ({ className: 'hi-event'})}
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
  },
  close(){
    this.setState({ showModal: false });
  },

  open(){
    this.setState({ showModal: true });
  }
});

render(<Example/>, document.body);
