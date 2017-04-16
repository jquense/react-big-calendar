import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {elementType} from './utils/propTypes';

class TimeSlot extends React.Component {
    render() {
        const {content, dayWrapperComponent: Wrapper, isNow, value, showLabel} = this.props;

        return (
            <Wrapper value={value}>
                <div className={cn('rbc-time-slot', showLabel && 'rbc-label', isNow && 'rbc-now')}>
                    {showLabel && <span>{content}</span>}
                </div>
            </Wrapper>
        )
    }
}

TimeSlot.propTypes = {
    dayWrapperComponent: elementType,
    value: PropTypes.instanceOf(Date).isRequired,
    isNow: PropTypes.bool,
    showLabel: PropTypes.bool,
    content: PropTypes.string,
    culture: PropTypes.string,
};

TimeSlot.defaultProps = {
    isNow: false,
    showLabel: false,
    content: '',
};

export default TimeSlot;
