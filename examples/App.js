import React from 'react';
import Api from './Api';
import cn from 'classnames';
import { render } from 'react-dom';

import localizer from 'react-big-calendar/localizers/globalize';
import globalize from 'globalize';

localizer(globalize);

import 'react-big-calendar/less/styles.less';
import './styles.less';


const Example = React.createClass({
  getInitialState(){
    return {
      selected: 'basic'
    };
  },

  render() {
    let selected = this.state.selected;
    let Current = {
      basic: require('./demos/basic'),
      selectable: require('./demos/selectable'),
      cultures: require('./demos/cultures'),
      popup: require('./demos/popup'),
      rendering: require('./demos/rendering')
    }[selected];

    return (
      <div className='app'>
      <div className="jumbotron">
        <div className="container">
          <h1>Big Calendar <i className='fa fa-calendar'/></h1>
          <p>such enterprise, very business.</p>
          <p>
            <a href="#api">
              <i className='fa fa-book'/> API documentation
            </a>
            {' | '}
            <a target='_blank' href="https://github.com/intljusticemission/react-big-calendar">
              <i className='fa fa-github'/> github
            </a>
          </p>
        </div>
      </div>
        <div className='examples contain'>
          <aside>
            <ul className='nav nav-pills nav-stacked'>
              <li className={cn({active: selected === 'basic' })}>
                <a href='#' onClick={this.select.bind(null, 'basic')}>Basic</a>
              </li>
              <li className={cn({active: selected === 'selectable' })}>
                <a href='#' onClick={this.select.bind(null, 'selectable')}>Selectable</a>
              </li>
              <li className={cn({active: selected === 'cultures' })}>
                <a href='#' onClick={this.select.bind(null, 'cultures')}>I18n and Locales</a>
              </li>
              <li className={cn({active: selected === 'popup' })}>
                <a href='#' onClick={this.select.bind(null, 'popup')}>Popup</a>
              </li>
              <li className={cn({active: selected === 'rendering' })}>
                <a href='#' onClick={this.select.bind(null, 'rendering')}>Custom rendering</a>
              </li>
            </ul>
          </aside>
          <div className='example'>
            <Current />
          </div>
        </div>
        <div className='docs'>
          <Api className='contain' />
        </div>
      </div>
    );
  },

  select(selected, e){
    e.preventDefault();
    this.setState({ selected })
  }
});

render(<Example/>, document.getElementById('root'));
