import React, { Component } from 'react';
import Button from './widgets/Button';
import ButtonGroup from './widgets/ButtonGroup';
import Input from './widgets/Input';
import styles from './Toolbar.less';

import physicians from './data/physicians';
import userGroups from './data/userGroups';

export default class Toolbar extends Component {
  static propTypes = {
    view: React.PropTypes.string.isRequired,
    views: React.PropTypes.arrayOf(
      React.PropTypes.string,
    ).isRequired,
    label: React.PropTypes.node.isRequired,
    messages: React.PropTypes.object,
    onNavigate: React.PropTypes.func.isRequired,
    onViewChange: React.PropTypes.func.isRequired,
  }

  createAppointment = () => alert('Pretend this is a create appointment dialog!');

  navPrev = () => this.props.onNavigate('PREV');

  navNext = () => this.props.onNavigate('NEXT');

  navToday = () => this.props.onNavigate('TODAY');

  refresh = () => console.log('Dummy refresh!');

  onViewChange = (view) => this.props.onViewChange(view)

  render() {
    const { views, view, label, messages } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.currentdate}>{label}</span>
          <ButtonGroup style={{ margin: '0 5px' }}>
            <Button onClick={this.navPrev}>&lt;</Button>
            <Button onClick={this.navNext}>&gt;</Button>
          </ButtonGroup>
          <select style={{ height: 27, outline: 0 }}>
            {(() => {
              if (view === 'week') {
                return physicians.map((physician) => (
                  <option key={physician.id}>{physician.fullName}</option>
                ));
              } else {
                return userGroups.map((userGroup) => (
                  <option key={userGroup.id}>{userGroup.name}</option>
                ));
              }
            })()}
          </select>
          <ButtonGroup style={{ margin: '0 5px' }}>
            <Button onClick={this.createAppointment}>+ Appointment</Button>
            <Button onClick={this.navToday}>
              {view === 'week' ? 'This Week' : 'Today'}
            </Button>
            <Button onClick={this.refresh}>Refresh</Button>
          </ButtonGroup>
          <Input
            type="search"
            placeholder="Find appointments by patient..."
            style={{ minWidth: 250, flex: '1 1 auto', margin: '0 5px' }}
          />
        </div>
        <span className={styles.viewpicker}>
          View:
          <ButtonGroup style={{ padding: '0 3px' }}>
            {views.map((view) => (
              <Button key={view} onClick={this.onViewChange.bind(null, view)}>
                {messages[view]}
              </Button>
            ))}
          </ButtonGroup>
        </span>
      </div>
    )
  }
}
