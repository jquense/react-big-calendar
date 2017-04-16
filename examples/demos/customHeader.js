import React from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import events from '../events';

class MyOtherNestedComponent extends React.Component {
    render() {
        return <div>NESTED COMPONENT</div>;
    }
}

class MyCustomHeader extends React.Component {
    render() {
        const {label} = this.props;
        return (
            <div>
                CUSTOM HEADER:
                <div>{label}</div>
                <MyOtherNestedComponent />
            </div>
        )
    }
}
MyCustomHeader.propTypes = {
    label: PropTypes.any,
};

class CustomHeader extends React.Component {
    render() {
        return (
            <BigCalendar {...this.props}
                         components={{
                             day: {header: MyCustomHeader},
                             week: {header: MyCustomHeader},
                             month: {header: MyCustomHeader}
                         }}
                         defaultDate={new Date(2015, 3, 1)}
                         events={events}/>
        )
    }
}

export default CustomHeader;
