import PropTypes from 'prop-types';
import React from 'react';

class ExpandableEventComponent extends React.Component {
  render () {
    return (
      <div className="rbc-addons-dnd-expandable-event">
        {this.props.title}
        <div className="rbc-addons-dnd-expand-anchor">
          <div className="rbc-addons-dnd-expand-icon" />
        </div>
      </div>
    );
  }
}

export default ExpandableEventComponent;
