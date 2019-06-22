import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
import {
  NextButton,
  PreviousButton,
  TodayButton
} from './NavigationButtons'
import { navigate } from './utils/constants'

class Toolbar extends React.Component {
  static propTypes = {
    view: PropTypes.string.isRequired,
    views: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.node.isRequired,
    localizer: PropTypes.object,
    onNavigate: PropTypes.func.isRequired,
    onView: PropTypes.func.isRequired,
    components: PropTypes.object.isRequired,
  }

  navigateToday = navigate => this.navigate(navigate.TODAY)

  navigateNext = navigate => this.navigate(navigate.NEXT)

  navigatePrevious = navigate => this.navigate(navigate.PREVIOUS)

  render() {
    const {
      components: {
        NextButton: ComponentsNext,
        PreviousButton: ComponentsPrevious,
        TodayButton: ComponentsToday,
        extraButtons = [],
      },
      localizer: { messages },
      label,
    } = this.props

    const NextButtonComponent = ComponentsNext || NextButton
    const PreviousButtonComponent = ComponentsPrevious || PreviousButton
    const TodayButtonComponent = ComponentsToday || TodayButton

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          {extraButtons.map(({component: Button, onClick, ...props}) => (
            <Button {...props} localizer={localizer} onClick={onClick}/>
          ))}
          <TodayButtonComponent
            localizer={localizer}
            onClick={this.navigateToday} />
          <PreviousButtonComponent
            localizer={localizer}
            onClick={this.navigatePrevious} />
          <NextButtonComponent
            localizer={localizer}
            onClick={this.navigateNext} />
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
