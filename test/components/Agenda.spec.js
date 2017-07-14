/* eslint-env mocha */
import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Agenda from '../../src/Agenda';
import events from '../factories/events';
import localizer from '../../src/localizer'

describe('<Agenda />', () => {
  let props;
  let sandbox;
  let titleAccessor;
  let allDayAccessor;
  let startAccessor;
  let endAccessor;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    titleAccessor = sandbox.stub();
    allDayAccessor = sandbox.stub();
    startAccessor = 'start';
    endAccessor = 'end';
    sandbox.stub(localizer, 'format').returns('mock');

    props = {
      events: events,
      date: new Date(2015, 3, 0),
      components: {},
      titleAccessor,
      allDayAccessor,
      startAccessor,
      endAccessor,
    };
  });

  afterEach(() => sandbox.restore());

  describe('render', () => {
    context('without an eventPropGetter', () => {
      beforeEach(() => {
        props.eventPropGetter = null;
      });

      it('does not have a className or style prop for all the event nodes', () => {
        const wrapper = mount(<Agenda {...props} />);

        const events = wrapper.ref('tbody').find('tr');
        expect(events).to.have.length(2);
        expect(events.at(0)).to.not.have.prop('className');
        expect(events.at(0)).to.not.have.prop('style');
        expect(events.at(1)).to.not.have.prop('className');
        expect(events.at(1)).to.not.have.prop('style');
      });
    });

    context('with an eventPropGetter', () => {
      beforeEach(() => {
        // eslint-disable-next-line no-unused-vars
        props.eventPropGetter = (event, start, end, selected) => ({ className: 'test', style: { width: '100px' } });
      });

      it('adds the returned className and style to all the event nodes', () => {
        const wrapper = mount(<Agenda {...props} />);

        const events = wrapper.ref('tbody').find('tr');
        expect(events).to.have.length(2);
        expect(events.at(0)).to.have.prop('className', 'test');
        expect(events.at(0).prop('style')).to.deep.equal({ width: '100px' });
        expect(events.at(1)).to.have.prop('className', 'test');
        expect(events.at(1).prop('style')).to.deep.equal({ width: '100px' });
      });

      it('passes the right arguments to the eventPropGetter for all the event nodes', () => {
        props.eventPropGetter = sandbox.stub().returns({});
        mount(<Agenda {...props} />);

        const firstEvent = events[0];
        const secondEvent = events[1];
        sinon.assert.calledWith(props.eventPropGetter, firstEvent, firstEvent[startAccessor], firstEvent[endAccessor], false);
        sinon.assert.calledWith(props.eventPropGetter, secondEvent, secondEvent[startAccessor], secondEvent[endAccessor], false);
      });
    });
  });
});
