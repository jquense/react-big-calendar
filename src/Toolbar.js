import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
import Button from '@folio/stripes-components/lib/Button';
import { navigate } from './utils/constants'

class Toolbar extends React.Component {
  static propTypes = {
    view: PropTypes.string.isRequired,
    views: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.node.isRequired,
    messages: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
    onViewChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
}

  render() {
    let { messages, label } = this.props

    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return (
      <div className="rbc-toolbar">
        <span>
          <Button title={messages.today} onClick={this.navigate.bind(null, navigate.TODAY)}>
            {messages.today}
          </Button>

          <Button title={messages.previous} onClick={this.navigate.bind(null, navigate.PREVIOUS)}>
            {messages.previous}
          </Button>

          <Button title={messages.next} onClick={this.navigate.bind(null, navigate.NEXT)}>
            {messages.next}
          </Button>
        </span>

        <span className="rbc-toolbar-label">{label}</span>

        <span>{this.viewNamesGroup(messages)}</span>
      </div>
    )
  }

  navigate = action => {
    this.props.onNavigate(action)
  }

  view = view => {
    this.props.onViewChange(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return viewNames.map(name => (
        <Button 
          title={messages[name]} 
          key={name}
          onClick={this.view.bind(null, name)}
          buttonStyle={view === name ? 'primary': 'default'}>
          {messages[name]}
        </Button>        
      ))
    }
  }
}

export default Toolbar
