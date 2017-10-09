import React from 'react';
import BigCalendar from '../../src';
import events from '../events';

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

let Basic = React.createClass({
  handleInlineEditEventTitle(title) {
    console.log(title);
  },

  render() {
    return (
      <BigCalendar
        {...this.props}
        defaultDate={new Date(2015, 3, 1)}
        events={events}
        showAllEvents
        step={60}
        views={allViews}
        onInlineEditEventTitle={this.handleInlineEditEventTitle}
      />
    );
  },
});

export default Basic;
