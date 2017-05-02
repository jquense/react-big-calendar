import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import dates from './utils/dates';
import {accessor, elementType} from './utils/propTypes';
import {accessor as get} from './utils/accessors';

class EventCell extends React.Component {
    render() {
        let {
            className,
            event,
            selected,
            eventPropGetter,
            startAccessor, endAccessor, titleAccessor,
            slotStart,
            slotEnd,
            onSelect,
            eventComponent: Event,
            eventWrapperComponent: EventWrapper,
            ...props
        } = this.props;

        let title = get(event, titleAccessor),
            end = get(event, endAccessor),
            start = get(event, startAccessor),
            isAllDay = get(event, props.allDayAccessor),
            continuesPrior = dates.lt(start, slotStart, 'day'),
            continuesAfter = dates.gt(end, slotEnd, 'day');

        if (eventPropGetter)
            var {style, className: xClassName} = eventPropGetter(event, start, end, selected);

        return (
            <EventWrapper event={event}>
                <div
                    className={cn('rbc-event', className, xClassName, {
                        'rbc-selected': selected,
                        'rbc-event-allday': isAllDay || dates.diff(start, dates.ceil(end, 'day'), 'day') > 1,
                        'rbc-event-continues-prior': continuesPrior,
                        'rbc-event-continues-after': continuesAfter
                    })}
                    onClick={(e) => onSelect(event, e)}
                    style={{...props.style, ...style}}>
                    <div className='rbc-event-content' title={title}>
                        {Event ? <Event event={event} title={title}/> : title}
                    </div>
                </div>
            </EventWrapper>
        );
    }
}

EventCell.propTypes = {
    event: PropTypes.object.isRequired,
    slotStart: PropTypes.instanceOf(Date),
    slotEnd: PropTypes.instanceOf(Date),

    selected: PropTypes.bool,
    eventPropGetter: PropTypes.func,
    titleAccessor: accessor,
    allDayAccessor: accessor,
    startAccessor: accessor,
    endAccessor: accessor,

    eventComponent: elementType,
    eventWrapperComponent: elementType.isRequired,
    onSelect: PropTypes.func
};

export default EventCell
