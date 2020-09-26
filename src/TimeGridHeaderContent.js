import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import DateContentRow from './DateContentRow'
import ResourceHeader from './ResourceHeader'

const TimeGridHeaderContent = ({
  localizer,
  getters,
  selectable,
  selected,
  resource,
  id,
  idx,
  range,
  rtl,
  getNow,
  groupedEvents,
  renderHeaderCells,
  accessors,
  components,
  onSelectEvent,
  onDoubleClickEvent,
  onKeyPressEvent,
  onSelectSlot,
  longPressThreshold,
}) => {
  const containerRef = useRef(null)
  const {
    resourceHeader: ResourceHeaderComponent = ResourceHeader,
  } = components
  const { resourceTitle } = accessors

  const getContainer = () => containerRef.current

  return (
    <div className="rbc-time-header-content" ref={containerRef}>
      {resource && (
        <div className="rbc-row rbc-row-resource" key={`resource_${idx}`}>
          <div className="rbc-header">
            <ResourceHeaderComponent
              index={idx}
              label={resourceTitle(resource)}
              resource={resource}
            />
          </div>
        </div>
      )}
      <div
        className={`rbc-row rbc-time-header-cell${
          range.length <= 1 ? ' rbc-time-header-cell-single-day' : ''
        }`}
      >
        {renderHeaderCells()}
      </div>
      <DateContentRow
        isAllDay
        rtl={rtl}
        getNow={getNow}
        minRows={2}
        range={range}
        container={getContainer}
        events={groupedEvents.get(id) || []}
        resourceId={resource && id}
        className="rbc-allday-cell"
        selectable={selectable}
        selected={selected}
        components={components}
        accessors={accessors}
        getters={getters}
        localizer={localizer}
        onSelect={onSelectEvent}
        onDoubleClick={onDoubleClickEvent}
        onKeyPress={onKeyPressEvent}
        onSelectSlot={onSelectSlot}
        longPressThreshold={longPressThreshold}
      />
    </div>
  )
}

TimeGridHeaderContent.propTypes = {
  range: PropTypes.array.isRequired,
  resource: PropTypes.object,
  getNow: PropTypes.func.isRequired,
  id: PropTypes.any,
  idx: PropTypes.number,
  groupedEvents: PropTypes.object,
  renderHeaderCells: PropTypes.func.isRequired,

  rtl: PropTypes.bool,

  localizer: PropTypes.object.isRequired,
  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,

  selected: PropTypes.object,
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: PropTypes.number,

  onSelectSlot: PropTypes.func,
  onSelectEvent: PropTypes.func,
  onDoubleClickEvent: PropTypes.func,
  onKeyPressEvent: PropTypes.func,
}

export default TimeGridHeaderContent
