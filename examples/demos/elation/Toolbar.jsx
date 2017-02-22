import React, { Component } from 'react';
import Button from './widgets/Button';
import ButtonGroup from './widgets/ButtonGroup';
import Input from './widgets/Input';
import styles from './Toolbar.less';

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

  view = (view) => this.props.onViewChange(view)

  render() {
    const { label } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.currentdate}>{label}</span>
          <ButtonGroup style={{ margin: '0 5px' }}>
            <Button onClick={this.navPrev}>&lt;</Button>
            <Button onClick={this.navNext}>&gt;</Button>
          </ButtonGroup>
          <ButtonGroup style={{ margin: '0 5px' }}>
            <Button onClick={this.createAppointment}>+ Appointment</Button>
            <Button onClick={this.navToday}>Today</Button>
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
            <Button>7 Days</Button>
            <Button>Multi-Providers</Button>
          </ButtonGroup>
        </span>
      </div>
    )
  }
}
