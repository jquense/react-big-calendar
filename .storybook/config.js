import { configure } from '@kadira/storybook';

function loadStories() {
  require('../src/.stories');
  // require as many as stories you need.
}

configure(loadStories, module);
