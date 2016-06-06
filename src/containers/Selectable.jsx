import React, { PropTypes } from 'react'

function Selectable(Component, options) {
  const displayName = Component.displayName || Component.name || 'Component'
  let unregister = () => null
  return class extends React.Component {
    static displayName = `Selectable(${displayName})`
    
    constructor(props, context) {
      super(props, context)
      this.state = {
        selected: false
      }
      const key = options.key(this.props)
    }

    static contextTypes = {
      registerSelectable: PropTypes.func,
      unregisterSelectable: PropTypes.func
    }

    componentDidMount() {
      if (!this.context || !this.context.registerSelectable) return
      const key = options.key(this.props)
      this.context.registerSelectable(this, key, options.value(this.props), this.selectItem.bind(this))
      unregister = this.context.unregisterSelectable.bind(null, this, key)
    }
    
    componentWillUnmount() {
      unregister()
      unregister = () => null
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