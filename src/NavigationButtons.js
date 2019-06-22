import PropTypes from 'prop-types'
import React from 'react'

import NavigationButton from './NavigationButton'

export const TodayButton = ({ onClick, message: today }) => (
  <NavigationButton onClick={onClick} message={today} />
)

TodayButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
}

export const NextButton = ({ onClick, message: next }) => (
  <NavigationButton onClick={onClick} message={next} />
)

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
}

export const PreviousButton = ({ onClick, message: previous }) => (
  <NavigationButton onClick={onClick} message={previous} />
)

PreviousButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
}
