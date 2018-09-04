import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events';


class MyOtherNestedComponent extends React.Component {
  render() {
    return <div>NESTED COMPONENT</div>
  }
}

class MyCustomHeader extends React.Component {
  render() {
    const { label } = this.props
    return (
      <div>
        CUSTOM HEADER:
        <div>{ label }</div>
        <MyOtherNestedComponent />
      </div>
    )
  }
}

class CustomHeader extends React.Component {
  render() {
    return (
      <BigCalendar
        {...this.props}
        events={events}
        defaultDate={new Date(2015, 3, 1)}
        components={{
          day: {header: MyCustomHeader},
          week: {header: MyCustomHeader},
          month: {header: MyCustomHeader}
        }}
      />
    )
  }
}

export default CustomHeader;
