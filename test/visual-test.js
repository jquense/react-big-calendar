import React from 'react';
import { render } from 'react-dom';

import localizer from 'react-big-calendar/localizers/globalize';
import globalize from 'globalize';
import 'react-big-calendar/less/styles.less';
import Example from '../examples/demos/basic';

localizer(globalize);

let App = () => (
  <div style={{height: 400}}>
    <Example />
  </div>
)

render(<App />, document.body)
