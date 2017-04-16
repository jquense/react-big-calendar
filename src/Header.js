import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
    render() {
        const {label} = this.props;

        return <span>{label}</span>;
    }
}

Header.propTypes = {
    label: PropTypes.node,
};

export default Header
