import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
import { navigate } from './utils/constants'
import { NextButton, PreviousButton, TodayButton } from './NavigationButtons'

export default class Toolbar extends React.Component {
  navigateToday = () => this.navigate(navigate.TODAY)

  navigateNext = () => this.navigate(navigate.NEXT)

  navigatePrevious = () => this.navigate(navigate.PREVIOUS)

  render() {
    const {
      props: {
        label,
        components: {
          nextButton,
          previousButton,
          todayButton,
          extraButtons = [],
        },
        localizer: {
          messages: { today, next, previous, ...messages },
        },
      },
    } = this

    const NextButtonComponent = nextButton || NextButton
    const PreviousButtonComponent = previousButton || PreviousButton
    const TodayButtonComponent = todayButton || TodayButton

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          {extraButtons.map(({ component: Button, onClick, ...props }) => (
            <Button {...props} onClick={onClick} />
          ))}
          <TodayButtonComponent message={today} onClick={this.navigateToday} />
          <PreviousButtonComponent
            message={previous}
            onClick={this.navigatePrevious}
          />
          <NextButtonComponent message={next} onClick={this.navigateNext} />
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

Toolbar.propTypes = {
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node.isRequired,
  localizer: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  components: PropTypes.object.isRequired,
}
