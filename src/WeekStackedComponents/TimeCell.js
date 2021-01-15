import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const TimeCell = ({
  events,
  timeSlot,
  isToday,
  accessors,
  components: { event: Event },
  getters,
}) => {
  const userComponentProps = getters.eventComponentProps()

  return (
    <Droppable droppableId={`time-cell-${timeSlot.getTime()}`}>
      {provided => {
        return (
          <div
            className={clsx('rbc-time-cell', isToday && 'rbc-today')}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {events.map((event, index) => {
              const title = accessors.title(event)

              return (
                <Draggable
                  // TODO change this to accessor?
                  draggableId={`evt_${event.id}`}
                  key={`evt_${event.id}`}
                  index={index}
                >
                  {provided => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="rbc-event"
                      >
                        {Event ? (
                          <Event
                            event={event}
                            title={title}
                            {...userComponentProps}
                          />
                        ) : (
                          title
                        )}
                      </div>
                    )
                  }}
                </Draggable>
              )
            })}
          </div>
        )
      }}
    </Droppable>
  )
}

TimeCell.propTypes = {
  events: PropTypes.array.isRequired,

  timeSlot: PropTypes.instanceOf(Date),
  isToday: PropTypes.bool,

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
}

export default TimeCell
