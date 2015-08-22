import React from 'react';
import localizer from './utils/localizer'

let Toolbar = React.createClass({
  render() {
    let { date, longFormat } = this.props;

    return (
      <div>
        <span>
          <button type='button' onClick={this.navigate.bind(null, 'back')}>
            back
          </button>
          <button type='button' onClick={this.navigate.bind(null, 'forward')}>
            forward
          </button>
        </span>

        <button type='button' onClick={this.navigate.bind(null, 'today')}>
          today
        </button>

        <span>
          { localizer.format(date, longFormat)}
        </span>
        <span>
          <button type='button' onClick={this.view.bind(null, 'month')}>
            month
          </button>
          <button type='button' onClick={this.view.bind(null, 'week')}>
            week
          </button>
          <button type='button' onClick={this.view.bind(null, 'day')}>
            day
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
