import 'jsdom-global/register';
import Adapter from 'enzyme-adapter-react-16/build/index';
import { configure } from 'enzyme';

configure({ adapter: new Adapter() });

// Needed for React16 in tests: https://github.com/facebook/jest/issues/4545
global.requestAnimationFrame = (cb) => {
  setTimeout(cb, 0);
};

global.cancelAnimationFrame = () => {};
