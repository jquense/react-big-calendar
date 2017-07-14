/* eslint-env mocha */
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Day from '../../src/Day';
import TimeGrid from '../../src/TimeGrid';
import EventWrapper from '../../src/EventWrapper';
import BackgroundWrapper from '../../src/BackgroundWrapper';

import events from '../factories/events';

describe('<Day />', () => {
  let sandbox;
  let props;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    props = {
      events,
      date: events[0].start,
      titleAccessor: sandbox.stub(),
      allDayAccessor: sandbox.stub(),
      startAccessor: sandbox.stub(),
      endAccessor: sandbox.stub(),
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
    it('passes the view prop to TimeGrid', () => {
      const wrapper = mount(<Day {...props} />);

      expect(wrapper.find(TimeGrid)).to.have.prop('view', 'day');
    });
  });
});
