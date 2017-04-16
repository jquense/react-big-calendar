import React from 'react';
import PropTypes from 'prop-types';
import {eventLevels, segStyle} from './utils/eventLevels';
import message from './utils/messages';
import range from 'lodash/range';
import EventCell from './EventCell';
import {accessor, elementType} from './utils/propTypes';
import {isSelected} from './utils/selection';

let isSegmentInSlot = (seg, slot) => seg.left <= slot && seg.right >= slot;
let eventsInSlot = (segments, slot) => segments.filter(seg => isSegmentInSlot(seg, slot)).length;

class EventRow extends React.Component {
    render() {
        let {segments, slots: slotCount} = this.props;
        let rowSegments = eventLevels(segments).levels[0];

        let current = 1
            , lastEnd = 1
            , row = [];

        while (current <= slotCount) {
            let key = '_lvl_' + current;

            let {event, left, right, span} = rowSegments
                .filter(seg => isSegmentInSlot(seg, current))[0] || {}; //eslint-disable-line

            if (!event) {
                current++;
                continue;
            }

            let gap = Math.max(0, left - lastEnd);

            if (this.canRenderSlotEvent(left, span)) {
                let content = this.renderEvent(event);

                if (gap)
                    row.push(this.renderSpan(gap, key + '_gap'));

                row.push(
                    this.renderSpan(span, key, content)
                );

                lastEnd = current = (right + 1);
            }
            else {
                if (gap)
                    row.push(this.renderSpan(gap, key + '_gap'));

                row.push(this.renderSpan(1, key, this.renderShowMore(segments, current)));
                lastEnd = current = current + 1
            }
        }

        return (
            <div className='rbc-row'>
                { row }
            </div>
        )
    }

    canRenderSlotEvent(slot, span) {
        let {segments} = this.props;

        return range(slot, slot + span).every(s => {
            let count = eventsInSlot(segments, s);

            return count === 1
        })
    }

    renderShowMore(segments, slot) {
        let messages = message(this.props.messages);
        let count = eventsInSlot(segments, slot);

        return count
            ? (
                <a
                    key={'sm_' + slot}
                    href='#'
                    className={'rbc-show-more'}
                    onClick={this._showMore.bind(null, slot)}
                >
                    {messages.showMore(count)}
                </a>
            ) : false
    }

    _showMore(slot, e) {
        e.preventDefault();
        this.props.onShowMore(slot)
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
    messages: PropTypes.object,
    onShowMore: PropTypes.func,
};

EventRow.defaultProps = {
    segments: [],
    selected: [],
    slots: 7,
};

EventRow.displayName = 'EventRow';

export default EventRow
