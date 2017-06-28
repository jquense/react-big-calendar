/* eslint-env mocha */
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import EventCell from '../../src/EventCell';
import EventWrapper from '../../src/EventWrapper';

import events from '../factories/events';

describe('<EventCell />', () => {
  let sandbox;
  let props;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    props = {
      event: events[0],
      view: 'week',
      eventWrapperComponent: EventWrapper,
      startAccessor: 'start',
      endAccessor: 'end',
      selected: false,
    };
  });

  afterEach(() => sandbox.restore());

  describe('on mount', () => {
    it('calls the eventPropGetter with the right arguments', () => {
      props.eventPropGetter = sandbox.stub().returns({});
      shallow(<EventCell {...props} />);

      sinon.assert.calledWith(props.eventPropGetter, events[0], events[0].start, events[0].end, false, 'week');
    });
  });
});
