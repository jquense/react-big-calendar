import React, { Component } from 'react';
import Button from './widgets/Button';
import ButtonGroup from './widgets/ButtonGroup';
import Input from './widgets/Input';
import styles from './Toolbar.less';

import physicians from './data/physicians';
import userGroups from './data/userGroups';

const stylesJs = {
  selectedView: {
    color: '#eee',
    border: '1px solid',
    borderColor: '#555 #555 #333 #555',
    textShadow: 'none',
    boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.4)',
    backgroundImage: 'linear-gradient(to bottom, #77808d, #4c5c6b)',
    backgroundRepeat: 'repeat-x'
  }
}

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

    onCurrentPhysicianChange: React.PropTypes.func.isRequired,
    onRefresh: React.PropTypes.func.isRequired,
  }

  createAppointment = () => alert('Pretend this is a create appointment dialog!');

  navPrev = () => this.props.onNavigate('PREV');

  navNext = () => this.props.onNavigate('NEXT');

  navToday = () => this.props.onNavigate('TODAY');

  onViewChange = (view) => this.props.onViewChange(view)

  render() {
    const {
      views, view, label, messages, onCurrentPhysicianChange, onRefresh
    } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.currentdate}>{label}</span>
          <ButtonGroup style={{ margin: '0 5px' }}>
            <Button onClick={this.navPrev}>&lt;</Button>
            <Button onClick={this.navNext}>&gt;</Button>
          </ButtonGroup>
          {(() => {
            if (view === 'week') {
              return (
                <select style={{ height: 27, outline: 0 }} onChange={onCurrentPhysicianChange}>
                  {physicians.map((physician) => (
                    <option key={physician.id} value={physician.id}>
                      {physician.fullName}
                    </option>
                  ))}
                </select>
              );
            } else {
              return (
                <select style={{ height: 27, outline: 0 }}>
                  {userGroups.map((userGroup) => (
                    <option key={userGroup.id} value={userGroup.id}>
                      {userGroup.name}
                    </option>
                  ))}
                </select>
              )
            }
          })()}
          <ButtonGroup style={{ margin: '0 5px' }}>
            <Button onClick={this.createAppointment}>+ Appointment</Button>
            <Button onClick={this.navToday}>
              {view === 'week' ? 'This Week' : 'Today'}
            </Button>
            <Button onClick={onRefresh}>Refresh</Button>
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
            {views.map((v) => (
              <Button
                key={v}
                onClick={this.onViewChange.bind(null, v)}
                style={v === view ? stylesJs.selectedView : {}}
              >
                {messages[v]}
              </Button>
            ))}
          </ButtonGroup>
        </span>
      </div>
    )
  }
}
