/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';

import EventRowMixin from '../../src/EventRowMixin';
import EventWrapper from '../../src/EventWrapper';

import events from '../factories/events';

describe('EventRowMixin', () => {
  describe('renderEvent', () => {
    let props;
    let event;

    beforeEach(() => {
      props = {
        view: 'week',
        eventWrapperComponent: EventWrapper,
      };
      event = events[0];
    });

    it('passes the view prop to the event cell', () => {
      const eventCell = EventRowMixin.renderEvent(props, event);
      expect(eventCell.props.view).to.equal('week');
    });
  });
});
