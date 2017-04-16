import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import EventRowMixin from './EventRowMixin';

let EventRow = createReactClass({
    displayName: 'EventRow',

    propTypes: {
        segments: PropTypes.array
    },

    mixins: [EventRowMixin],

    render(){
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
});

export default EventRow
