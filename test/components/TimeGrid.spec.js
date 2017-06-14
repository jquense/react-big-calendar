/* eslint-env mocha */
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import * as Helpers from '../../src/utils/helpers';

import TimeGrid from '../../src/TimeGrid';
import DateContentRow from '../../src/DateContentRow';

describe('<TimeGrid />', () => {
  let props;
  let sandbox;
  let titleAccessor;
  let allDayAccessor;
  let startAccessor;
  let endAccessor;
  let getDrilldownView;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    titleAccessor = sandbox.stub();
    allDayAccessor = sandbox.stub();
    startAccessor = sandbox.stub();
    endAccessor = sandbox.stub();
    getDrilldownView = sandbox.stub().returns('agenda');

    props = {
      events: [],
      components: {},
      range:[],
      titleAccessor,
      allDayAccessor,
      startAccessor,
      endAccessor,
      getDrilldownView,
      allDayEventsLimit: 10,
    };
  });

  afterEach(() => sandbox.restore());

  describe('on componentDidMount', () => {
    it('passes allDayEventsLimit to DateContentRow maxRows prop', () => {
      const wrapper = shallow(<TimeGrid {...props} />);
      const contentRow = wrapper.find(DateContentRow);

      expect(contentRow).to.have.prop('maxRows', 10);
    });
  });

  describe('handleShowMore', () => {
    it('calls clearSelection', () => {
      const wrapper = shallow(<TimeGrid {...props} />);
      sandbox.stub(wrapper.instance(), 'clearSelection');
      wrapper.instance().handleShowMore();

      sinon.assert.calledOnce(wrapper.instance().clearSelection);
    });

    it('calls notify with DrilldownView', () => {
      props.onDrillDown = 'agenda mock';
      const date = 'mock';
      const wrapper = shallow(<TimeGrid {...props} />);
      sandbox.stub(Helpers, 'notify');
      wrapper.instance().handleShowMore([], date);

      sinon.assert.calledWith(Helpers.notify, 'agenda mock', ['mock', 'agenda']);
    });
  });
});