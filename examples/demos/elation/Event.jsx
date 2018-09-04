import PropTypes from 'prop-types';
import React from 'react';


const BLUE = '#3174ad';

const styles = {
  bar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 5,
    width: 10,
    backgroundColor: BLUE
  }
};


export default class Event extends React.Component {
  static propTypes = {
    event: PropTypes.object,
    title: PropTypes.node
  }

  render() {
    const { /*event, */title } = this.props;

    return <div>{title}<div style={styles.bar}></div></div>
  }
}
