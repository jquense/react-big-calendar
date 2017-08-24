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
      agendaLength: 10
    };
  });

  afterEach(() => sandbox.restore());

  describe('on componentDidMount', () => {
    it('has agendaLength prop', () => {
      const wrapper = mount(<Agenda {...props} />);

      expect(wrapper).to.have.prop('agendaLength', 10);
    });
  });

  describe('render', () => {
    context('agendaLength is greater than 0', () => {
      it('renders date header', () => {
        const wrapper = mount(<Agenda {...props} />);

        expect(wrapper.ref('dateCol')).to.be.present();
      });

      it('renders date content', () => {
        const wrapper = mount(<Agenda {...props} />);

        expect(wrapper.find('.rbc-agenda-date-cell')).to.have.length(1);
      });
    });

    context('agendaLength is 0', () => {
      beforeEach(() => {
        props.agendaLength = 0;
      });

      it('does not render date header', () => {
        const wrapper = mount(<Agenda {...props} />);

        expect(wrapper.ref('dateCol')).to.not.present();
      });

      it('does not render date content', () => {
        const wrapper = mount(<Agenda {...props} />);

        expect(wrapper.find('.rbc-agenda-date-cell')).to.have.length(0);
      });
    });

    context('event length is 0',() => {
      beforeEach(() => {
        props.events = [];
      });

      it('renders empty agenda view', () => {
        const wrapper = mount(<Agenda {...props} />);
        const content = wrapper.find('.rbc-empty-agenda-content');
        
        expect(content).to.have.length(1);
        expect(content.prop('style')).to.deep.equal({height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'});
        expect(content.children().first().prop('style')).to.deep.equal({textAlign: 'center', color: 'gray'});
        expect(content.children().first().text()).to.equal('There are no events today that match your filters.');
      });
    })

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
        props.eventPropGetter = (event, start, end, selected, view) => ({ className: 'test', style: { width: '100px' } });
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
        sinon.assert.calledWith(props.eventPropGetter, firstEvent, firstEvent[startAccessor], firstEvent[endAccessor], false, 'agenda');
        sinon.assert.calledWith(props.eventPropGetter, secondEvent, secondEvent[startAccessor], secondEvent[endAccessor], false, 'agenda');
      });
    });
  });

  describe('Agenda.range', () => {
    it('returns an array of start date and end date', () => {
      const start = new Date(2017, 6, 1);
      const end = new Date(2017, 6, 11);

      const result = Agenda.range(start, { length: 10 });

      expect(result).to.deep.equal([start, end]);
    });
  });
});
