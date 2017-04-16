import createReactClass from 'create-react-class';

let EventWrapper = createReactClass({
  render() {
    return this.props.children;
  }
});

export default EventWrapper;
