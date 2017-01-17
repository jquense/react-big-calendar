import React from 'react';
import Api from './Api';
import Intro from './Intro.md';
import cn from 'classnames';
import { render } from 'react-dom';

import localizer from 'react-big-calendar/lib/localizers/globalize';
import globalize from 'globalize';

localizer(globalize);

import 'react-big-calendar/lib/less/styles.less';
import './styles.less';
import './prism.less';

let demoRoot = 'https://github.com/intljusticemission/react-big-calendar/tree/master/examples/demos'

const Example = React.createClass({
  getInitialState(){
    return {
      selected: 'basic',
    };
  },

  render() {
    let selected = this.state.selected;
    let Current = {
      basic: require('./demos/basic'),
      selectable: require('./demos/selectable'),
      cultures: require('./demos/cultures'),
      popup: require('./demos/popup'),
      rendering: require('./demos/rendering'),
      customView: require('./demos/customView'),
      timeslots: require('./demos/timeslots'),
      dnd: require('./demos/dnd')
    }[selected];

    return (
      <div className='app'>
      <div className="jumbotron">
        <div className="container">
          <h1>Big Calendar <i className='fa fa-calendar'/></h1>
          <p>such enterprise, very business.</p>
          <p>
            <a href="#intro">
              <i className='fa fa-play'/> Getting started
            </a>
            {' | '}
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
        <div className='examples'>
          <header className="contain">
            <ul className='nav nav-pills'>
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
              <li className={cn({active: selected === 'timeslots' })}>
                <a href='#' onClick={this.select.bind(null, 'timeslots')}>Timeslots</a>
              </li>
              <li className={cn({active: selected === 'rendering' })}>
                <a href='#' onClick={this.select.bind(null, 'rendering')}>Custom rendering</a>
              </li>
              {/* temporary hide link to documentation
              <li className={cn({active: selected === 'customView' })}>
                <a href='#' onClick={this.select.bind(null, 'customView')}>Custom View</a>
              </li>
              */}
              <li className={cn({active: selected === 'dnd' })}>
                <a href='#' onClick={this.select.bind(null, 'dnd')}>Drag and Drop</a>
              </li>
            </ul>
          </header>
          <div className='example'>
            <div className='view-source'>
              <a target='_blank' href={demoRoot + '/' + selected + '.js' }>
                <strong><i className='fa fa-code'/>{' View example source code'}</strong>
              </a>
            </div>
            <Current className='demo' />
          </div>
        </div>
        <div className='docs'>
          <Intro className='contain section'/>
          <Api className='contain section' />
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
