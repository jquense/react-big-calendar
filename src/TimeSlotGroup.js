import React from 'react';
import PropTypes from 'prop-types';
import TimeSlot from './TimeSlot';
import date from './utils/dates.js';
import localizer from './localizer';
import {elementType} from './utils/propTypes';

class TimeSlotGroup extends React.Component {
    renderSlice(slotNumber, content, value) {
        const {dayWrapperComponent, showLabels, isNow, culture} = this.props;
        return (
            <TimeSlot
                key={slotNumber}
                dayWrapperComponent={dayWrapperComponent}
                showLabel={showLabels && !slotNumber}
                content={content}
                culture={culture}
                isNow={isNow}
                value={value}
            />
        )
    }

    renderSlices() {
        const {culture, step: sliceLength, timeGutterFormat, timeslots, value} = this.props;
        const ret = [];
        let sliceValue = value;

        for (let i = 0; i < timeslots; i++) {
            const content = localizer.format(sliceValue, timeGutterFormat, culture);
            ret.push(this.renderSlice(i, content, sliceValue));
            sliceValue = date.add(sliceValue, sliceLength, 'minutes');
        }

        return ret;
    }

    render() {
        return (
            <div className="rbc-timeslot-group">
                {this.renderSlices()}
            </div>
        )
    }
}

TimeSlotGroup.propTypes = {
    dayWrapperComponent: elementType,
    timeslots: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    value: PropTypes.instanceOf(Date).isRequired,
    showLabels: PropTypes.bool,
    isNow: PropTypes.bool,
    timeGutterFormat: PropTypes.string,
    culture: PropTypes.string,
};

TimeSlotGroup.defaultProps = {
    timeslots: 2,
    step: 30,
    isNow: false,
    showLabels: false,
};

export default TimeSlotGroup;
