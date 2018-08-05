import PropTypes from 'prop-types'
import React, { Component } from 'react'

export const buttonWrapper = Base => {
  const { navAction, message } = Base
  return class ButtonWrapper extends Component {
    static propTypes = {
      navigate: PropTypes.func.isRequired,
      messages: PropTypes.object.isRequired,
    }

    render() {
      return (
        <button
          type="button"
          onClick={this.props.navigate.bind(null, navAction)}
        >
          {this.props.messages[message]}
        </button>
      )
    }
  }
}
