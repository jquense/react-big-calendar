import React from 'react'
import { action } from '@storybook/addon-actions'
import CustomDayColumnWrapper from './CustomDayColumnWrapper'

const customComponents = {
  dateCellWrapper: (dateCellWrapperProps) => {
    // Show 'click me' text in arbitrary places by using the range prop
    const hasAlert = dateCellWrapperProps.range
      ? dateCellWrapperProps.range.some((date) => {
          return date.getDate() % 12 === 0
        })
      : false

    const style = {
      display: 'flex',
      flex: 1,
      borderLeft: '1px solid #DDD',
      backgroundColor: hasAlert ? '#f5f5dc' : '#fff',
    }
    return (
      <div style={style}>
        {hasAlert && (
          <a onClick={action('custom dateCellWrapper component clicked')}>
            Click me
          </a>
        )}
        {dateCellWrapperProps.children}
      </div>
    )
  },
  dayColumnWrapper: CustomDayColumnWrapper,
  timeSlotWrapper: (timeSlotWrapperProps) => {
    // Show different styles at arbitrary time
    const hasCustomInfo = timeSlotWrapperProps.value
      ? timeSlotWrapperProps.value.getHours() === 4
      : false
    const style = {
      display: 'flex',
      flex: 1,
      backgroundColor: hasCustomInfo ? '#f5f5dc' : '#fff',
    }
    return (
      <div style={style}>
        {hasCustomInfo && 'Custom Day Wrapper'}
        {timeSlotWrapperProps.children}
      </div>
    )
  },
  eventWrapper: (eventWrapperProps) => {
    const style = {
      border: '4px solid',
      borderColor:
        eventWrapperProps.event.start.getHours() % 2 === 0 ? 'green' : 'red',
      padding: '5px',
    }
    return <div style={style}>{eventWrapperProps.children}</div>
  },
  timeSlotWrapper: (timeSlotWrapperProps) => {
    const style =
      timeSlotWrapperProps.resource === null ||
      timeSlotWrapperProps.value.getMinutes() !== 0
        ? {}
        : {
            border: '4px solid',
            backgroundColor:
              timeSlotWrapperProps.value.getHours() >= 8 &&
              timeSlotWrapperProps.value.getHours() <= 17
                ? 'green'
                : 'red',
            padding: '5px',
          }
    return <div style={style}>{timeSlotWrapperProps.children}</div>
  },
  timeGutterWrapper: (timeGutterWrapperProps) => {
    return (
      <div
        id="my-custom-time-gutter-wrapper"
        style={{ backgroundColor: 'gray' }}
      >
        {timeGutterWrapperProps.children}
      </div>
    )
  },
  showMore: (showMoreProps) => {
    return (
      <button
        id="my-custom-show-more"
        style={{ border: '4px solid red', cursor: 'pointer' }}
        onClick={() => {
          console.log('showMoreProps', showMoreProps)
          window.alert(`
            Clicked ${showMoreProps.slotDate
              .toISOString()
              .substr(0, 10)} with ${
            showMoreProps.remainingEvents.length
          } remaining events.
            Open the console for the full set of props.
          `)
        }}
      >
        {showMoreProps.count} more!
      </button>
    )
  },
  timeIndicatorWrapper: (timeIndicatorWrapperProps) => {
    return (
      <div
        {...timeIndicatorWrapperProps}
        style={{
          ...timeIndicatorWrapperProps.style,
          backgroundColor: 'red',
          height: '2px',
        }}
      >
        Time Ex
      </div>
    )
  },
}

export default customComponents
