import React from 'react';
import PropTypes from 'prop-types';
import EventCell from './EventCell';
import {accessor, elementType} from './utils/propTypes';
import {segStyle} from './utils/eventLevels';
import {isSelected} from './utils/selection';

class EventRow extends React.Component {
    render() {
        let {segments} = this.props;

        let lastEnd = 1;

        return (
            <div className='rbc-row'>
                {
                    segments.reduce((row, {event, left, right, span}, li) => {
                        let key = '_lvl_' + li;
                        let gap = left - lastEnd;

                        let content = this.renderEvent(event)

                        if (gap)
                            row.push(this.renderSpan(gap, key + '_gap'))

                        row.push(
                            this.renderSpan(span, key, content)
                        )

                        lastEnd = (right + 1);

                        return row;
                    }, [])
                }
            </div>
        )
    }

    renderEvent(event) {
        let {
            eventPropGetter, selected, start, end,
            startAccessor, endAccessor, titleAccessor,
            allDayAccessor, eventComponent,
            eventWrapperComponent,
            onSelect
        } = this.props;

        return (
            <EventCell
                event={event}
                eventWrapperComponent={eventWrapperComponent}
                eventPropGetter={eventPropGetter}
                onSelect={onSelect}
                selected={isSelected(event, selected)}
                startAccessor={startAccessor}
                endAccessor={endAccessor}
                titleAccessor={titleAccessor}
                allDayAccessor={allDayAccessor}
                slotStart={start}
                slotEnd={end}
                eventComponent={eventComponent}
            />
        )
    }

    renderSpan(len, key, content = ' ') {
        let {slots} = this.props;

        return (
            <div key={key} className='rbc-row-segment' style={segStyle(Math.abs(len), slots)}>
                {content}
            </div>
        )
    }
}

EventRow.propTypes = {
    slots: PropTypes.number.isRequired,
    end: PropTypes.instanceOf(Date),
    start: PropTypes.instanceOf(Date),

    selected: PropTypes.array,
    eventPropGetter: PropTypes.func,
    titleAccessor: accessor,
    allDayAccessor: accessor,
    startAccessor: accessor,
    endAccessor: accessor,

    eventComponent: elementType,
    eventWrapperComponent: elementType.isRequired,
    onSelect: PropTypes.func,

    segments: PropTypes.array,
};

EventRow.defaultProps = {
    segments: [],
    selected: [],
    slots: 7,
};

EventRow.displayName = 'EventRow';

export default EventRow
