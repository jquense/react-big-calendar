import React, { PropTypes } from 'react';
import message from './utils/messages';
import localizer from './utils/localizer'

import { dateFormat } from './utils/propTypes';
import { accessor } from './utils/accessors';

class AgendaDay {
  render(){
    let { date, label } = this.props;
    return (
      <div>

      </div>
    )
  }
}

let Agenda = React.createClass({

  propTypes: {

    messages: PropTypes.shape({
      date: PropTypes.string,
      time: PropTypes.string,
      event: PropTypes.string
    })
  },

  render() {
    let { length, date, events } = this.props;
    let end = dates.add(date, length, 'day')

    let range = dates.range(date, end, 'day');

    events = events.filter(event => inRange)

    return (
      <div>
        <table>
          <thead>
            <tr>{this.renderHeader()}</tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    );
  },

  renderDay(events){
    let { date, culture, agendaDateFormat, agendaTimeFormat, components } = this.props;


    return [
      <td>{localizer.format(date, agendaDateFormat, culture)}</td>
      <td>
        {localizer.format(date, agendaDateFormat, culture)}
      </td>
    ]
  },

  renderHeader(){
    let messages = message(this.props.messages);

    return [
      <th>{messages.date}</th>,
      <th>{messages.time}</th>,
      <th>{messages.event}</th>
    ]
  }
});

export default Agenda
