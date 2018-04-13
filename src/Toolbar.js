import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
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

  render() {
    let { messages, label } = this.props

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M8.414 11.5H18a1 1 0 0 1 0 2H8.414l3.793 3.793a1 1 0 0 1-1.414 1.414l-5.5-5.5a1 1 0 0 1 0-1.414l5.5-5.5a1 1 0 0 1 1.414 1.414L8.414 11.5z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            {messages.today}
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M11.793 5.793a.999.999 0 0 0 0 1.414L15.586 11H6a1 1 0 0 0 0 2h9.586l-3.793 3.793a.999.999 0 0 0 0 1.414c.39.39 1.024.39 1.415 0l5.499-5.5a.997.997 0 0 0 .293-.679v-.057a.996.996 0 0 0-.293-.678l-5.499-5.5a1 1 0 0 0-1.415 0z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </span>

        <span className="rbc-toolbar-label">{label}</span>

        <span className="rbc-btn-group">{this.viewNamesGroup(messages)}</span>
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
        <button
          type="button"
          key={name}
          className={cn({ 'rbc-active': view === name })}
          onClick={this.view.bind(null, name)}
        >
          {messages[name]}
        </button>
      ))
    }
  }
}

export default Toolbar
