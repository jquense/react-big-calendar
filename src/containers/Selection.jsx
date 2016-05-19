import contains from 'dom-helpers/query/contains'

import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'

function makeSelectable(Component) {
  const displayName = Component.displayName || Component.name || 'Component'

  return class extends React.Component {
    static displayName = `Selection(${displayName})`
    constructor(props) {
      super(props)
      this.mouseDown = this.mouseDown.bind(this)
      this.mouseUp = this.mouseUp.bind(this)
      this.mouseMove = this.mouseMove.bind(this)
      this.click = this.click.bind(this)
      this.mouseDownData = null
      this.clickTolerance = 5
      this.handlers = {
        stopmouseup: () => null,
        stopmousemove: () => null
      }
      this.selectables = {}
      this.selectableKeys = []
      this.state = {
        selecting: false,
        selectedNodes: {},
        selectedValues: {}
      }
    }
    
    static propTypes = {
      clickTolerance: PropTypes.number,
      constantSelect: PropTypes.bool,
      selectable: PropTypes.bool,
      preserveSelection: PropTypes.bool
    }
    
    static defaultProps = {
      clickTolerance: 5,
      constantSelect: false,
      selectable: false,
      preserveSelection: false
    }

    static childContextTypes = {
      registerSelectable: PropTypes.func,
      unregisterSelectable: PropTypes.func,
      selectedNodes: PropTypes.object,
      selectedValues: PropTypes.object
    }

    getChildContext() {
      return {
        registerSelectable: (component, key, value) => {
          if (!this.selectables.hasOwnProperty(key)) {
            this.selectableKeys.push(key)
          }
          this.selectables[key] = { component, value }
        },
        unregisterSelectable: (component, key) => {
          delete this.selectables[key]
          this.selectableKeys = this.selectableKeys.filter((itemKey) => itemKey !== key)
          if (this.state.selectedNodes[key]) {
            const newNodes = this.state.selectedNodes
            delete this.state.SelectedNodes[key]
            this.setState({
              selecting: this.state.selecting,
              selectedNodes: newNodes
            })
          }
        },
        selectedNodes: this.state.selectedNodes,
        selectedValues: this.state.selectedValues
      }
    }

    addListener(node, type, handler) {
      node.addEventListener(type, handler)
      this.handlers[`stop${type}`] = () => {
        node.removeEventListener(type, handler)
        this.handlers[`stop${type}`] = () => null
      }
    }

    componentWillUnmount() {
      this.handlers.stopmousedown && this.handlers.stopmousedown()
      this.handlers.stopmouseup && this.handlers.stopmouseup()
      this.handlers.stopmousemove && this.handlers.stopmousemove()
    }
      /**
     * Given a node, get everything needed to calculate its boundaries
     * @param  {HTMLElement} node
     * @return {Object}
     */
    getBoundsForNode(node) {
      if (!node.getBoundingClientRect) return node;

      const rect = node.getBoundingClientRect()
      const left = rect.left + this.pageOffset('left')
      const top = rect.top + this.pageOffset('top')

      return {
        top,
        left,
        right: (node.offsetWidth || 0) + left,
        bottom: (node.offsetHeight || 0) + top
      };
    }

    objectsCollide(nodeA, nodeB, tolerance = 0) {
      const {
        top: aTop,
        left: aLeft,
        right: aRight = aLeft,
        bottom: aBottom = aTop
      } = this.getBoundsForNode(nodeA);
      const {
        top: bTop,
        left: bLeft,
        right: bRight = bLeft,
        bottom: bBottom = bTop
      } = this.getBoundsForNode(nodeB);

      return !(
        // 'a' bottom doesn't touch 'b' top
        ((aBottom - tolerance ) < bTop)  ||
        // 'a' top doesn't touch 'b' bottom
        ((aTop + tolerance) > (bBottom)) ||
        // 'a' right doesn't touch 'b' left
        ((aRight - tolerance) < bLeft )  ||
        // 'a' left doesn't touch 'b' right
        ((aLeft + tolerance) > (bRight) )
      );
    }

    pageOffset(dir) {
      if (dir === 'left')
        return (window.pageXOffset || document.body.scrollLeft || 0)
      if (dir === 'top')
        return (window.pageYOffset || document.body.scrollTop || 0)
    }

    isOverContainer(container, x, y) {
      return !container || contains(container, document.elementFromPoint(x, y))
    }

    isClick(e) {
      const { x, y } = this.mouseDownData;
      return (
        Math.abs(e.pageX - x) <= this.clickTolerance &&
        Math.abs(e.pageY - y) <= this.clickTolerance
      );
    }

    mouseDown(e) {
      if (!this.props.selectable) return
      const node = findDOMNode(this.ref)
      if (e.which === 3 || e.button === 2 || !this.isOverContainer(node, e.clientX, e.clientY))
        return
      if (!this.objectsCollide(this.getBoundsForNode(node), {
        top: e.pageY,
        left: e.pageX
      })) return

      this.mouseDownData = {
        x: e.pageX,
        y: e.pageY,
        clientX: e.clientX,
        clientY: e.clientY
      }

      if (this.props.constantSelect) {
        this.createSelectRect(e)
        this.setState({...this.selectNodes(e)})
      }

      e.preventDefault()

      this.addListener(node, 'mouseup', this.mouseUp)
      this.addListener(node, 'mousemove', this.mouseMove)
    }

    click(e) {
      if (!this.props.selectable) return
      if (!this.mouseDownData) return
      this.handlers.stopmouseup()
      this.handlers.stopmousemove()
      this.createSelectRect(e)
      if (this.props.constantSelect && !this.props.preserveSelection) {
        this.setState({ selecting: false, selectedNodes: {}, selectedValues: {}})
        return
      }
      if (this.state.selecting) {
        this.setState({ selecting: false, ...this.selectNodes(e)  })
      } else {
        this.setState({...this.selectNodes(e)})
      }
    }

    mouseUp(e) {
      this.handlers.stopmouseup()
      this.handlers.stopmousemove()

      if (!this.mouseDownData) return

      if (this.isClick(e)) {
        if (this.state.selecting) {
          this.setState({ selecting: false })
        }
        return
      }

      if (this.props.constantSelect && !this.props.preserveSelection) {
        this.setState({ selecting: false, selectedNodes: {}, selectedValues: {}})
        return
      }
      const state = { selecting: false, ...this.selectNodes(e) }

      return this.setState(state)
    }

    mouseMove(e) {
      if (!this.mouseDownData) return
      const old = this.state.selecting;

      if (!old) {
        this.setState({selecting: true})
      }

      if (!this.isClick(e.pageX, e.pageY))
      this.createSelectRect(e)
      if (this.props.constantSelect) {
        this.setState({...this.selectNodes(e)})
      }
    }

    createSelectRect(e) {
      const { x, y } = this.mouseDownData;
      const w = Math.abs(x - e.pageX);
      const h = Math.abs(y - e.pageY);

      const left = Math.min(e.pageX, x)
      const top = Math.min(e.pageY, y)

      this._selectRect = {
        top,
        left,
        x: e.pageX,
        y: e.pageY,
        right: left + w,
        bottom: top + h
      }
    }

    selectNodes() {
      const nodes = this.state.selectedNodes
      const values = this.state.selectedValues
      let changed = false

      this.selectableKeys.forEach((key) => {
        const node = this.selectables[key]
        const domnode = findDOMNode(node.component)
        if (!domnode || !this.objectsCollide(this._selectRect, domnode, this.clickTolerance)) {
          delete nodes[key]
          delete values[key]
          changed = true
          return
        }
        nodes[key] = node.component
        values[key] = node.value
        changed = true
      })
      if (changed) return {
        selectedNodes: nodes,
        selectedValues: values
      }
      return {
        selectedNodes: this.state.selectedNodes,
        selectedValues: this.state.selectedValues
      }
    }

    render() {
      return <div onMouseDown={this.mouseDown} onClick={this.click}>
        <Component ref={(ref) => { this.ref = ref }} {...this.props} {...this.state} />
        </div>
    }
  }
}

export default makeSelectable
