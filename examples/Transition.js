import React from 'react';
import Transition from 'react-overlays/Transition';
import Button from 'react-bootstrap/lib/Button';
import injectCss from './injectCss';

const FADE_DURATION = 200;

injectCss(`
.fade {
  opacity: 0;
  -webkit-transition: opacity ${FADE_DURATION}ms linear;
       -o-transition: opacity ${FADE_DURATION}ms linear;
          transition: opacity ${FADE_DURATION}ms linear;
}

.in {
  opacity: 1;
}
`);


const TransitionExample = React.createClass({

  getInitialState(){
    return { in: true };
  },

  toggle(){
    return this.setState({ in: !this.state.in });
  },

  render(){

    return (
      <div className='transition-example'>
        <p>Create your own declarative fade transition</p>
        <Transition
          in={this.state.in}
          timeout={FADE_DURATION}
          className='fade'
          enteredClassName='in'
          enteringClassName='in'
        >
          <div className='panel panel-default'>
            <div className='panel-body'>
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid.
              Nihil anim keffiyeh helvetica, craft beer labore wes
              anderson cred nesciunt sapiente ea proident.
            </div>
          </div>
        </Transition>

        <Button bsStyle='primary' onClick={this.toggle}>
          dismiss
        </Button>
      </div>
    );
  }
});

export default TransitionExample;
