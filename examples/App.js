import React from 'react';
import { render } from 'react-dom';

import Button from 'react-bootstrap/lib/Button';
import { date as localizer } from 'react-widgets-globalize-localizer'

import { set } from 'react-big-calendar/utils/localizer';

set(localizer);

import BigCalendar from 'react-big-calendar';

import 'react-big-calendar/less/styles.less';
import './styles.less';


const Example = React.createClass({

  render() {

    return (
      <div className='app row'>
        <article className='side-panel col-md-2'>
          <ul className='list-unstyled'>
            <li><a href='#bigcalendar'>Big Calendar</a></li>
          </ul>
        </article>
        <main className='col-md-10'>
          <BigCalendar/>
        </main>
      </div>
    );
  }
});

render(<Example/>, document.body);
