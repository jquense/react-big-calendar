/* eslint-env mocha */
import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import * as Helpers from '../../src/utils/helpers';

import TimeGrid from '../../src/TimeGrid';
import DateContentRow from '../../src/DateContentRow';
import DayColumn from '../../src/DayColumn';
import EventWrapper from '../../src/EventWrapper';
import Week from '../../src/Week';
import BackgroundWrapper from '../../src/BackgroundWrapper';

import events from '../factories/events';

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
      events,
      components: {
        eventWrapper: EventWrapper,
        dateCellWrapper: BackgroundWrapper,
      },
      range: Week.range(events[0].start, {}),
      titleAccessor,
      allDayAccessor,
      startAccessor,
      endAccessor,
      getDrilldownView,
      allDayEventsLimit: 10,
      view: 'week',
      onSelectSlot: sandbox.stub(),
      onSelectEvent: sandbox.stub(),
    };
  });

  afterEach(() => sandbox.restore());

  describe('on componentDidMount', () => {
    it('passes allDayEventsLimit to DateContentRow maxRows prop', () => {
      const wrapper = shallow(<TimeGrid {...props} />);
      const contentRow = wrapper.find(DateContentRow);

      expect(contentRow).to.have.prop('maxRows', 10);
    });

    it('passes view prop to DateContentRow', () => {
      const wrapper = shallow(<TimeGrid {...props} />);
      const contentRow = wrapper.find(DateContentRow);

      expect(contentRow).to.have.prop('view', 'week');
    });

    it('passes style prop with correct width to DateContentRow', () => {
      const wrapper = mount(<TimeGrid {...props} />);
      sandbox.stub(wrapper.instance(), 'measureAllDayRowWidth').returns(200);
      wrapper.update();

      expect(wrapper.find(DateContentRow).prop('style')).to.deep.equal({ width: '200px' });
    });

    it('passes view prop to DayColumn', () => {
      const wrapper = shallow(<TimeGrid {...props} />);

      wrapper.find(DayColumn).forEach((dayColumn) => {
        expect(dayColumn).to.have.prop('view', 'week');
      });
    });

    it('adds window resize event listener', () => {
      sandbox.stub(window, 'addEventListener');
      const wrapper = mount(<TimeGrid {...props} />);

      sinon.assert.calledWith(window.addEventListener, 'resize', wrapper.instance().handleWindowResize);
    });
  });

  describe('on componentWillUnmount', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<TimeGrid {...props} />);
    });

    it('removes the window resize event listener', () => {
      const windowResizeCallback = wrapper.instance().handleWindowResize;
      sandbox.stub(window, 'removeEventListener');

      wrapper.unmount();

      sinon.assert.calledWith(window.removeEventListener, 'resize', windowResizeCallback);
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

  describe('on window resize', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<TimeGrid {...props} />);
      wrapper.setState({ allDayRowWidth: 100, gutterWidth: 50 });
    });

    it('updates allDayRowWidth in the internal state', () => {
      const headerCellsRow = wrapper.ref('headerCell').node;
      sandbox.stub(headerCellsRow, 'querySelector').returns({ clientWidth: 200 });

      expect(wrapper.state('allDayRowWidth')).to.equal(100);

      window.dispatchEvent(new window.CustomEvent('resize'));

      expect(wrapper.state('allDayRowWidth')).to.equal(150);
    });

    it('uses props.width over state.gutterWidth', () => {
      wrapper.setProps({ width: 25 });
      const headerCellsRow = wrapper.ref('headerCell').node;
      sandbox.stub(headerCellsRow, 'querySelector').returns({ clientWidth: 200 });

      expect(wrapper.state('allDayRowWidth')).to.equal(100);

      window.dispatchEvent(new window.CustomEvent('resize'));

      expect(wrapper.state('allDayRowWidth')).to.equal(175);
    });

    it('does not update allDayRowWidth if there is no rbc-row found', () => {
      const headerCellsRow = wrapper.ref('headerCell').node;
      sandbox.stub(headerCellsRow, 'querySelector').returns(null);

      expect(wrapper.state('allDayRowWidth')).to.equal(100);

      window.dispatchEvent(new window.CustomEvent('resize'));

      expect(wrapper.state('allDayRowWidth')).to.equal(100);
    });
  });
});
