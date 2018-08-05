import { navigate as navigationActions } from './utils/constants'
import { buttonWrapper } from './ButtonWrapper'

class NextButtonWrapper {
  static navAction = navigationActions.NEXT
  static message = 'next'
}

export const NextButton = buttonWrapper(NextButtonWrapper)

class PreviousButtonWrapper {
  static navAction = navigationActions.PREVIOUS
  static message = 'previous'
}

export const PreviousButton = buttonWrapper(PreviousButtonWrapper)

class TodayButtonWrapper {
  static navAction = navigationActions.TODAY
  static message = 'today'
}

export const TodayButton = buttonWrapper(TodayButtonWrapper)
