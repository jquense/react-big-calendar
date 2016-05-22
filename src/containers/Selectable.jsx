import React, { PropTypes } from 'react'

function Selectable(Component, options) {
  const displayName = Component.displayName || Component.name || 'Component'
  let unregister = () => {
    console.log('unregister called before component mounted')
  }
  return class extends React.Component {
    static displayName = `Selectable(${displayName})`
    
    constructor(props, context) {
      super(props, context)
      if (!context || !context.registerSelectable) {
        throw new Error('Selectable must be wrapped in a Selection component')
      }
      this.context = context
      this.state = {
        selected: false
      }
    }

    static contextTypes = {
      registerSelectable: PropTypes.func,
      unregisterSelectable: PropTypes.func,
    }

    componentDidMount() {
      const key = options.key(this.props)
      this.context.registerSelectable(this, key, options.value(this.props), this.selectItem.bind(this))
      unregister = this.context.unregisterSelectable.bind(null, this, key)
    }
    
    componentWillUnmount() {
      unregister()
    }

    selectItem(value) {
      this.setState({ selected: value })
    }

    render() {
      return <Component {...this.props} selected={this.state.selected} />
    }
  }
}

export default Selectable