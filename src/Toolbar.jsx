import React from 'react';
import cn from 'classnames';
import message from './utils/messages';
import { navigate } from './utils/constants';

let Toolbar = React.createClass({

  render() {
    let {
        messages, label
      , views: viewNames, view } = this.props;

    messages = message(messages)

    return (
      <div className='rbc-toolbar'>
        <span className='rbc-btn-group'>
          <button
            type='button'
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            {messages.today}
          </button>
          <button
            type='button'
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            {messages.previous}
          </button>
          <button
            type='button'
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            {messages.next}
          </button>
        </span>

        <span className='rbc-toolbar-label'>
          { label }
        </span>

        <span className='rbc-btn-group'>
          {
            viewNames.map(name =>
              <button type='button' key={name}
                className={cn({'rbc-active': view === name})}
                onClick={this.view.bind(null, name)}
              >
                {messages[name]}
              </button>
            )
          }
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
