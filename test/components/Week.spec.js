/* eslint-env mocha */
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Week from '../../src/Week';
import TimeGrid from '../../src/TimeGrid';
import EventWrapper from '../../src/EventWrapper';
import BackgroundWrapper from '../../src/BackgroundWrapper';

import events from '../factories/events';

describe('<Week />', () => {
  let sandbox;
  let props;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    props = {
      events,
      date: events[0].start,
      allDayAccessor: 'allDay',
      startAccessor: 'start',
      endAccessor: 'end',
      titleAccessor: 'title',
      getDrilldownView: sandbox.stub(),
      onSelectSlot: sandbox.stub(),
      onSelectEvent: sandbox.stub(),
      components: {
        eventWrapper: EventWrapper,
        dateCellWrapper: BackgroundWrapper,
      },
    };
  });

  afterEach(() => sandbox.restore());

  describe('on mount', () => {
    it('passes the right view to the time grid', () => {
      const wrapper = mount(<Week {...props} />);

      expect(wrapper.find(TimeGrid)).to.have.prop('view', 'week');
    });
  })
});
