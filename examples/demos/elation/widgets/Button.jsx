import React from 'react';
import styles from './Button.less';

const Button = ({ children, ...props }) => (
  <button className={styles.button} {...props} type="button">{children}</button>
);

export default Button;
