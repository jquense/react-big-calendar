/* setup.js */

// Set up jsdom for enzyme testing
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};
copyProps(window, global);

// Set up Chai expectations to use "dirty-chai" and "chai-enzyme".
// See https://github.com/prodatakey/dirty-chai
//     https://github.com/producthunt/chai-enzyme
//
import chai from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);
chai.use(require('chai-enzyme')());
chai.use(require('chai-moment'));
