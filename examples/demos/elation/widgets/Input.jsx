import React from 'react';
import styles from './Input.less';

const Input = ({ children, ...props }) => (
  <input className={styles.input} {...props}>{children}</input>
);

export default Input;
