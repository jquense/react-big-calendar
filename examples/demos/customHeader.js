import React from 'react';
import BigCalendar from 'react-big-calendar';
import events from '../events';


let MyOtherNestedComponent = React.createClass({
  render(){
    return <div>NESTED COMPONENT</div>
  }
})

let MyCustomHeader = React.createClass({
  render(){
    const { label } = this.props
    return (
      <div>
        CUSTOM HEADER:
        <div>{ label }</div>
        <MyOtherNestedComponent />
      </div>
    )
  }
})


let CustomHeader = React.createClass({
  render(){
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
})

export default CustomHeader;
