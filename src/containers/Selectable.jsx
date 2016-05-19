import React, { PropTypes } from 'react'

function Selectable(Component, key, value) {
  const displayName = Component.displayName || Component.name || 'Component'
  return class extends React.Component {
    static displayName = `Selectable(${displayName})`
    
    constructor(props, context) {
      super(props, context)
      if (!context || !context.registerSelectable) {
        throw new Error('Selectable must be wrapped in a Selection component')
      }
      this.context = context
    }

    static contextTypes = {
      registerSelectable: PropTypes.func,
      unregisterSelectable: PropTypes.func,
      selectedNodes: PropTypes.object,
      selectedValues: PropTypes.object
    }

    componentDidMount() {
      this.context.registerSelectable(this, key, value)
      this.unregister = this.context.unregisterSelectable
    }
    
    componentWillUnmount() {
      this.unregister(this, key)
    }

    render() {
      let selected = false
      if (this.context.selectedNodes.hasOwnProperty(key)) selected = true
      return <Component {...this.props} selected={selected} />
    }
  }
}

export default Selectable