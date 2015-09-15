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


let rand = ()=> (Math.floor(Math.random() * 20) - 10);

const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 0, bottom: 0, left: 0, right: 0
};

const backdropStyle = {
  ...modalStyle,
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.5
};

const dialogStyle = function() {
  // we use some psuedo random coords so modals
  // don't sit right on top of each other.
  let top = 50 + rand();
  let left = 50 + rand();

  return {
    position: 'absolute',
    width: 400,
    top: top + '%', left: left + '%',
    transform: `translate(-${top}%, -${left}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: 'white',
    boxShadow: '0 5px 15px rgba(0,0,0,.5)',
    padding: 20
  };
};

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
        <Modal
          aria-labelledby='modal-label'
          style={modalStyle}
          backdropStyle={backdropStyle}
          show={this.state.showModal}
          onHide={this.close}
        >
          <div style={dialogStyle()} >
            <h4 id='modal-label'>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
          </div>
        </Modal>
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
