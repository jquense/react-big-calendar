import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Selectable from '../../containers/Selectable.jsx'
import Selection from '../../containers/Selection.jsx'

class Thing extends React.Component {
  render() {
    return <div style={{
      width: 50,
      height: 50,
      backgroundColor: (this.props.selected ? 'green' : 'red'),
      margin: 10}}
    >
      {this.props.thing}
    </div>
  }
}

let val = 1
function selectableFactory() {
  return () => {
    return Selectable(Thing, `key${val}`, val++)
  }
}

const Thing1 = selectableFactory()(), Thing2 = selectableFactory()(), Thing3 = selectableFactory()()
class Test extends React.Component {
  render() {
    return <div style={{width: 100, height: 200, padding: 30, backgroundColor: '#ff8888'}}>{this.props.children}</div>
  }
}

storiesOf('module.Selectable', module)
  .add('selectable, constant select', () => {
    const Sel = Selection(Test)
    return (
      <Sel constantSelect selectable>
        <Thing1 thing="hi" />
        <Thing2 thing="there" />
        <Thing3 thing="foo" />
      </Sel>
    )
  })

  .add('selectable, not constant select', () => {
    const Sel = Selection(Test)
    return (
      <Sel selectable>
        <Thing1 thing="hi" />
        <Thing2 thing="there" />
        <Thing3 thing="foo" />
      </Sel>
    )
  })

  .add('not selectable', () => {
    const Sel = Selection(Test)
    return (
      <Sel>
        <Thing1 thing="hi" />
        <Thing2 thing="there" />
        <Thing3 thing="foo" />
      </Sel>
    )
  })

  .add('selectable, constant select, preserve selection', () => {
    const Sel = Selection(Test)
    return (
      <Sel constantSelect selectable preserveSelection>
        <Thing1 thing="hi" />
        <Thing2 thing="there" />
        <Thing3 thing="foo" />
      </Sel>
    )
  })

  .add('selectable, not constant select, preserve selection', () => {
    const Sel = Selection(Test)
    return (
      <Sel selectable preserveSelection>
        <Thing1 thing="hi" />
        <Thing2 thing="there" />
        <Thing3 thing="foo" />
      </Sel>
    )
  })


