import React from 'react';
import localizer from './utils/localizer'
import message from './utils/messages';
import { navigate, views } from './utils/constants';

let Toolbar = React.createClass({
  render() {
    let { date, longFormat, messages } = this.props;

    messages = message(messages)

    return (
      <div>
        <span>
          <button type='button' onClick={this.navigate.bind(null, navigate.PREVIOUS)}>
            {messages.previous}
          </button>
          <button type='button' onClick={this.navigate.bind(null, navigate.NEXT)}>
            {messages.next}
          </button>
        </span>

        <button type='button' onClick={this.navigate.bind(null, navigate.TODAY)}>
          {messages.today}
        </button>

        <span>
          { localizer.format(date, longFormat)}
        </span>
        <span>
          <button type='button' onClick={this.view.bind(null, views.MONTH)}>
            {messages.month}
          </button>
          <button type='button' onClick={this.view.bind(null, views.WEEK)}>
            {messages.week}
          </button>
          <button type='button' onClick={this.view.bind(null, views.DAY)}>
            {messages.day}
          </button>
        </span>
      </div>
    );
  },

  navigate(action){
    this.props.onNavigate(action)
  },

  view(view){
    this.props.onViewChange(view)
  }
});

export default Toolbar;
