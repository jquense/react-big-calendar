import React, { Component } from 'react';
import styles from './ButtonGroup.less';

export default class ButtonGroup extends Component {
  render() {
    const { children, ...props } = this.props;

    return (
      <span className={styles.container} {...props}>
        {children}
      </span>
    );
  }
}
