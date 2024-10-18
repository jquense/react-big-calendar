import React from 'react'

export const GroupingCalendarWeekView = ({
  children,
  resource,
  index,
  grouping,
}) => {
  return (
    <div className="rbc-grouping-wrapper">
      <div className="rbc-grouping-column">
        {index === 0 ? (
          <div className="rbc-header-label-grouping-column rbc-header-label-grouping-column-week">
            <span>{grouping.title}</span>
          </div>
        ) : null}
        <div className="rbc-label-container-grouping-column rbc-label-container-grouping-column-week">
          <div className="rbc-label-grouping-column">
            <span>{resource.title}</span>
          </div>
        </div>
      </div>
      <div className="rbc-grouping-children-wrapper">{children}</div>
    </div>
  )
}
