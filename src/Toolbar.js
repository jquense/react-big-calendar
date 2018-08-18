import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'

import { NextButton, PreviousButton, TodayButton } from './Buttons'

const defaultToolbarConfig = {
  left: 'today,previous,next',
  center: 'title',
  right: 'month,week,agenda',
}

class Toolbar extends React.Component {
  static propTypes = {
    view: PropTypes.string.isRequired,
    views: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.node.isRequired,
    localizer: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
    components: PropTypes.object,
    toolbarConfig: PropTypes.object,
  }

  static defaultProps = {
    toolbarConfig: defaultToolbarConfig,
    components: {},
  }

  render() {
    let {
      localizer: { messages },
      label,
      components,
      toolbarConfig,
    } = this.props
    const buttons = {
      today: components.today || TodayButton,
      next: components.next || NextButton,
      previous: components.previous || PreviousButton,
    }
    let CenterComponent
    if (toolbarConfig.center in components) {
      CenterComponent = label => {
        const Component = components[toolbarConfig.center]
        return <Component label={label} />
      }
    } else {
      CenterComponent = label => (
        <span className="rbc-toolbar-label">{label}</span>
      )
    }
    const config = { ...defaultToolbarConfig, ...toolbarConfig }
    return (
      <div className="rbc-toolbar">
        {this.leftButtons(messages, config, buttons)}
        {CenterComponent(label)}
        {this.rightButtons(messages, config)}
      </div>
    )
  }

  leftButtons = (messages, toolbarConfig, buttons) =>
    toolbarConfig.left.split(' ').map(group => (
      <span className="rbc-btn-group">
        {group.split(',').map(btn => {
          const ButtonComponent = buttons[btn]
          return (
            <ButtonComponent
              key={btn}
              messages={messages}
              navigate={this.navigate}
            />
          )
        })}
      </span>
    ))

  rightButtons = (messages, toolbarConfig) =>
    this.viewNamesGroup(messages, toolbarConfig)

  navigate = action => {
    this.props.onNavigate(action)
  }

  view = view => {
    this.props.onView(view)
  }

  viewNamesGroup(messages, toolbarConfig) {
    let viewNames = this.props.views
    const view = this.props.view

    if (viewNames.length > 1) {
      return toolbarConfig.right.split(' ').map(group => (
        <span className={'rbc-btn-group'}>
          {group.split(',').map(name => (
            <button
              type="button"
              key={name}
              className={cn({ 'rbc-active': view === name })}
              onClick={this.view.bind(null, name)}
            >
              {messages[name]}
            </button>
          ))}
        </span>
      ))
    }
  }
}

export default Toolbar
