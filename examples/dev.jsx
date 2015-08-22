'use strict';
var React = require('react')
  , Month = require('../src/Month')


// Simple component to pull it all together
var App = React.createClass({

  render(){

    return (
      <Month value={new Date}/>
    )
  }
})

React.render(<App/>, document.body);



