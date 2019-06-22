import PropTypes from 'prop-types'
import React from 'react'

import NavigationButton from './NavigationButton'


export const TodayButton = ({onClick, localizer: { messages: { today } }}) =>(
  <NavigationButton onClick={onClick} message={today}/>
)

export const NextButton = ({onClick, localizer: { messages: { next } }}) =>(
  <NavigationButton onClick={onClick} message={next}/>
)

export const PreviousButton = ({onClick, localizer: { messages: { previous } }}) =>(
  <NavigationButton onClick={onClick} message={previous}/>
)

