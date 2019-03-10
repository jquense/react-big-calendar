import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
import { navigate } from './utils/constants'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronCircleRight,
  faChevronCircleLeft,
  faListAlt,
} from '@fortawesome/free-solid-svg-icons'

library.add(faChevronCircleRight, faChevronCircleLeft, faListAlt)

class Toolbar extends React.Component {
  render() {
    let {
      localizer: { messages },
      label,
    } = this.props

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.TODAY)}
          >
            {messages.today}
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
            alt={messages.previous}
          >
            <FontAwesomeIcon icon="chevron-circle-left" />
          </button>
          <button
            type="button"
            onClick={this.navigate.bind(null, navigate.NEXT)}
            alt={messages.next}
          >
            <FontAwesomeIcon icon="chevron-circle-right" />
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
    this.props.onView(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return viewNames.map(name => {
        if (messages[name] == 'Agenda') {
          return (
            <button
              type="button"
              key={name}
              className={cn({ 'rbc-active': view === name })}
              onClick={this.view.bind(null, name)}
              alt={messages[name]}
            >
              <FontAwesomeIcon icon="list-alt" />
            </button>
          )
        } else {
          return (
            <button
              type="button"
              key={name}
              className={cn({ 'rbc-active': view === name })}
              onClick={this.view.bind(null, name)}
            >
              {messages[name]}
            </button>
          )
        }
      })
    }
  }
}

Toolbar.propTypes = {
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node.isRequired,
  localizer: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
}

export default Toolbar
